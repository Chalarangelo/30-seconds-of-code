import * as babel from '@babel/core';
import { transformSync, buildExternalHelpers, loadPartialConfig, DEFAULT_EXTENSIONS } from '@babel/core';
import { createFilter } from 'rollup-pluginutils';
import { addNamed } from '@babel/helper-module-imports';

var INLINE = {};
var RUNTIME = {};
var EXTERNAL = {};

// NOTE: DO NOT REMOVE the null character `\0` as it may be used by other plugins
// e.g. https://github.com/rollup/rollup-plugin-node-resolve/blob/313a3e32f432f9eb18cc4c231cc7aac6df317a51/src/index.js#L74
var HELPERS = '\0rollupPluginBabelHelpers.js';

var addBabelPlugin = function (options, plugin) { return (Object.assign({}, options, {plugins: options.plugins.concat(plugin)})); };

var warned = {};
function warnOnce(ctx, msg) {
	if (warned[msg]) { return; }
	warned[msg] = true;
	ctx.warn(msg);
}

var regExpCharactersRegExp = /[\\^$.*+?()[\]{}|]/g;
var escapeRegExpCharacters = function (str) { return str.replace(regExpCharactersRegExp, '\\$&'); };

var MODULE_ERROR =
	'Rollup requires that your Babel configuration keeps ES6 module syntax intact. ' +
	'Unfortunately it looks like your configuration specifies a module transformer ' +
	'to replace ES6 modules with another module format. To continue you have to disable it.' +
	'\n\n' +
	"Most commonly it's a CommonJS transform added by @babel/preset-env - " +
	'in such case you should disable it by adding `modules: false` option to that preset ' +
	'(described in more detail here - https://github.com/rollup/rollup-plugin-babel#modules ).';

var UNEXPECTED_ERROR =
	'An unexpected situation arose. Please raise an issue at ' +
	'https://github.com/rollup/rollup-plugin-babel/issues. Thanks!';

function fallbackClassTransform() {
	return {
		visitor: {
			ClassDeclaration: function ClassDeclaration(path, state) {
				path.replaceWith(state.file.addHelper('inherits'));
			},
		},
	};
}

function createPreflightCheck() {
	var preflightCheckResults = {};

	return function (ctx, options) {
		var key = options.filename;

		if (preflightCheckResults[key] === undefined) {
			var helpers;

			var inputCode = 'class Foo extends Bar {};\nexport default Foo;';
			var transformed = transformSync(inputCode, options);

			var check = transformed.code;

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

			if (check.match(/\/helpers\/(esm\/)?inherits/)) { helpers = RUNTIME; }
			else if (~check.indexOf('function _inherits')) { helpers = INLINE; }
			else if (~check.indexOf('babelHelpers')) { helpers = EXTERNAL; }
			else {
				ctx.error(UNEXPECTED_ERROR);
			}

			preflightCheckResults[key] = helpers;
		}

		return preflightCheckResults[key];
	};
}

function importHelperPlugin() {
	return {
		pre: function pre(file) {
			var cachedHelpers = {};
			file.set('helperGenerator', function (name) {
				if (!file.availableHelper(name)) {
					return;
				}

				if (cachedHelpers[name]) {
					return cachedHelpers[name];
				}

				return (cachedHelpers[name] = addNamed(file.path, name, HELPERS));
			});
		},
	};
}

function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

var unpackOptions = function (ref) {
	if ( ref === void 0 ) ref = {};
	var extensions = ref.extensions; if ( extensions === void 0 ) extensions = DEFAULT_EXTENSIONS;
	var sourcemap = ref.sourcemap; if ( sourcemap === void 0 ) sourcemap = true;
	var sourcemaps = ref.sourcemaps; if ( sourcemaps === void 0 ) sourcemaps = true;
	var sourceMap = ref.sourceMap; if ( sourceMap === void 0 ) sourceMap = true;
	var sourceMaps = ref.sourceMaps; if ( sourceMaps === void 0 ) sourceMaps = true;
	var rest$1 = objectWithoutProperties( ref, ["extensions", "sourcemap", "sourcemaps", "sourceMap", "sourceMaps"] );
	var rest = rest$1;

	return (Object.assign({}, {extensions: extensions,
	plugins: [],
	sourceMaps: sourcemap && sourcemaps && sourceMap && sourceMaps},
	rest,
	{caller: Object.assign({}, {name: 'rollup-plugin-babel',
		supportsStaticESM: true,
		supportsDynamicImport: true},
		rest.caller)}));
};

