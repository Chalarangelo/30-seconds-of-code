'use strict';

exports.type = 'full';

exports.active = false;

exports.description = 'adds classnames to an outer <svg> element';

var ENOCLS = `Error in plugin "addClassesToSVGElement": absent parameters.
It should have a list of classes in "classNames" or one "className".
Config example:

plugins:
- addClassesToSVGElement:
    className: "mySvg"

plugins:
- addClassesToSVGElement:
    classNames: ["mySvg", "size-big"]
`;

/**
 * Add classnames to an outer <svg> element. Example config:
 *
 * plugins:
 * - addClassesToSVGElement:
 *     className: 'mySvg'
 *
 * plugins:
 * - addClassesToSVGElement:
 *     classNames: ['mySvg', 'size-big']
 *
 * @author April Arcus
 */
exports.fn = function(data, params) {
    if (!params || !(Array.isArray(params.classNames) && params.classNames.some(String) || params.className)) {
        console.error(ENOCLS);
        return data;
    }

    var classNames = params.classNames || [ params.className ],
        svg = data.content[0];

    if (svg.isElem('svg')) {
        svg.class.add.apply(svg.class, classNames);
    }

    return data;

};
