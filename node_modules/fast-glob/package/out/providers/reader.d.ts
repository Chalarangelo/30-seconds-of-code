/// <reference types="node" />
import micromatch = require('micromatch');
import DeepFilter from './filters/deep';
import EntryFilter from './filters/entry';
import { IOptions } from '../managers/options';
import { ITask } from '../managers/tasks';
import { Options as IReaddirOptions } from '@mrmlnc/readdir-enhanced';
import { Entry, EntryItem } from '../types/entries';
export default abstract class Reader<T> {
    readonly options: IOptions;
    readonly entryFilter: EntryFilter;
    readonly deepFilter: DeepFilter;
    private readonly micromatchOptions;
    constructor(options: IOptions);
    /**
     * The main logic of reading the directories that must be implemented by each providers.
     */
    abstract read(_task: ITask): T;
    /**
     * Returns root path to scanner.
     */
    getRootDirectory(task: ITask): string;
    /**
     * Returns options for reader.
     */
    getReaderOptions(task: ITask): IReaddirOptions;
    /**
     * Returns options for micromatch.
     */
    getMicromatchOptions(): micromatch.Options;
    /**
     * Returns transformed entry.
     */
    transform(entry: Entry): EntryItem;
    /**
     * Returns true if error has ENOENT code.
     */
    isEnoentCodeError(err: NodeJS.ErrnoException): boolean;
}
