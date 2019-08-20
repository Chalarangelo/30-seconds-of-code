"use strict";

var cssesc = require("cssesc");

var stringify;

function escape(str, stringType) {
	return cssesc(str, {
		quotes: stringType === "\"" ? "double" : "single"
	});
}

function stringifyWithoutBeforeAfter(tree) {
	switch(tree.type) {
	case "values":
		return tree.nodes.map(stringify).join(",");
	case "value":
		return tree.nodes.map(stringify).join("");
	case "item":
		return tree.name;
	case "nested-item":
		return tree.name + "(" + tree.nodes.map(stringify).join(",") + ")";
	case "invalid":
		return tree.value;
	case "comment":
		return "/*" + tree.content + "*/";
	case "string":
		switch(tree.stringType) {
		case "'":
			return "'" + escape(tree.value, "'") + "'";
		case "\"":
			return "\"" + escape(tree.value, "\"") + "\"";
		}
		/* istanbul ignore next */
		throw new Error("Invalid stringType");
	case "url":
		var start = "url(" + (tree.innerSpacingBefore || "");
		var end = (tree.innerSpacingAfter || "") + ")";
		switch(tree.stringType) {
		case "'":
			return start + "'" + tree.url.replace(/(\\)/g, "\\$1").replace(/'/g, "\\'") + "'" + end;
		case "\"":
			return start + "\"" + tree.url.replace(/(\\)/g, "\\$1").replace(/"/g, "\\\"") + "\"" + end;
		default:
			return start + tree.url.replace(/("|'|\)|\\)/g, "\\$1") + end;
		}
	}
}


stringify = function stringify(tree) {
	var str = stringifyWithoutBeforeAfter(tree);
	if(tree.before) {
		str = tree.before + str;
	}
	if(tree.after) {
		str = str + tree.after;
	}
	return str;
};

module.exports = stringify;
