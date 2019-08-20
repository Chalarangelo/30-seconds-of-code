/// <reference types="acorn" />
import { IParse } from 'acorn';
import { RollupError } from './error';
import Graph from '../Graph';
import { RawSourceMap } from 'source-map';
import { Plugin, RollupWarning, SourceDescription } from '../rollup/index';
import Program from '../ast/nodes/Program';
export interface TransformContext {
    parse: IParse;
    warn(warning: RollupWarning, pos?: {
        line: number;
        column: number;
    }): void;
    error(err: RollupError, pos?: {
        line: number;
        column: number;
    }): void;
}
export default function transform(graph: Graph, source: SourceDescription, id: string, plugins: Plugin[]): Promise<{
    code: string;
    originalCode: string;
    originalSourcemap: any;
    ast: Program;
    sourcemapChain: RawSourceMap[];
}>;
