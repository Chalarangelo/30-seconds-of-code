'use strict';

exports.type = 'perItem';

exports.active = false;

exports.description = 'removes width and height in presence of viewBox (opposite to removeViewBox, disable it first)';

/**
 * Remove width/height attributes and add the viewBox attribute if it's missing
 *
 * @example
 * <svg width="100" height="50" />
 *   ↓
 * <svg viewBox="0 0 100 50" />
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if true, with and height will be filtered out
 *
 * @author Benny Schudel
 */
exports.fn = function(item) {

    if (item.isElem('svg')) {
        if (item.hasAttr('viewBox')) {
            item.removeAttr('width');
            item.removeAttr('height');
        } else if (
            item.hasAttr('width') &&
            item.hasAttr('height') &&
            !isNaN(Number(item.attr('width').value)) &&
            !isNaN(Number(item.attr('height').value))
        ) {
            item.addAttr({
                name: 'viewBox',
                value:
                    '0 0 ' +
                    Number(item.attr('width').value) +
                    ' ' +
                    Number(item.attr('height').value),
                prefix: '',
                local: 'viewBox'
            });
            item.removeAttr('width');
            item.removeAttr('height');
        }
    }

};
