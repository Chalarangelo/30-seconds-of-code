/**
 * This file was automatically generated.
 * DO NOT MODIFY BY HAND.
 * Run `yarn special-lint-fix` to update
 */

export type DllReferencePluginOptions =
	| {
			/**
			 * (absolute path) context of requests in the manifest (or content property)
			 */
			context?: string;
			/**
			 * Extensions used to resolve modules in the dll bundle (only used when using 'scope')
			 */
			extensions?: string[];
			/**
			 * An object containing content and name or a string to the absolute path of the JSON manifest to be loaded upon compilation
			 */
			manifest: DllReferencePluginOptionsManifest | string;
			/**
			 * The name where the dll is exposed (external name, defaults to manifest.name)
			 */
			name?: string;
			/**
			 * Prefix which is used for accessing the content of the dll
			 */
			scope?: string;
			/**
			 * How the dll is exposed (libraryTarget, defaults to manifest.type)
			 */
			sourceType?: DllReferencePluginOptionsSourceType;
			/**
			 * The way how the export of the dll bundle is used
			 */
			type?: "require" | "object";
	  }
	| {
			/**
			 * The mappings from request to module info
			 */
			content: DllReferencePluginOptionsContent;
			/**
			 * (absolute path) context of requests in the manifest (or content property)
			 */
			context?: string;
			/**
			 * Extensions used to resolve modules in the dll bundle (only used when using 'scope')
			 */
			extensions?: string[];
			/**
			 * The name where the dll is exposed (external name)
			 */
			name: string;
			/**
			 * Prefix which is used for accessing the content of the dll
			 */
			scope?: string;
			/**
			 * How the dll is exposed (libraryTarget)
			 */
			sourceType?: DllReferencePluginOptionsSourceType;
			/**
			 * The way how the export of the dll bundle is used
			 */
			type?: "require" | "object";
	  };
/**
 * The type how the dll is exposed (external type)
 */
export type DllReferencePluginOptionsSourceType =
	| "var"
	| "assign"
	| "this"
	| "window"
	| "global"
	| "commonjs"
	| "commonjs2"
	| "commonjs-module"
	| "amd"
	| "amd-require"
	| "umd"
	| "umd2"
	| "jsonp";

/**
 * An object containing content, name and type
 */
export interface DllReferencePluginOptionsManifest {
	/**
	 * The mappings from request to module info
	 */
	content: DllReferencePluginOptionsContent;
	/**
	 * The name where the dll is exposed (external name)
	 */
	name?: string;
	/**
	 * The type how the dll is exposed (external type)
	 */
	type?: DllReferencePluginOptionsSourceType;
}
/**
 * The mappings from request to module info
 */
export interface DllReferencePluginOptionsContent {
	/**
	 * Module info
	 */
	[k: string]: {
		/**
		 * Meta information about the module
		 */
		buildMeta?: {
			[k: string]: any;
		};
		/**
		 * Information about the provided exports of the module
		 */
		exports?: true | string[];
		/**
		 * Module ID
		 */
		id: number | string;
	};
}
