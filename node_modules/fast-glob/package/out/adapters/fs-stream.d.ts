/// <reference types="node" />
import * as fs from 'fs';
import FileSystem from './fs';
import { FilterFunction } from '@mrmlnc/readdir-enhanced';
import { Entry } from '../types/entries';
import { Pattern } from '../types/patterns';
export default class FileSystemStream extends FileSystem<NodeJS.ReadableStream> {
    /**
     * Use stream API to read entries for Task.
     */
    read(patterns: string[], filter: FilterFunction): NodeJS.ReadableStream;
    /**
     * Return entry for the provided path.
     */
    getEntry(filepath: string, pattern: Pattern): Promise<Entry | null>;
    /**
     * Return fs.Stats for the provided path.
     */
    getStat(filepath: string): Promise<fs.Stats>;
}
