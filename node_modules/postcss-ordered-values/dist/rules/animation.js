'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = normalizeAnimation;

var _postcssValueParser = require('postcss-value-parser');

var _cssnanoUtilGetArguments = require('cssnano-util-get-arguments');

var _cssnanoUtilGetArguments2 = _interopRequireDefault(_cssnanoUtilGetArguments);

var _addSpace = require('../lib/addSpace');

var _addSpace2 = _interopRequireDefault(_addSpace);

var _getValue = require('../lib/getValue');

var _getValue2 = _interopRequireDefault(_getValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// animation: [ none | <keyframes-name> ] || <time> || <single-timing-function> || <time> || <single-animation-iteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state>

const isTimingFunction = (value, type) => {
    const functions = ['steps', 'cubic-bezier', 'frames'];
    const keywords = ['ease', 'ease-in', 'ease-in-out', 'ease-out', 'linear', 'step-end', 'step-start'];

    return type === 'function' && functions.includes(value) || keywords.includes(value);
};

const isDirection = value => {
    return ['normal', 'reverse', 'alternate', 'alternate-reverse'].includes(value);
};

const isFillMode = value => {
    return ['none', 'forwards', 'backwards', 'both'].includes(value);
};

const isPlayState = value => {
    return ['running', 'paused'].includes(value);
};

const isTime = value => {
    const quantity = (0, _postcssValueParser.unit)(value);

    return quantity && ['ms', 's'].includes(quantity.unit);
};

const isIterationCount = value => {
    const quantity = (0, _postcssValueParser.unit)(value);

    return value === 'infinite' || quantity && !quantity.unit;
};

function normalizeAnimation(parsed) {
    const args = (0, _cssnanoUtilGetArguments2.default)(parsed);

    const values = args.reduce((list, arg) => {
        const state = {
            name: [],
            duration: [],
            timingFunction: [],
            delay: [],
            iterationCount: [],
            direction: [],
            fillMode: [],
            playState: []
        };
        const stateConditions = [{ property: 'duration', delegate: isTime }, { property: 'timingFunction', delegate: isTimingFunction }, { property: 'delay', delegate: isTime }, { property: 'iterationCount', delegate: isIterationCount }, { property: 'direction', delegate: isDirection }, { property: 'fillMode', delegate: isFillMode }, { property: 'playState', delegate: isPlayState }];

        arg.forEach(node => {
            let { type, value } = node;

            if (type === 'space') {
                return;
            }

            value = value.toLowerCase();

            const hasMatch = stateConditions.some(({ property, delegate }) => {
                if (delegate(value, type) && !state[property].length) {
                    state[property] = [node, (0, _addSpace2.default)()];
                    return true;
                }
            });

            if (!hasMatch) {
                state.name = [...state.name, node, (0, _addSpace2.default)()];
            }
        });
        return [...list, [...state.name, ...state.duration, ...state.timingFunction, ...state.delay, ...state.iterationCount, ...state.direction, ...state.fillMode, ...state.playState]];
    }, []);

    return (0, _getValue2.default)(values);
};
module.exports = exports['default'];