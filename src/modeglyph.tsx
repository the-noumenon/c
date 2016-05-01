import React = require('react');
import ReactDOM = require('react-dom');

import { IModeGlyph, DesignMode } from "./models";

export class ModeGlyph extends React.Component<IModeGlyph, any> {
    render() {     
        var renderGlyph = (mode: DesignMode) => {
            switch (this.props.mode) {
                case DesignMode.Grid:
                    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect width="7" height="7" rx="1" ry="1"/><rect x="9" width="7" height="7" rx="1" ry="1"/><rect x="9" y="9" width="7" height="7" rx="1" ry="1"/><rect y="9" width="7" height="7" rx="1" ry="1"/></svg>
                case DesignMode.Minimal:
                    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 8 8"><rect width="8" height="8" rx="1" ry="1"/></svg>;
            }
            
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect y="9" width="16" height="7" rx="1" ry="1"/><rect width="16" height="7" rx="1" ry="1"/></svg>;
        }
        
        var classes = `m-r-small b-glyph ${this.props.isSelected ? 'toggled' : ''}`;  
        return (
            <li className={classes} onClick={ e => this.handleGlyphClick(e) }>
                {renderGlyph(this.props.mode)}
            </li>   
        )
    }
    
    private handleGlyphClick(event: any) {
        this.props.onModeChanged(this.props.mode);
    }
}