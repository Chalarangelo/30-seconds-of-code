'use strict';

exports.type = 'perItemReverse';

exports.active = true;

exports.description = 'collapses useless groups';

var collections = require('./_collections'),
    attrsInheritable = collections.inheritableAttrs,
    animationElems = collections.elemsGroups.animation;

function hasAnimatedAttr(item) {
    /* jshint validthis:true */
    return item.isElem(animationElems) && item.hasAttr('attributeName', this) ||
        !item.isEmpty() && item.content.some(hasAnimatedAttr, this);
}

/*
 * Collapse useless groups.
 *
 * @example
 * <g>
 *     <g attr1="val1">
 *         <path d="..."/>
 *     </g>
 * </g>
 *         ⬇
 * <g>
 *     <g>
 *         <path attr1="val1" d="..."/>
 *     </g>
 * </g>
 *         ⬇
 * <path attr1="val1" d="..."/>
 *
 * @param {Object} item current iteration item
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
exports.fn = function(item) {

    // non-empty elements
    if (item.isElem() && !item.isElem('switch') && !item.isEmpty()) {
        item.content.forEach(function(g, i) {
            // non-empty groups
            if (g.isElem('g') && !g.isEmpty()) {
                // move group attibutes to the single content element
                if (g.hasAttr() && g.content.length === 1) {
                    var inner = g.content[0];

                    if (inner.isElem() && !inner.hasAttr('id') && !g.hasAttr('filter') &&
                        !(g.hasAttr('class') && inner.hasAttr('class')) && (
                            !g.hasAttr('clip-path') && !g.hasAttr('mask') ||
                            inner.isElem('g') && !g.hasAttr('transform') && !inner.hasAttr('transform')
                        )
                    ) {
                        g.eachAttr(function(attr) {
                            if (g.content.some(hasAnimatedAttr, attr.name)) return;

                            if (!inner.hasAttr(attr.name)) {
                                inner.addAttr(attr);
                            } else if (attr.name == 'transform') {
                                inner.attr(attr.name).value = attr.value + ' ' + inner.attr(attr.name).value;
                            } else if (inner.hasAttr(attr.name, 'inherit')) {
                                inner.attr(attr.name).value = attr.value;
                            } else if (
                                attrsInheritable.indexOf(attr.name) < 0 &&
                                !inner.hasAttr(attr.name, attr.value)
                            ) {
                                return;
                            }

                            g.removeAttr(attr.name);
                        });
                    }
                }

                // collapse groups without attributes
                if (!g.hasAttr() && !g.content.some(function(item) { return item.isElem(animationElems) })) {
                    item.spliceContent(i, 1, g.content);
                }
            }
        });
    }
};
