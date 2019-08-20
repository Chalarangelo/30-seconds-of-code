'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = defaultPreset;

var _cssDeclarationSorter = require('css-declaration-sorter');

var _cssDeclarationSorter2 = _interopRequireDefault(_cssDeclarationSorter);

var _postcssDiscardComments = require('postcss-discard-comments');

var _postcssDiscardComments2 = _interopRequireDefault(_postcssDiscardComments);

var _postcssReduceInitial = require('postcss-reduce-initial');

var _postcssReduceInitial2 = _interopRequireDefault(_postcssReduceInitial);

var _postcssMinifyGradients = require('postcss-minify-gradients');

var _postcssMinifyGradients2 = _interopRequireDefault(_postcssMinifyGradients);

var _postcssSvgo = require('postcss-svgo');

var _postcssSvgo2 = _interopRequireDefault(_postcssSvgo);

var _postcssReduceTransforms = require('postcss-reduce-transforms');

var _postcssReduceTransforms2 = _interopRequireDefault(_postcssReduceTransforms);

var _postcssConvertValues = require('postcss-convert-values');

var _postcssConvertValues2 = _interopRequireDefault(_postcssConvertValues);

var _postcssCalc = require('postcss-calc');

var _postcssCalc2 = _interopRequireDefault(_postcssCalc);

var _postcssColormin = require('postcss-colormin');

var _postcssColormin2 = _interopRequireDefault(_postcssColormin);

var _postcssOrderedValues = require('postcss-ordered-values');

var _postcssOrderedValues2 = _interopRequireDefault(_postcssOrderedValues);

var _postcssMinifySelectors = require('postcss-minify-selectors');

var _postcssMinifySelectors2 = _interopRequireDefault(_postcssMinifySelectors);

var _postcssMinifyParams = require('postcss-minify-params');

var _postcssMinifyParams2 = _interopRequireDefault(_postcssMinifyParams);

var _postcssNormalizeCharset = require('postcss-normalize-charset');

var _postcssNormalizeCharset2 = _interopRequireDefault(_postcssNormalizeCharset);

var _postcssMinifyFontValues = require('postcss-minify-font-values');

var _postcssMinifyFontValues2 = _interopRequireDefault(_postcssMinifyFontValues);

var _postcssNormalizeUrl = require('postcss-normalize-url');

var _postcssNormalizeUrl2 = _interopRequireDefault(_postcssNormalizeUrl);

var _postcssMergeLonghand = require('postcss-merge-longhand');

var _postcssMergeLonghand2 = _interopRequireDefault(_postcssMergeLonghand);

var _postcssDiscardDuplicates = require('postcss-discard-duplicates');

var _postcssDiscardDuplicates2 = _interopRequireDefault(_postcssDiscardDuplicates);

var _postcssDiscardOverridden = require('postcss-discard-overridden');

var _postcssDiscardOverridden2 = _interopRequireDefault(_postcssDiscardOverridden);

var _postcssNormalizeRepeatStyle = require('postcss-normalize-repeat-style');

var _postcssNormalizeRepeatStyle2 = _interopRequireDefault(_postcssNormalizeRepeatStyle);

var _postcssMergeRules = require('postcss-merge-rules');

var _postcssMergeRules2 = _interopRequireDefault(_postcssMergeRules);

var _postcssDiscardEmpty = require('postcss-discard-empty');

var _postcssDiscardEmpty2 = _interopRequireDefault(_postcssDiscardEmpty);

var _postcssUniqueSelectors = require('postcss-unique-selectors');

var _postcssUniqueSelectors2 = _interopRequireDefault(_postcssUniqueSelectors);

var _postcssNormalizeString = require('postcss-normalize-string');

var _postcssNormalizeString2 = _interopRequireDefault(_postcssNormalizeString);

var _postcssNormalizePositions = require('postcss-normalize-positions');

var _postcssNormalizePositions2 = _interopRequireDefault(_postcssNormalizePositions);

var _postcssNormalizeWhitespace = require('postcss-normalize-whitespace');

var _postcssNormalizeWhitespace2 = _interopRequireDefault(_postcssNormalizeWhitespace);

var _postcssNormalizeUnicode = require('postcss-normalize-unicode');

var _postcssNormalizeUnicode2 = _interopRequireDefault(_postcssNormalizeUnicode);

var _postcssNormalizeDisplayValues = require('postcss-normalize-display-values');

var _postcssNormalizeDisplayValues2 = _interopRequireDefault(_postcssNormalizeDisplayValues);

var _postcssNormalizeTimingFunctions = require('postcss-normalize-timing-functions');

var _postcssNormalizeTimingFunctions2 = _interopRequireDefault(_postcssNormalizeTimingFunctions);

var _cssnanoUtilRawCache = require('cssnano-util-raw-cache');

var _cssnanoUtilRawCache2 = _interopRequireDefault(_cssnanoUtilRawCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultOpts = {
    convertValues: {
        length: false
    },
    normalizeCharset: {
        add: false
    },
    cssDeclarationSorter: {
        exclude: true
    }
}; /**
    * @author Ben Briggs
    * @license MIT
    * @module cssnano:preset:default
    * @overview
    *
    * This default preset for cssnano only includes transforms that make no
    * assumptions about your CSS other than what is passed in. In previous
    * iterations of cssnano, assumptions were made about your CSS which caused
    * output to look different in certain use cases, but not others. These
    * transforms have been moved from the defaults to other presets, to make
    * this preset require only minimal configuration.
    */

function defaultPreset(opts = {}) {
    const options = Object.assign({}, defaultOpts, opts);

    const plugins = [[_postcssDiscardComments2.default, options.discardComments], [_postcssMinifyGradients2.default, options.minifyGradients], [_postcssReduceInitial2.default, options.reduceInitial], [_postcssSvgo2.default, options.svgo], [_postcssNormalizeDisplayValues2.default, options.normalizeDisplayValues], [_postcssReduceTransforms2.default, options.reduceTransforms], [_postcssColormin2.default, options.colormin], [_postcssNormalizeTimingFunctions2.default, options.normalizeTimingFunctions], [_postcssCalc2.default, options.calc], [_postcssConvertValues2.default, options.convertValues], [_postcssOrderedValues2.default, options.orderedValues], [_postcssMinifySelectors2.default, options.minifySelectors], [_postcssMinifyParams2.default, options.minifyParams], [_postcssNormalizeCharset2.default, options.normalizeCharset], [_postcssDiscardOverridden2.default, options.discardOverridden], [_postcssNormalizeString2.default, options.normalizeString], [_postcssNormalizeUnicode2.default, options.normalizeUnicode], [_postcssMinifyFontValues2.default, options.minifyFontValues], [_postcssNormalizeUrl2.default, options.normalizeUrl], [_postcssNormalizeRepeatStyle2.default, options.normalizeRepeatStyle], [_postcssNormalizePositions2.default, options.normalizePositions], [_postcssNormalizeWhitespace2.default, options.normalizeWhitespace], [_postcssMergeLonghand2.default, options.mergeLonghand], [_postcssDiscardDuplicates2.default, options.discardDuplicates], [_postcssMergeRules2.default, options.mergeRules], [_postcssDiscardEmpty2.default, options.discardEmpty], [_postcssUniqueSelectors2.default, options.uniqueSelectors], [_cssDeclarationSorter2.default, options.cssDeclarationSorter], [_cssnanoUtilRawCache2.default, options.rawCache]];

    return { plugins };
}
module.exports = exports['default'];