/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const NullDependency = require("./NullDependency");

class AMDRequireDependency extends NullDependency {
	constructor(block) {
		super();
		this.block = block;
	}
}

AMDRequireDependency.Template = class AMDRequireDependencyTemplate {
	apply(dep, source, runtime) {
		const depBlock = dep.block;
		const promise = runtime.blockPromise({
			block: depBlock,
			message: "AMD require"
		});

		// has array range but no function range
		if (depBlock.arrayRange && !depBlock.functionRange) {
			const startBlock = `${promise}.then(function() {`;
			const endBlock = `;}).catch(${runtime.onError()})`;
			source.replace(
				depBlock.outerRange[0],
				depBlock.arrayRange[0] - 1,
				startBlock
			);
			source.replace(
				depBlock.arrayRange[1],
				depBlock.outerRange[1] - 1,
				endBlock
			);
			return;
		}

		// has function range but no array range
		if (depBlock.functionRange && !depBlock.arrayRange) {
			const startBlock = `${promise}.then((`;
			const endBlock = `).bind(exports, __webpack_require__, exports, module)).catch(${runtime.onError()})`;
			source.replace(
				depBlock.outerRange[0],
				depBlock.functionRange[0] - 1,
				startBlock
			);
			source.replace(
				depBlock.functionRange[1],
				depBlock.outerRange[1] - 1,
				endBlock
			);
			return;
		}

		// has array range, function range, and errorCallbackRange
		if (
			depBlock.arrayRange &&
			depBlock.functionRange &&
			depBlock.errorCallbackRange
		) {
			const startBlock = `${promise}.then(function() { `;
			const errorRangeBlock = `}${
				depBlock.functionBindThis ? ".bind(this)" : ""
			}).catch(`;
			const endBlock = `${
				depBlock.errorCallbackBindThis ? ".bind(this)" : ""
			})`;

			source.replace(
				depBlock.outerRange[0],
				depBlock.arrayRange[0] - 1,
				startBlock
			);
			source.insert(
				depBlock.arrayRange[0] + 0.9,
				"var __WEBPACK_AMD_REQUIRE_ARRAY__ = "
			);
			source.replace(
				depBlock.arrayRange[1],
				depBlock.functionRange[0] - 1,
				"; ("
			);
			source.insert(
				depBlock.functionRange[1],
				").apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__);"
			);
			source.replace(
				depBlock.functionRange[1],
				depBlock.errorCallbackRange[0] - 1,
				errorRangeBlock
			);
			source.replace(
				depBlock.errorCallbackRange[1],
				depBlock.outerRange[1] - 1,
				endBlock
			);
			return;
		}

		// has array range, function range, but no errorCallbackRange
		if (depBlock.arrayRange && depBlock.functionRange) {
			const startBlock = `${promise}.then(function() { `;
			const endBlock = `}${
				depBlock.functionBindThis ? ".bind(this)" : ""
			}).catch(${runtime.onError()})`;
			source.replace(
				depBlock.outerRange[0],
				depBlock.arrayRange[0] - 1,
				startBlock
			);
			source.insert(
				depBlock.arrayRange[0] + 0.9,
				"var __WEBPACK_AMD_REQUIRE_ARRAY__ = "
			);
			source.replace(
				depBlock.arrayRange[1],
				depBlock.functionRange[0] - 1,
				"; ("
			);
			source.insert(
				depBlock.functionRange[1],
				").apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__);"
			);
			source.replace(
				depBlock.functionRange[1],
				depBlock.outerRange[1] - 1,
				endBlock
			);
		}
	}
};

module.exports = AMDRequireDependency;
