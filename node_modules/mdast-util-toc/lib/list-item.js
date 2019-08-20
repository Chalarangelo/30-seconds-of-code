/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:toc
 * @fileoverview Generate a Table of Contents (TOC) from a given Markdown file.
 */

/* Expose. */
module.exports = listItem;

/* Constants */
var LIST_ITEM = 'listItem';

/**
 * Create a list item.
 *
 * @return {Object} - List-item node.
 */
function listItem() {
    return {
        type: LIST_ITEM,
        loose: false,
        children: []
    };
}
