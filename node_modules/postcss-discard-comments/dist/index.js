"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require("postcss");

var _commentRemover = require("./lib/commentRemover");

var _commentRemover2 = _interopRequireDefault(_commentRemover);

var _commentParser = require("./lib/commentParser");

var _commentParser2 = _interopRequireDefault(_commentParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { space } = _postcss.list;

exports.default = (0, _postcss.plugin)("postcss-discard-comments", (opts = {}) => {
    const remover = new _commentRemover2.default(opts);
    const matcherCache = {};
    const replacerCache = {};

    function matchesComments(source) {
        if (matcherCache[source]) {
            return matcherCache[source];
        }

        const result = (0, _commentParser2.default)(source).filter(([type]) => type);

        matcherCache[source] = result;

        return result;
    }

    function replaceComments(source, separator = " ") {
        const key = source + "@|@" + separator;

        if (replacerCache[key]) {
            return replacerCache[key];
        }

        const parsed = (0, _commentParser2.default)(source).reduce((value, [type, start, end]) => {
            const contents = source.slice(start, end);

            if (!type) {
                return value + contents;
            }

            if (remover.canRemove(contents)) {
                return value + separator;
            }

            return `${value}/*${contents}*/`;
        }, "");

        const result = space(parsed).join(" ");

        replacerCache[key] = result;

        return result;
    }

    return css => {
        css.walk(node => {
            if (node.type === "comment" && remover.canRemove(node.text)) {
                node.remove();

                return;
            }

            if (node.raws.between) {
                node.raws.between = replaceComments(node.raws.between);
            }

            if (node.type === "decl") {
                if (node.raws.value && node.raws.value.raw) {
                    if (node.raws.value.value === node.value) {
                        node.value = replaceComments(node.raws.value.raw);
                    } else {
                        node.value = replaceComments(node.value);
                    }

                    node.raws.value = null;
                }

                if (node.raws.important) {
                    node.raws.important = replaceComments(node.raws.important);

                    const b = matchesComments(node.raws.important);

                    node.raws.important = b.length ? node.raws.important : "!important";
                }

                return;
            }

            if (node.type === "rule" && node.raws.selector && node.raws.selector.raw) {
                node.raws.selector.raw = replaceComments(node.raws.selector.raw, "");

                return;
            }

            if (node.type === "atrule") {
                if (node.raws.afterName) {
                    const commentsReplaced = replaceComments(node.raws.afterName);

                    if (!commentsReplaced.length) {
                        node.raws.afterName = commentsReplaced + " ";
                    } else {
                        node.raws.afterName = " " + commentsReplaced + " ";
                    }
                }

                if (node.raws.params && node.raws.params.raw) {
                    node.raws.params.raw = replaceComments(node.raws.params.raw);
                }
            }
        });
    };
});
module.exports = exports["default"];