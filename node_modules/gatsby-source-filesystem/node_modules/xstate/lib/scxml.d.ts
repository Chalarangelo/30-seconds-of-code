import { Machine, EventObject } from './types';
export declare function fromMachine(machine: Machine): string;
export interface ScxmlToMachineOptions {
    evalCond: (expr: string) => // tslint:disable-next-line:ban-types
    ((extState: any, event: EventObject) => boolean) | Function;
    delimiter?: string;
}
export declare function toMachine(xml: string, options: ScxmlToMachineOptions): any;
