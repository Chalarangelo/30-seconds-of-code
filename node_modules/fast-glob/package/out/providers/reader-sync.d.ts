import * as readdir from '@mrmlnc/readdir-enhanced';
import Reader from './reader';
import FileSystemSync from '../adapters/fs-sync';
import { ITask } from '../managers/tasks';
import { Entry, EntryItem } from '../types/entries';
export default class ReaderSync extends Reader<EntryItem[]> {
    /**
     * Returns FileSystem adapter.
     */
    readonly fsAdapter: FileSystemSync;
    /**
     * Use sync API to read entries for Task.
     */
    read(task: ITask): EntryItem[];
    /**
     * Returns founded paths.
     */
    api(root: string, task: ITask, options: readdir.Options): Entry[];
    /**
     * Api for dynamic tasks.
     */
    dynamicApi(root: string, options: readdir.Options): Entry[];
    /**
     * Api for static tasks.
     */
    staticApi(task: ITask, options: readdir.Options): Entry[];
}
