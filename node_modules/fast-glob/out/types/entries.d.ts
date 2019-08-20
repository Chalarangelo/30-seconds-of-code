/// <reference types="node" />
import * as fs from 'fs';
export interface IEntry extends fs.Stats {
    path: string;
    depth: number;
}
export declare type EntryItem = string | IEntry;
export declare type Entry = IEntry;
