/**
 * This file was automatically generated.
 * DO NOT MODIFY BY HAND.
 * Run `yarn special-lint-fix` to update
 */

export interface DllPluginOptions {
	/**
	 * Context of requests in the manifest file (defaults to the webpack context)
	 */
	context?: string;
	/**
	 * If true, only entry points will be exposed
	 */
	entryOnly?: boolean;
	/**
	 * If true, manifest json file (output) will be formatted
	 */
	format?: boolean;
	/**
	 * Name of the exposed dll function (external name, use value of 'output.library')
	 */
	name?: string;
	/**
	 * Absolute path to the manifest json file (output)
	 */
	path: string;
	/**
	 * Type of the dll bundle (external type, use value of 'output.libraryTarget')
	 */
	type?: string;
}
