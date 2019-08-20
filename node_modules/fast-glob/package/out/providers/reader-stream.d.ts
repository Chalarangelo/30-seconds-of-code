/// <reference types="node" />
import * as readdir from '@mrmlnc/readdir-enhanced';
import Reader from './reader';
import FileSystemStream from '../adapters/fs-stream';
import { ITask } from '../managers/tasks';
export default class ReaderStream extends Reader<NodeJS.ReadableStream> {
    /**
     * Returns FileSystem adapter.
     */
    readonly fsAdapter: FileSystemStream;
    /**
     * Use stream API to read entries for Task.
     */
    read(task: ITask): NodeJS.ReadableStream;
    /**
     * Returns founded paths.
     */
    api(root: string, task: ITask, options: readdir.Options): NodeJS.ReadableStream;
    /**
     * Api for dynamic tasks.
     */
    dynamicApi(root: string, options: readdir.Options): NodeJS.ReadableStream;
    /**
     * Api for static tasks.
     */
    staticApi(task: ITask, options: readdir.Options): NodeJS.ReadableStream;
}
