/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const parseJson = require("json-parse-better-errors");
const JsonExportsDependency = require("./dependencies/JsonExportsDependency");

class JsonParser {
	constructor(options) {
		this.options = options;
	}

	parse(source, state) {
		const data = parseJson(source[0] === "\ufeff" ? source.slice(1) : source);
		state.module.buildInfo.jsonData = data;
		state.module.buildMeta.exportsType = "named";
		if (typeof data === "object" && data) {
			state.module.addDependency(new JsonExportsDependency(Object.keys(data)));
		}
		state.module.addDependency(new JsonExportsDependency(["default"]));
		return state;
	}
}

module.exports = JsonParser;
