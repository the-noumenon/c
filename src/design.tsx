import React = require('react');
import ReactDOM = require('react-dom');
import { VelocityComponent } from 'velocity-react';

import { IDesignPane, DesignMode, IDesign } from "./models";
import { DesignDetail } from "./designdetail";
import { DesignSummary } from "./designsummary";

export class Design extends React.Component<IDesign, any> {    
    render() {
        var classes = 'f-none f-j-center f-al-center h-50 cur-pointer';
        switch (this.props.mode) {
            case DesignMode.Full:
                classes += ' col1';
            break;
            case DesignMode.Grid:
                classes += ' col2';
            break;
            case DesignMode.Minimal:
                classes += ' col3';
            break;
        }
        
        var detailAnimationProps;
        var imageClasses = 'designitem f img-cover w-100 h-100';
        if (this.state && this.state.hovering) {
            detailAnimationProps = {
                duration: 300,
                animation: {
                    opacity: 1,
                    translateX: [0,-25]
                },
                easing: "easeOutExpo"
            };
        } else {
            detailAnimationProps = {
                duration: 500,
                animation: {
                    opacity: 0,
                    translateX: [-25,0]
                },
                easing: "easeOutExpo"
            };
            
            imageClasses += ' o-40';
        }
           
        return (  
            <li className={classes} onMouseEnter={e => this.onMouseEnter()} onMouseLeave={e => this.onMouseLeave()} onClick={ e => this.onClick() }>
                <div className='relative w-100 h100'>
                    <img src={this.props.animation ? `images/designs/${this.props.id}.gif` : `images/designs/${this.props.id}.jpg`} className={imageClasses}/>
                    <DesignSummary animation={this.props.animation} favourite={this.props.favourite} id={this.props.id} alt={this.props.alt}/>
                    <VelocityComponent {...detailAnimationProps}>
                        <DesignDetail id={this.props.id} label={this.props.label}/>                             
                    </VelocityComponent>
                </div>
            </li>
        );
    }
    
    private onClick() {
        this.props.onSelected();
    }
    
    private onMouseEnter() {
        this.setState({ hovering: true });
    }
    
    private onMouseLeave() {
        this.setState({ hovering: false });
    }
}