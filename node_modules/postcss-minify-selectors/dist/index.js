"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require("postcss");

var _alphanumSort = require("alphanum-sort");

var _alphanumSort2 = _interopRequireDefault(_alphanumSort);

var _has = require("has");

var _has2 = _interopRequireDefault(_has);

var _postcssSelectorParser = require("postcss-selector-parser");

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

var _unquote = require("./lib/unquote");

var _unquote2 = _interopRequireDefault(_unquote);

var _canUnquote = require("./lib/canUnquote");

var _canUnquote2 = _interopRequireDefault(_canUnquote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pseudoElements = ["::before", "::after", "::first-letter", "::first-line"];

function getParsed(selectors, callback) {
    return (0, _postcssSelectorParser2.default)(callback).processSync(selectors);
}

function attribute(selector) {
    if (selector.value) {
        // Join selectors that are split over new lines
        selector.value = selector.value.replace(/\\\n/g, "").trim();

        if ((0, _canUnquote2.default)(selector.value)) {
            selector.value = (0, _unquote2.default)(selector.value);
        }

        selector.operator = selector.operator.trim();
    }

    if (!selector.raws) {
        selector.raws = {};
    }

    if (!selector.raws.spaces) {
        selector.raws.spaces = {};
    }

    selector.raws.spaces.attribute = {
        before: "",
        after: ""
    };

    selector.raws.spaces.operator = {
        before: "",
        after: ""
    };

    selector.raws.spaces.value = {
        before: "",
        after: selector.insensitive ? " " : ""
    };

    if (selector.insensitive) {
        selector.raws.spaces.insensitive = {
            before: "",
            after: ""
        };
    }

    selector.attribute = selector.attribute.trim();
}

function combinator(selector) {
    const value = selector.value.trim();

    selector.value = value.length ? value : " ";
}

const pseudoReplacements = {
    ":nth-child": ":first-child",
    ":nth-of-type": ":first-of-type",
    ":nth-last-child": ":last-child",
    ":nth-last-of-type": ":last-of-type"
};

function pseudo(selector) {
    const value = selector.value.toLowerCase();

    if (selector.nodes.length === 1 && pseudoReplacements[value]) {
        const first = selector.at(0);
        const one = first.at(0);

        if (first.length === 1) {
            if (one.value === "1") {
                selector.replaceWith(_postcssSelectorParser2.default.pseudo({
                    value: pseudoReplacements[value]
                }));
            }

            if (one.value.toLowerCase() === "even") {
                one.value = "2n";
            }
        }

        if (first.length === 3) {
            const two = first.at(1);
            const three = first.at(2);

            if (one.value.toLowerCase() === "2n" && two.value === "+" && three.value === "1") {
                one.value = "odd";

                two.remove();
                three.remove();
            }
        }

        return;
    }

    const uniques = [];

    selector.walk(child => {
        if (child.type === "selector") {
            const childStr = String(child);

            if (!~uniques.indexOf(childStr)) {
                uniques.push(childStr);
            } else {
                child.remove();
            }
        }
    });

    if (~pseudoElements.indexOf(value)) {
        selector.value = selector.value.slice(1);
    }
}

const tagReplacements = {
    from: "0%",
    "100%": "to"
};

function tag(selector) {
    const value = selector.value.toLowerCase();

    if ((0, _has2.default)(tagReplacements, value)) {
        selector.value = tagReplacements[value];
    }
}

function universal(selector) {
    const next = selector.next();

    if (next && next.type !== "combinator") {
        selector.remove();
    }
}

const reducers = {
    attribute,
    combinator,
    pseudo,
    tag,
    universal
};

exports.default = (0, _postcss.plugin)("postcss-minify-selectors", () => {
    return css => {
        const cache = {};

        css.walkRules(rule => {
            const selector = rule.raws.selector && rule.raws.selector.value === rule.selector ? rule.raws.selector.raw : rule.selector;

            // If the selector ends with a ':' it is likely a part of a custom mixin,
            // so just pass through.
            if (selector[selector.length - 1] === ":") {
                return;
            }

            if (cache[selector]) {
                rule.selector = cache[selector];

                return;
            }

            const optimizedSelector = getParsed(selector, selectors => {
                selectors.nodes = (0, _alphanumSort2.default)(selectors.nodes, { insensitive: true });

                const uniqueSelectors = [];

                selectors.walk(sel => {
                    const { type } = sel;

                    // Trim whitespace around the value
                    sel.spaces.before = sel.spaces.after = "";

                    if ((0, _has2.default)(reducers, type)) {
                        reducers[type](sel);

                        return;
                    }

                    const toString = String(sel);

                    if (type === "selector" && sel.parent.type !== "pseudo") {
                        if (!~uniqueSelectors.indexOf(toString)) {
                            uniqueSelectors.push(toString);
                        } else {
                            sel.remove();
                        }
                    }
                });
            });

            rule.selector = optimizedSelector;
            cache[selector] = optimizedSelector;
        });
    };
});
module.exports = exports["default"];