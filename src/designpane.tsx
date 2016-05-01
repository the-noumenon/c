import React = require('react');

import { VelocityTransitionGroup, velocityHelpers } from 'velocity-react';

import { IDesignPane, IDesign, LayoutType, DesignMode } from "./models";
import { Design } from "./design";

export class DesignPane extends React.Component<IDesignPane, any> {      
    render() {
        var animations = {
            // Register these with UI Pack so that we can use stagger later.
            fadeSlideIn: velocityHelpers.registerEffect('fadeSlideIn', {
                calls: [
                    [{
                        opacity: [1, 0]
                    }, 
                    0.25,
                    {
                        easing: 'ease-out',
                        display: 'flex'
                    }]
                ]
            }),

            fadeSlideOut: velocityHelpers.registerEffect('fadeSlideOut', {
                calls: [
                    [{
                        opacity: 0
                    }, 
                    0.25,
                    {
                        easing: 'ease-out',
                        display: 'flex'
                    }]
                ]
            }),
        };
        
        var designItems = this.props.designs.map((d, i, a) => {
            return (
                <Design key={d.id} id={d.id} label={d.label} alt={i % 2 === 0} animation={d.animation} favourite={d.favourite} mode={this.props.layout === LayoutType.Column ? DesignMode.Minimal : DesignMode.Grid} onSelected={ () => this.onDesignSelected(d) }/>
            );
        });
                
        return (
            <div className={this.props.layout === LayoutType.Column ? 'pane-col' : 'pane-row'}>
                <VelocityTransitionGroup component="ul" className="l-row f-w f-j-start" enter={{animation: animations.fadeSlideIn, stagger: 50}} leave={{animation: animations.fadeSlideOut}} runOnMount={true}>
                    {designItems}
                </VelocityTransitionGroup>
            </div>
        );
    }
    
    private onDesignSelected(d: IDesign) {
        this.props.onDesignSelected(d);
    }
}