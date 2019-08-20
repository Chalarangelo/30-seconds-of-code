/// <reference types="node" />
import * as readdir from '@mrmlnc/readdir-enhanced';
import Reader from './reader';
import FileSystemStream from '../adapters/fs-stream';
import { ITask } from '../managers/tasks';
import { EntryItem } from '../types/entries';
export default class ReaderAsync extends Reader<Promise<EntryItem[]>> {
    /**
     * Returns FileSystem adapter.
     */
    readonly fsAdapter: FileSystemStream;
    /**
     * Use async API to read entries for Task.
     */
    read(task: ITask): Promise<EntryItem[]>;
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
