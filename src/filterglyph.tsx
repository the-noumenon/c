import React = require('react');
import ReactDOM = require('react-dom');

import { IFilterGlyph, DesignFilter, LayoutType } from "./models";

export class FilterGlyph extends React.Component<IFilterGlyph, any> {
    render() {     
        var renderGlyph = (mode: DesignFilter) => {            
            switch (this.props.filter) {
                case DesignFilter.Chronological:
                    return (
                        <div className='f f-ai-center'>
                            <svg className='m-r-small w-small h-small' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect width="7" height="7" rx="1" ry="1"/><rect x="9" width="7" height="7" rx="1" ry="1"/><rect x="9" y="9" width="7" height="7" rx="1" ry="1"/><rect y="9" width="7" height="7" rx="1" ry="1"/></svg>
                            { this.props.layout === LayoutType.Column ? <span>chronological</span> : null }
                        </div>
                    );
                case DesignFilter.Latest:
                    return (
                        <div className='f f-ai-center'>
                            <svg className='m-r-small w-small h-small' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.86 14.13"><polygon points="7.43 0 9.18 5.4 14.86 5.4 10.27 8.73 12.02 14.13 7.43 10.79 2.84 14.13 4.59 8.73 0 5.4 5.67 5.4 7.43 0"/></svg>
                            { this.props.layout === LayoutType.Column ? <span>latest</span> : null }
                        </div>
                    );
                case DesignFilter.Animation:
                     return (
                         <div className='f f-ai-center'>
                            <svg className='h-small m-r-small w-small h-small' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.8 16"><rect width="3.2" height="3.2" rx="0.5" ry="0.5" /><rect x="4.8" width="3.2" height="3.2" rx="0.5" ry="0.5" /><rect x="9.6" width="3.2" height="3.2" rx="0.5" ry="0.5" /><rect y="4.8" width="12.8" height="6.4" rx="0.5" ry="0.5" /><rect y="12.8" width="3.2" height="3.2" rx="0.5" ry="0.5" /><rect x="4.8" y="12.8" width="3.2" height="3.2" rx="0.5" ry="0.5" /><rect x="9.6" y="12.8" width="3.2" height="3.2" rx="0.5" ry="0.5" /></svg>
                            { this.props.layout === LayoutType.Column ? <span>animation</span> : null }
                        </div>
                     );                     
            }
            
            return (
                <div className='f f-ai-center'>
                    <svg className="w-small h-small m-r-small" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.67 14.47"><path d="M15.67,4.7A4.68,4.68,0,0,0,7.83,1.22,4.69,4.69,0,0,0,1.37,8h0l6.45,6.44,6.39-6.39A4.68,4.68,0,0,0,15.67,4.7Z"/></svg>
                    { this.props.layout === LayoutType.Column ? <span>favourite</span> : null }
                </div>
            );
        }
        
        var classes = `${this.props.layout === LayoutType.Column ? 'm-b-small' : 'm-r-small'} b-glyph ${this.props.isSelected ? 'toggled' : ''}`;  
        return (
            <li className={classes} onClick={ e => this.handleGlyphClick(e) }>
                {renderGlyph(this.props.filter)}
            </li>   
        )
    }
    
    private handleGlyphClick(event: any) {
        this.props.onFilterChanged(this.props.filter);
    }
}