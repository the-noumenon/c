import React = require('react');
import { VelocityComponent } from 'velocity-react';

import { IResponsive, LayoutType } from "./models";

export class MenuFooter extends React.Component<IResponsive, any> {
    render() {
        var footerAnimation = {
            duration: 500,     
            animation: {
                opacity: [1, 0],
                translateY: [0, 25]
            },
            easing: "easeOutExpo",
            delay: 1000,
            runOnMount: true
        };
        
        var layoutClasses = 'o-0 l-row';
        if (this.props.layout === LayoutType.Column) {
            layoutClasses += ' m-horizontal-huge f-j-start m-t-nano m-b-huge';
        } else {
            layoutClasses += ' m-r-huge';
        }
        
        return (
            <VelocityComponent {...footerAnimation}>
                <ul className={layoutClasses}>
                    <li className='m-r-small f f-ai-center'>
                        <p className='m-none'>by ben mccormick</p>
                    </li>
                    <li className='m-r-small'>
                            <a className='b-glyph f f-ai-center' href='http://twitter.com/thenoumenon' target="_Blank">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 15.995 13.004" enable-background="new 0 0 15.995 13.004"><g><path d="M15.995 1.539c-0.589 0.262-1.221 0.438-1.885 0.518 0.678-0.406 1.197-1.049 1.443-1.816 -0.635 0.377-1.338 0.65-2.085 0.797C12.87 0.398 12.016 0 11.073 0 9.259 0 7.79 1.471 7.79 3.283c0 0.258 0.029 0.508 0.085 0.748 -2.728-0.137-5.147-1.443-6.767-3.43C0.827 1.086 0.665 1.65 0.665 2.252c0 1.139 0.758 2.143 1.639 2.732C1.765 4.967 0.995 4.818 0.995 4.572c0 0.016 0 0.029 0 0.043 0 1.59 0.953 2.916 2.454 3.219C3.173 7.908 2.795 7.949 2.495 7.949c-0.212 0-0.461-0.021-0.663-0.061 0.418 1.305 1.608 2.254 3.044 2.281 -1.123 0.879-2.55 1.404-4.087 1.404 -0.266 0-0.532-0.016-0.789-0.045 1.453 0.93 3.175 1.475 5.029 1.475 6.039 0 9.338-5.002 9.338-9.34 0-0.143-0.004-0.285-0.011-0.426C14.999 2.775 15.555 2.197 15.995 1.539z"/></g></svg>
                            </a>
                        </li>
                        <li>
                            <a className='b-glyph f f-ai-center' href='http://dribbble.com/thenoumenon' target="_Blank">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 16 16" enable-background="new 0 0 16 16"><g id="Dribbble_1"><path d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8S12.411 0 8 0zM14 8c0 0.207-0.011 0.412-0.031 0.613C13.019 8.311 12.025 8.15 11 8.15c-0.164 0-0.351 0.025-0.523 0.035 -0.14-0.525-0.32-1.042-0.543-1.547 1.088-0.556 2.072-1.282 2.909-2.167C13.566 5.464 14 6.681 14 8zM11.654 3.252c-0.721 0.775-1.575 1.411-2.523 1.892 -0.729-1.13-1.672-2.119-2.76-2.913C6.891 2.084 7.436 2 8 2 9.376 2 10.642 2.471 11.654 3.252zM4.553 3.097c1.165 0.675 2.174 1.598 2.943 2.699 -1.66 0.468-3.43 0.462-5.066-0.015C2.865 4.693 3.608 3.763 4.553 3.097zM2 8c0-0.191 0.012-0.381 0.029-0.568C2.988 7.705 3.982 7.85 5 7.85c1.145 0 2.266-0.187 3.346-0.537 0.16 0.36 0.296 0.728 0.406 1.104C6.617 8.914 4.729 10.1 3.359 11.798 2.511 10.763 2 9.44 2 8zM4.61 12.946c1.13-1.44 2.708-2.446 4.493-2.869C9.133 10.376 9.15 10.685 9.15 11c0 1.027-0.176 2.02-0.504 2.964C8.435 13.986 8.219 14 8 14 6.742 14 5.576 13.609 4.61 12.946zM10.571 13.413C10.75 12.629 10.85 11.824 10.85 11c0-0.389-0.022-0.768-0.061-1.136C10.856 9.862 10.934 9.85 11 9.85c0.885 0 1.74 0.139 2.555 0.41C12.988 11.646 11.917 12.771 10.571 13.413z"/></g></svg>
                            </a>
                        </li>
                </ul>
            </VelocityComponent>
        );
    }
}