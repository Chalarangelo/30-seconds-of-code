/**
 * This file was automatically generated.
 * DO NOT MODIFY BY HAND.
 * Run `yarn special-lint-fix` to update
 */

export type BannerPluginArgument =
	| BannerPluginOptions
	| BannerFunction
	| string;
/**
 * The banner as function, it will be wrapped in a comment
 */
export type BannerFunction = (
	data: {
		hash: string;
		chunk: import("../../lib/Chunk");
		filename: string;
		basename: string;
		query: string;
	}
) => string;
export type Rules = Rule[] | Rule;
export type Rule = RegExp | string;

export interface BannerPluginOptions {
	/**
	 * Specifies the banner
	 */
	banner: BannerFunction | string;
	/**
	 * If true, the banner will only be added to the entry chunks
	 */
	entryOnly?: boolean;
	/**
	 * Exclude all modules matching any of these conditions
	 */
	exclude?: Rules;
	/**
	 * Include all modules matching any of these conditions
	 */
	include?: Rules;
	/**
	 * If true, banner will not be wrapped in a comment
	 */
	raw?: boolean;
	/**
	 * Include all modules that pass test assertion
	 */
	test?: Rules;
}
