'use strict';

var Jimp = require('jimp');
var Bitmap = require('./types/Bitmap');
var Curve = require('./types/Curve');
var Point = require('./types/Point');
var Path = require('./types/Path');
var Quad = require('./types/Quad');
var Sum = require('./types/Sum');
var Opti = require('./types/Opti');

var utils = require('./utils');

/**
 * Potrace class
 *
 * @param {Potrace~Options} [options]
 * @constructor
 */
function Potrace (options) {
  this._luminanceData = null;
  this._pathlist = [];

  this._imageLoadingIdentifier = null;
  this._imageLoaded = false;
  this._processed = false;

  this._params = {
    turnPolicy: Potrace.TURNPOLICY_MINORITY,
    turdSize: 2,
    alphaMax: 1,
    optCurve: true,
    optTolerance: 0.2,
    threshold: Potrace.THRESHOLD_AUTO,
    blackOnWhite: true,
    color: Potrace.COLOR_AUTO,
    background: Potrace.COLOR_TRANSPARENT
  };

  if (options) {
    this.setParameters(options);
  }
}

Potrace.COLOR_AUTO = 'auto';
Potrace.COLOR_TRANSPARENT = 'transparent';
Potrace.THRESHOLD_AUTO = -1;
Potrace.TURNPOLICY_BLACK = 'black';
Potrace.TURNPOLICY_WHITE = 'white';
Potrace.TURNPOLICY_LEFT = 'left';
Potrace.TURNPOLICY_RIGHT = 'right';
Potrace.TURNPOLICY_MINORITY = 'minority';
Potrace.TURNPOLICY_MAJORITY = 'majority';

var SUPPORTED_TURNPOLICY_VALUES = [
  Potrace.TURNPOLICY_BLACK, Potrace.TURNPOLICY_WHITE,
  Potrace.TURNPOLICY_LEFT, Potrace.TURNPOLICY_RIGHT,
  Potrace.TURNPOLICY_MINORITY, Potrace.TURNPOLICY_MAJORITY
];

