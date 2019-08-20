import { EventEmitter } from 'events';
import * as ESTree from 'estree';

export const VERSION: string;

export interface IdMap {
	[key: string]: string;
}

export interface RollupError {
	message: string;
	code?: string;
	name?: string;
	url?: string;
	id?: string;
	loc?: {
		file?: string;
		line: number;
		column: number;
	};
	stack?: string;
	frame?: string;
	pos?: number;
	plugin?: string;
	pluginCode?: string;
}

export interface RawSourceMap {
	version: string;
	sources: string[];
	names: string[];
	sourceRoot?: string;
	sourcesContent?: string[];
	mappings: string;
	file: string;
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

export interface SourceDescription {
	code: string;
	map?: RawSourceMap;
	ast?: ESTree.Program;
}

export interface ModuleJSON {
	id: string;
	dependencies: string[];
	code: string;
	originalCode: string;
	originalSourcemap: RawSourceMap | void;
	ast: ESTree.Program;
	sourcemapChain: RawSourceMap[];
	resolvedIds: IdMap;
}

export type ResolveIdHook = (
	id: string,
	parent: string
) => Promise<string | boolean | void> | string | boolean | void;

export interface TransformContext {
	parse: (input: string, options: any) => ESTree.Program;
	warn(warning: RollupWarning, pos?: { line: number; column: number }): void;
	error(err: RollupError, pos?: { line: number; column: number }): void;
}

export type MissingExportHook = (
	exportName: string,
	importingModule: string,
	importedModule: string,
	importerStart?: number
) => void;
export type IsExternalHook = (
	id: string,
	parentId: string,
	isResolved: boolean
) => Promise<boolean | void> | boolean | void;
export type LoadHook = (
	id: string
) => Promise<SourceDescription | string | void> | SourceDescription | string | void;
export type TransformHook = (
	this: TransformContext,
	code: string,
	id: String
) => Promise<SourceDescription | string | void>;
export type TransformBundleHook = (
	code: string,
	options: OutputOptions
) => Promise<SourceDescription | string>;
export type ResolveDynamicImportHook = (
	specifier: string | ESTree.Node,
	parentId: string
) => Promise<string | void> | string | void;

export interface Plugin {
	name: string;
	options?: (options: InputOptions) => void;
	load?: LoadHook;
	resolveId?: ResolveIdHook;
	missingExport?: MissingExportHook;
	transform?: TransformHook;
	transformBundle?: TransformBundleHook;
	ongenerate?: (options: OutputOptions, source: SourceDescription) => void;
	onwrite?: (options: OutputOptions, source: SourceDescription) => void;
	resolveDynamicImport?: ResolveDynamicImportHook;

	banner?: () => string;
	footer?: () => string;
	intro?: () => string;
	outro?: () => string;
}

export interface TreeshakingOptions {
	propertyReadSideEffects: boolean;
	pureExternalModules: boolean;
}

export type ExternalOption = string[] | IsExternalHook;
export type GlobalsOption = { [name: string]: string } | ((name: string) => string);

export interface InputOptions {
	input: string | string[] | { [entryAlias: string]: string };
	manualChunks?: { [chunkAlias: string]: string[] };
	external?: ExternalOption;
	plugins?: Plugin[];

	onwarn?: WarningHandler;
	cache?: {
		modules: ModuleJSON[];
	};

	acorn?: {};
	acornInjectPlugins?: Function[];
	treeshake?: boolean | TreeshakingOptions;
	context?: string;
	moduleContext?: string | ((id: string) => string) | { [id: string]: string };
	watch?: WatcherOptions;
	experimentalDynamicImport?: boolean;
	experimentalCodeSplitting?: boolean;
	preserveSymlinks?: boolean;
	experimentalPreserveModules?: boolean;
	optimizeChunks?: boolean;
	chunkGroupingSize?: number;

	// undocumented?
	pureExternalModules?: boolean;
	preferConst?: boolean;
	perf?: boolean;

