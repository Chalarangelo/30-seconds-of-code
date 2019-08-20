'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const block = 'block';
const flex = 'flex';
const flow = 'flow';
const flowRoot = 'flow-root';
const grid = 'grid';
const inline = 'inline';
const inlineBlock = 'inline-block';
const inlineFlex = 'inline-flex';
const inlineGrid = 'inline-grid';
const inlineTable = 'inline-table';
const listItem = 'list-item';
const ruby = 'ruby';
const rubyBase = 'ruby-base';
const rubyText = 'ruby-text';
const runIn = 'run-in';
const table = 'table';
const tableCell = 'table-cell';
const tableCaption = 'table-caption';

/**
 * Specification: https://drafts.csswg.org/css-display/#the-display-properties
 */

exports.default = [[block, [block, flow]], [flowRoot, [block, flowRoot]], [inline, [inline, flow]], [inlineBlock, [inline, flowRoot]], [runIn, [runIn, flow]], [listItem, [listItem, block, flow]], [inline + ' ' + listItem, [inline, flow, listItem]], [flex, [block, flex]], [inlineFlex, [inline, flex]], [grid, [block, grid]], [inlineGrid, [inline, grid]], [ruby, [inline, ruby]],
// `block ruby` is same
[table, [block, table]], [inlineTable, [inline, table]], [tableCell, [tableCell, flow]], [tableCaption, [tableCaption, flow]], [rubyBase, [rubyBase, flow]], [rubyText, [rubyText, flow]]];
module.exports = exports['default'];