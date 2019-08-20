'use strict';

exports.type = 'perItem';

exports.active = true;

exports.description = 'collapses multiple transformations and optimizes it';

exports.params = {
    convertToShorts: true,
    // degPrecision: 3, // transformPrecision (or matrix precision) - 2 by default
    floatPrecision: 3,
    transformPrecision: 5,
    matrixToTransform: true,
    shortTranslate: true,
    shortScale: true,
    shortRotate: true,
    removeUseless: true,
    collapseIntoOne: true,
    leadingZero: true,
    negativeExtraSpace: false
};

var cleanupOutData = require('../lib/svgo/tools').cleanupOutData,
    transform2js = require('./_transforms.js').transform2js,
    transformsMultiply = require('./_transforms.js').transformsMultiply,
    matrixToTransform = require('./_transforms.js').matrixToTransform,
    degRound,
    floatRound,
    transformRound;

/**
 * Convert matrices to the short aliases,
 * convert long translate, scale or rotate transform notations to the shorts ones,
 * convert transforms to the matrices and multiply them all into one,
 * remove useless transforms.
 *
 * @see http://www.w3.org/TR/SVG/coords.html#TransformMatrixDefined
 *
 * @param {Object} item current iteration item
 * @param {Object} params plugin params
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
exports.fn = function(item, params) {

    if (item.elem) {

        // transform
        if (item.hasAttr('transform')) {
            convertTransform(item, 'transform', params);
        }

        // gradientTransform
        if (item.hasAttr('gradientTransform')) {
            convertTransform(item, 'gradientTransform', params);
        }

        // patternTransform
        if (item.hasAttr('patternTransform')) {
            convertTransform(item, 'patternTransform', params);
        }

    }

};

/**
 * Main function.
 *
 * @param {Object} item input item
 * @param {String} attrName attribute name
 * @param {Object} params plugin params
 */
function convertTransform(item, attrName, params) {
    var data = transform2js(item.attr(attrName).value);
    params = definePrecision(data, params);

    if (params.collapseIntoOne && data.length > 1) {
        data = [transformsMultiply(data)];
    }

    if (params.convertToShorts) {
        data = convertToShorts(data, params);
    } else {
        data.forEach(roundTransform);
    }

    if (params.removeUseless) {
        data = removeUseless(data);
    }

    if (data.length) {
        item.attr(attrName).value = js2transform(data, params);
    } else {
        item.removeAttr(attrName);
    }
}

/**
 * Defines precision to work with certain parts.
 * transformPrecision - for scale and four first matrix parameters (needs a better precision due to multiplying),
 * floatPrecision - for translate including two last matrix and rotate parameters,
 * degPrecision - for rotate and skew. By default it's equal to (rougly)
 * transformPrecision - 2 or floatPrecision whichever is lower. Can be set in params.
 *
 * @param {Array} transforms input array
 * @param {Object} params plugin params
 * @return {Array} output array
 */
function definePrecision(data, params) {
    /* jshint validthis: true */
    var matrixData = data.reduce(getMatrixData, []),
        significantDigits = params.transformPrecision;

    // Clone params so it don't affect other elements transformations.
    params = Object.assign({}, params);

    // Limit transform precision with matrix one. Calculating with larger precision doesn't add any value.
    if (matrixData.length) {
        params.transformPrecision = Math.min(params.transformPrecision,
            Math.max.apply(Math, matrixData.map(floatDigits)) || params.transformPrecision);

        significantDigits = Math.max.apply(Math, matrixData.map(function(n) {
            return String(n).replace(/\D+/g, '').length; // Number of digits in a number. 123.45 → 5
        }));
    }
    // No sense in angle precision more then number of significant digits in matrix.
    if (!('degPrecision' in params)) {
        params.degPrecision = Math.max(0, Math.min(params.floatPrecision, significantDigits - 2));
    }

    floatRound = params.floatPrecision >= 1 && params.floatPrecision < 20 ?
        smartRound.bind(this, params.floatPrecision) :
        round;
    degRound = params.degPrecision >= 1 && params.floatPrecision < 20 ?
        smartRound.bind(this, params.degPrecision) :
        round;
    transformRound = params.transformPrecision >= 1 && params.floatPrecision < 20 ?
        smartRound.bind(this, params.transformPrecision) :
        round;

    return params;
}

/**
 * Gathers four first matrix parameters.
 *
 * @param {Array} a array of data
 * @param {Object} transform
 * @return {Array} output array
 */
function getMatrixData(a, b) {
    return b.name == 'matrix' ? a.concat(b.data.slice(0, 4)) : a;
}

/**
 * Returns number of digits after the point. 0.125 → 3
 */
function floatDigits(n) {
    return (n = String(n)).slice(n.indexOf('.')).length - 1;
}

/**
 * Convert transforms to the shorthand alternatives.
 *
 * @param {Array} transforms input array
 * @param {Object} params plugin params
 * @return {Array} output array
 */
