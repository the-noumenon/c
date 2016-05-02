var gulp = require('gulp');
var clean = require('gulp-clean');

// Typescript transpiling
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

// Bundling
var browserify = require("browserify");
var globby = require("globby");
var through = require("through2");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var envify = require("envify/custom");

// Minifying
var uglify = require("gulp-uglify");

// Stylesheet transpiling
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var nano = require('cssnano');
var rename = require('gulp-rename');

// Use this task to just compile the typescript and react components
gulp.task('tsc', function() {
    var result = gulp.src(['./src/**/*.ts', './src/**/*.tsx', './typings/main/**/*.ts', './typings/custom/*.ts'])    
        .pipe(sourcemaps.init())
        .pipe(tsc({
            noExternalResolve: false,
            target: 'ES5',
            module: 'commonjs',
            moduleResolution: 'classic',
            jsx: 'react'
        }));
        
    return result.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/scripts'))
});



// Compile less files (css preprocessor)
gulp.task('less', function() {
    var processors = [nano];    
    return gulp.src('./src/stylesheets/**/*.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./public/stylesheets'))
});

// Clean all of our old js files
gulp.task('clean', function() {    
    return gulp.src(['./public/scripts/*.js', '!./public/scripts/deps.js'])
        .pipe(clean());
})

// Use this task to copy dependencies as required (mostly for dev.) - use this in conjunction with transpile for speed of compiling
gulp.task('js-deps', function() {
    var b = browserify();
    b.require('velocity-animate');
    b.require('velocity-animate/velocity.ui');
    b.require('react');
    b.require('react-dom');
    b.require('react-addons-transition-group');        
    b.require('velocity-react');    
    
    b.transform(envify({
        _: 'purge',
        NODE_ENV: 'production'
    }), { global: true });
    
    return b.bundle()        
        .pipe(source('./public/scripts/deps.js'))        
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./'))
});

// Use this task to transpile everything - except for dependencies, they're a bit big (~800kb, thanks react), so build 'js-deps' once, then use transpile for speed of compiling.
gulp.task('transpile', ['clean', 'tsc', 'less'], function() {
    var bundledStream = through();
    
    // Set up our bundled stream with the output that we want to achieve.
    bundledStream
        .pipe(source('./public/scripts/c.dist.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./'));        
    
    // Match files based on a pattern and pipe into our bundled stream.
    // We want all of our scripts except for the dependencies script to match.
    globby(['./public/scripts/*.js', '!./public/scripts/deps.js']).then(function(entries) {
        var b = browserify({ entries: entries });
        b.external('velocity-animate');
        b.external('velocity-animate/velocity.ui');
        b.external('react');
        b.external('react-dom');
        b.external('react-addons-transition-group');        
        b.external('velocity-react');  
            
        b.bundle().pipe(bundledStream);
    }).catch(function(err) {
        bundledStream.emit('error', err);
    });
    
    return bundledStream;
});

// Build our release files - if you don't mind compiling taking a couple of seconds, use this.
gulp.task('release', ['clean', 'tsc', 'less'], function() {
    var bundledStream = through();
    
    // Set up our bundled stream with the output that we want to achieve.
    bundledStream
        .pipe(source('./public/scripts/c.dist.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./'));        
    
    // Match files based on a pattern and pipe into our bundled stream.
    // We want all of our scripts except for the dependencies script to match.
    globby(['./public/scripts/*.js', '!./public/scripts/c.dist.js', '!./public/scripts/deps.js']).then(function(entries) {
        var b = browserify({ entries: entries });
        b.require('velocity-animate');
        b.require('velocity-animate/velocity.ui');
        b.require('react');
        b.require('react-dom');
        b.require('react-addons-transition-group');        
        b.require('velocity-react');  
        
        b.transform(envify({
            _: 'purge',
            NODE_ENV: 'production'
        }), { global: true });    

        b.bundle().pipe(bundledStream);
    }).catch(function(err) {
        bundledStream.emit('error', err);
    });
    
    return bundledStream;
});

// Set up a watch so ou don't really have to use the 'transpile' task if you don't want.
gulp.task('transpile-watch', function() {
    gulp.watch('./src/stylesheets/**/*.less', ['less']);
    gulp.watch(['./src/**/*.ts', './src/**/*.tsx'], ['tsc']);    
});