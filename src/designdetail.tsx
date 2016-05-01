import React = require('react');
import ReactDOM = require('react-dom');
import { IDesignDetail } from "./models";

export class DesignDetail extends React.Component<IDesignDetail, any> {
    render() {
        return (
            <h4 className='c-white absolute m-r-large m-b-large c-grayhh-t-bg p-t-nano p-b-tiny p-horizontal-small br-ra-medium' style={{right: 0, bottom: 0}}>{this.props.label}</h4>
        )
    }
}