Potrace.prototype = {
  /**
   * Creating a new {@link Path} for every group of black pixels.
   * @private
   */
  _bmToPathlist: function() {
    var self = this,
        threshold = this._params.threshold,
        blackOnWhite = this._params.blackOnWhite,
        blackMap,
        currentPoint = new Point(0, 0),
        path;

    if (threshold === Potrace.THRESHOLD_AUTO) {
      threshold = this._luminanceData.histogram().autoThreshold() || 128;
    }

    blackMap = this._luminanceData.copy(function(lum) {
      var pastTheThreshold = blackOnWhite
        ? lum > threshold
        : lum < threshold;

      return pastTheThreshold ? 0 : 1;
    });
      
    /**
     * finds next black pixel of the image
     *
     * @param {Point} point
     * @returns {boolean}
     * @private
     */
    function findNext(point) {
      var i = blackMap.pointToIndex(point);

      while (i < blackMap.size && blackMap.data[i] !== 1) {
        i++;
      }

      return i < blackMap.size && blackMap.indexToPoint(i);
    }

    function majority(x, y) {
      var i, a, ct;

      for (i = 2; i < 5; i++) {
        ct = 0;
        for (a = -i + 1; a <= i - 1; a++) {
          ct += blackMap.getValueAt(x + a, y + i - 1) ? 1 : -1;
          ct += blackMap.getValueAt(x + i - 1, y + a - 1) ? 1 : -1;
          ct += blackMap.getValueAt(x + a - 1, y - i) ? 1 : -1;
          ct += blackMap.getValueAt(x - i, y + a) ? 1 : -1;
        }

        if (ct > 0) {
          return 1;
        } else if (ct < 0) {
          return 0;
        }
      }
      return 0;
    }

    function findPath(point) {
      var path = new Path(),
          x = point.x,
          y = point.y,
          dirx = 0,
          diry = 1,
          tmp;

      path.sign = blackMap.getValueAt(point.x, point.y) ? "+" : "-";

      while (1) {
        path.pt.push(new Point(x, y));
        if (x > path.maxX)
          path.maxX = x;
        if (x < path.minX)
          path.minX = x;
        if (y > path.maxY)
          path.maxY = y;
        if (y < path.minY)
          path.minY = y;
        path.len++;

        x += dirx;
        y += diry;
        path.area -= x * diry;

        if (x === point.x && y === point.y)
          break;

        var l = blackMap.getValueAt(x + (dirx + diry - 1 ) / 2, y + (diry - dirx - 1) / 2);
        var r = blackMap.getValueAt(x + (dirx - diry - 1) / 2, y + (diry + dirx - 1) / 2);

        if (r && !l) {
          if (self._params.turnPolicy === "right" ||
            (self._params.turnPolicy === "black" && path.sign === '+') ||
            (self._params.turnPolicy === "white" && path.sign === '-') ||
            (self._params.turnPolicy === "majority" && majority(x, y)) ||
            (self._params.turnPolicy === "minority" && !majority(x, y))) {
            tmp = dirx;
            dirx = -diry;
            diry = tmp;
          } else {
            tmp = dirx;
            dirx = diry;
            diry = -tmp;
          }
        } else if (r) {
          tmp = dirx;
          dirx = -diry;
          diry = tmp;
        } else if (!l) {
          tmp = dirx;
          dirx = diry;
          diry = -tmp;
        }
      }
      return path;
    }

    function xorPath(path){
      var y1 = path.pt[0].y,
        len = path.len,
        x, y, maxX, minY, i, j,
        indx;

      for (i = 1; i < len; i++) {
        x = path.pt[i].x;
        y = path.pt[i].y;

        if (y !== y1) {
          minY = y1 < y ? y1 : y;
          maxX = path.maxX;
          for (j = x; j < maxX; j++) {
            indx = blackMap.pointToIndex(j, minY);
            blackMap.data[indx] = blackMap.data[indx] ? 0 : 1;
          }
          y1 = y;
        }
      }
    }

    // Clear path list
    this._pathlist = [];

    while (currentPoint = findNext(currentPoint)) {
      path = findPath(currentPoint);
      xorPath(path);

      if (path.area > self._params.turdSize) {
        this._pathlist.push(path);
      }
    }
  },

  /**
   * Processes path list created by _bmToPathlist method creating and optimizing {@link Curve}'s
   * @private
   */
  _processPath: function() {
    var self = this;

    function calcSums(path) {
      var i, x, y;
      path.x0 = path.pt[0].x;
      path.y0 = path.pt[0].y;

      path.sums = [];
      var s = path.sums;
      s.push(new Sum(0, 0, 0, 0, 0));
      for(i = 0; i < path.len; i++){
        x = path.pt[i].x - path.x0;
        y = path.pt[i].y - path.y0;
        s.push(new Sum(s[i].x + x, s[i].y + y, s[i].xy + x * y,
            s[i].x2 + x * x, s[i].y2 + y * y));
      }
    }

    function calcLon(path) {

      var n = path.len,
          pt = path.pt,
          dir,
          pivk = new Array(n),
          nc = new Array(n),
          ct = new Array(4);

      path.lon = new Array(n);

      var constraint = [new Point(), new Point()],
          cur = new Point(),
          off = new Point(),
          dk = new Point(),
          foundk;

      var i, j, k1, a, b, c, d, k = 0;
      for(i = n - 1; i >= 0; i--){
        if (pt[i].x != pt[k].x && pt[i].y != pt[k].y) {
          k = i + 1;
        }
        nc[i] = k;
      }

      for (i = n - 1; i >= 0; i--) {
        ct[0] = ct[1] = ct[2] = ct[3] = 0;
        dir = (3 + 3 * (pt[utils.mod(i + 1, n)].x - pt[i].x) +
            (pt[utils.mod(i + 1, n)].y - pt[i].y)) / 2;
        ct[dir]++;

        constraint[0].x = 0;
        constraint[0].y = 0;
        constraint[1].x = 0;
        constraint[1].y = 0;

        k = nc[i];
        k1 = i;
        while (1) {
          foundk = 0;
          dir =  (3 + 3 * utils.sign(pt[k].x - pt[k1].x) +
              utils.sign(pt[k].y - pt[k1].y)) / 2;
          ct[dir]++;

          if (ct[0] && ct[1] && ct[2] && ct[3]) {
            pivk[i] = k1;
            foundk = 1;
            break;
          }

          cur.x = pt[k].x - pt[i].x;
          cur.y = pt[k].y - pt[i].y;

          if (utils.xprod(constraint[0], cur) < 0 || utils.xprod(constraint[1], cur) > 0) {
            break;
          }

          if (Math.abs(cur.x) <= 1 && Math.abs(cur.y) <= 1) {

          } else {
            off.x = cur.x + ((cur.y >= 0 && (cur.y > 0 || cur.x < 0)) ? 1 : -1);
            off.y = cur.y + ((cur.x <= 0 && (cur.x < 0 || cur.y < 0)) ? 1 : -1);
            if (utils.xprod(constraint[0], off) >= 0) {
              constraint[0].x = off.x;
              constraint[0].y = off.y;
            }
            off.x = cur.x + ((cur.y <= 0 && (cur.y < 0 || cur.x < 0)) ? 1 : -1);
            off.y = cur.y + ((cur.x >= 0 && (cur.x > 0 || cur.y < 0)) ? 1 : -1);
            if (utils.xprod(constraint[1], off) <= 0) {
              constraint[1].x = off.x;
              constraint[1].y = off.y;
            }
          }
          k1 = k;
          k = nc[k1];
          if (!utils.cyclic(k, i, k1)) {
            break;
          }
        }
        if (foundk === 0) {
          dk.x = utils.sign(pt[k].x-pt[k1].x);
          dk.y = utils.sign(pt[k].y-pt[k1].y);
          cur.x = pt[k1].x - pt[i].x;
          cur.y = pt[k1].y - pt[i].y;

          a = utils.xprod(constraint[0], cur);
          b = utils.xprod(constraint[0], dk);
          c = utils.xprod(constraint[1], cur);
          d = utils.xprod(constraint[1], dk);

          j = 10000000;

          if (b < 0) {
            j = Math.floor(a / -b);
          }
          if (d > 0) {
            j = Math.min(j, Math.floor(-c / d));
          }

          pivk[i] = utils.mod(k1+j,n);
        }
      }

      j=pivk[n-1];
      path.lon[n-1]=j;
      for (i=n-2; i>=0; i--) {
        if (utils.cyclic(i+1,pivk[i],j)) {
          j=pivk[i];
        }
        path.lon[i]=j;
      }

      for (i=n-1; utils.cyclic(utils.mod(i+1,n),j,path.lon[i]); i--) {
        path.lon[i] = j;
      }
    }

    function bestPolygon(path) {

      function penalty3(path, i, j) {

        var n = path.len, pt = path.pt, sums = path.sums;
        var x, y, xy, x2, y2,
          k, a, b, c, s,
          px, py, ex, ey,
          r = 0;
        if (j>=n) {
          j -= n;
          r = 1;
        }

        if (r === 0) {
          x = sums[j+1].x - sums[i].x;
          y = sums[j+1].y - sums[i].y;
          x2 = sums[j+1].x2 - sums[i].x2;
          xy = sums[j+1].xy - sums[i].xy;
          y2 = sums[j+1].y2 - sums[i].y2;
          k = j+1 - i;
        } else {
          x = sums[j+1].x - sums[i].x + sums[n].x;
          y = sums[j+1].y - sums[i].y + sums[n].y;
          x2 = sums[j+1].x2 - sums[i].x2 + sums[n].x2;
          xy = sums[j+1].xy - sums[i].xy + sums[n].xy;
          y2 = sums[j+1].y2 - sums[i].y2 + sums[n].y2;
          k = j+1 - i + n;
        }

        px = (pt[i].x + pt[j].x) / 2.0 - pt[0].x;
        py = (pt[i].y + pt[j].y) / 2.0 - pt[0].y;
        ey = (pt[j].x - pt[i].x);
        ex = -(pt[j].y - pt[i].y);

        a = ((x2 - 2*x*px) / k + px*px);
        b = ((xy - x*py - y*px) / k + px*py);
        c = ((y2 - 2*y*py) / k + py*py);

        s = ex*ex*a + 2*ex*ey*b + ey*ey*c;

        return Math.sqrt(s);
      }

      var i, j, m, k,
      n = path.len,
      pen = new Array(n + 1),
      prev = new Array(n + 1),
      clip0 = new Array(n),
      clip1 = new Array(n + 1),
      seg0 = new Array (n + 1),
      seg1 = new Array(n + 1),
      thispen, best, c;

      for (i=0; i<n; i++) {
        c = utils.mod(path.lon[utils.mod(i-1,n)]-1,n);
        if (c == i) {
          c = utils.mod(i+1,n);
        }
        if (c < i) {
          clip0[i] = n;
        } else {
          clip0[i] = c;
        }
      }

      j = 1;
      for (i=0; i<n; i++) {
        while (j <= clip0[i]) {
          clip1[j] = i;
          j++;
        }
      }

      i = 0;
      for (j=0; i<n; j++) {
        seg0[j] = i;
        i = clip0[i];
      }
      seg0[j] = n;
      m = j;

      i = n;
      for (j=m; j>0; j--) {
        seg1[j] = i;
        i = clip1[i];
      }
      seg1[0] = 0;

      pen[0]=0;
      for (j=1; j<=m; j++) {
        for (i=seg1[j]; i<=seg0[j]; i++) {
          best = -1;
          for (k=seg0[j-1]; k>=clip1[i]; k--) {
            thispen = penalty3(path, k, i) + pen[k];
            if (best < 0 || thispen < best) {
              prev[i] = k;
              best = thispen;
            }
          }
          pen[i] = best;
        }
      }
      path.m = m;
      path.po = new Array(m);

      for (i=n, j=m-1; i>0; j--) {
        i = prev[i];
        path.po[j] = i;
      }
    }

    function adjustVertices(path) {

      function pointslope(path, i, j, ctr, dir) {

        var n = path.len, sums = path.sums,
          x, y, x2, xy, y2,
          k, a, b, c, lambda2, l, r=0;

        while (j>=n) {
          j-=n;
          r+=1;
        }
        while (i>=n) {
          i-=n;
          r-=1;
        }
        while (j<0) {
          j+=n;
          r-=1;
        }
        while (i<0) {
          i+=n;
          r+=1;
        }

        x = sums[j+1].x-sums[i].x+r*sums[n].x;
        y = sums[j+1].y-sums[i].y+r*sums[n].y;
        x2 = sums[j+1].x2-sums[i].x2+r*sums[n].x2;
        xy = sums[j+1].xy-sums[i].xy+r*sums[n].xy;
        y2 = sums[j+1].y2-sums[i].y2+r*sums[n].y2;
        k = j+1-i+r*n;

        ctr.x = x/k;
        ctr.y = y/k;

        a = (x2-x*x/k)/k;
        b = (xy-x*y/k)/k;
        c = (y2-y*y/k)/k;

        lambda2 = (a+c+Math.sqrt((a-c)*(a-c)+4*b*b))/2;

        a -= lambda2;
        c -= lambda2;

        if (Math.abs(a) >= Math.abs(c)) {
          l = Math.sqrt(a*a+b*b);
          if (l!==0) {
            dir.x = -b/l;
            dir.y = a/l;
          }
        } else {
          l = Math.sqrt(c*c+b*b);
          if (l!==0) {
            dir.x = -c/l;
            dir.y = b/l;
          }
        }
        if (l===0) {
          dir.x = dir.y = 0;
        }
      }

      var m = path.m, po = path.po, n = path.len, pt = path.pt,
        x0 = path.x0, y0 = path.y0,
        ctr = new Array(m), dir = new Array(m),
        q = new Array(m),
        v = new Array(3), d, i, j, k, l,
        s = new Point();

      path.curve = new Curve(m);

      for (i=0; i<m; i++) {
        j = po[utils.mod(i+1,m)];
        j = utils.mod(j-po[i],n)+po[i];
        ctr[i] = new Point();
        dir[i] = new Point();
        pointslope(path, po[i], j, ctr[i], dir[i]);
      }

      for (i=0; i<m; i++) {
        q[i] = new Quad();
        d = dir[i].x * dir[i].x + dir[i].y * dir[i].y;
        if (d === 0.0) {
          for (j=0; j<3; j++) {
            for (k=0; k<3; k++) {
              q[i].data[j * 3 + k] = 0;
            }
          }
        } else {
          v[0] = dir[i].y;
          v[1] = -dir[i].x;
          v[2] = - v[1] * ctr[i].y - v[0] * ctr[i].x;
          for (l=0; l<3; l++) {
            for (k=0; k<3; k++) {
              q[i].data[l * 3 + k] = v[l] * v[k] / d;
            }
          }
        }
      }

      var Q, w, dx, dy, det, min, cand, xmin, ymin, z;
      for (i=0; i<m; i++) {
        Q = new Quad();
        w = new Point();

        s.x = pt[po[i]].x-x0;
        s.y = pt[po[i]].y-y0;

        j = utils.mod(i-1,m);

        for (l=0; l<3; l++) {
          for (k=0; k<3; k++) {
            Q.data[l * 3 + k] = q[j].at(l, k) + q[i].at(l, k);
          }
        }

        while(1) {

          det = Q.at(0, 0)*Q.at(1, 1) - Q.at(0, 1)*Q.at(1, 0);
          if (det !== 0.0) {
            w.x = (-Q.at(0, 2)*Q.at(1, 1) + Q.at(1, 2)*Q.at(0, 1)) / det;
            w.y = ( Q.at(0, 2)*Q.at(1, 0) - Q.at(1, 2)*Q.at(0, 0)) / det;
            break;
          }

          if (Q.at(0, 0)>Q.at(1, 1)) {
            v[0] = -Q.at(0, 1);
            v[1] = Q.at(0, 0);
          } else if (Q.at(1, 1)) {
            v[0] = -Q.at(1, 1);
            v[1] = Q.at(1, 0);
          } else {
            v[0] = 1;
            v[1] = 0;
          }
          d = v[0] * v[0] + v[1] * v[1];
          v[2] = - v[1] * s.y - v[0] * s.x;
          for (l=0; l<3; l++) {
            for (k=0; k<3; k++) {
              Q.data[l * 3 + k] += v[l] * v[k] / d;
            }
          }
        }
        dx = Math.abs(w.x-s.x);
        dy = Math.abs(w.y-s.y);
        if (dx <= 0.5 && dy <= 0.5) {
          path.curve.vertex[i] = new Point(w.x+x0, w.y+y0);
          continue;
        }

        min = utils.quadform(Q, s);
        xmin = s.x;
        ymin = s.y;

        if (Q.at(0, 0) !== 0.0) {
          for (z=0; z<2; z++) {
            w.y = s.y-0.5+z;
            w.x = - (Q.at(0, 1) * w.y + Q.at(0, 2)) / Q.at(0, 0);
            dx = Math.abs(w.x-s.x);
            cand = utils.quadform(Q, w);
            if (dx <= 0.5 && cand < min) {
              min = cand;
              xmin = w.x;
              ymin = w.y;
            }
          }
        }

        if (Q.at(1, 1) !== 0.0) {
          for (z=0; z<2; z++) {
            w.x = s.x-0.5+z;
            w.y = - (Q.at(1, 0) * w.x + Q.at(1, 2)) / Q.at(1, 1);
            dy = Math.abs(w.y-s.y);
            cand = utils.quadform(Q, w);
            if (dy <= 0.5 && cand < min) {
              min = cand;
              xmin = w.x;
              ymin = w.y;
            }
          }
        }

        for (l=0; l<2; l++) {
          for (k=0; k<2; k++) {
            w.x = s.x-0.5+l;
            w.y = s.y-0.5+k;
            cand = utils.quadform(Q, w);
            if (cand < min) {
              min = cand;
              xmin = w.x;
              ymin = w.y;
            }
          }
        }

        path.curve.vertex[i] = new Point(xmin + x0, ymin + y0);
      }
    }

    function reverse(path) {
      var curve = path.curve, m = curve.n, v = curve.vertex, i, j, tmp;

      for (i=0, j=m-1; i<j; i++, j--) {
        tmp = v[i];
        v[i] = v[j];
        v[j] = tmp;
      }
    }

    function smooth(path) {
      var m = path.curve.n, curve = path.curve;

      var i, j, k, dd, denom, alpha,
        p2, p3, p4;

      for (i=0; i<m; i++) {
        j = utils.mod(i+1, m);
        k = utils.mod(i+2, m);
        p4 = utils.interval(1/2.0, curve.vertex[k], curve.vertex[j]);

        denom = utils.ddenom(curve.vertex[i], curve.vertex[k]);
        if (denom !== 0.0) {
          dd = utils.dpara(curve.vertex[i], curve.vertex[j], curve.vertex[k]) / denom;
          dd = Math.abs(dd);
          alpha = dd>1 ? (1 - 1.0/dd) : 0;
          alpha = alpha / 0.75;
        } else {
          alpha = 4/3.0;
        }
        curve.alpha0[j] = alpha;

        if (alpha >= self._params.alphaMax) {
          curve.tag[j] = "CORNER";
          curve.c[3 * j + 1] = curve.vertex[j];
          curve.c[3 * j + 2] = p4;
        } else {
          if (alpha < 0.55) {
            alpha = 0.55;
          } else if (alpha > 1) {
            alpha = 1;
          }
          p2 = utils.interval(0.5+0.5*alpha, curve.vertex[i], curve.vertex[j]);
          p3 = utils.interval(0.5+0.5*alpha, curve.vertex[k], curve.vertex[j]);
          curve.tag[j] = "CURVE";
          curve.c[3 * j + 0] = p2;
          curve.c[3 * j + 1] = p3;
          curve.c[3 * j + 2] = p4;
        }
        curve.alpha[j] = alpha;
        curve.beta[j] = 0.5;
      }
      curve.alphaCurve = 1;
    }

    function optiCurve(path) {

      function opti_penalty(path, i, j, res, opttolerance, convc, areac) {
        var m = path.curve.n, curve = path.curve, vertex = curve.vertex,
          k, k1, k2, conv, i1,
          area, alpha, d, d1, d2,
          p0, p1, p2, p3, pt,
          A, R, A1, A2, A3, A4,
          s, t;

        if (i==j) {
          return 1;
        }

        k = i;
        i1 = utils.mod(i+1, m);
        k1 = utils.mod(k+1, m);
        conv = convc[k1];
        if (conv === 0) {
          return 1;
        }
        d = utils.ddist(vertex[i], vertex[i1]);
        for (k=k1; k!=j; k=k1) {
          k1 = utils.mod(k+1, m);
          k2 = utils.mod(k+2, m);
          if (convc[k1] != conv) {
            return 1;
          }
          if (utils.sign(utils.cprod(vertex[i], vertex[i1], vertex[k1], vertex[k2])) !=
              conv) {
            return 1;
          }
          if (utils.iprod1(vertex[i], vertex[i1], vertex[k1], vertex[k2]) <
              d * utils.ddist(vertex[k1], vertex[k2]) * -0.999847695156) {
            return 1;
          }
        }

        p0 = curve.c[utils.mod(i,m) * 3 + 2].copy();
        p1 = vertex[utils.mod(i+1,m)].copy();
        p2 = vertex[utils.mod(j,m)].copy();
        p3 = curve.c[utils.mod(j,m) * 3 + 2].copy();

        area = areac[j] - areac[i];
        area -= utils.dpara(vertex[0], curve.c[i * 3 + 2], curve.c[j * 3 + 2])/2;
        if (i>=j) {
          area += areac[m];
        }

        A1 = utils.dpara(p0, p1, p2);
        A2 = utils.dpara(p0, p1, p3);
        A3 = utils.dpara(p0, p2, p3);

        A4 = A1+A3-A2;

        if (A2 == A1) {
          return 1;
        }

        t = A3/(A3-A4);
        s = A2/(A2-A1);
        A = A2 * t / 2.0;

        if (A === 0.0) {
          return 1;
        }

        R = area / A;
        alpha = 2 - Math.sqrt(4 - R / 0.3);

        res.c[0] = utils.interval(t * alpha, p0, p1);
        res.c[1] = utils.interval(s * alpha, p3, p2);
        res.alpha = alpha;
        res.t = t;
        res.s = s;

        p1 = res.c[0].copy();
        p2 = res.c[1].copy();

        res.pen = 0;

        for (k=utils.mod(i+1,m); k!=j; k=k1) {
          k1 = utils.mod(k+1,m);
          t = utils.tangent(p0, p1, p2, p3, vertex[k], vertex[k1]);
          if (t<-0.5) {
            return 1;
          }
          pt = utils.bezier(t, p0, p1, p2, p3);
          d = utils.ddist(vertex[k], vertex[k1]);
          if (d === 0.0) {
            return 1;
          }
          d1 = utils.dpara(vertex[k], vertex[k1], pt) / d;
          if (Math.abs(d1) > opttolerance) {
            return 1;
          }
          if (utils.iprod(vertex[k], vertex[k1], pt) < 0 ||
              utils.iprod(vertex[k1], vertex[k], pt) < 0) {
            return 1;
          }
          res.pen += d1 * d1;
        }

        for (k=i; k!=j; k=k1) {
          k1 = utils.mod(k+1,m);
          t = utils.tangent(p0, p1, p2, p3, curve.c[k * 3 + 2], curve.c[k1 * 3 + 2]);
          if (t<-0.5) {
            return 1;
          }
          pt = utils.bezier(t, p0, p1, p2, p3);
          d = utils.ddist(curve.c[k * 3 + 2], curve.c[k1 * 3 + 2]);
          if (d === 0.0) {
            return 1;
          }
          d1 = utils.dpara(curve.c[k * 3 + 2], curve.c[k1 * 3 + 2], pt) / d;
          d2 = utils.dpara(curve.c[k * 3 + 2], curve.c[k1 * 3 + 2], vertex[k1]) / d;
          d2 *= 0.75 * curve.alpha[k1];
          if (d2 < 0) {
            d1 = -d1;
            d2 = -d2;
          }
          if (d1 < d2 - opttolerance) {
            return 1;
          }
          if (d1 < d2) {
            res.pen += (d1 - d2) * (d1 - d2);
          }
        }

        return 0;
      }

      var curve = path.curve, m = curve.n, vert = curve.vertex,
          pt = new Array(m + 1),
          pen = new Array(m + 1),
          len = new Array(m + 1),
          opt = new Array(m + 1),
          om, i,j,r,
          o = new Opti(), p0,
          i1, area, alpha, ocurve,
          s, t;

      var convc = new Array(m), areac = new Array(m + 1);

      for (i=0; i<m; i++) {
        if (curve.tag[i] == "CURVE") {
          convc[i] = utils.sign(utils.dpara(vert[utils.mod(i-1,m)], vert[i], vert[utils.mod(i+1,m)]));
        } else {
          convc[i] = 0;
        }
      }

      area = 0.0;
      areac[0] = 0.0;
      p0 = curve.vertex[0];
      for (i=0; i<m; i++) {
        i1 = utils.mod(i+1, m);
        if (curve.tag[i1] == "CURVE") {
          alpha = curve.alpha[i1];
          area += 0.3 * alpha * (4-alpha) *
              utils.dpara(curve.c[i * 3 + 2], vert[i1], curve.c[i1 * 3 + 2])/2;
          area += utils.dpara(p0, curve.c[i * 3 + 2], curve.c[i1 * 3 + 2])/2;
        }
        areac[i+1] = area;
      }

      pt[0] = -1;
      pen[0] = 0;
      len[0] = 0;


      for (j=1; j<=m; j++) {
        pt[j] = j-1;
        pen[j] = pen[j-1];
        len[j] = len[j-1]+1;

        for (i=j-2; i>=0; i--) {
          r = opti_penalty(path, i, utils.mod(j,m), o, self._params.optTolerance, convc,
              areac);
          if (r) {
            break;
          }
            if (len[j] > len[i]+1 ||
                (len[j] == len[i]+1 && pen[j] > pen[i] + o.pen)) {
              pt[j] = i;
              pen[j] = pen[i] + o.pen;
              len[j] = len[i] + 1;
              opt[j] = o;
              o = new Opti();
            }
        }
      }
      om = len[m];
      ocurve = new Curve(om);
      s = new Array(om);
      t = new Array(om);

      j = m;
      for (i=om-1; i>=0; i--) {
        if (pt[j]==j-1) {
          ocurve.tag[i]       = curve.tag[utils.mod(j,m)];
          ocurve.c[i * 3 + 0] = curve.c[utils.mod(j,m) * 3 + 0];
          ocurve.c[i * 3 + 1] = curve.c[utils.mod(j,m) * 3 + 1];
          ocurve.c[i * 3 + 2] = curve.c[utils.mod(j,m) * 3 + 2];
          ocurve.vertex[i]    = curve.vertex[utils.mod(j,m)];
          ocurve.alpha[i]     = curve.alpha[utils.mod(j,m)];
          ocurve.alpha0[i]    = curve.alpha0[utils.mod(j,m)];
          ocurve.beta[i]      = curve.beta[utils.mod(j,m)];
          s[i] = t[i] = 1.0;
        } else {
          ocurve.tag[i] = "CURVE";
          ocurve.c[i * 3 + 0] = opt[j].c[0];
          ocurve.c[i * 3 + 1] = opt[j].c[1];
          ocurve.c[i * 3 + 2] = curve.c[utils.mod(j,m) * 3 + 2];
          ocurve.vertex[i] = utils.interval(opt[j].s, curve.c[utils.mod(j,m) * 3 + 2],
                                       vert[utils.mod(j,m)]);
          ocurve.alpha[i] = opt[j].alpha;
          ocurve.alpha0[i] = opt[j].alpha;
          s[i] = opt[j].s;
          t[i] = opt[j].t;
        }
        j = pt[j];
      }

      for (i=0; i<om; i++) {
        i1 = utils.mod(i+1,om);
        ocurve.beta[i] = s[i] / (s[i] + t[i1]);
      }
      
      ocurve.alphaCurve = 1;
      path.curve = ocurve;
    }

    for (var i = 0; i < this._pathlist.length; i++) {
      var path = this._pathlist[i];
      calcSums(path);
      calcLon(path);
      bestPolygon(path);
      adjustVertices(path);

      if (path.sign === "-") {
        reverse(path);
      }

      smooth(path);

      if (self._params.optCurve) {
        optiCurve(path);
      }
    }
  },

  /**
   * Validates some of parameters
   * @param params
   * @private
   */
  _validateParameters: function(params) {
    if (params && params.turnPolicy && SUPPORTED_TURNPOLICY_VALUES.indexOf(params.turnPolicy) === -1) {
      var goodVals = '\'' + SUPPORTED_TURNPOLICY_VALUES.join('\', \'') + '\'';

      throw new Error('Bad turnPolicy value. Allowed values are: ' + goodVals);
    }

    if (params && params.threshold != null && params.threshold !== Potrace.THRESHOLD_AUTO) {
      if (typeof params.threshold !== 'number' || !utils.between(params.threshold, 0, 255)) {
        throw new Error('Bad threshold value. Expected to be an integer in range 0..255');
      }
    }

    if (params && params.optCurve != null && typeof params.optCurve !== 'boolean') {
      throw new Error('\'optCurve\' must be Boolean');
    }
  },

  _processLoadedImage: function(image) {
    var bitmap = new Bitmap(image.bitmap.width, image.bitmap.height);
    var pixels = image.bitmap.data;

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      // We want background underneath non-opaque regions to be white

      var opacity = pixels[idx + 3] / 255,
          r = 255 + (pixels[idx + 0] - 255) * opacity,
          g = 255 + (pixels[idx + 1] - 255) * opacity,
          b = 255 + (pixels[idx + 2] - 255) * opacity;

      bitmap.data[idx/4] = utils.luminance(r, g, b);
    });

    this._luminanceData = bitmap;
    this._imageLoaded = true;
  },

  /**
   * Reads given image. Uses {@link Jimp} under the hood, so target can be whatever Jimp can take
   *
   * @param {string|Buffer|Jimp} target Image source. Could be anything that {@link Jimp} can read (buffer, local path or url). Supported formats are: PNG, JPEG or BMP
   * @param {Function} callback
   */
  loadImage: function(target, callback) {
    var self = this;
    var jobId = {};

    this._imageLoadingIdentifier = jobId;
    this._imageLoaded = false;

    if (target instanceof Jimp) {
      this._imageLoadingIdentifier = null;
      this._imageLoaded = true;
      self._processLoadedImage(target);
      callback.call(self, null);
    } else {
      Jimp.read(target, function(err, img) {
        var sourceChanged = self._imageLoadingIdentifier !== jobId;

        if (sourceChanged) {
          var error = err ? err : new Error('Another image was loaded instead');
          return callback.call(self, error);
        }

        self._imageLoadingIdentifier = null;
        self._processLoadedImage(img);
        callback.call(self, null);
      });
    }
  },

  /**
   * Sets algorithm parameters
   * @param {Potrace~Options} newParams
   */
  setParameters: function(newParams) {
    var key, tmpOldVal;

    this._validateParameters(newParams);

    for (key in this._params) {
      if (this._params.hasOwnProperty(key) && newParams.hasOwnProperty(key)) {
        tmpOldVal = this._params[key];
        this._params[key] = newParams[key];

        if (tmpOldVal !== this._params[key] && ['color', 'background'].indexOf(key) === -1) {
          this._processed = false;
        }
      }
    }
  },

  /**
   * Generates just <path> tag without rest of the SVG file
   *
   * @param {String} [fillColor] - overrides color from parameters
   * @returns {String}
   */
  getPathTag: function(fillColor) {
    fillColor = arguments.length === 0 ? this._params.color : fillColor;

    if (fillColor === Potrace.COLOR_AUTO) {
      fillColor = this._params.blackOnWhite ? 'black' : 'white';
    }

    if (!this._imageLoaded) {
      throw new Error('Image should be loaded first');
    }

    if (!this._processed) {
      this._bmToPathlist();
      this._processPath();
      this._processed = true;
    }

    var tag = '<path d="';

    this._pathlist.forEach(function(path) {
      tag += utils.renderCurve(path.curve, 1);
    });

    tag += '" stroke="none" fill="' + fillColor + '" fill-rule="evenodd"/>';

    return tag;
  },

  /**
   * Returns <symbol> tag. Always has viewBox specified and comes with no fill color,
   * so it could be changed with <use> tag
   *
   * @param id
   * @returns {string}
   */
  getSymbol: function(id) {
    return '<symbol ' +
      'viewBox="0 0 ' + this._luminanceData.width + ' ' + this._luminanceData.height + '" ' +
      'id="' + id + '">' +
      this.getPathTag('') +
      '</symbol>';
  },

  /**
   * Generates SVG image
   * @returns {String}
   */
  getSVG: function() {
    var width = this._luminanceData.width;
    var height = this._luminanceData.height;

    return '<svg xmlns="http://www.w3.org/2000/svg" ' +
      'width="' + width + '" ' +
      'height="' + height + '" ' +
      'viewBox="0 0 ' + width + ' ' + height + '" ' +
      'version="1.1">\n'+
      (this._params.background !== Potrace.COLOR_TRANSPARENT
        ? '\t<rect x="0" y="0" width="100%" height="100%" fill="' + this._params.background + '" />\n'
        : '') +
      '\t' + this.getPathTag(this._params.color) + '\n' +
      '</svg>';
  }
};

module.exports = Potrace;

/**
 * Potrace options
 *
 * @typedef {Object} Potrace~Options
 * @property {*}       [turnPolicy]   - how to resolve ambiguities in path decomposition (default Potrace.TURNPOLICY_MINORITY)
 * @property {Number}  [turdSize]     - suppress speckles of up to this size (default 2)
 * @property {Number}  [alphaMax]     - corner threshold parameter (default 1)
 * @property {Boolean} [optCurve]     - curve optimization (default true)
 * @property {Number}  [optTolerance] - curve optimization tolerance (default 0.2)
 * @property {Number}  [threshold]    - threshold below which color is considered black (0..255, default Potrace.THRESHOLD_AUTO)
 * @property {Boolean} [blackOnWhite] - specifies colors by which side from threshold should be traced (default true)
 * @property {string}  [color]        - foreground color (default: 'auto' (black or white)) Will be ignored when exporting as <symbol>
 * @property {string}  [background]   - background color (default: 'transparent') Will be ignored when exporting as <symbol>
 */

/**
 * Jimp module
 * @external Jimp
 * @see https://www.npmjs.com/package/jimp
 */