var returnObject = function () { return ({}); };

function createBabelPluginFactory(customCallback) {
	if ( customCallback === void 0 ) customCallback = returnObject;

	var overrides = customCallback(babel);

	return function (pluginOptions) {
		var assign;

		var customOptions = null;

		if (overrides.options) {
			var overridden = overrides.options(pluginOptions);

			if (typeof overridden.then === 'function') {
				throw new Error(
					".options hook can't be asynchronous. It should return `{ customOptions, pluginsOptions }` synchronously."
				);
			}
			((assign = overridden, customOptions = assign.customOptions, customOptions = customOptions === void 0 ? null : customOptions, pluginOptions = assign.pluginOptions));
		}

		var ref = unpackOptions(pluginOptions);
		var exclude = ref.exclude;
		var extensions = ref.extensions;
		var externalHelpers = ref.externalHelpers;
		var externalHelpersWhitelist = ref.externalHelpersWhitelist;
		var include = ref.include;
		var runtimeHelpers = ref.runtimeHelpers;
		var rest = objectWithoutProperties( ref, ["exclude", "extensions", "externalHelpers", "externalHelpersWhitelist", "include", "runtimeHelpers"] );
		var babelOptions = rest;

		var extensionRegExp = new RegExp(("(" + (extensions.map(escapeRegExpCharacters).join('|')) + ")$"));
		var includeExcludeFilter = createFilter(include, exclude);
		var filter = function (id) { return extensionRegExp.test(id) && includeExcludeFilter(id); };
		var preflightCheck = createPreflightCheck();

		return {
			name: 'babel',
			resolveId: function resolveId(id) {
				if (id === HELPERS) { return id; }
			},
			load: function load(id) {
				if (id !== HELPERS) {
					return;
				}

				return buildExternalHelpers(externalHelpersWhitelist, 'module');
			},
			transform: function transform(code, filename) {
				var this$1 = this;

				if (!filter(filename)) { return Promise.resolve(null); }
				if (filename === HELPERS) { return Promise.resolve(null); }

				var config = loadPartialConfig(Object.assign({}, babelOptions, {filename: filename}));

				// file is ignored
				if (!config) {
					return Promise.resolve(null);
				}

				return Promise.resolve(
					!overrides.config
						? config.options
						: overrides.config.call(this, config, {
								code: code,
								customOptions: customOptions,
						  })
				).then(function (transformOptions) {
					var helpers = preflightCheck(this$1, transformOptions);

					if (helpers === EXTERNAL && !externalHelpers) {
						warnOnce(
							this$1,
							'Using "external-helpers" plugin with rollup-plugin-babel is deprecated, as it now automatically deduplicates your Babel helpers.'
						);
					} else if (helpers === RUNTIME && !runtimeHelpers) {
						this$1.error(
							'Runtime helpers are not enabled. Either exclude the transform-runtime Babel plugin or pass the `runtimeHelpers: true` option. See https://github.com/rollup/rollup-plugin-babel#configuring-babel for more information'
						);
					}

					if (helpers !== RUNTIME && !externalHelpers) {
						transformOptions = addBabelPlugin(transformOptions, importHelperPlugin);
					}

					var result = transformSync(code, transformOptions);

					return Promise.resolve(
						!overrides.result
							? result
							: overrides.result.call(this$1, result, {
									code: code,
									customOptions: customOptions,
									config: config,
									transformOptions: transformOptions,
							  })
					).then(function (ref) {
						var code = ref.code;
						var map = ref.map;

						return ({ code: code, map: map });
					});
				});
			},
		};
	};
}

var babelPluginFactory = createBabelPluginFactory();
babelPluginFactory.custom = createBabelPluginFactory;

export default babelPluginFactory;
//# sourceMappingURL=rollup-plugin-babel.esm.js.map
