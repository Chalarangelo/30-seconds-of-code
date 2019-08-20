'use strict';

exports.type = 'perItem';

exports.active = true;

exports.description = 'removes doctype declaration';

/**
 * Remove DOCTYPE declaration.
 *
 * "Unfortunately the SVG DTDs are a source of so many
 * issues that the SVG WG has decided not to write one
 * for the upcoming SVG 1.2 standard. In fact SVG WG
 * members are even telling people not to use a DOCTYPE
 * declaration in SVG 1.0 and 1.1 documents"
 * https://jwatt.org/svg/authoring/#doctype-declaration
 *
 * @example
 * <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 * q"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
 *
 * @example
 * <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
 * "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" [
 *     <!-- an internal subset can be embedded here -->
 * ]>
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
exports.fn = function(item) {

    if (item.doctype) {
        return false;
    }

};
