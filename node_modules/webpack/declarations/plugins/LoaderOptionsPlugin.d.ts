/**
 * This file was automatically generated.
 * DO NOT MODIFY BY HAND.
 * Run `yarn special-lint-fix` to update
 */

export interface LoaderOptionsPluginOptions {
	/**
	 * Whether loaders should be in debug mode or not. debug will be removed as of webpack 3
	 */
	debug?: boolean;
	/**
	 * Where loaders can be switched to minimize mode
	 */
	minimize?: boolean;
	/**
	 * A configuration object that can be used to configure older loaders
	 */
	options?: {
		/**
		 * The context that can be used to configure older loaders
		 */
		context?: string;
		[k: string]: any;
	};
	[k: string]: any;
}
