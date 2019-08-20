/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const NullDependency = require("./NullDependency");

class HarmonyInitDependency extends NullDependency {
	constructor(originModule) {
		super();
		this.originModule = originModule;
	}

	get type() {
		return "harmony init";
	}
}

module.exports = HarmonyInitDependency;

HarmonyInitDependency.Template = class HarmonyInitDependencyTemplate {
	apply(dep, source, runtime, dependencyTemplates) {
		const module = dep.originModule;
		const list = [];
		for (const dependency of module.dependencies) {
			const template = dependencyTemplates.get(dependency.constructor);
			if (
				template &&
				typeof template.harmonyInit === "function" &&
				typeof template.getHarmonyInitOrder === "function"
			) {
				const order = template.getHarmonyInitOrder(dependency);
				if (!isNaN(order)) {
					list.push({
						order,
						listOrder: list.length,
						dependency,
						template
					});
				}
			}
		}

		list.sort((a, b) => {
			const x = a.order - b.order;
			if (x) return x;
			return a.listOrder - b.listOrder;
		});

		for (const item of list) {
			item.template.harmonyInit(
				item.dependency,
				source,
				runtime,
				dependencyTemplates
			);
		}
	}
};
