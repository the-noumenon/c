declare namespace __VelocityReact {   
    interface VelocityComponentProps {
        animation?: any;
        runOnMount?: boolean;
        targetQuerySelector?: string;
        duration?: number;
        delay?: number;
        loop?: number;
        easing?: string | number[];
    } 
    
    type VelocityComponent = __React.ComponentClass<VelocityComponentProps>;
    var VelocityComponent: VelocityComponent;
        
    interface VelocityTransitionGroupProps extends __React.TransitionGroupProps {
        enter?: any;
        leave?: any;
        runOnMount?: boolean;
    }
    
    type VelocityTransitionGroup = __React.ComponentClass<VelocityTransitionGroupProps>;    
    var VelocityTransitionGroup: VelocityTransitionGroup;
    
    interface velocityHelpers {
        registerEffect: (suffix: any, animation: any) => string
    }    
    
    type VelocityHelpers = velocityHelpers;
    var velocityHelpers: VelocityHelpers;
}

declare module "velocity-react" {
    export = __VelocityReact;
}