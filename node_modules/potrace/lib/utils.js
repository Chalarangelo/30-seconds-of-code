'use strict';

var Point = require('./types/Point');
var attrRegexps = {};

function getAttrRegexp(attrName) {
  if (attrRegexps[attrName]) {
    return attrRegexps[attrName];
  }

  attrRegexps[attrName] = new RegExp(' ' + attrName + '="((?:\\\\(?=")"|[^"])+)"', 'i');
  return attrRegexps[attrName];
}

function setHtmlAttribute(html, attrName, value) {
  var attr = ' ' + attrName + '="' + value + '"';

  if (html.indexOf(' ' + attrName + '="') === -1) {
    html = html.replace(/<[a-z]+/i, function(beginning) { return beginning + attr; });
  } else {
    html = html.replace(getAttrRegexp(attrName), attr);
  }

  return html;
}

function fixed(number) {
  return number.toFixed(3).replace('.000', '');
}

function mod(a, n) {
  return a >= n ? a % n : a>=0 ? a : n-1-(-1-a) % n;
}

function xprod(p1, p2) {
  return p1.x * p2.y - p1.y * p2.x;
}

function cyclic(a, b, c) {
  if (a <= c) {
    return (a <= b && b < c);
  } else {
    return (a <= b || b < c);
  }
}

function sign(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}

function quadform(Q, w) {
  var v = new Array(3), i, j, sum;

  v[0] = w.x;
  v[1] = w.y;
  v[2] = 1;
  sum = 0.0;

  for (i=0; i<3; i++) {
    for (j=0; j<3; j++) {
      sum += v[i] * Q.at(i, j) * v[j];
    }
  }
  return sum;
}

function interval(lambda, a, b) {
  var res = new Point();

  res.x = a.x + lambda * (b.x - a.x);
  res.y = a.y + lambda * (b.y - a.y);
  return res;
}

function dorth_infty(p0, p2) {
  var r = new Point();

  r.y = sign(p2.x - p0.x);
  r.x = -sign(p2.y - p0.y);

  return r;
}

function ddenom(p0, p2) {
  var r = dorth_infty(p0, p2);

  return r.y * (p2.x - p0.x) - r.x * (p2.y - p0.y);
}

function dpara(p0, p1, p2) {
  var x1, y1, x2, y2;

  x1 = p1.x - p0.x;
  y1 = p1.y - p0.y;
  x2 = p2.x - p0.x;
  y2 = p2.y - p0.y;

  return x1 * y2 - x2 * y1;
}

function cprod(p0, p1, p2, p3) {
  var x1, y1, x2, y2;

  x1 = p1.x - p0.x;
  y1 = p1.y - p0.y;
  x2 = p3.x - p2.x;
  y2 = p3.y - p2.y;

  return x1 * y2 - x2 * y1;
}

function iprod(p0, p1, p2) {
  var x1, y1, x2, y2;

  x1 = p1.x - p0.x;
  y1 = p1.y - p0.y;
  x2 = p2.x - p0.x;
  y2 = p2.y - p0.y;

  return x1*x2 + y1*y2;
}

function iprod1(p0, p1, p2, p3) {
  var x1, y1, x2, y2;

  x1 = p1.x - p0.x;
  y1 = p1.y - p0.y;
  x2 = p3.x - p2.x;
  y2 = p3.y - p2.y;

  return x1 * x2 + y1 * y2;
}

function ddist(p, q) {
  return Math.sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y));
}

module.exports = {
  luminance: function (r, g, b) {
    return Math.round(0.2126 * r + 0.7153 * g + 0.0721 * b);
  },

  between: function(val, min, max) {
    return val >= min && val <= max;
  },

  clamp: function(val, min, max) {
    return Math.min(max, Math.max(min, val));
  },
  
  isNumber: function(val) {
    return typeof val === 'number';
  },

  setHtmlAttr: setHtmlAttribute,

  /**
   * Generates path instructions for given curve
   *
   * @param {Curve} curve
   * @param {Number} [scale]
   * @returns {string}
   */
  renderCurve: function(curve, scale) {
    scale = scale || 1;

    var startingPoint = curve.c[(curve.n - 1) * 3 + 2];

    var path = 'M '
      + fixed(startingPoint.x * scale) + ' '
      + fixed(startingPoint.y * scale) + ' ';

    curve.tag.forEach(function(tag, i) {
      var i3 = i * 3;
      var p0 = curve.c[i3];
      var p1 = curve.c[i3 + 1];
      var p2 = curve.c[i3 + 2];

      if (tag === "CURVE") {
        path += 'C ';
        path += fixed(p0.x * scale) + ' ' + fixed(p0.y * scale) + ', ';
        path += fixed(p1.x * scale) + ' ' + fixed(p1.y * scale) + ', ';
        path += fixed(p2.x * scale) + ' ' + fixed(p2.y * scale) + ' ';
      } else if (tag === "CORNER") {
        path += 'L ';
        path += fixed(p1.x * scale) + ' ' + fixed(p1.y * scale) + ' ';
        path += fixed(p2.x * scale) + ' ' + fixed(p2.y * scale) + ' ';
      }
    });

    return path;
  },
  
  bezier: function bezier(t, p0, p1, p2, p3) {
    var s = 1 - t, res = new Point();

    res.x = s*s*s*p0.x + 3*(s*s*t)*p1.x + 3*(t*t*s)*p2.x + t*t*t*p3.x;
    res.y = s*s*s*p0.y + 3*(s*s*t)*p1.y + 3*(t*t*s)*p2.y + t*t*t*p3.y;

    return res;
  },

  tangent: function tangent(p0, p1, p2, p3, q0, q1) {
    var A, B, C, a, b, c, d, s, r1, r2;

    A = cprod(p0, p1, q0, q1);
    B = cprod(p1, p2, q0, q1);
    C = cprod(p2, p3, q0, q1);

    a = A - 2 * B + C;
    b = -2 * A + 2 * B;
    c = A;

    d = b * b - 4 * a * c;

    if (a===0 || d<0) {
      return -1.0;
    }

    s = Math.sqrt(d);

    r1 = (-b + s) / (2 * a);
    r2 = (-b - s) / (2 * a);

    if (r1 >= 0 && r1 <= 1) {
      return r1;
    } else if (r2 >= 0 && r2 <= 1) {
      return r2;
    } else {
      return -1.0;
    }
  },

  mod: mod,
  xprod: xprod,
  cyclic: cyclic,
  sign: sign,
  quadform: quadform,
  interval: interval,
  dorth_infty: dorth_infty,
  ddenom: ddenom,
  dpara: dpara,
  cprod: cprod,
  iprod: iprod,
  iprod1: iprod1,
  ddist: ddist
};