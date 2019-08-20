// Type definitions for istanbul-reports 1.1
// Project: https://github.com/istanbuljs/istanbuljs, https://istanbul.js.org
// Definitions by: Jason Cheatham <https://github.com/jason0x43>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.4

import { Context, Node, FileWriter, Visitor } from 'istanbul-lib-report';
import { CoverageSummary } from 'istanbul-lib-coverage';

export function create<T extends keyof ReportOptions>(
	name: T,
	options?: Partial<ReportOptions[T]>
): Visitor;

export interface ReportOptions {
	clover: RootedOptions;
	cobertura: RootedOptions;
	html: HtmlOptions;
	json: Options;
	'json-summary': Options;
	lcov: never;
	lcovonly: Options;
	none: RootedOptions;
	teamcity: Options & { blockName: string };
	text: Options & { maxCols: number };
	'text-lcov': Options;
	'text-summary': Options;
}

export type ReportType = keyof ReportOptions;

export interface Options {
	file: string;
}

export interface RootedOptions extends Options {
	projectRoot: string;
}

export interface HtmlOptions {
	verbose: boolean;
	linkMapper: LinkMapper;
	subdir: string;
}

export interface LinkMapper {
	getPath(node: string | Node): string;
	relativePath(source: string | Node, target: string | Node): string;
	assetPath(node: Node, name: string): string;
}
