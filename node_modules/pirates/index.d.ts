/* (c) 2015 Ari Porad (@ariporad) <http://ariporad.com>. License: ariporad.mit-license.org */

declare type Hook = (code: string, filename: string) => string;
declare type Matcher = (code: string) => boolean;
declare type RevertFunction = () => void;
interface Options {
  /** A matcher function, will be called with path to a file. Should return truthy if the file should be hooked, falsy otherwise. */
  matcher?: Matcher;
  /**
   * The extensions to hook. Should start with '.' (ex. ['.js']).
   *
   * @default ['.js']
   */
  exts?: Array<string>;
  /**
   * Auto-ignore node_modules. Independent of any matcher.
   *
   * @default true
   */
  ignoreNodeModules?: boolean;
}
/**
 * Add a require hook.
 *
 * @param {Hook} hook - The hook. Accepts the code of the module and the filename. Required.
 * @param {Options} [opts] - Options
 * @returns {RevertFunction} revert - Reverts the hooks.
 */
export declare function addHook(hook: Hook, opts?: Options): RevertFunction;
export {};
