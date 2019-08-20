import Chunk from '../Chunk';
import { OutputOptions } from '../rollup/index';
export default function getExportMode(chunk: Chunk, {exports: exportMode, name, format}: OutputOptions): "default" | "named" | "none";
