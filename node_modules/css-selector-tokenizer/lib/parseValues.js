"use strict";

var Parser = require("fastparse");

function commentMatch(match, content) {
	this.value.nodes.push({
		type: "comment",
		content: content
	});
}

function spacingMatch(match) {
	var item = this.value.nodes[this.value.nodes.length - 1];
	item.after = (item.after || "") + match;
}

function initialSpacingMatch(match) {
	this.value.before = match;
}

function endSpacingMatch(match) {
	this.value.after = match;
}

function unescapeString(content) {
	return content.replace(/\\(?:([a-fA-F0-9]{1,6})|(.))/g, function(all, unicode, otherCharacter) {
		if (otherCharacter) {
			return otherCharacter;
		}

		var C = parseInt(unicode, 16);
		if(C < 0x10000) {
			return String.fromCharCode(C);
		} else {
			return String.fromCharCode(Math.floor((C - 0x10000) / 0x400) + 0xD800) +
				String.fromCharCode((C - 0x10000) % 0x400 + 0xDC00);
		}
	});
}

function stringMatch(match, content) {
	var value = unescapeString(content);
	this.value.nodes.push({
		type: "string",
		value: value,
		stringType: match[0]
	});
}

function commaMatch(match, spacing) {
	var newValue = {
		type: "value",
		nodes: []
	};
	if(spacing) {
		newValue.before = spacing;
	}
	this.root.nodes.push(newValue);
	this.value = newValue;
}

function itemMatch(match) {
	this.value.nodes.push({
		type: "item",
		name: match
	});
}

function nestedItemMatch(match, name, spacing) {
	this.stack.push(this.root);
	this.root = {
		type: "nested-item",
		name: name,
		nodes: [
			{ type: "value", nodes: [] }
		]
	};
	if(spacing) {
		this.root.nodes[0].before = spacing;
	}
	this.value.nodes.push(this.root);
	this.value = this.root.nodes[0];
}

function nestedItemEndMatch(match, spacing, remaining) {
	if(this.stack.length === 0) {
		if(spacing) {
			var item = this.value.nodes[this.value.nodes.length - 1];
			item.after = (item.after || "") + spacing;
		}
		this.value.nodes.push({
			type: "invalid",
			value: remaining
		});
	} else {
		if(spacing) {
			this.value.after = spacing;
		}
		this.root = this.stack.pop();
		this.value = this.root.nodes[this.root.nodes.length - 1];
	}
}

function urlMatch(match, innerSpacingBefore, content, innerSpacingAfter) {
	var item = {
		type: "url"
	};
	if(innerSpacingBefore) {
		item.innerSpacingBefore = innerSpacingBefore;
	}
	if(innerSpacingAfter) {
		item.innerSpacingAfter = innerSpacingAfter;
	}
	switch(content[0]) {
		case "\"":
			item.stringType = "\"";
			item.url = unescapeString(content.substr(1, content.length - 2));
			break;
		case "'":
			item.stringType = "'";
			item.url = unescapeString(content.substr(1, content.length - 2));
			break;
		default:
			item.url = unescapeString(content);
			break;
	}
	this.value.nodes.push(item);
}

var parser = new Parser({
	decl: {
		"^\\s+": initialSpacingMatch,
		"/\\*([\\s\\S]*?)\\*/": commentMatch,
		"\"((?:[^\\\\\"]|\\\\.)*)\"": stringMatch,
		"'((?:[^\\\\']|\\\\.)*)'": stringMatch,
		"url\\((\\s*)(\"(?:[^\\\\\"]|\\\\.)*\")(\\s*)\\)": urlMatch,
		"url\\((\\s*)('(?:[^\\\\']|\\\\.)*')(\\s*)\\)": urlMatch,
		"url\\((\\s*)((?:[^\\\\)'\"]|\\\\.)*)(\\s*)\\)": urlMatch,
		"([\\w\-]+)\\((\\s*)": nestedItemMatch,
		"(\\s*)(\\))": nestedItemEndMatch,
		",(\\s*)": commaMatch,
		"\\s+$": endSpacingMatch,
		"\\s+": spacingMatch,
		"[^\\s,\)]+": itemMatch
	}
});

function parseValues(str) {
	var valueNode = {
		type: "value",
		nodes: []
	};
	var rootNode = {
		type: "values",
		nodes: [
			valueNode
		]
	};
	parser.parse("decl", str, {
		stack: [],
		root: rootNode,
		value: valueNode
	});
	return rootNode;
}

module.exports = parseValues;
