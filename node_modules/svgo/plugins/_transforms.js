'use strict';

var regTransformTypes = /matrix|translate|scale|rotate|skewX|skewY/,
    regTransformSplit = /\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/,
    regNumericValues = /[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g;

/**
 * Convert transform string to JS representation.
 *
 * @param {String} transformString input string
 * @param {Object} params plugin params
 * @return {Array} output array
 */
exports.transform2js = function(transformString) {

        // JS representation of the transform data
    var transforms = [],
        // current transform context
        current;

    // split value into ['', 'translate', '10 50', '', 'scale', '2', '', 'rotate', '-45', '']
    transformString.split(regTransformSplit).forEach(function(item) {
        /*jshint -W084 */
        var num;

        if (item) {
            // if item is a translate function
            if (regTransformTypes.test(item)) {
                // then collect it and change current context
                transforms.push(current = { name: item });
            // else if item is data
            } else {
                // then split it into [10, 50] and collect as context.data
                while (num = regNumericValues.exec(item)) {
                    num = Number(num);
                    if (current.data)
                        current.data.push(num);
                    else
                        current.data = [num];
                }
            }
        }
    });

    // return empty array if broken transform (no data)
    return current && current.data ? transforms : [];
};

/**
 * Multiply transforms into one.
 *
 * @param {Array} input transforms array
 * @return {Array} output matrix array
 */
exports.transformsMultiply = function(transforms) {

    // convert transforms objects to the matrices
    transforms = transforms.map(function(transform) {
        if (transform.name === 'matrix') {
            return transform.data;
        }
        return transformToMatrix(transform);
    });

    // multiply all matrices into one
    transforms = {
        name: 'matrix',
        data: transforms.length > 0 ? transforms.reduce(multiplyTransformMatrices) : []
    };

    return transforms;

};

/**
 * Do math like a schoolgirl.
 *
 * @type {Object}
 */
var mth = exports.mth = {

    rad: function(deg) {
        return deg * Math.PI / 180;
    },

    deg: function(rad) {
        return rad * 180 / Math.PI;
    },

    cos: function(deg) {
        return Math.cos(this.rad(deg));
    },

    acos: function(val, floatPrecision) {
        return +(this.deg(Math.acos(val)).toFixed(floatPrecision));
    },

    sin: function(deg) {
        return Math.sin(this.rad(deg));
    },

    asin: function(val, floatPrecision) {
        return +(this.deg(Math.asin(val)).toFixed(floatPrecision));
    },

    tan: function(deg) {
        return Math.tan(this.rad(deg));
    },

    atan: function(val, floatPrecision) {
        return +(this.deg(Math.atan(val)).toFixed(floatPrecision));
    }

};

/**
 * Decompose matrix into simple transforms. See
 * http://frederic-wang.fr/decomposition-of-2d-transform-matrices.html
 *
 * @param {Object} data matrix transform object
 * @return {Object|Array} transforms array or original transform object
 */
exports.matrixToTransform = function(transform, params) {
    var floatPrecision = params.floatPrecision,
        data = transform.data,
        transforms = [],
        sx = +Math.hypot(data[0], data[1]).toFixed(params.transformPrecision),
        sy = +((data[0] * data[3] - data[1] * data[2]) / sx).toFixed(params.transformPrecision),
        colsSum = data[0] * data[2] + data[1] * data[3],
        rowsSum = data[0] * data[1] + data[2] * data[3],
        scaleBefore = rowsSum != 0 || sx == sy;

    // [..., ..., ..., ..., tx, ty] → translate(tx, ty)
    if (data[4] || data[5]) {
        transforms.push({ name: 'translate', data: data.slice(4, data[5] ? 6 : 5) });
    }

    // [sx, 0, tan(a)·sy, sy, 0, 0] → skewX(a)·scale(sx, sy)
    if (!data[1] && data[2]) {
        transforms.push({ name: 'skewX', data: [mth.atan(data[2] / sy, floatPrecision)] });

    // [sx, sx·tan(a), 0, sy, 0, 0] → skewY(a)·scale(sx, sy)
    } else if (data[1] && !data[2]) {
        transforms.push({ name: 'skewY', data: [mth.atan(data[1] / data[0], floatPrecision)] });
        sx = data[0];
        sy = data[3];

    // [sx·cos(a), sx·sin(a), sy·-sin(a), sy·cos(a), x, y] → rotate(a[, cx, cy])·(scale or skewX) or
    // [sx·cos(a), sy·sin(a), sx·-sin(a), sy·cos(a), x, y] → scale(sx, sy)·rotate(a[, cx, cy]) (if !scaleBefore)
    } else if (!colsSum || (sx == 1 && sy == 1) || !scaleBefore) {
        if (!scaleBefore) {
            sx = (data[0] < 0 ? -1 : 1) * Math.hypot(data[0], data[2]);
            sy = (data[3] < 0 ? -1 : 1) * Math.hypot(data[1], data[3]);
            transforms.push({ name: 'scale', data: [sx, sy] });
        }
        var angle = Math.min(Math.max(-1, data[0] / sx), 1),
            rotate = [mth.acos(angle, floatPrecision) * ((scaleBefore ? 1 : sy) * data[1] < 0 ? -1 : 1)];

        if (rotate[0]) transforms.push({ name: 'rotate', data: rotate });

        if (rowsSum && colsSum) transforms.push({
            name: 'skewX',
            data: [mth.atan(colsSum / (sx * sx), floatPrecision)]
        });

        // rotate(a, cx, cy) can consume translate() within optional arguments cx, cy (rotation point)
        if (rotate[0] && (data[4] || data[5])) {
            transforms.shift();
            var cos = data[0] / sx,
                sin = data[1] / (scaleBefore ? sx : sy),
                x = data[4] * (scaleBefore || sy),
                y = data[5] * (scaleBefore || sx),
                denom = (Math.pow(1 - cos, 2) + Math.pow(sin, 2)) * (scaleBefore || sx * sy);
            rotate.push(((1 - cos) * x - sin * y) / denom);
            rotate.push(((1 - cos) * y + sin * x) / denom);
        }

    // Too many transformations, return original matrix if it isn't just a scale/translate
    } else if (data[1] || data[2]) {
        return transform;
    }

    if (scaleBefore && (sx != 1 || sy != 1) || !transforms.length) transforms.push({
        name: 'scale',
        data: sx == sy ? [sx] : [sx, sy]
    });

    return transforms;
};

/**
 * Convert transform to the matrix data.
 *
 * @param {Object} transform transform object
 * @return {Array} matrix data
 */
function transformToMatrix(transform) {

    if (transform.name === 'matrix') return transform.data;

    var matrix;

    switch (transform.name) {
        case 'translate':
            // [1, 0, 0, 1, tx, ty]
            matrix = [1, 0, 0, 1, transform.data[0], transform.data[1] || 0];
            break;
        case 'scale':
            // [sx, 0, 0, sy, 0, 0]
            matrix = [transform.data[0], 0, 0, transform.data[1] || transform.data[0], 0, 0];
            break;
        case 'rotate':
            // [cos(a), sin(a), -sin(a), cos(a), x, y]
            var cos = mth.cos(transform.data[0]),
                sin = mth.sin(transform.data[0]),
                cx = transform.data[1] || 0,
                cy = transform.data[2] || 0;

            matrix = [cos, sin, -sin, cos, (1 - cos) * cx + sin * cy, (1 - cos) * cy - sin * cx];
            break;
        case 'skewX':
            // [1, 0, tan(a), 1, 0, 0]
            matrix = [1, 0, mth.tan(transform.data[0]), 1, 0, 0];
            break;
        case 'skewY':
            // [1, tan(a), 0, 1, 0, 0]
            matrix = [1, mth.tan(transform.data[0]), 0, 1, 0, 0];
            break;
    }

    return matrix;

}

/**
 * Applies transformation to an arc. To do so, we represent ellipse as a matrix, multiply it
 * by the transformation matrix and use a singular value decomposition to represent in a form
 * rotate(θ)·scale(a b)·rotate(φ). This gives us new ellipse params a, b and θ.
 * SVD is being done with the formulae provided by Wolffram|Alpha (svd {{m0, m2}, {m1, m3}})
 *
 * @param {Array} arc [a, b, rotation in deg]
 * @param {Array} transform transformation matrix
 * @return {Array} arc transformed input arc
 */
exports.transformArc = function(arc, transform) {

    var a = arc[0],
        b = arc[1],
        rot = arc[2] * Math.PI / 180,
        cos = Math.cos(rot),
        sin = Math.sin(rot),
        h = Math.pow(arc[5] * cos + arc[6] * sin, 2) / (4 * a * a) +
            Math.pow(arc[6] * cos - arc[5] * sin, 2) / (4 * b * b);
    if (h > 1) {
        h = Math.sqrt(h);
        a *= h;
        b *= h;
    }
    var ellipse = [a * cos, a * sin, -b * sin, b * cos, 0, 0],
        m = multiplyTransformMatrices(transform, ellipse),
        // Decompose the new ellipse matrix
        lastCol = m[2] * m[2] + m[3] * m[3],
        squareSum = m[0] * m[0] + m[1] * m[1] + lastCol,
        root = Math.hypot(m[0] - m[3], m[1] + m[2]) * Math.hypot(m[0] + m[3], m[1] - m[2]);

    if (!root) { // circle
        arc[0] = arc[1] = Math.sqrt(squareSum / 2);
        arc[2] = 0;
    } else {
        var majorAxisSqr = (squareSum + root) / 2,
            minorAxisSqr = (squareSum - root) / 2,
            major = Math.abs(majorAxisSqr - lastCol) > 1e-6,
            sub = (major ? majorAxisSqr : minorAxisSqr) - lastCol,
            rowsSum = m[0] * m[2] + m[1] * m[3],
            term1 = m[0] * sub + m[2] * rowsSum,
            term2 = m[1] * sub + m[3] * rowsSum;
        arc[0] = Math.sqrt(majorAxisSqr);
        arc[1] = Math.sqrt(minorAxisSqr);
        arc[2] = ((major ? term2 < 0 : term1 > 0) ? -1 : 1) *
            Math.acos((major ? term1 : term2) / Math.hypot(term1, term2)) * 180 / Math.PI;
    }

    if ((transform[0] < 0) !== (transform[3] < 0)) {
        // Flip the sweep flag if coordinates are being flipped horizontally XOR vertically
        arc[4] = 1 - arc[4];
    }

    return arc;

};

/**
 * Multiply transformation matrices.
 *
 * @param {Array} a matrix A data
 * @param {Array} b matrix B data
 * @return {Array} result
 */
function multiplyTransformMatrices(a, b) {

    return [
        a[0] * b[0] + a[2] * b[1],
        a[1] * b[0] + a[3] * b[1],
        a[0] * b[2] + a[2] * b[3],
        a[1] * b[2] + a[3] * b[3],
        a[0] * b[4] + a[2] * b[5] + a[4],
        a[1] * b[4] + a[3] * b[5] + a[5]
    ];

}
