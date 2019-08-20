/// <reference types="node" />
import * as fs from 'fs';
import FileSystem from './fs';
import { FilterFunction } from '@mrmlnc/readdir-enhanced';
import { Entry } from '../types/entries';
import { Pattern } from '../types/patterns';
export default class FileSystemSync extends FileSystem<Entry[]> {
    /**
     * Use sync API to read entries for Task.
     */
    read(patterns: string[], filter: FilterFunction): Entry[];
    /**
     * Return entry for the provided path.
     */
    getEntry(filepath: string, pattern: Pattern): Entry | null;
    /**
     * Return fs.Stats for the provided path.
     */
    getStat(filepath: string): fs.Stats;
}
