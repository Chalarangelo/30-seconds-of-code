import { ForkOptions } from "child_process";

export = Farm;

declare function Farm(name: string): Farm.Workers;
declare function Farm(name: string, exportedMethods: string[]): Farm.Workers;
declare function Farm(options: Farm.FarmOptions, name: string): Farm.Workers;
declare function Farm(
  options: Farm.FarmOptions,
  name: string,
  exportedMethods: string[],
): Farm.Workers;

type WorkerCallback0 = () => void;
type WorkerCallback1 = (arg1: any) => void;
type WorkerCallback2 = (arg1: any, arg2: any) => void;
type WorkerCallback3 = (arg1: any, arg2: any, arg3: any) => void;
type WorkerCallback4 = (arg1: any, arg2: any, arg3: any, arg4: any) => void;

declare namespace Farm {
  export function end(workers: Workers, callback?: Function): void;

  export interface Workers {
    [x: string]: Workers,
    (callback: WorkerCallback): void;
    (arg1: any, callback: WorkerCallback): void;
    (arg1: any, arg2: any, callback: WorkerCallback): void;
    (arg1: any, arg2: any, arg3: any, callback: WorkerCallback): void;
    (
      arg1: any,
      arg2: any,
      arg3: any,
      arg4: any,
      callback: WorkerCallback,
    ): void;
  }

  export interface FarmOptions {
    maxCallsPerWorker?: number;
    maxConcurrentWorkers?: number;
    maxConcurrentCallsPerWorker?: number;
    maxConcurrentCalls?: number;
    maxCallTime?: number;
    maxRetries?: number;
    autoStart?: boolean;
    workerOptions?: ForkOptions;
  }

  export type WorkerCallback =
    | WorkerCallback0
    | WorkerCallback1
    | WorkerCallback2
    | WorkerCallback3
    | WorkerCallback4;
}
