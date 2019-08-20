export const INLINE = {};
export const RUNTIME = {};
export const EXTERNAL = {};

// NOTE: DO NOT REMOVE the null character `\0` as it may be used by other plugins
// e.g. https://github.com/rollup/rollup-plugin-node-resolve/blob/313a3e32f432f9eb18cc4c231cc7aac6df317a51/src/index.js#L74
export const HELPERS = '\0rollupPluginBabelHelpers.js';
