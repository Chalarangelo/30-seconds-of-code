'use strict';

exports.type = 'perItemReverse';

exports.active = true;

exports.description = 'moves elements attributes to the existing group wrapper';

var inheritableAttrs = require('./_collections').inheritableAttrs,
    pathElems = require('./_collections.js').pathElems;

/**
 * Collapse content's intersected and inheritable
 * attributes to the existing group wrapper.
 *
 * @example
 * <g attr1="val1">
 *     <g attr2="val2">
 *         text
 *     </g>
 *     <circle attr2="val2" attr3="val3"/>
 * </g>
 *              ⬇
 * <g attr1="val1" attr2="val2">
 *     <g>
 *         text
 *     </g>
 *    <circle attr3="val3"/>
 * </g>
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
exports.fn = function(item) {

    if (item.isElem('g') && !item.isEmpty() && item.content.length > 1) {

        var intersection = {},
            hasTransform = false,
            hasClip = item.hasAttr('clip-path') || item.hasAttr('mask'),
            intersected = item.content.every(function(inner) {
                if (inner.isElem() && inner.hasAttr()) {
                    // don't mess with possible styles (hack until CSS parsing is implemented)
                    if (inner.hasAttr('class')) return false;
                    if (!Object.keys(intersection).length) {
                        intersection = inner.attrs;
                    } else {
                        intersection = intersectInheritableAttrs(intersection, inner.attrs);

                        if (!intersection) return false;
                    }

                    return true;
                }
            }),
            allPath = item.content.every(function(inner) {
                return inner.isElem(pathElems);
            });

        if (intersected) {

            item.content.forEach(function(g) {

                for (var name in intersection) {

                    if (!allPath && !hasClip || name !== 'transform') {

                        g.removeAttr(name);

                        if (name === 'transform') {
                            if (!hasTransform) {
                                if (item.hasAttr('transform')) {
                                    item.attr('transform').value += ' ' + intersection[name].value;
                                } else {
                                    item.addAttr(intersection[name]);
                                }

                                hasTransform = true;
                            }
                        } else {
                            item.addAttr(intersection[name]);
                        }

                    }
                }

            });

        }

    }

};

/**
 * Intersect inheritable attributes.
 *
 * @param {Object} a first attrs object
 * @param {Object} b second attrs object
 *
 * @return {Object} intersected attrs object
 */
function intersectInheritableAttrs(a, b) {

    var c = {};

    for (var n in a) {
        if (
            b.hasOwnProperty(n) &&
            inheritableAttrs.indexOf(n) > -1 &&
            a[n].name === b[n].name &&
            a[n].value === b[n].value &&
            a[n].prefix === b[n].prefix &&
            a[n].local === b[n].local
        ) {
            c[n] = a[n];
        }
    }

    if (!Object.keys(c).length) return false;

    return c;

}
