import { transformSync } from '@babel/core';
import { INLINE, RUNTIME, EXTERNAL } from './constants.js';
import { addBabelPlugin } from './utils.js';

const MODULE_ERROR =
	'Rollup requires that your Babel configuration keeps ES6 module syntax intact. ' +
	'Unfortunately it looks like your configuration specifies a module transformer ' +
	'to replace ES6 modules with another module format. To continue you have to disable it.' +
	'\n\n' +
	"Most commonly it's a CommonJS transform added by @babel/preset-env - " +
	'in such case you should disable it by adding `modules: false` option to that preset ' +
	'(described in more detail here - https://github.com/rollup/rollup-plugin-babel#modules ).';

const UNEXPECTED_ERROR =
	'An unexpected situation arose. Please raise an issue at ' +
	'https://github.com/rollup/rollup-plugin-babel/issues. Thanks!';

function fallbackClassTransform() {
	return {
		visitor: {
			ClassDeclaration(path, state) {
				path.replaceWith(state.file.addHelper('inherits'));
			},
		},
	};
}

export default function createPreflightCheck() {
	let preflightCheckResults = {};

	return (ctx, options) => {
		const key = options.filename;

		if (preflightCheckResults[key] === undefined) {
			let helpers;

			const inputCode = 'class Foo extends Bar {};\nexport default Foo;';
			const transformed = transformSync(inputCode, options);

			let check = transformed.code;

			if (~check.indexOf('class ')) {
				check = transformSync(inputCode, addBabelPlugin(options, fallbackClassTransform)).code;
			}

			if (
				!~check.indexOf('export default') &&
				!~check.indexOf('export default Foo') &&
				!~check.indexOf('export { Foo as default }')
			) {
				ctx.error(MODULE_ERROR);
			}

			if (check.match(/\/helpers\/(esm\/)?inherits/)) helpers = RUNTIME;
			else if (~check.indexOf('function _inherits')) helpers = INLINE;
			else if (~check.indexOf('babelHelpers')) helpers = EXTERNAL;
			else {
				ctx.error(UNEXPECTED_ERROR);
			}

			preflightCheckResults[key] = helpers;
		}

		return preflightCheckResults[key];
	};
}
