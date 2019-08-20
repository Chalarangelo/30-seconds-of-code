'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = normalizeFlexFlow;
// flex-flow: <flex-direction> || <flex-wrap>

const flexDirection = ['row', 'row-reverse', 'column', 'column-reverse'];

const flexWrap = ['nowrap', 'wrap', 'wrap-reverse'];

function normalizeFlexFlow(flexFlow) {
    let order = {
        direction: '',
        wrap: ''
    };

    flexFlow.walk(({ value }) => {
        if (~flexDirection.indexOf(value.toLowerCase())) {
            order.direction = value;
            return;
        }

        if (~flexWrap.indexOf(value.toLowerCase())) {
            order.wrap = value;

            return;
        }
    });

    return `${order.direction} ${order.wrap}`.trim();
};
module.exports = exports['default'];