'use strict';

exports.type = 'perItem';

exports.active = true;

exports.description = 'removes hidden elements (zero sized, with absent attributes)';

exports.params = {
    isHidden: true,
    displayNone: true,
    opacity0: true,
    circleR0: true,
    ellipseRX0: true,
    ellipseRY0: true,
    rectWidth0: true,
    rectHeight0: true,
    patternWidth0: true,
    patternHeight0: true,
    imageWidth0: true,
    imageHeight0: true,
    pathEmptyD: true,
    polylineEmptyPoints: true,
    polygonEmptyPoints: true
};

var regValidPath = /M\s*(?:[-+]?(?:\d*\.\d+|\d+(?:\.|(?!\.)))([eE][-+]?\d+)?(?!\d)\s*,?\s*){2}\D*\d/i;

/**
 * Remove hidden elements with disabled rendering:
 * - display="none"
 * - opacity="0"
 * - circle with zero radius
 * - ellipse with zero x-axis or y-axis radius
 * - rectangle with zero width or height
 * - pattern with zero width or height
 * - image with zero width or height
 * - path with empty data
 * - polyline with empty points
 * - polygon with empty points
 *
 * @param {Object} item current iteration item
 * @param {Object} params plugin params
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
exports.fn = function (item, params) {

    if (item.elem) {
        // Removes hidden elements
        // https://www.w3schools.com/cssref/pr_class_visibility.asp
        if (
            params.isHidden &&
            item.hasAttr('visibility', 'hidden')
        ) return false;

        // display="none"
        //
        // http://www.w3.org/TR/SVG/painting.html#DisplayProperty
        // "A value of display: none indicates that the given element
        // and its children shall not be rendered directly"
        if (
            params.displayNone &&
            item.hasAttr('display', 'none')
        ) return false;

        // opacity="0"
        //
        // http://www.w3.org/TR/SVG/masking.html#ObjectAndGroupOpacityProperties
        if (
            params.opacity0 &&
            item.hasAttr('opacity', '0')
        ) return false;

        // Circles with zero radius
        //
        // http://www.w3.org/TR/SVG/shapes.html#CircleElementRAttribute
        // "A value of zero disables rendering of the element"
        //
        // <circle r="0">
        if (
            params.circleR0 &&
            item.isElem('circle') &&
            item.isEmpty() &&
            item.hasAttr('r', '0')
        ) return false;

        // Ellipse with zero x-axis radius
        //
        // http://www.w3.org/TR/SVG/shapes.html#EllipseElementRXAttribute
        // "A value of zero disables rendering of the element"
        //
        // <ellipse rx="0">
        if (
            params.ellipseRX0 &&
            item.isElem('ellipse') &&
            item.isEmpty() &&
            item.hasAttr('rx', '0')
        ) return false;

        // Ellipse with zero y-axis radius
        //
        // http://www.w3.org/TR/SVG/shapes.html#EllipseElementRYAttribute
        // "A value of zero disables rendering of the element"
        //
        // <ellipse ry="0">
        if (
            params.ellipseRY0 &&
            item.isElem('ellipse') &&
            item.isEmpty() &&
            item.hasAttr('ry', '0')
        ) return false;

        // Rectangle with zero width
        //
        // http://www.w3.org/TR/SVG/shapes.html#RectElementWidthAttribute
        // "A value of zero disables rendering of the element"
        //
        // <rect width="0">
        if (
            params.rectWidth0 &&
            item.isElem('rect') &&
            item.isEmpty() &&
            item.hasAttr('width', '0')
        ) return false;

        // Rectangle with zero height
        //
        // http://www.w3.org/TR/SVG/shapes.html#RectElementHeightAttribute
        // "A value of zero disables rendering of the element"
        //
        // <rect height="0">
        if (
            params.rectHeight0 &&
            params.rectWidth0 &&
            item.isElem('rect') &&
            item.isEmpty() &&
            item.hasAttr('height', '0')
        ) return false;

        // Pattern with zero width
        //
        // http://www.w3.org/TR/SVG/pservers.html#PatternElementWidthAttribute
        // "A value of zero disables rendering of the element (i.e., no paint is applied)"
        //
        // <pattern width="0">
        if (
            params.patternWidth0 &&
            item.isElem('pattern') &&
            item.hasAttr('width', '0')
        ) return false;

        // Pattern with zero height
        //
        // http://www.w3.org/TR/SVG/pservers.html#PatternElementHeightAttribute
        // "A value of zero disables rendering of the element (i.e., no paint is applied)"
        //
        // <pattern height="0">
        if (
            params.patternHeight0 &&
            item.isElem('pattern') &&
            item.hasAttr('height', '0')
        ) return false;

        // Image with zero width
        //
        // http://www.w3.org/TR/SVG/struct.html#ImageElementWidthAttribute
        // "A value of zero disables rendering of the element"
        //
        // <image width="0">
        if (
            params.imageWidth0 &&
            item.isElem('image') &&
            item.hasAttr('width', '0')
        ) return false;

        // Image with zero height
        //
        // http://www.w3.org/TR/SVG/struct.html#ImageElementHeightAttribute
        // "A value of zero disables rendering of the element"
        //
        // <image height="0">
        if (
            params.imageHeight0 &&
            item.isElem('image') &&
            item.hasAttr('height', '0')
        ) return false;

        // Path with empty data
        //
        // http://www.w3.org/TR/SVG/paths.html#DAttribute
        //
        // <path d=""/>
        if (
            params.pathEmptyD &&
            item.isElem('path') &&
            (!item.hasAttr('d') || !regValidPath.test(item.attr('d').value))
        ) return false;

        // Polyline with empty points
        //
        // http://www.w3.org/TR/SVG/shapes.html#PolylineElementPointsAttribute
        //
        // <polyline points="">
        if (
            params.polylineEmptyPoints &&
            item.isElem('polyline') &&
            !item.hasAttr('points')
        ) return false;

        // Polygon with empty points
        //
        // http://www.w3.org/TR/SVG/shapes.html#PolygonElementPointsAttribute
        //
        // <polygon points="">
        if (
            params.polygonEmptyPoints &&
            item.isElem('polygon') &&
            !item.hasAttr('points')
        ) return false;

    }

};
