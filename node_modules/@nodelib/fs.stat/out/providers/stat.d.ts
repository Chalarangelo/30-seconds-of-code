/// <reference types="node" />
import * as fs from 'fs';
import { StrictOptions } from '../managers/options';
export declare function sync(path: fs.PathLike, options: StrictOptions): fs.Stats;
export declare type AsyncCallback = (err: NodeJS.ErrnoException | null, stats?: fs.Stats) => void;
export declare function async(path: fs.PathLike, options: StrictOptions, callback: AsyncCallback): void;
/**
 * Returns `true` for followed symlink.
 */
export declare function isFollowedSymlink(stat: fs.Stats, options: StrictOptions): boolean;
//# sourceMappingURL=stat.d.ts.map