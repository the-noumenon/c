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
// TODO: Look at postCSS
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var nano = require('cssnano');
var rename = require('gulp-rename');

// gulp.task('copymodules', function() {
//     gulp.src('./node_modules/react/dist/react.min.js')
//         .pipe(gulp.dest('./public/scripts/node_modules/react/dist'))
    
//     gulp.src('./node_modules/react-dom/dist/react-dom.min.js')
//         .pipe(gulp.dest('./public/scripts/node_modules/react-dom/dist'))
// });

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

// gulp.task('release', function() {
//     var b = browserify('./public/scripts/c.dist.js');
//     b.require('velocity-animate');
//     b.require('velocity-animate/velocity.ui');
//     b.require('react');
//     b.require('react-dom');
//     b.require('react-addons-transition-group');        
//     b.require('velocity-react');    
    
//     b.transform(envify({
//         NODE_ENV: 'production'
//     }));
    
//     return b.bundle()     
//         .pipe(source('./public/scripts/deps.js'))        
//         .pipe(buffer())
//         .pipe(uglify())
//         .pipe(gulp.dest('./'))
// });

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

// gulp.task('bundle', function() {
//     var bundledStream = through();
    
//     // Set up our bundled stream with the output that we want to achieve.
//     bundledStream
//         .pipe(source('./public/scripts/c.dist.js'))
//         .pipe(buffer())
//         .pipe(gulp.dest('./'));        
    
//     // Match files based on a pattern and pipe into our bundled stream.
//     // We want all of our scripts except for the dependencies script to match.
//     globby(['./public/scripts/*.js', '!./public/scripts/deps.js']).then(function(entries) {
//         var b = browserify({ entries: entries });
//         b.external('react');
//         b.external('react-dom');
//         b.external('jquery');
            
//         b.bundle().pipe(bundledStream);
//     }).catch(function(err) {
//         bundledStream.emit('error', err);
//     });
    
//     return bundledStream;
// });

gulp.task('less', function() {
    var processors = [nano];    
    return gulp.src('./src/stylesheets/**/*.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./public/stylesheets'))
});

gulp.task('clean', function() {    
    return gulp.src(['./public/scripts/*.js', '!./public/scripts/deps.js'])
        .pipe(clean());
})

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

gulp.task('release', function() {
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

gulp.task('transpile-watch', function() {
    gulp.watch('./src/stylesheets/**/*.less', ['less']);
    gulp.watch(['./src/**/*.ts', './src/**/*.tsx'], ['tsc']);    
});