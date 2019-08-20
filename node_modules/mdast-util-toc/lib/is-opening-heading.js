/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:toc
 * @fileoverview Generate a Table of Contents (TOC) from a given Markdown file.
 */

/* Expose. */
module.exports = isOpeningHeading;

/* Dependencies */
var toString = require('mdast-util-to-string');

/* Constants. */
var HEADING = 'heading';

/**
 * Check if `node` is the main heading.
 *
 * @param {Node} node - Node to check.
 * @param {number} depth - Depth to check.
 * @param {RegExp} expression - Expression to check.
 * @return {boolean} - Whether `node` is a main heading.
 */
function isOpeningHeading(node, depth, expression) {
    return (
        depth === null &&
        node &&
        node.type === HEADING &&
        expression.test(toString(node))
    );
}
