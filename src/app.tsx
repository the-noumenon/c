import React = require('react');
import ReactDOM = require('react-dom');

import 'velocity-animate';
import 'velocity-animate/velocity.ui';

import { IApp, DesignMode, IDesign, LayoutType, DesignFilter } from "./models";

import { designData } from "./data"
import { Landing } from "./landing";
import { DesignPane } from "./designpane";
import { Menu } from "./menu";
import { TopScroller } from "./topscroller";
import { LightBox } from "./lightbox";

class App extends React.Component<IApp, any> {    
    private _designs: IDesign[] = [];
    private _latest: IDesign[] = [];
    private _animations: IDesign[] = [];
    private _favourites: IDesign[] = [];
    
    private mql: MediaQueryList;
    
    componentWillMount() {
        const mql = window.matchMedia(`only screen and (min-width: 850px) and (orientation: landscape)`);
        mql.addListener(() => this.onMediaQueryChanged());
        
        // Initialise all of the designs in our data section.    
        designData.forEach(d => {
            if (!d.animation) {
                d.animation = false;
            } else {
                this._animations.push(d);
            }
            
            if (!d.favourite) {
                d.favourite = false;
            } else {
                this._favourites.push(d);
            }
            
            this._designs.push(d);
            this._latest.push(d);   
        });
        
        this._latest.reverse();         
        
        window.onscroll = e => {
            var top = window.pageYOffset || document.documentElement.scrollTop;
            if (top > 100) {
                this.setState({
                    showTopScroller: true
                });
            } else {
                this.setState({
                    showTopScroller: false
                });
            }     
        };
        
        this.setState({
            mql: mql,
            layout: mql.matches ? LayoutType.Row : LayoutType.Column,
            filter: DesignFilter.Favourite,
            designs: this._favourites,
            showTopScroller: false
        });
    }
    
    componentWillUnmount() {
        this.state.mql.removeListener(() => this.onMediaQueryChanged());
    }   
    
    render() {              
        // If we have no state, return a loading state.
        if (!this.state) {
            return (
                <Landing/>
            );
        }
         
        // Return the correct stateful object.
        return (
            <section className='o-y-hidden c-grayhh-bg'>
                <Menu layout={this.state.layout} filter={this.state.filter} onFilterChanged={ f => this.handleFilterChanged(f) }/>   
                <DesignPane layout={this.state.layout} designs={this.state.designs} onDesignSelected={ d => this.handleDesignSelected(d) }/>      
                <TopScroller shown={this.state.showTopScroller} />
                { this.state.selectedItem 
                    ? <LightBox items={this.state.designs} selectedItem={this.state.selectedItem} onPrevious={() => this.handleOnPrevious()} onNext={() => this.handleOnNext()} cleared={() => { this.setState({ selectedItem: null })} }/>
                    : null
                }
            </section>
        );
    }
    
    private handleFilterChanged(filter: DesignFilter) {          
        var designList: IDesign[];
        switch (filter) {
            case DesignFilter.Animation:
                designList = this._animations;
                break;
            case DesignFilter.Favourite:
                designList = this._favourites;
                break;
            case DesignFilter.Latest:
                designList = this._latest;
                break;
            default:
                designList = this._designs;
                break;
        }
        
        this.setState({
            filter: filter,
            designs: designList
        });
    }
    
    private handleDesignSelected(d: IDesign) {
        this.setState({
            selectedItem: d
        });
    }
    
    private handleOnPrevious() {
        let index = this.state.designs.indexOf(this.state.selectedItem) - 1;     
        this.setState({
            selectedItem: this.state.designs[index]
        });  
    }
    
    private handleOnNext() {
        let index = this.state.designs.indexOf(this.state.selectedItem) + 1;      
        this.setState({
            selectedItem: this.state.designs[index]
        });  
    }
    
    private onMediaQueryChanged() {
        this.setState({ layout: this.state.mql.matches ? LayoutType.Column : LayoutType.Row });
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);