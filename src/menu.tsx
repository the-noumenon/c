import React = require('react');
import ReactDOM = require('react-dom');

import { VelocityComponent, VelocityTransitionGroup, velocityHelpers } from 'velocity-react';

import { IMenu, DesignFilter, LayoutType } from "./models";
import { MenuHeader } from "./menuheader";
import { MenuFooter } from "./menufooter";
import { FilterGlyph } from "./filterglyph";

export class Menu extends React.Component<IMenu, any> {    
    render() {          
        var filters = [ DesignFilter.Favourite, DesignFilter.Animation, DesignFilter.Chronological, DesignFilter.Latest ];
        var filterItems = filters.map(f => {
            return (
                <FilterGlyph key={f} filter={f} isSelected={f === this.props.filter} layout={this.props.layout} onFilterChanged={ f => this.handleFilterChanged(f) }/>          
            );            
        })
        
        var layoutClasses = 'fixed f c-white-bg f-j-start c-graym';
        if (this.props.layout === LayoutType.Row) {
            layoutClasses += ' menu-row z1 f-ai-center w-100';
        } else {
            layoutClasses += ' menu-col h-100 f-ai-start f-d-column';
        }    
        
        var filterClasses = 'o-0';
        if (this.props.layout === LayoutType.Row) {
            filterClasses += ' l-row';
        } else {
            filterClasses += ' l-col f-j-start f-ai-start m-horizontal-huge';
        }
        
        return (
            <div className={layoutClasses}>                
                <MenuHeader layout={this.props.layout}/>
                <span className='f'/>
                <VelocityComponent animation={{ opacity: [1, 0], translateX: [0, -25]}} easing="easeOutExpo" delay={1250} duration={1000} runOnMount={true}>
                    <ul className={filterClasses}>
                        {filterItems}
                    </ul>
                </VelocityComponent>
                <span className={this.props.layout === LayoutType.Column ? 'f-grow-2' : 'f'}/>    
                <MenuFooter layout={this.props.layout}/>   
            </div>
        )
    }
    
    private handleFilterChanged(filter: DesignFilter) {
        this.props.onFilterChanged(filter);
    }
}