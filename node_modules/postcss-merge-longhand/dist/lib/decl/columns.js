'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcssValueParser = require('postcss-value-parser');

var _stylehacks = require('stylehacks');

var _canMerge = require('../canMerge');

var _canMerge2 = _interopRequireDefault(_canMerge);

var _getDecls = require('../getDecls');

var _getDecls2 = _interopRequireDefault(_getDecls);

var _getValue = require('../getValue');

var _getValue2 = _interopRequireDefault(_getValue);

var _mergeRules = require('../mergeRules');

var _mergeRules2 = _interopRequireDefault(_mergeRules);

var _insertCloned = require('../insertCloned');

var _insertCloned2 = _interopRequireDefault(_insertCloned);

var _remove = require('../remove');

var _remove2 = _interopRequireDefault(_remove);

var _isCustomProp = require('../isCustomProp');

var _isCustomProp2 = _interopRequireDefault(_isCustomProp);

var _canExplode = require('../canExplode');

var _canExplode2 = _interopRequireDefault(_canExplode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const properties = ['column-width', 'column-count'];
const auto = 'auto';
const inherit = 'inherit';

/**
 * Normalize a columns shorthand definition. Both of the longhand
 * properties' initial values are 'auto', and as per the spec,
 * omitted values are set to their initial values. Thus, we can
 * remove any 'auto' definition when there are two values.
 *
 * Specification link: https://www.w3.org/TR/css3-multicol/
 */

function normalize(values) {
    if (values[0].toLowerCase() === auto) {
        return values[1];
    }

    if (values[1].toLowerCase() === auto) {
        return values[0];
    }

    if (values[0].toLowerCase() === inherit && values[1].toLowerCase() === inherit) {
        return inherit;
    }

    return values.join(' ');
}

function explode(rule) {
    rule.walkDecls(/^columns$/i, decl => {
        if (!(0, _canExplode2.default)(decl)) {
            return;
        }

        if ((0, _stylehacks.detect)(decl)) {
            return;
        }

        let values = _postcss.list.space(decl.value);

        if (values.length === 1) {
            values.push(auto);
        }

        values.forEach((value, i) => {
            let prop = properties[1];

            if (value.toLowerCase() === auto) {
                prop = properties[i];
            } else if ((0, _postcssValueParser.unit)(value).unit) {
                prop = properties[0];
            }

            (0, _insertCloned2.default)(decl.parent, decl, {
                prop,
                value
            });
        });

        decl.remove();
    });
}

function cleanup(rule) {
    let decls = (0, _getDecls2.default)(rule, ['columns'].concat(properties));

    while (decls.length) {
        const lastNode = decls[decls.length - 1];

        // remove properties of lower precedence
        const lesser = decls.filter(node => !(0, _stylehacks.detect)(lastNode) && !(0, _stylehacks.detect)(node) && node !== lastNode && node.important === lastNode.important && lastNode.prop === 'columns' && node.prop !== lastNode.prop);

        lesser.forEach(_remove2.default);
        decls = decls.filter(node => !~lesser.indexOf(node));

        // get duplicate properties
        let duplicates = decls.filter(node => !(0, _stylehacks.detect)(lastNode) && !(0, _stylehacks.detect)(node) && node !== lastNode && node.important === lastNode.important && node.prop === lastNode.prop && !(!(0, _isCustomProp2.default)(node) && (0, _isCustomProp2.default)(lastNode)));

        duplicates.forEach(_remove2.default);
        decls = decls.filter(node => node !== lastNode && !~duplicates.indexOf(node));
    }
}

function merge(rule) {
    (0, _mergeRules2.default)(rule, properties, (rules, lastNode) => {
        if ((0, _canMerge2.default)(rules) && !rules.some(_stylehacks.detect)) {
            (0, _insertCloned2.default)(lastNode.parent, lastNode, {
                prop: 'columns',
                value: normalize(rules.map(_getValue2.default))
            });

            rules.forEach(_remove2.default);

            return true;
        }
    });

    cleanup(rule);
}

exports.default = {
    explode,
    merge
};
module.exports = exports['default'];