/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:toc
 * @fileoverview Generate a Table of Contents (TOC) from a given Markdown file.
 */

/* Expose. */
module.exports = insert;

/* Dependencies */
var listItem = require('./list-item');
var list = require('./list');

/* Constants */
var LIST = 'list';
var LIST_ITEM = 'listItem';
var PARAGRAPH = 'paragraph';
var LINK = 'link';
var TEXT = 'text';

/**
 * Insert a `node` into a `parent`.
 *
 * @param {Object} node - `node` to insert.
 * @param {Object} parent - Parent of `node`.
 * @param {boolean?} [tight] - Prefer tight list-items.
 * @return {undefined}
 */
function insert(node, parent, tight) {
    var children = parent.children;
    var length = children.length;
    var last = children[length - 1];
    var isLoose = false;
    var index;
    var item;

    if (node.depth === 1) {
        item = listItem();

        item.children.push({
            type: PARAGRAPH,
            children: [
                {
                    type: LINK,
                    title: null,
                    url: '#' + node.id,
                    children: [
                        {
                            type: TEXT,
                            value: node.value
                        }
                    ]
                }
            ]
        });

        children.push(item);
    } else if (last && last.type === LIST_ITEM) {
        insert(node, last, tight);
    } else if (last && last.type === LIST) {
        node.depth--;

        insert(node, last, tight);
    } else if (parent.type === LIST) {
        item = listItem();

        insert(node, item, tight);

        children.push(item);
    } else {
        item = list();
        node.depth--;

        insert(node, item, tight);

        children.push(item);
    }

    /*
    * Properly style list-items with new lines.
    */

    if (parent.type === LIST_ITEM) {
        parent.loose = tight ? false : children.length > 1;
    } else {
        if (tight) {
            isLoose = false;
        } else {
            index = -1;

            while (++index < length) {
                if (children[index].loose) {
                    isLoose = true;

                    break;
                }
            }
        }

        index = -1;

        while (++index < length) {
            children[index].loose = isLoose;
        }
    }
}
