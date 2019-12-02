/// <reference types="react" />
import * as React from 'react';
export declare class ComponentBase extends React.Component<any, any> {
    private _objPropHash;
    controlType: any;
    props: any;
    constructor(props: any, controlType: any, meta?: any);
    render(): React.DOMElement<{}, Element>;
    componentDidMount(): any;
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: any): boolean;
    private _getControl(component);
    private _copy(dst, src);
    private _sameValue(v1, v2);
    private _isEvent(ctrl, propName);
}