	/** @deprecated */
	entry?: string;
	transform?: TransformHook;
	load?: LoadHook;
	resolveId?: ResolveIdHook;
	resolveExternal?: any;
}

export type ModuleFormat = 'amd' | 'cjs' | 'system' | 'es' | 'es6' | 'iife' | 'umd';

export type OptionsPaths = Record<string, string> | ((id: string) => string);

export interface OutputOptions {
	// only required for bundle.write
	file?: string;
	// only required for bundles.write
	dir?: string;
	// this is optional at the base-level of RollupWatchOptions,
	// which extends from this interface through config merge
	format?: ModuleFormat;
	name?: string;
	globals?: GlobalsOption;
	chunkNames?: string;
	entryNames?: string;

	paths?: OptionsPaths;
	banner?: string;
	footer?: string;
	intro?: string;
	outro?: string;
	sourcemap?: boolean | 'inline';
	sourcemapFile?: string;
	interop?: boolean;
	extend?: boolean;

	exports?: 'default' | 'named' | 'none' | 'auto';
	amd?: {
		id?: string;
		define?: string;
	};
	indent?: boolean;
	strict?: boolean;
	freeze?: boolean;
	namespaceToStringTag?: boolean;
	legacy?: boolean;

	// undocumented?
	noConflict?: boolean;

	// deprecated
	dest?: string;
	moduleId?: string;
}

export interface OutputOptionsFile extends OutputOptions {
	file?: string;
}

export interface OutputOptionsDir extends OutputOptions {
	// only required for bundles.write
	dir?: string;
}

export interface RollupWarning {
	message?: string;
	code?: string;
	loc?: {
		file: string;
		line: number;
		column: number;
	};
	deprecations?: { old: string; new: string }[];
	modules?: string[];
	names?: string[];
	source?: string;
	importer?: string;
	frame?: any;
	missing?: string;
	exporter?: string;
	name?: string;
	sources?: string[];
	reexporter?: string;
	guess?: string;
	url?: string;
	id?: string;
	plugin?: string;
	pos?: number;
	pluginCode?: string;
}

export type WarningHandler = (warning: string | RollupWarning) => void;

export type SerializedTimings = { [label: string]: number };

export interface OutputChunk {
	imports: string[];
	exports: string[];
	modules: string[];
	code: string;
	map?: SourceMap;
}

export interface RollupCache {
	modules: ModuleJSON[];
}

export interface Bundle {
	// TODO: consider deprecating to match code splitting
	imports: string[];
	exports: string[];
	modules: ModuleJSON[];
	cache: RollupCache;

	generate: (outputOptions: OutputOptions) => Promise<OutputChunk>;
	write: (options: OutputOptions) => Promise<OutputChunk>;
	getTimings?: () => SerializedTimings;
}

export interface BundleSet {
	cache: {
		modules: ModuleJSON[];
	};
	generate: (outputOptions: OutputOptions) => Promise<{ [chunkName: string]: OutputChunk }>;
	write: (options: OutputOptions) => Promise<{ [chunkName: string]: OutputChunk }>;
	getTimings?: () => SerializedTimings;
}

export interface RollupFileOptions extends InputOptions {
	cache?: RollupCache;
	input: string;
	output?: OutputOptionsFile;
}

export interface RollupDirOptions extends InputOptions {
	cache?: RollupCache;
	input: string[] | { [entryName: string]: string };
	output?: OutputOptionsDir;
}

export function rollup(options: RollupFileOptions): Promise<Bundle>;
export function rollup(options: RollupDirOptions): Promise<BundleSet>;

export interface Watcher extends EventEmitter {}

// chokidar watch options
export interface WatchOptions {
	persistent?: boolean;
	ignored?: any;
	ignoreInitial?: boolean;
	followSymlinks?: boolean;
	cwd?: string;
	disableGlobbing?: boolean;
	usePolling?: boolean;
	useFsEvents?: boolean;
	alwaysStat?: boolean;
	depth?: number;
	interval?: number;
	binaryInterval?: number;
	ignorePermissionErrors?: boolean;
	atomic?: boolean | number;
	awaitWriteFinish?:
		| {
				stabilityThreshold?: number;
				pollInterval?: number;
		  }
		| boolean;
}

export interface WatcherOptions {
	chokidar?: boolean | WatchOptions;
	include?: string[];
	exclude?: string[];
	clearScreen?: boolean;
}

export interface RollupWatchOptions extends InputOptions {
	output?: OutputOptions;
	watch?: WatcherOptions;
}

export function watch(configs: RollupWatchOptions[]): Watcher;