function convertToShorts(transforms, params) {

    for(var i = 0; i < transforms.length; i++) {

        var transform = transforms[i];

        // convert matrix to the short aliases
        if (
            params.matrixToTransform &&
            transform.name === 'matrix'
        ) {
            var decomposed = matrixToTransform(transform, params);
            if (decomposed != transform &&
                js2transform(decomposed, params).length <= js2transform([transform], params).length) {

                transforms.splice.apply(transforms, [i, 1].concat(decomposed));
            }
            transform = transforms[i];
        }

        // fixed-point numbers
        // 12.754997 → 12.755
        roundTransform(transform);

        // convert long translate transform notation to the shorts one
        // translate(10 0) → translate(10)
        if (
            params.shortTranslate &&
            transform.name === 'translate' &&
            transform.data.length === 2 &&
            !transform.data[1]
        ) {
            transform.data.pop();
        }

        // convert long scale transform notation to the shorts one
        // scale(2 2) → scale(2)
        if (
            params.shortScale &&
            transform.name === 'scale' &&
            transform.data.length === 2 &&
            transform.data[0] === transform.data[1]
        ) {
            transform.data.pop();
        }

        // convert long rotate transform notation to the short one
        // translate(cx cy) rotate(a) translate(-cx -cy) → rotate(a cx cy)
        if (
            params.shortRotate &&
            transforms[i - 2] &&
            transforms[i - 2].name === 'translate' &&
            transforms[i - 1].name === 'rotate' &&
            transforms[i].name === 'translate' &&
            transforms[i - 2].data[0] === -transforms[i].data[0] &&
            transforms[i - 2].data[1] === -transforms[i].data[1]
        ) {
            transforms.splice(i - 2, 3, {
                name: 'rotate',
                data: [
                    transforms[i - 1].data[0],
                    transforms[i - 2].data[0],
                    transforms[i - 2].data[1]
                ]
            });

            // splice compensation
            i -= 2;

            transform = transforms[i];
        }

    }

    return transforms;

}

/**
 * Remove useless transforms.
 *
 * @param {Array} transforms input array
 * @return {Array} output array
 */
function removeUseless(transforms) {

    return transforms.filter(function(transform) {

        // translate(0), rotate(0[, cx, cy]), skewX(0), skewY(0)
        if (
            ['translate', 'rotate', 'skewX', 'skewY'].indexOf(transform.name) > -1 &&
            (transform.data.length == 1 || transform.name == 'rotate') &&
            !transform.data[0] ||

            // translate(0, 0)
            transform.name == 'translate' &&
            !transform.data[0] &&
            !transform.data[1] ||

            // scale(1)
            transform.name == 'scale' &&
            transform.data[0] == 1 &&
            (transform.data.length < 2 || transform.data[1] == 1) ||

            // matrix(1 0 0 1 0 0)
            transform.name == 'matrix' &&
            transform.data[0] == 1 &&
            transform.data[3] == 1 &&
            !(transform.data[1] || transform.data[2] || transform.data[4] || transform.data[5])
        ) {
            return false;
        }

        return true;

    });

}

/**
 * Convert transforms JS representation to string.
 *
 * @param {Array} transformJS JS representation array
 * @param {Object} params plugin params
 * @return {String} output string
 */
function js2transform(transformJS, params) {

    var transformString = '';

    // collect output value string
    transformJS.forEach(function(transform) {
        roundTransform(transform);
        transformString += (transformString && ' ') + transform.name + '(' + cleanupOutData(transform.data, params) + ')';
    });

    return transformString;

}

function roundTransform(transform) {
    switch (transform.name) {
        case 'translate':
            transform.data = floatRound(transform.data);
            break;
        case 'rotate':
            transform.data = degRound(transform.data.slice(0, 1)).concat(floatRound(transform.data.slice(1)));
            break;
        case 'skewX':
        case 'skewY':
            transform.data = degRound(transform.data);
            break;
        case 'scale':
            transform.data = transformRound(transform.data);
            break;
        case 'matrix':
            transform.data = transformRound(transform.data.slice(0, 4)).concat(floatRound(transform.data.slice(4)));
            break;
    }
    return transform;
}

/**
 * Rounds numbers in array.
 *
 * @param {Array} data input data array
 * @return {Array} output data array
 */
function round(data) {
    return data.map(Math.round);
}

/**
 * Decrease accuracy of floating-point numbers
 * in transforms keeping a specified number of decimals.
 * Smart rounds values like 2.349 to 2.35.
 *
 * @param {Number} fixed number of decimals
 * @param {Array} data input data array
 * @return {Array} output data array
 */
function smartRound(precision, data) {
    for (var i = data.length, tolerance = +Math.pow(.1, precision).toFixed(precision); i--;) {
        if (data[i].toFixed(precision) != data[i]) {
            var rounded = +data[i].toFixed(precision - 1);
            data[i] = +Math.abs(rounded - data[i]).toFixed(precision + 1) >= tolerance ?
                +data[i].toFixed(precision) :
                rounded;
        }
    }
    return data;
}
