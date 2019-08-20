/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

/** @typedef {import("./Dependency").DependencyLocation} DependencyLocation */
/** @typedef {import("./Dependency").SourcePosition} SourcePosition */

// TODO webpack 5: pos must be SourcePosition
/**
 * @param {SourcePosition|DependencyLocation|string} pos position
 * @returns {string} formatted position
 */
const formatPosition = pos => {
	if (pos === null) return "";
	// TODO webpack 5: Simplify this
	if (typeof pos === "string") return pos;
	if (typeof pos === "number") return `${pos}`;
	if (typeof pos === "object") {
		if ("line" in pos && "column" in pos) {
			return `${pos.line}:${pos.column}`;
		} else if ("line" in pos) {
			return `${pos.line}:?`;
		} else if ("index" in pos) {
			// TODO webpack 5 remove this case
			return `+${pos.index}`;
		} else {
			return "";
		}
	}
	return "";
};

// TODO webpack 5: loc must be DependencyLocation
/**
 * @param {DependencyLocation|SourcePosition|string} loc location
 * @returns {string} formatted location
 */
const formatLocation = loc => {
	if (loc === null) return "";
	// TODO webpack 5: Simplify this
	if (typeof loc === "string") return loc;
	if (typeof loc === "number") return `${loc}`;
	if (typeof loc === "object") {
		if ("start" in loc && loc.start && "end" in loc && loc.end) {
			if (
				typeof loc.start === "object" &&
				typeof loc.start.line === "number" &&
				typeof loc.end === "object" &&
				typeof loc.end.line === "number" &&
				typeof loc.end.column === "number" &&
				loc.start.line === loc.end.line
			) {
				return `${formatPosition(loc.start)}-${loc.end.column}`;
			} else {
				return `${formatPosition(loc.start)}-${formatPosition(loc.end)}`;
			}
		}
		if ("start" in loc && loc.start) {
			return formatPosition(loc.start);
		}
		if ("name" in loc && "index" in loc) {
			return `${loc.name}[${loc.index}]`;
		}
		if ("name" in loc) {
			return loc.name;
		}
		return formatPosition(loc);
	}
	return "";
};

module.exports = formatLocation;
