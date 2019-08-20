/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Template = require("./Template");

/** @typedef {import("./Module")} Module */

module.exports = class RuntimeTemplate {
	constructor(outputOptions, requestShortener) {
		this.outputOptions = outputOptions || {};
		this.requestShortener = requestShortener;
	}

	/**
	 * Add a comment
	 * @param {object} options Information content of the comment
	 * @param {string=} options.request request string used originally
	 * @param {string=} options.chunkName name of the chunk referenced
	 * @param {string=} options.chunkReason reason information of the chunk
	 * @param {string=} options.message additional message
	 * @param {string=} options.exportName name of the export
	 * @returns {string} comment
	 */
	comment({ request, chunkName, chunkReason, message, exportName }) {
		let content;
		if (this.outputOptions.pathinfo) {
			content = [message, request, chunkName, chunkReason]
				.filter(Boolean)
				.map(item => this.requestShortener.shorten(item))
				.join(" | ");
		} else {
			content = [message, chunkName, chunkReason]
				.filter(Boolean)
				.map(item => this.requestShortener.shorten(item))
				.join(" | ");
		}
		if (!content) return "";
		if (this.outputOptions.pathinfo) {
			return Template.toComment(content) + " ";
		} else {
			return Template.toNormalComment(content) + " ";
		}
	}

	throwMissingModuleErrorFunction({ request }) {
		const err = `Cannot find module '${request}'`;
		return `function webpackMissingModule() { var e = new Error(${JSON.stringify(
			err
		)}); e.code = 'MODULE_NOT_FOUND'; throw e; }`;
	}

	missingModule({ request }) {
		return `!(${this.throwMissingModuleErrorFunction({ request })}())`;
	}

	missingModuleStatement({ request }) {
		return `${this.missingModule({ request })};\n`;
	}

	missingModulePromise({ request }) {
		return `Promise.resolve().then(${this.throwMissingModuleErrorFunction({
			request
		})})`;
	}

	moduleId({ module, request }) {
		if (!module) {
			return this.missingModule({
				request
			});
		}
		if (module.id === null) {
			throw new Error(
				`RuntimeTemplate.moduleId(): Module ${module.identifier()} has no id. This should not happen.`
			);
		}
		return `${this.comment({ request })}${JSON.stringify(module.id)}`;
	}

	moduleRaw({ module, request }) {
		if (!module) {
			return this.missingModule({
				request
			});
		}
		return `__webpack_require__(${this.moduleId({ module, request })})`;
	}

	moduleExports({ module, request }) {
		return this.moduleRaw({
			module,
			request
		});
	}

	moduleNamespace({ module, request, strict }) {
		if (!module) {
			return this.missingModule({
				request
			});
		}
		const moduleId = this.moduleId({
			module,
			request
		});
		const exportsType = module.buildMeta && module.buildMeta.exportsType;
		if (exportsType === "namespace") {
			const rawModule = this.moduleRaw({
				module,
				request
			});
			return rawModule;
		} else if (exportsType === "named") {
			return `__webpack_require__.t(${moduleId}, 3)`;
		} else if (strict) {
			return `__webpack_require__.t(${moduleId}, 1)`;
		} else {
			return `__webpack_require__.t(${moduleId}, 7)`;
		}
	}

	moduleNamespacePromise({ block, module, request, message, strict, weak }) {
		if (!module) {
			return this.missingModulePromise({
				request
			});
		}
		if (module.id === null) {
			throw new Error(
				`RuntimeTemplate.moduleNamespacePromise(): Module ${module.identifier()} has no id. This should not happen.`
			);
		}
		const promise = this.blockPromise({
			block,
			message
		});

		let getModuleFunction;
		let idExpr = JSON.stringify(module.id);
		const comment = this.comment({
			request
		});
		let header = "";
		if (weak) {
			if (idExpr.length > 8) {
				// 'var x="nnnnnn";x,"+x+",x' vs '"nnnnnn",nnnnnn,"nnnnnn"'
				header += `var id = ${idExpr}; `;
				idExpr = "id";
			}
			header += `if(!__webpack_require__.m[${idExpr}]) { var e = new Error("Module '" + ${idExpr} + "' is not available (weak dependency)"); e.code = 'MODULE_NOT_FOUND'; throw e; } `;
		}
		const moduleId = this.moduleId({
			module,
			request
		});
		const exportsType = module.buildMeta && module.buildMeta.exportsType;
		if (exportsType === "namespace") {
			if (header) {
				const rawModule = this.moduleRaw({
					module,
					request
				});
				getModuleFunction = `function() { ${header}return ${rawModule}; }`;
			} else {
				getModuleFunction = `__webpack_require__.bind(null, ${comment}${idExpr})`;
			}
		} else if (exportsType === "named") {
			if (header) {
				getModuleFunction = `function() { ${header}return __webpack_require__.t(${moduleId}, 3); }`;
			} else {
				getModuleFunction = `__webpack_require__.t.bind(null, ${comment}${idExpr}, 3)`;
			}
		} else if (strict) {
			if (header) {
				getModuleFunction = `function() { ${header}return __webpack_require__.t(${moduleId}, 1); }`;
			} else {
				getModuleFunction = `__webpack_require__.t.bind(null, ${comment}${idExpr}, 1)`;
			}
		} else {
			if (header) {
				getModuleFunction = `function() { ${header}return __webpack_require__.t(${moduleId}, 7); }`;
			} else {
				getModuleFunction = `__webpack_require__.t.bind(null, ${comment}${idExpr}, 7)`;
			}
		}

		return `${promise || "Promise.resolve()"}.then(${getModuleFunction})`;
	}

	/**
	 *
	 * @param {Object} options options object
	 * @param {boolean=} options.update whether a new variable should be created or the existing one updated
	 * @param {Module} options.module the module
	 * @param {string} options.request the request that should be printed as comment
	 * @param {string} options.importVar name of the import variable
	 * @param {Module} options.originModule module in which the statement is emitted
	 * @returns {string} the import statement
	 */
	importStatement({ update, module, request, importVar, originModule }) {
		if (!module) {
			return this.missingModuleStatement({
				request
			});
		}
		const moduleId = this.moduleId({
			module,
			request
		});
		const optDeclaration = update ? "" : "var ";

		const exportsType = module.buildMeta && module.buildMeta.exportsType;
		let content = `/* harmony import */ ${optDeclaration}${importVar} = __webpack_require__(${moduleId});\n`;

		if (!exportsType && !originModule.buildMeta.strictHarmonyModule) {
			content += `/* harmony import */ ${optDeclaration}${importVar}_default = /*#__PURE__*/__webpack_require__.n(${importVar});\n`;
		}
		if (exportsType === "named") {
			if (Array.isArray(module.buildMeta.providedExports)) {
				content += `${optDeclaration}${importVar}_namespace = /*#__PURE__*/__webpack_require__.t(${moduleId}, 1);\n`;
			} else {
				content += `${optDeclaration}${importVar}_namespace = /*#__PURE__*/__webpack_require__.t(${moduleId});\n`;
			}
		}
		return content;
	}

	exportFromImport({
		module,
		request,
		exportName,
		originModule,
		asiSafe,
		isCall,
		callContext,
		importVar
	}) {
		if (!module) {
			return this.missingModule({
				request
			});
		}
		const exportsType = module.buildMeta && module.buildMeta.exportsType;

		if (!exportsType) {
			if (exportName === "default") {
				if (!originModule.buildMeta.strictHarmonyModule) {
					if (isCall) {
						return `${importVar}_default()`;
					} else if (asiSafe) {
						return `(${importVar}_default())`;
					} else {
						return `${importVar}_default.a`;
					}
				} else {
					return importVar;
				}
			} else if (originModule.buildMeta.strictHarmonyModule) {
				if (exportName) {
					return "/* non-default import from non-esm module */undefined";
				} else {
					return `/*#__PURE__*/__webpack_require__.t(${importVar})`;
				}
			}
		}

		if (exportsType === "named") {
			if (exportName === "default") {
				return importVar;
			} else if (!exportName) {
				return `${importVar}_namespace`;
			}
		}

		if (exportName) {
			const used = module.isUsed(exportName);
			if (!used) {
				const comment = Template.toNormalComment(`unused export ${exportName}`);
				return `${comment} undefined`;
			}
			const comment =
				used !== exportName ? Template.toNormalComment(exportName) + " " : "";
			const access = `${importVar}[${comment}${JSON.stringify(used)}]`;
			if (isCall) {
				if (callContext === false && asiSafe) {
					return `(0,${access})`;
				} else if (callContext === false) {
					return `Object(${access})`;
				}
			}
			return access;
		} else {
			return importVar;
		}
	}

	blockPromise({ block, message }) {
		if (!block || !block.chunkGroup || block.chunkGroup.chunks.length === 0) {
			const comment = this.comment({
				message
			});
			return `Promise.resolve(${comment.trim()})`;
		}
		const chunks = block.chunkGroup.chunks.filter(
			chunk => !chunk.hasRuntime() && chunk.id !== null
		);
		const comment = this.comment({
			message,
			chunkName: block.chunkName,
			chunkReason: block.chunkReason
		});
		if (chunks.length === 1) {
			const chunkId = JSON.stringify(chunks[0].id);
			return `__webpack_require__.e(${comment}${chunkId})`;
		} else if (chunks.length > 0) {
			const requireChunkId = chunk =>
				`__webpack_require__.e(${JSON.stringify(chunk.id)})`;
			return `Promise.all(${comment.trim()}[${chunks
				.map(requireChunkId)
				.join(", ")}])`;
		} else {
			return `Promise.resolve(${comment.trim()})`;
		}
	}

	onError() {
		return "__webpack_require__.oe";
	}

	defineEsModuleFlagStatement({ exportsArgument }) {
		return `__webpack_require__.r(${exportsArgument});\n`;
	}
};
