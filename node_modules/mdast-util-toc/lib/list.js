/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:toc
 * @fileoverview Generate a Table of Contents (TOC) from a given Markdown file.
 */

/* Expose. */
module.exports = list;

/* Constants */
var LIST = 'list';

/**
 * Create a list.
 *
 * @return {Object} - List node.
 */
function list() {
    return {
        type: LIST,
        ordered: false,
        children: []
    };
}
