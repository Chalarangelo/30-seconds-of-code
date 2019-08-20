'use strict';

exports.type = 'perItem';

exports.active = true;

exports.description = 'removes viewBox attribute when possible';

var viewBoxElems = ['svg', 'pattern', 'symbol'];

/**
 * Remove viewBox attr which coincides with a width/height box.
 *
 * @see http://www.w3.org/TR/SVG/coords.html#ViewBoxAttribute
 *
 * @example
 * <svg width="100" height="50" viewBox="0 0 100 50">
 *             ⬇
 * <svg width="100" height="50">
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
exports.fn = function(item) {

    if (
        item.isElem(viewBoxElems) &&
        item.hasAttr('viewBox') &&
        item.hasAttr('width') &&
        item.hasAttr('height')
    ) {

        var nums = item.attr('viewBox').value.split(/[ ,]+/g);

        if (
            nums[0] === '0' &&
            nums[1] === '0' &&
            item.attr('width').value.replace(/px$/, '') === nums[2] && // could use parseFloat too
            item.attr('height').value.replace(/px$/, '') === nums[3]
        ) {
            item.removeAttr('viewBox');
        }

    }

};
