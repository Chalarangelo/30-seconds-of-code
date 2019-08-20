"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browserslist = require("browserslist");

var _browserslist2 = _interopRequireDefault(_browserslist);

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require("postcss-value-parser");

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _colours = require("./colours");

var _colours2 = _interopRequireDefault(_colours);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function walk(parent, callback) {
    parent.nodes.forEach((node, index) => {
        const bubble = callback(node, index, parent);

        if (node.nodes && bubble !== false) {
            walk(node, callback);
        }
    });
}

/*
 * IE 8 & 9 do not properly handle clicks on elements
 * with a `transparent` `background-color`.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Events/click#Internet_Explorer
 */

function hasTransparentBug(browser) {
    return ~["ie 8", "ie 9"].indexOf(browser);
}

exports.default = _postcss2.default.plugin("postcss-colormin", () => {
    return (css, result) => {
        const resultOpts = result.opts || {};
        const browsers = (0, _browserslist2.default)(null, {
            stats: resultOpts.stats,
            path: __dirname,
            env: resultOpts.env
        });
        const isLegacy = browsers.some(hasTransparentBug);
        const colorminCache = {};
        const cache = {};

        css.walkDecls(decl => {
            if (/^(composes|font|filter|-webkit-tap-highlight-color)/i.test(decl.prop)) {
                return;
            }

            if (cache[decl.value]) {
                decl.value = cache[decl.value];

                return;
            }

            const parsed = (0, _postcssValueParser2.default)(decl.value);

            walk(parsed, (node, index, parent) => {
                if (node.type === "function") {
                    if (/^(rgb|hsl)a?$/i.test(node.value)) {
                        const { value } = node;

                        node.value = (0, _colours2.default)((0, _postcssValueParser.stringify)(node), isLegacy, colorminCache);
                        node.type = "word";

                        const next = parent.nodes[index + 1];

                        if (node.value !== value && next && (next.type === "word" || next.type === "function")) {
                            parent.nodes.splice(index + 1, 0, {
                                type: "space",
                                value: " "
                            });
                        }
                    } else if (node.value.toLowerCase() === "calc") {
                        return false;
                    }
                } else if (node.type === "word") {
                    node.value = (0, _colours2.default)(node.value, isLegacy, colorminCache);
                }
            });

            const optimizedValue = parsed.toString();

            decl.value = optimizedValue;
            cache[decl.value] = optimizedValue;
        });
    };
});