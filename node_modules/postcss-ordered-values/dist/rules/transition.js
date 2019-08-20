'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = normalizeTransition;

var _postcssValueParser = require('postcss-value-parser');

var _cssnanoUtilGetArguments = require('cssnano-util-get-arguments');

var _cssnanoUtilGetArguments2 = _interopRequireDefault(_cssnanoUtilGetArguments);

var _addSpace = require('../lib/addSpace');

var _addSpace2 = _interopRequireDefault(_addSpace);

var _getValue = require('../lib/getValue');

var _getValue2 = _interopRequireDefault(_getValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// transition: [ none | <single-transition-property> ] || <time> || <single-transition-timing-function> || <time>

const timingFunctions = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'step-start', 'step-end'];

function normalizeTransition(parsed) {
    let args = (0, _cssnanoUtilGetArguments2.default)(parsed);

    let values = args.reduce((list, arg) => {
        let state = {
            timingFunction: [],
            property: [],
            time1: [],
            time2: []
        };

        arg.forEach(node => {
            const { type, value } = node;

            if (type === 'space') {
                return;
            }

            if (type === 'function' && ~['steps', 'cubic-bezier'].indexOf(value.toLowerCase())) {
                state.timingFunction = [...state.timingFunction, node, (0, _addSpace2.default)()];
            } else if ((0, _postcssValueParser.unit)(value)) {
                if (!state.time1.length) {
                    state.time1 = [...state.time1, node, (0, _addSpace2.default)()];
                } else {
                    state.time2 = [...state.time2, node, (0, _addSpace2.default)()];
                }
            } else if (~timingFunctions.indexOf(value.toLowerCase())) {
                state.timingFunction = [...state.timingFunction, node, (0, _addSpace2.default)()];
            } else {
                state.property = [...state.property, node, (0, _addSpace2.default)()];
            }
        });

        return [...list, [...state.property, ...state.time1, ...state.timingFunction, ...state.time2]];
    }, []);

    return (0, _getValue2.default)(values);
}
module.exports = exports['default'];