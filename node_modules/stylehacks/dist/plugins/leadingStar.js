'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _plugin = require('../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _browsers = require('../dictionary/browsers');

var _identifiers = require('../dictionary/identifiers');

var _postcss = require('../dictionary/postcss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hacks = '!_$_&_*_)_=_%_+_,_._/_`_]_#_~_?_:_|'.split('_');

exports.default = (0, _plugin2.default)([_browsers.IE_5_5, _browsers.IE_6, _browsers.IE_7], [_postcss.ATRULE, _postcss.DECL], function (node) {
    if (node.type === _postcss.DECL) {
        // some values are not picked up by before, so ensure they are
        // at the beginning of the value
        hacks.some(hack => {
            if (!node.prop.indexOf(hack)) {
                this.push(node, {
                    identifier: _identifiers.PROPERTY,
                    hack: node.prop
                });
                return true;
            }
        });
        let { before } = node.raws;
        if (!before) {
            return;
        }
        hacks.some(hack => {
            if (~before.indexOf(hack)) {
                this.push(node, {
                    identifier: _identifiers.PROPERTY,
                    hack: `${before.trim()}${node.prop}`
                });
                return true;
            }
        });
    } else {
        // test for the @property: value; hack
        let { name } = node;
        let len = name.length - 1;
        if (name.lastIndexOf(':') === len) {
            this.push(node, {
                identifier: _identifiers.PROPERTY,
                hack: `@${name.substr(0, len)}`
            });
        }
    }
});
module.exports = exports['default'];