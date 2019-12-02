import * as wjcChart from 'wijmo/wijmo.chart';
export declare enum Easing {
    Linear = 0,
    Swing = 1,
    EaseInQuad = 2,
    EaseOutQuad = 3,
    EaseInOutQuad = 4,
    EaseInCubic = 5,
    EaseOutCubic = 6,
    EaseInOutCubic = 7,
    EaseInQuart = 8,
    EaseOutQuart = 9,
    EaseInOutQuart = 10,
    EaseInQuint = 11,
    EaseOutQuint = 12,
    EaseInOutQuint = 13,
    EaseInSine = 14,
    EaseOutSine = 15,
    EaseInOutSine = 16,
    EaseInExpo = 17,
    EaseOutExpo = 18,
    EaseInOutExpo = 19,
    EaseInCirc = 20,
    EaseOutCirc = 21,
    EaseInOutCirc = 22,
    EaseInBack = 23,
    EaseOutBack = 24,
    EaseInOutBack = 25,
    EaseInBounce = 26,
    EaseOutBounce = 27,
    EaseInOutBounce = 28,
    EaseInElastic = 29,
    EaseOutElastic = 30,
    EaseInOutElastic = 31,
}
export declare enum AnimationMode {
    All = 0,
    Point = 1,
    Series = 2,
}
export declare class ChartAnimation {
    private _chart;
    private _animation;
    private _cv;
    private _updateEventArgs;
    private _chartType;
    private _play;
    constructor(chart: wjcChart.FlexChartBase, options?: any);
    private _initOptions(options);
    private _setCV(cv);
    animationMode: AnimationMode;
    easing: Easing;
    duration: number;
    axisAnimation: boolean;
    private _playAnimation();
    animate(): void;
}
