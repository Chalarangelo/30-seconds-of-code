import Module from '../Module';
import { RawSourceMap } from 'source-map';
import Chunk from '../Chunk';
import { SourceMap, DecodedSourceMap } from 'magic-string';
export default function collapseSourcemaps(bundle: Chunk, file: string, map: DecodedSourceMap, modules: Module[], bundleSourcemapChain: RawSourceMap[]): SourceMap;
