/// <reference types="node" />
import * as fs from 'fs';
import { FilterFunction } from '@mrmlnc/readdir-enhanced';
import { IOptions } from '../managers/options';
import { Entry } from '../types/entries';
import { Pattern } from '../types/patterns';
export default abstract class FileSystem<T> {
    private readonly options;
    constructor(options: IOptions);
    /**
     * The main logic of reading the entries that must be implemented by each adapter.
     */
    abstract read(filepaths: string[], filter: FilterFunction): T;
    /**
     * Return full path to entry.
     */
    getFullEntryPath(filepath: string): string;
    /**
     * Return an implementation of the Entry interface.
     */
    makeEntry(stat: fs.Stats, pattern: Pattern): Entry;
}
