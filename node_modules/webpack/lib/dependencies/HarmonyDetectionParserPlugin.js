/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const HarmonyCompatibilityDependency = require("./HarmonyCompatibilityDependency");
const HarmonyInitDependency = require("./HarmonyInitDependency");

module.exports = class HarmonyDetectionParserPlugin {
	apply(parser) {
		parser.hooks.program.tap("HarmonyDetectionParserPlugin", ast => {
			const isStrictHarmony = parser.state.module.type === "javascript/esm";
			const isHarmony =
				isStrictHarmony ||
				ast.body.some(
					statement =>
						statement.type === "ImportDeclaration" ||
						statement.type === "ExportDefaultDeclaration" ||
						statement.type === "ExportNamedDeclaration" ||
						statement.type === "ExportAllDeclaration"
				);
			if (isHarmony) {
				const module = parser.state.module;
				const compatDep = new HarmonyCompatibilityDependency(module);
				compatDep.loc = {
					start: {
						line: -1,
						column: 0
					},
					end: {
						line: -1,
						column: 0
					},
					index: -3
				};
				module.addDependency(compatDep);
				const initDep = new HarmonyInitDependency(module);
				initDep.loc = {
					start: {
						line: -1,
						column: 0
					},
					end: {
						line: -1,
						column: 0
					},
					index: -2
				};
				module.addDependency(initDep);
				parser.state.harmonyParserScope = parser.state.harmonyParserScope || {};
				parser.scope.isStrict = true;
				module.buildMeta.exportsType = "namespace";
				module.buildInfo.strict = true;
				module.buildInfo.exportsArgument = "__webpack_exports__";
				if (isStrictHarmony) {
					module.buildMeta.strictHarmonyModule = true;
					module.buildInfo.moduleArgument = "__webpack_module__";
				}
			}
		});

		const skipInHarmony = () => {
			const module = parser.state.module;
			if (module && module.buildMeta && module.buildMeta.exportsType) {
				return true;
			}
		};

		const nullInHarmony = () => {
			const module = parser.state.module;
			if (module && module.buildMeta && module.buildMeta.exportsType) {
				return null;
			}
		};

		const nonHarmonyIdentifiers = ["define", "exports"];
		for (const identifer of nonHarmonyIdentifiers) {
			parser.hooks.evaluateTypeof
				.for(identifer)
				.tap("HarmonyDetectionParserPlugin", nullInHarmony);
			parser.hooks.typeof
				.for(identifer)
				.tap("HarmonyDetectionParserPlugin", skipInHarmony);
			parser.hooks.evaluate
				.for(identifer)
				.tap("HarmonyDetectionParserPlugin", nullInHarmony);
			parser.hooks.expression
				.for(identifer)
				.tap("HarmonyDetectionParserPlugin", skipInHarmony);
			parser.hooks.call
				.for(identifer)
				.tap("HarmonyDetectionParserPlugin", skipInHarmony);
		}
	}
};
