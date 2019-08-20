'use strict';

exports.type = 'perItem';

exports.active = true;

exports.description = 'removes <metadata>';

/**
 * Remove <metadata>.
 *
 * http://www.w3.org/TR/SVG/metadata.html
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
exports.fn = function(item) {

    return !item.isElem('metadata');

};
