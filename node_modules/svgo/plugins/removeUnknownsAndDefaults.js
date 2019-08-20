'use strict';

exports.type = 'perItem';

exports.active = true;

exports.description = 'removes unknown elements content and attributes, removes attrs with default values';

exports.params = {
    unknownContent: true,
    unknownAttrs: true,
    defaultAttrs: true,
    uselessOverrides: true,
    keepDataAttrs: true,
    keepAriaAttrs: true,
    keepRoleAttr: false
};

var collections = require('./_collections'),
    elems = collections.elems,
    attrsGroups = collections.attrsGroups,
    elemsGroups = collections.elemsGroups,
    attrsGroupsDefaults = collections.attrsGroupsDefaults,
    attrsInheritable = collections.inheritableAttrs,
    applyGroups = collections.presentationNonInheritableGroupAttrs;

// collect and extend all references
for (var elem in elems) {
    elem = elems[elem];

    if (elem.attrsGroups) {
        elem.attrs = elem.attrs || [];

        elem.attrsGroups.forEach(function(attrsGroupName) {
            elem.attrs = elem.attrs.concat(attrsGroups[attrsGroupName]);

            var groupDefaults = attrsGroupsDefaults[attrsGroupName];

            if (groupDefaults) {
                elem.defaults = elem.defaults || {};

                for (var attrName in groupDefaults) {
                    elem.defaults[attrName] = groupDefaults[attrName];
                }
            }
        });

    }

    if (elem.contentGroups) {
        elem.content = elem.content || [];

        elem.contentGroups.forEach(function(contentGroupName) {
            elem.content = elem.content.concat(elemsGroups[contentGroupName]);
        });
    }
}

/**
 * Remove unknown elements content and attributes,
 * remove attributes with default values.
 *
 * @param {Object} item current iteration item
 * @param {Object} params plugin params
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
exports.fn = function(item, params) {

    // elems w/o namespace prefix
    if (item.isElem() && !item.prefix) {

        var elem = item.elem;

        // remove unknown element's content
        if (
            params.unknownContent &&
            !item.isEmpty() &&
            elems[elem] && // make sure we know of this element before checking its children
            elem !== 'foreignObject' // Don't check foreignObject
        ) {
            item.content.forEach(function(content, i) {
                if (
                    content.isElem() &&
                    !content.prefix &&
                    (
                        (
                            elems[elem].content && // Do we have a record of its permitted content?
                            elems[elem].content.indexOf(content.elem) === -1
                        ) ||
                        (
                            !elems[elem].content && // we dont know about its permitted content
                            !elems[content.elem] // check that we know about the element at all
                        )
                    )
                ) {
                    item.content.splice(i, 1);
                }
            });
        }

        // remove element's unknown attrs and attrs with default values
        if (elems[elem] && elems[elem].attrs) {

            item.eachAttr(function(attr) {

                if (
                    attr.name !== 'xmlns' &&
                    (attr.prefix === 'xml' || !attr.prefix) &&
                    (!params.keepDataAttrs || attr.name.indexOf('data-') != 0) &&
                    (!params.keepAriaAttrs || attr.name.indexOf('aria-') != 0) &&
                    (!params.keepRoleAttr || attr.name != 'role')
                ) {
                    if (
                        // unknown attrs
                        (
                            params.unknownAttrs &&
                            elems[elem].attrs.indexOf(attr.name) === -1
                        ) ||
                        // attrs with default values
                        (
                            params.defaultAttrs &&
                            !item.hasAttr('id') &&
                            elems[elem].defaults &&
                            elems[elem].defaults[attr.name] === attr.value && (
                                attrsInheritable.indexOf(attr.name) < 0 ||
                                !item.parentNode.computedAttr(attr.name)
                            )
                        ) ||
                        // useless overrides
                        (
                            params.uselessOverrides &&
                            !item.hasAttr('id') &&
                            applyGroups.indexOf(attr.name) < 0 &&
                            attrsInheritable.indexOf(attr.name) > -1 &&
                            item.parentNode.computedAttr(attr.name, attr.value)
                        )
                    ) {
                        item.removeAttr(attr.name);
                    }
                }

            });

        }

    }

};
