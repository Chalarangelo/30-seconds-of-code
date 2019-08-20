import { RawSourceMap } from 'source-map';
import { OutputOptions, Plugin } from '../rollup/index';
export default function transformBundle(code: string, plugins: Plugin[], sourcemapChain: RawSourceMap[], options: OutputOptions): Promise<string | void>;
