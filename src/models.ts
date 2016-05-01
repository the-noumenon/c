export enum DesignMode {
    Full,
    Grid,
    Minimal
}

export enum LayoutType {
    Row,
    Column
}

export enum DesignFilter {
    Chronological,
    Latest,
    Favourite,
    Animation
}

export interface IResponsive {
    layout: LayoutType;
}

export interface IApp {
}

export interface ILanding {
    onLoadingCompleted: () => void;
}

export interface IDesignPane {
    layout: LayoutType;
    designs: IDesign[];    
    onDesignSelected: (design: IDesign) => void;
}

export interface IDesign {
    id: number;
    label: string;
    alt: boolean;
    mode: DesignMode;
    animation: boolean;
    favourite: boolean;
    onSelected: () => void;
}

export interface IDesignSummary {
    id: number;
    alt: boolean;
    favourite: boolean;
    animation: boolean;
}

export interface IDesignDetail {
    id: number;
    label: string;
}

export interface IMenu {
    layout: LayoutType;
    filter: DesignFilter;
    onFilterChanged: (filter: DesignFilter) => void;
}

export interface IModeGlyph {
    mode: DesignMode;    
    isSelected: boolean;
    onModeChanged: (mode: DesignMode) => void;
}

export interface IFilterGlyph {  
    layout: LayoutType;
    filter: DesignFilter;
    isSelected: boolean;
    onFilterChanged: (mode: DesignFilter) => void;
}

export interface ITopScroller {
    shown: boolean;
}

export interface ILightBox {
    selectedItem: any;
    items: any[];
    cleared: () => void;
    onPrevious: () => void;
    onNext: () => void;
}