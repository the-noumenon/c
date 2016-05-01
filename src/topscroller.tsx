import React = require('react');
import ReactDOM = require('react-dom');
import { ITopScroller } from "./models";

export class TopScroller extends React.Component<ITopScroller, any> {
    render() {
        var classes = 'fixed b-sq-glyph m-huge';
        if (!this.props.shown) {
            classes += ' o-0 pe-none';
        }
        
        return (
            <div onClick={ e => this.onClick(e) } className={classes} style={{ bottom: 0, right: 0 }}><svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="16" height="9.6" viewBox="0 0 10 6" enable-background="new 0 0 10 6"><path d="M0.15 4.46c-0.2 0.19-0.2 0.5 0 0.68L0.87 5.83c0.2 0.19 0.52 0.19 0.72 0l3.41-3.29L8.42 5.86c0.2 0.19 0.52 0.19 0.72 0l0.72-0.68c0.2-0.19 0.2-0.49 0-0.68l-4.51-4.35c-0.2-0.19-0.52-0.19-0.72 0L0.15 4.46z"/></svg></div>            
        );
    }
    
    private onClick(e: any) {     
        window.scrollTo(0, 0); 
    }
}