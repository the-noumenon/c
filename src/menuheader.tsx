import React = require('react');
import { VelocityComponent } from 'velocity-react';

import { IResponsive, LayoutType } from "./models";

export class MenuHeader extends React.Component<IResponsive, any> {
    render() {
        var headerAnimation = {
            duration: 1000,     
            animation: {
                opacity: [1, 0],
                translateY: [0, -25]
            },
            easing: "easeOutExpo",
            delay: 500,
            runOnMount: true
        };
        
        var headerClasses = 'c-grayl m-l-huge';
        if (this.props.layout === LayoutType.Column) {
            headerClasses += " m-t-huge";
        } else {
            headerClasses += ' header-row';
        }
        
        return (
            <VelocityComponent {...headerAnimation}>
                <div className="o-0">
                    <h1 className={headerClasses}>c<span className='c-turquoise'>.</span></h1>
                    { this.props.layout === LayoutType.Column ? 
                        <p className='c-grayl m-horizontal-huge m-vertical-none'>100 days of experimentation in user interface and experience design inspired by <a href='http://dailyui.co' target="_Blank">dailyui</a></p>
                        : null }
                    { this.props.layout === LayoutType.Column ? 
                        <p className='c-grayl m-horizontal-huge m-vertical-small'>illustrator, after effects, photoshop, <a href='http://unsplash.com' target="_Blank">unsplash</a>, react and velocity were used to make this happen</p>                        
                        : null }    
                </div>
            </VelocityComponent>
        );
    }
}