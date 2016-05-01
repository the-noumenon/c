import React = require('react');
import ReactDOM = require('react-dom');

import { IDesignSummary } from "./models";

export class DesignSummary extends React.Component<IDesignSummary, any> {  
    render() {
        var favourite;
        if (this.props.favourite) {
            favourite = <li className='m-r-small'><svg width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.67 14.47"><path d="M15.67,4.7A4.68,4.68,0,0,0,7.83,1.22,4.69,4.69,0,0,0,1.37,8h0l6.45,6.44,6.39-6.39A4.68,4.68,0,0,0,15.67,4.7Z"/></svg></li>
        }
        
        var animation;
        if (this.props.animation) {
            animation = <li className='m-r-small'><svg height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.8 16"><rect width="3.2" height="3.2" rx="0.5" ry="0.5" /><rect x="4.8" width="3.2" height="3.2" rx="0.5" ry="0.5" /><rect x="9.6" width="3.2" height="3.2" rx="0.5" ry="0.5" /><rect y="4.8" width="12.8" height="6.4" rx="0.5" ry="0.5" /><rect y="12.8" width="3.2" height="3.2" rx="0.5" ry="0.5" /><rect x="4.8" y="12.8" width="3.2" height="3.2" rx="0.5" ry="0.5" /><rect x="9.6" y="12.8" width="3.2" height="3.2" rx="0.5" ry="0.5" /></svg></li>
        }
        
        return (
            <ul className='l-row absolute m-medium c-grayl-f' style={{ right: 0, top: 0 }}>
                {favourite}
                {animation}
                <li className={`c-white br-ra-huge w-huge h-huge f f-j-center f-ai-center ${this.props.alt ? 'c-pomegranate-t-bg' : 'c-light-pomegranate-t-bg'}`}><h4>{this.props.id}</h4></li>
            </ul>
            
        );
    }
}