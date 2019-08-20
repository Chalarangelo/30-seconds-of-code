import { InputOptions } from '../rollup';
export declare type SerializedTimings = {
    [label: string]: number;
};
export declare function getTimings(): SerializedTimings;
export declare let timeStart: (label: string, level?: number) => void, timeEnd: (label: string, level?: number) => void;
export declare function initialiseTimers(inputOptions: InputOptions): void;
