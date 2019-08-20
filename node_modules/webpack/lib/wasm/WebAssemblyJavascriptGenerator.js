/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Generator = require("../Generator");
const Template = require("../Template");
const { RawSource } = require("webpack-sources");
const WebAssemblyImportDependency = require("../dependencies/WebAssemblyImportDependency");
const WebAssemblyExportImportedDependency = require("../dependencies/WebAssemblyExportImportedDependency");

/** @typedef {import("../NormalModule")} NormalModule */
/** @typedef {import("../RuntimeTemplate")} RuntimeTemplate */
/** @typedef {import("webpack-sources").Source} Source */
/** @typedef {import("../Dependency").DependencyTemplate} DependencyTemplate */

class WebAssemblyJavascriptGenerator extends Generator {
	/**
	 * @param {NormalModule} module module for which the code should be generated
	 * @param {Map<Function, DependencyTemplate>} dependencyTemplates mapping from dependencies to templates
	 * @param {RuntimeTemplate} runtimeTemplate the runtime template
	 * @param {string} type which kind of code should be generated
	 * @returns {Source} generated code
	 */
	generate(module, dependencyTemplates, runtimeTemplate, type) {
		const initIdentifer = Array.isArray(module.usedExports)
			? Template.numberToIdentifer(module.usedExports.length)
			: "__webpack_init__";

		let needExportsCopy = false;
		const importedModules = new Map();
		const initParams = [];
		let index = 0;
		for (const dep of module.dependencies) {
			const depAsAny = /** @type {any} */ (dep);
			if (dep.module) {
				let importData = importedModules.get(dep.module);
				if (importData === undefined) {
					importedModules.set(
						dep.module,
						(importData = {
							importVar: `m${index}`,
							index,
							request:
								"userRequest" in depAsAny ? depAsAny.userRequest : undefined,
							names: new Set(),
							reexports: []
						})
					);
					index++;
				}
				if (dep instanceof WebAssemblyImportDependency) {
					importData.names.add(dep.name);
					if (dep.description.type === "GlobalType") {
						const exportName = dep.name;
						const usedName = dep.module && dep.module.isUsed(exportName);

						if (dep.module) {
							if (usedName) {
								initParams.push(
									runtimeTemplate.exportFromImport({
										module: dep.module,
										request: dep.request,
										importVar: importData.importVar,
										originModule: module,
										exportName: dep.name,
										asiSafe: true,
										isCall: false,
										callContext: null
									})
								);
							}
						}
					}
				}
				if (dep instanceof WebAssemblyExportImportedDependency) {
					importData.names.add(dep.name);
					const usedName = module.isUsed(dep.exportName);
					if (usedName) {
						const exportProp = `${module.exportsArgument}[${JSON.stringify(
							usedName
						)}]`;
						const defineStatement = Template.asString([
							`${exportProp} = ${runtimeTemplate.exportFromImport({
								module: dep.module,
								request: dep.request,
								importVar: importData.importVar,
								originModule: module,
								exportName: dep.name,
								asiSafe: true,
								isCall: false,
								callContext: null
							})};`,
							`if(WebAssembly.Global) ${exportProp} = ` +
								`new WebAssembly.Global({ value: ${JSON.stringify(
									dep.valueType
								)} }, ${exportProp});`
						]);
						importData.reexports.push(defineStatement);
						needExportsCopy = true;
					}
				}
			}
		}
		const importsCode = Template.asString(
			Array.from(
				importedModules,
				([module, { importVar, request, reexports }]) => {
					const importStatement = runtimeTemplate.importStatement({
						module,
						request,
						importVar,
						originModule: module
					});
					return importStatement + reexports.join("\n");
				}
			)
		);

		// create source
		const source = new RawSource(
			[
				'"use strict";',
				"// Instantiate WebAssembly module",
				"var wasmExports = __webpack_require__.w[module.i];",

				!Array.isArray(module.usedExports)
					? `__webpack_require__.r(${module.exportsArgument});`
					: "",

				// this must be before import for circular dependencies
				"// export exports from WebAssembly module",
				Array.isArray(module.usedExports) && !needExportsCopy
					? `${module.moduleArgument}.exports = wasmExports;`
					: "for(var name in wasmExports) " +
					  `if(name != ${JSON.stringify(initIdentifer)}) ` +
					  `${module.exportsArgument}[name] = wasmExports[name];`,
				"// exec imports from WebAssembly module (for esm order)",
				importsCode,
				"",
				"// exec wasm module",
				`wasmExports[${JSON.stringify(initIdentifer)}](${initParams.join(
					", "
				)})`
			].join("\n")
		);
		return source;
	}
}

module.exports = WebAssemblyJavascriptGenerator;
