"use strict";

var stringify;

var regexpu = require("regexpu-core");
var identifierEscapeRegexp = new RegExp(
	regexpu("(^[^A-Za-z_\\-\\u{00a0}-\\u{10ffff}]|^\\-\\-|[^A-Za-z_0-9\\-\\u{00a0}-\\u{10ffff}])", "ug"),
	"g"
);

function escape(str, identifier) {
	if(str === "*") {
		return "*";
	}
	if (identifier) {
		return str.replace(identifierEscapeRegexp, "\\$1");
	} else {
		return str.replace(/(^[^A-Za-z_\\-]|^\-\-|[^A-Za-z_0-9\\-])/g, "\\$1");
	}
}

function stringifyWithoutBeforeAfter(tree) {
	switch(tree.type) {
	case "selectors":
		return tree.nodes.map(stringify).join(",");
	case "selector":
		return tree.nodes.map(stringify).join("");
	case "element":
		return (typeof tree.namespace === "string" ? escape(tree.namespace) + "|" : "") + escape(tree.name);
	case "class":
		return "." + escape(tree.name, true);
	case "id":
		return "#" + escape(tree.name, true);
	case "attribute":
		return "[" + tree.content + "]";
	case "spacing":
		return tree.value;
	case "pseudo-class":
		return ":" + escape(tree.name) + (typeof tree.content === "string" ? "(" + tree.content + ")" : "");
	case "nested-pseudo-class":
		return ":" + escape(tree.name) + "(" + tree.nodes.map(stringify).join(",") + ")";
	case "pseudo-element":
		return "::" + escape(tree.name);
	case "universal":
		return (typeof tree.namespace === "string" ? escape(tree.namespace) + "|" : "") + "*";
	case "operator":
		return tree.operator;
	case "comment":
		return "/*" + tree.content + "*/";
	case "invalid":
		return tree.value;
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
