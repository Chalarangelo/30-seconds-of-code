/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:toc
 * @fileoverview Generate a Table of Contents (TOC) from a given Markdown file.
 */

/* Expose. */
module.exports = toc;

/* Dependencies */
var toExpression = require('./to-expression');
var search = require('./search');
var contents = require('./contents');

/**
 * Get a TOC representation of `node`.
 *
 * @param {Mdast} node - MDAST.
 * @param {Object} options - Configuration.
 * @return {Array} - TOC Markdown.
 */
function toc(node, options) {
    var settings = options || {};
    var heading = settings.heading ? toExpression(settings.heading) : null;
    var result = search(node, heading, settings.maxDepth || 6);
    var map = result.map;

    result.map = map.length ? contents(map, settings.tight) : null;

    /* No given heading */
    if (!heading) {
        result.index = null;
        result.endIndex = null;
    }

    return result;
}
