export interface BundleOptions {
  intro?: string;
  separator?: string;
}

export interface SourceMapOptions {
  hires: boolean;
  file: string;
  source: string;
  includeContent: boolean;
}

export interface SourceMap {
  version: string;
  file: string;
  sources: string[];
  sourcesContent: string[];
  names: string[];
  mappings: string;

  toString(): string;
  toUrl(): string;
}

export class Bundle {
  constructor(options?: BundleOptions);
  addSource(source: MagicString | { filename?: string, content: MagicString }): Bundle;
  append(str: string, options?: BundleOptions): Bundle;
  clone(): Bundle;
  generateMap(options?: Partial<SourceMapOptions>): SourceMap;
  getIndentString(): string;
  indent(indentStr?: string): Bundle;
  indentExclusionRanges: ExclusionRange | Array<ExclusionRange>;
  prepend(str: string): Bundle;
  toString(): string;
  trimLines(): Bundle;
  trim(charType?: string): Bundle;
  trimStart(charType?: string): Bundle;
  trimEnd(charType?: string): Bundle;
}

export type ExclusionRange = [ number, number ];

export interface MagicStringOptions {
  filename: string,
  indentExclusionRanges: ExclusionRange | Array<ExclusionRange>;
}

export interface IndentOptions {
  exclude: ExclusionRange | Array<ExclusionRange>;
  indentStart: boolean;
}

export interface OverwriteOptions {
  storeName?: boolean;
  contentOnly?: boolean;
}

export default class MagicString {
  constructor(str: string, options?: MagicStringOptions);
  addSourcemapLocation(char: number): void;
  append(content: string): MagicString;
  appendLeft(index: number, content: string): MagicString;
  appendRight(index: number, content: string): MagicString;
  clone(): MagicString;
  generateMap(options?: Partial<SourceMapOptions>): SourceMap;
  getIndentString(): string;

  indent(options?: IndentOptions): MagicString;
  indent(indentStr?: string, options?: IndentOptions): MagicString;
  indentExclusionRanges: ExclusionRange | Array<ExclusionRange>;

  move(start: number, end: number, index: number): MagicString;
  overwrite(start: number, end: number, content: string, options?: boolean | OverwriteOptions): MagicString;
  prepend(content: string): MagicString;
  prependLeft(index: number, content: string): MagicString;
  prependRight(index: number, content: string): MagicString;
  remove(start: number, end: number): MagicString;
  slice(start: number, end: number): string;
  snip(start: number, end: number): MagicString;

  original: string;
}
