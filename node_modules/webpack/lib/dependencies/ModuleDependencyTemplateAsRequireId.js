/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

class ModuleDependencyTemplateAsRequireId {
	apply(dep, source, runtime) {
		if (!dep.range) return;
		const content = runtime.moduleExports({
			module: dep.module,
			request: dep.request
		});
		source.replace(dep.range[0], dep.range[1] - 1, content);
	}
}
module.exports = ModuleDependencyTemplateAsRequireId;
