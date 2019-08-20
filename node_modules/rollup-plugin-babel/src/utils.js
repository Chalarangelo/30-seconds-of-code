export const addBabelPlugin = (options, plugin) => ({ ...options, plugins: options.plugins.concat(plugin) });

let warned = {};
export function warnOnce(ctx, msg) {
	if (warned[msg]) return;
	warned[msg] = true;
	ctx.warn(msg);
}

const regExpCharactersRegExp = /[\\^$.*+?()[\]{}|]/g;
export const escapeRegExpCharacters = str => str.replace(regExpCharactersRegExp, '\\$&');
