/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:toc
 * @fileoverview Generate a Table of Contents (TOC) from a given Markdown file.
 */

/* Expose. */
module.exports = search;

/* Dependencies */
var toString = require('mdast-util-to-string');
var visit = require('unist-util-visit');
var slugs = require('github-slugger')();
var isClosingHeading = require('./is-closing-heading');
var isOpeningHeading = require('./is-opening-heading');

/* Constants. */
var HEADING = 'heading';

/**
 * Search a node for a location.
 *
 * @param {Node} root - Parent to search in.
 * @param {RegExp} expression - Heading-content to search
 *   for.
 * @param {number} maxDepth - Maximum-depth to include.
 * @return {Object} - Results.
 */
function search(root, expression, maxDepth) {
    var length = root.children.length;
    var depth = null;
    var lookingForToc = expression !== null;
    var map = [];
    var headingIndex;
    var closingIndex;

    if (!lookingForToc) {
        headingIndex = -1;
    }

    slugs.reset();

    /*
     * Visit all headings in `root`.
     * We `slug` all headings (to account for duplicates),
     * but only create a TOC from top-level headings.
     */

    visit(root, HEADING, function(child, index, parent) {
        var value = toString(child);
        var id =
            child.data && child.data.hProperties && child.data.hProperties.id;
        id = slugs.slug(id || value);

        if (parent !== root) {
            return;
        }

        if (lookingForToc) {
            if (isClosingHeading(child, depth)) {
                closingIndex = index;
                lookingForToc = false;
            }

            if (isOpeningHeading(child, depth, expression)) {
                headingIndex = index + 1;
                depth = child.depth;
            }
        }

        if (!lookingForToc && value && child.depth <= maxDepth) {
            map.push({
                depth: child.depth,
                value: value,
                id: id
            });
        }
    });

    if (headingIndex && !closingIndex) {
        closingIndex = length + 1;
    }

    if (headingIndex === undefined) {
        headingIndex = -1;
        closingIndex = -1;
        map = [];
    }

    return {
        index: headingIndex,
        endIndex: closingIndex,
        map: map
    };
}
