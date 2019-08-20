'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stylehacks = require('stylehacks');

var _canMerge = require('../canMerge');

var _canMerge2 = _interopRequireDefault(_canMerge);

var _getDecls = require('../getDecls');

var _getDecls2 = _interopRequireDefault(_getDecls);

var _minifyTrbl = require('../minifyTrbl');

var _minifyTrbl2 = _interopRequireDefault(_minifyTrbl);

var _parseTrbl = require('../parseTrbl');

var _parseTrbl2 = _interopRequireDefault(_parseTrbl);

var _insertCloned = require('../insertCloned');

var _insertCloned2 = _interopRequireDefault(_insertCloned);

var _mergeRules = require('../mergeRules');

var _mergeRules2 = _interopRequireDefault(_mergeRules);

var _mergeValues = require('../mergeValues');

var _mergeValues2 = _interopRequireDefault(_mergeValues);

var _remove = require('../remove');

var _remove2 = _interopRequireDefault(_remove);

var _trbl = require('../trbl');

var _trbl2 = _interopRequireDefault(_trbl);

var _isCustomProp = require('../isCustomProp');

var _isCustomProp2 = _interopRequireDefault(_isCustomProp);

var _canExplode = require('../canExplode');

var _canExplode2 = _interopRequireDefault(_canExplode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = prop => {
    const properties = _trbl2.default.map(direction => `${prop}-${direction}`);

    const cleanup = rule => {
        let decls = (0, _getDecls2.default)(rule, [prop].concat(properties));

        while (decls.length) {
            const lastNode = decls[decls.length - 1];

            // remove properties of lower precedence
            const lesser = decls.filter(node => !(0, _stylehacks.detect)(lastNode) && !(0, _stylehacks.detect)(node) && node !== lastNode && node.important === lastNode.important && lastNode.prop === prop && node.prop !== lastNode.prop);

            lesser.forEach(_remove2.default);
            decls = decls.filter(node => !~lesser.indexOf(node));

            // get duplicate properties
            let duplicates = decls.filter(node => !(0, _stylehacks.detect)(lastNode) && !(0, _stylehacks.detect)(node) && node !== lastNode && node.important === lastNode.important && node.prop === lastNode.prop && !(!(0, _isCustomProp2.default)(node) && (0, _isCustomProp2.default)(lastNode)));

            duplicates.forEach(_remove2.default);
            decls = decls.filter(node => node !== lastNode && !~duplicates.indexOf(node));
        }
    };

    const processor = {
        explode: rule => {
            rule.walkDecls(new RegExp("^" + prop + "$", "i"), decl => {
                if (!(0, _canExplode2.default)(decl)) {
                    return;
                }

                if ((0, _stylehacks.detect)(decl)) {
                    return;
                }

                const values = (0, _parseTrbl2.default)(decl.value);

                _trbl2.default.forEach((direction, index) => {
                    (0, _insertCloned2.default)(decl.parent, decl, {
                        prop: properties[index],
                        value: values[index]
                    });
                });

                decl.remove();
            });
        },
        merge: rule => {
            (0, _mergeRules2.default)(rule, properties, (rules, lastNode) => {
                if ((0, _canMerge2.default)(rules) && !rules.some(_stylehacks.detect)) {
                    (0, _insertCloned2.default)(lastNode.parent, lastNode, {
                        prop,
                        value: (0, _minifyTrbl2.default)((0, _mergeValues2.default)(...rules))
                    });
                    rules.forEach(_remove2.default);

                    return true;
                }
            });

            cleanup(rule);
        }
    };

    return processor;
};

module.exports = exports['default'];