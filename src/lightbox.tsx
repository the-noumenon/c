import React = require('react');

import { VelocityComponent } from 'velocity-react';

import { IDesign, ILightBox } from "./models";

export class LightBox extends React.Component<ILightBox, any> {       
    render() {            
        var index = this.props.items.indexOf(this.props.selectedItem);
        var canPrevious = index > 0;
        var canNext = index < this.props.items.length;
        
        var imageClasses;
        if (this.props.selectedItem.animation) {
            imageClasses = 'img-responsive';
        } else {
            imageClasses = 'w-max-100 h-100';
        }
        
        var animation = {
            duration: 1000,
            animation: {
                opacity: [1, 0]
            },
            easing: "easeOutExpo",
            runOnMount: true
        };
        
        return (            
            <VelocityComponent {...animation}>            
                <section id='lightbox' className='fixed f w-100 h-100 f-ai-center f-j-center o-0' style={{ left:0, top:0 }}>
                    <div className='absolute f w-100 h-100 c-grayhh-t-bg' style={{ left:0, top:0 }} onClick={ e => this.overlayClicked(e) }/>
                    <ul className='z1 l-row c-white-f h-100 pe-none'>
                        <li className={`b-sq-glyph pe-all ${canPrevious ? '' : 'd-none'}`} onClick={ e => this.previousClicked() }><svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="9.6" height="16" viewBox="0 0 6 10" enable-background="new 0 0 6 10"><path d="M4.46 9.85c0.19 0.2 0.5 0.2 0.68 0L5.83 9.13c0.19-0.2 0.19-0.52 0-0.71L2.54 5.01 5.86 1.58c0.19-0.2 0.19-0.52 0-0.72L5.17 0.15C4.99-0.05 4.68-0.05 4.49 0.15l-4.35 4.51c-0.19 0.2-0.19 0.52 0 0.72L4.46 9.85z"/></svg></li>
                        <li className='m-horizontal-small m-vertical-huge c-white-bg br-ra-large p-large h-max-90 pe-all'>
                            <img className={imageClasses} src={this.props.selectedItem.animation ? `images/designs/${this.props.selectedItem.id}.gif` : `images/designs/${this.props.selectedItem.id}.png`} />                     
                        </li>
                        <li className={`b-sq-glyph pe-all ${canNext ? '' : 'd-none'}`} onClick={ e => this.nextClicked() }><svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="9.6" height="16" viewBox="0 0 6 10" enable-background="new 0 0 6 10"><path d="M1.54 0.15c-0.19-0.2-0.5-0.2-0.68 0L0.17 0.87c-0.19 0.2-0.19 0.52 0 0.72l3.3 3.41L0.14 8.42c-0.19 0.2-0.19 0.52 0 0.72l0.68 0.72c0.19 0.2 0.49 0.2 0.68 0l4.35-4.51c0.19-0.2 0.19-0.52 0-0.72L1.54 0.15z"/></svg></li>
                    </ul>
                </section>      
            </VelocityComponent>
        );
    }
    
    private overlayClicked(e: any) {
        this.props.cleared();
    }
    
    private previousClicked() {    
        this.props.onPrevious();
    }
    private nextClicked() {     
        this.props.onNext();
    }
}