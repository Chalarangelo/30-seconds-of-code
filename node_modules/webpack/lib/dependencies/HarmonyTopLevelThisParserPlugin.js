/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Florent Cailhol @ooflorent
*/
"use strict";

const ConstDependency = require("./ConstDependency");

class HarmonyTopLevelThisParserPlugin {
	apply(parser) {
		parser.hooks.expression
			.for("this")
			.tap("HarmonyTopLevelThisParserPlugin", node => {
				if (!parser.scope.topLevelScope) return;
				const module = parser.state.module;
				const isHarmony = !!(module.buildMeta && module.buildMeta.exportsType);
				if (isHarmony) {
					const dep = new ConstDependency("undefined", node.range, false);
					dep.loc = node.loc;
					parser.state.current.addDependency(dep);
				}
			});
	}
}

module.exports = HarmonyTopLevelThisParserPlugin;
