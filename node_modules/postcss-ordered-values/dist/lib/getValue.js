'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getValue;

var _postcssValueParser = require('postcss-value-parser');

function getValue(values) {
    return (0, _postcssValueParser.stringify)({
        nodes: values.reduce((nodes, arg, index) => {
            arg.forEach((val, idx) => {
                if (idx === arg.length - 1 && index === values.length - 1 && val.type === 'space') {
                    return;
                }
                nodes.push(val);
            });

            if (index !== values.length - 1) {
                nodes[nodes.length - 1].type = 'div';
                nodes[nodes.length - 1].value = ',';
            }

            return nodes;
        }, [])
    });
}
module.exports = exports['default'];