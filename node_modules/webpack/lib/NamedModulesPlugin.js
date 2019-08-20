/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const createHash = require("./util/createHash");
const RequestShortener = require("./RequestShortener");

const getHash = str => {
	const hash = createHash("md4");
	hash.update(str);
	return hash.digest("hex").substr(0, 4);
};

class NamedModulesPlugin {
	constructor(options) {
		this.options = options || {};
	}

	apply(compiler) {
		compiler.hooks.compilation.tap("NamedModulesPlugin", compilation => {
			compilation.hooks.beforeModuleIds.tap("NamedModulesPlugin", modules => {
				const namedModules = new Map();
				const context = this.options.context || compiler.options.context;

				for (const module of modules) {
					if (module.id === null && module.libIdent) {
						module.id = module.libIdent({ context });
					}

					if (module.id !== null) {
						const namedModule = namedModules.get(module.id);
						if (namedModule !== undefined) {
							namedModule.push(module);
						} else {
							namedModules.set(module.id, [module]);
						}
					}
				}

				for (const namedModule of namedModules.values()) {
					if (namedModule.length > 1) {
						for (const module of namedModule) {
							const requestShortener = new RequestShortener(context);
							module.id = `${module.id}?${getHash(
								requestShortener.shorten(module.identifier())
							)}`;
						}
					}
				}
			});
		});
	}
}

module.exports = NamedModulesPlugin;
