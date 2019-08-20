'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pseudoElements = undefined;
exports.default = ensureCompatibility;

var _caniuseApi = require('caniuse-api');

var _postcssSelectorParser = require('postcss-selector-parser');

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const simpleSelectorRe = /^#?[-._a-z0-9 ]+$/i;

const cssSel2 = 'css-sel2';
const cssSel3 = 'css-sel3';
const cssGencontent = 'css-gencontent';
const cssFirstLetter = 'css-first-letter';
const cssFirstLine = 'css-first-line';
const cssInOutOfRange = 'css-in-out-of-range';

const pseudoElements = exports.pseudoElements = {
    ':active': cssSel2,
    ':after': cssGencontent,
    ':before': cssGencontent,
    ':checked': cssSel3,
    ':default': 'css-default-pseudo',
    ':dir': 'css-dir-pseudo',
    ':disabled': cssSel3,
    ':empty': cssSel3,
    ':enabled': cssSel3,
    ':first-child': cssSel2,
    ':first-letter': cssFirstLetter,
    ':first-line': cssFirstLine,
    ':first-of-type': cssSel3,
    ':focus': cssSel2,
    ':focus-within': 'css-focus-within',
    ':has': 'css-has',
    ':hover': cssSel2,
    ':in-range': cssInOutOfRange,
    ':indeterminate': 'css-indeterminate-pseudo',
    ':lang': cssSel2,
    ':last-child': cssSel3,
    ':last-of-type': cssSel3,
    ':matches': 'css-matches-pseudo',
    ':not': cssSel3,
    ':nth-child': cssSel3,
    ':nth-last-child': cssSel3,
    ':nth-last-of-type': cssSel3,
    ':nth-of-type': cssSel3,
    ':only-child': cssSel3,
    ':only-of-type': cssSel3,
    ':optional': 'css-optional-pseudo',
    ':out-of-range': cssInOutOfRange,
    ':placeholder-shown': 'css-placeholder-shown',
    ':root': cssSel3,
    ':target': cssSel3,
    '::after': cssGencontent,
    '::backdrop': 'dialog',
    '::before': cssGencontent,
    '::first-letter': cssFirstLetter,
    '::first-line': cssFirstLine,
    '::marker': 'css-marker-pseudo',
    '::placeholder': 'css-placeholder',
    '::selection': 'css-selection'
};

function isCssMixin(selector) {
    return selector[selector.length - 1] === ':';
}

const isSupportedCache = {};

// Move to util in future
function isSupportedCached(feature, browsers) {
    const key = JSON.stringify({ feature, browsers });
    let result = isSupportedCache[key];

    if (!result) {
        result = (0, _caniuseApi.isSupported)(feature, browsers);
        isSupportedCache[key] = result;
    }

    return result;
}

function ensureCompatibility(selectors, browsers, compatibilityCache) {
    // Should not merge mixins
    if (selectors.some(isCssMixin)) {
        return false;
    }
    return selectors.every(selector => {
        if (simpleSelectorRe.test(selector)) {
            return true;
        }
        if (compatibilityCache && selector in compatibilityCache) {
            return compatibilityCache[selector];
        }
        let compatible = true;
        (0, _postcssSelectorParser2.default)(ast => {
            ast.walk(node => {
                const { type, value } = node;
                if (type === 'pseudo') {
                    const entry = pseudoElements[value];
                    if (entry && compatible) {
                        compatible = isSupportedCached(entry, browsers);
                    }
                }
                if (type === 'combinator') {
                    if (~value.indexOf('~')) {
                        compatible = isSupportedCached(cssSel3, browsers);
                    }
                    if (~value.indexOf('>') || ~value.indexOf('+')) {
                        compatible = isSupportedCached(cssSel2, browsers);
                    }
                }
                if (type === 'attribute' && node.attribute) {
                    // [foo]
                    if (!node.operator) {
                        compatible = isSupportedCached(cssSel2, browsers);
                    }

                    if (value) {
                        // [foo="bar"], [foo~="bar"], [foo|="bar"]
                        if (~['=', '~=', '|='].indexOf(node.operator)) {
                            compatible = isSupportedCached(cssSel2, browsers);
                        }
                        // [foo^="bar"], [foo$="bar"], [foo*="bar"]
                        if (~['^=', '$=', '*='].indexOf(node.operator)) {
                            compatible = isSupportedCached(cssSel3, browsers);
                        }
                    }

                    // [foo="bar" i]
                    if (node.insensitive) {
                        compatible = isSupportedCached('css-case-insensitive', browsers);
                    }
                }
                if (!compatible) {
                    // If this node was not compatible,
                    // break out early from walking the rest
                    return false;
                }
            });
        }).processSync(selector);
        if (compatibilityCache) {
            compatibilityCache[selector] = compatible;
        }
        return compatible;
    });
}