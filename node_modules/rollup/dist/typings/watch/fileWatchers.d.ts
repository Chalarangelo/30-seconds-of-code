/// <reference types="node" />
import * as fs from 'fs';
import { WatchOptions, FSWatcher } from 'chokidar';
import { Task } from './index';
export declare function addTask(id: string, task: Task, chokidarOptions: WatchOptions, chokidarOptionsHash: string): void;
export declare function deleteTask(id: string, target: Task, chokidarOptionsHash: string): void;
export default class FileWatcher {
    fileExists: boolean;
    fsWatcher: FSWatcher | fs.FSWatcher;
    tasks: Set<Task>;
    constructor(id: string, chokidarOptions: WatchOptions, dispose: () => void);
    close(): void;
    trigger(): void;
}
