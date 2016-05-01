import React = require('react');

import { VelocityComponent } from 'velocity-react';

import { ILanding } from './models';

export class Landing extends React.Component<any, any> {
    componentDidMount() {
        this.setState({
            mounted: true
        });
    }
    
    render() {        
        var animationProps;
        if (this.state && this.state.mounted) {
            animationProps = {
                duration: 500,     
                animation: {
                    opacity: [1, 0],
                    translateX: [0, -25]
                },
                easing: "easeOutExpo"
            };
        } else {
            animationProps = {
                duration: 200,
                animation: {
                    opacity: 0,
                    translateX: [-25,0]
                },
                easing: "easeOutExpo",
                complete: () => {
                    
                }
            };
        }
        
        return (
            <VelocityComponent {...animationProps}>
                <section id="landing" className='w-100 h-100 f f-j-center f-ai-center'>
                    <h1 className='c-white'>c<span className='c-turquoise'>.</span></h1>
                </section>
            </VelocityComponent>
        )
    }
}