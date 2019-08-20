'use strict';

exports.type = 'perItem';

exports.active = true;

exports.description = 'removes <title>';

/**
 * Remove <title>.
 *
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Igor Kalashnikov
 */
exports.fn = function(item) {

    return !item.isElem('title');

};
