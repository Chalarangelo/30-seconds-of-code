function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import fs from 'fs';
import Path from 'path';
import EventEmitter from 'events';
import { isNodePattern, throwError, scan } from '@jimp/utils';
import anyBase from 'any-base';
import mkdirp from 'mkdirp';
import pixelMatch from 'pixelmatch';
import tinyColor from 'tinycolor2';
import ImagePHash from './modules/phash';
import request from './request';
import composite from './composite';
import promisify from './utils/promisify';
import * as MIME from './utils/mime';
import { parseBitmap as _parseBitmap, getBuffer, getBufferAsync } from './utils/image-bitmap';
import * as constants from './constants';
var alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'; // an array storing the maximum string length of hashes at various bases
// 0 and 1 do not exist as possible hash lengths

var maxHashLength = [NaN, NaN];

for (var i = 2; i < 65; i++) {
  var maxHash = anyBase(anyBase.BIN, alphabet.slice(0, i))(new Array(64 + 1).join('1'));
  maxHashLength.push(maxHash.length);
} // no operation


function noop() {} // error checking methods


function isArrayBuffer(test) {
  return Object.prototype.toString.call(test).toLowerCase().indexOf('arraybuffer') > -1;
} // Prepare a Buffer object from the arrayBuffer. Necessary in the browser > node conversion,
// But this function is not useful when running in node directly


function bufferFromArrayBuffer(arrayBuffer) {
  var buffer = Buffer.alloc(arrayBuffer.byteLength);
  var view = new Uint8Array(arrayBuffer);

  for (var _i = 0; _i < buffer.length; ++_i) {
    buffer[_i] = view[_i];
  }

  return buffer;
}

function loadFromURL(options, cb) {
  request(options, function (err, response, data) {
    if (err) {
      return cb(err);
    }

    if (_typeof(data) === 'object' && Buffer.isBuffer(data)) {
      return cb(null, data);
    }

    var msg = 'Could not load Buffer from <' + options.url + '> ' + '(HTTP: ' + response.statusCode + ')';
    return new Error(msg);
  });
}

function loadBufferFromPath(src, cb) {
  if (fs && typeof fs.readFile === 'function' && !src.match(/^(http|ftp)s?:\/\/./)) {
    fs.readFile(src, cb);
  } else {
    loadFromURL({
      url: src
    }, cb);
  }
}

function isRawRGBAData(obj) {
  return obj && _typeof(obj) === 'object' && typeof obj.width === 'number' && typeof obj.height === 'number' && (Buffer.isBuffer(obj.data) || obj.data instanceof Uint8Array || typeof Uint8ClampedArray === 'function' && obj.data instanceof Uint8ClampedArray) && (obj.data.length === obj.width * obj.height * 4 || obj.data.length === obj.width * obj.height * 3);
}

function makeRGBABufferFromRGB(buffer) {
  if (buffer.length % 3 !== 0) {
    throw new Error('Buffer length is incorrect');
  }

  var rgbaBuffer = Buffer.allocUnsafe(buffer.length / 3 * 4);
  var j = 0;

  for (var _i2 = 0; _i2 < buffer.length; _i2++) {
    rgbaBuffer[j] = buffer[_i2];

    if ((_i2 + 1) % 3 === 0) {
      rgbaBuffer[++j] = 255;
    }

    j++;
  }

  return rgbaBuffer;
}

var emptyBitmap = {
  data: null,
  width: null,
  height: null
};
/**
 * Jimp constructor (from a file)
 * @param path a path to the image
 * @param {function(Error, Jimp)} cb (optional) a function to call when the image is parsed to a bitmap
 */

/**
 * Jimp constructor (from a url with options)
 * @param options { url, otherOptions}
 * @param {function(Error, Jimp)} cb (optional) a function to call when the image is parsed to a bitmap
 */

/**
 * Jimp constructor (from another Jimp image or raw image data)
 * @param image a Jimp image to clone
 * @param {function(Error, Jimp)} cb a function to call when the image is parsed to a bitmap
 */

/**
 * Jimp constructor (from a Buffer)
 * @param data a Buffer containing the image data
 * @param {function(Error, Jimp)} cb a function to call when the image is parsed to a bitmap
 */

/**
 * Jimp constructor (to generate a new image)
 * @param w the width of the image
 * @param h the height of the image
 * @param {function(Error, Jimp)} cb (optional) a function to call when the image is parsed to a bitmap
 */

/**
 * Jimp constructor (to generate a new image)
 * @param w the width of the image
 * @param h the height of the image
 * @param background color to fill the image with
 * @param {function(Error, Jimp)} cb (optional) a function to call when the image is parsed to a bitmap
 */

var Jimp =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Jimp, _EventEmitter);

  // An object representing a bitmap in memory, comprising:
  //  - data: a buffer of the bitmap data
  //  - width: the width of the image in pixels
  //  - height: the height of the image in pixels
  // Default colour to use for new pixels
  // Default MIME is PNG
  // Exif data for the image
  // Whether Transparency supporting formats will be exported as RGB or RGBA
  function Jimp() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _classCallCheck(this, Jimp);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Jimp).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "bitmap", emptyBitmap);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_background", 0x00000000);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_originalMime", Jimp.MIME_PNG);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_exif", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_rgba", true);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "writeAsync", function (path) {
      return promisify(_this.write, _assertThisInitialized(_assertThisInitialized(_this)), path);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getBase64Async", function (mime) {
      return promisify(_this.getBase64, _assertThisInitialized(_assertThisInitialized(_this)), mime);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getBuffer", getBuffer);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getBufferAsync", getBufferAsync);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPixelColour", _this.getPixelColor);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setPixelColour", _this.setPixelColor);

    var jimpInstance = _assertThisInitialized(_assertThisInitialized(_this));

    var cb = noop;

    if (isArrayBuffer(args[0])) {
      args[0] = bufferFromArrayBuffer(args[0]);
    }

    function finish() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var err = args[0];
      var evData = err || {};
      evData.methodName = 'constructor';
      setTimeout(function () {
        var _cb;

        // run on next tick.
        if (err && cb === noop) {
          jimpInstance.emitError('constructor', err);
        } else if (!err) {
          jimpInstance.emitMulti('constructor', 'initialized');
        }

        (_cb = cb).call.apply(_cb, [jimpInstance].concat(args));
      }, 1);
    }

    if (typeof args[0] === 'number' && typeof args[1] === 'number' || parseInt(args[0], 10) && parseInt(args[1], 10)) {
      // create a new image
      var w = parseInt(args[0], 10);
      var h = parseInt(args[1], 10);
      cb = args[2]; // with a hex color

      if (typeof args[2] === 'number') {
        _this._background = args[2];
        cb = args[3];
      } // with a css color


      if (typeof args[2] === 'string') {
        _this._background = Jimp.cssColorToHex(args[2]);
        cb = args[3];
      }

      if (typeof cb === 'undefined') {
        cb = noop;
      }

      if (typeof cb !== 'function') {
        return _possibleConstructorReturn(_this, throwError.call(_assertThisInitialized(_assertThisInitialized(_this)), 'cb must be a function', finish));
      }

      _this.bitmap = {
        data: Buffer.alloc(w * h * 4),
        width: w,
        height: h
      };

      for (var _i3 = 0; _i3 < _this.bitmap.data.length; _i3 += 4) {
        _this.bitmap.data.writeUInt32BE(_this._background, _i3);
      }

      finish(null, _assertThisInitialized(_assertThisInitialized(_this)));
    } else if (_typeof(args[0]) === 'object' && args[0].url) {
      cb = args[1] || noop;

      if (typeof cb !== 'function') {
        return _possibleConstructorReturn(_this, throwError.call(_assertThisInitialized(_assertThisInitialized(_this)), 'cb must be a function', finish));
      }

      loadFromURL(args[0], function (err, data) {
        if (err) {
          return throwError.call(_assertThisInitialized(_assertThisInitialized(_this)), err, finish);
        }

        _this.parseBitmap(data, args[0].url, finish);
      });
    } else if (args[0] instanceof Jimp) {
      // clone an existing Jimp
      var original = args[0];
      cb = args[1];

      if (typeof cb === 'undefined') {
        cb = noop;
      }

      if (typeof cb !== 'function') {
        return _possibleConstructorReturn(_this, throwError.call(_assertThisInitialized(_assertThisInitialized(_this)), 'cb must be a function', finish));
      }

      _this.bitmap = {
        data: Buffer.from(original.bitmap.data),
        width: original.bitmap.width,
        height: original.bitmap.height
      };
      _this._quality = original._quality;
      _this._deflateLevel = original._deflateLevel;
      _this._deflateStrategy = original._deflateStrategy;
      _this._filterType = original._filterType;
      _this._rgba = original._rgba;
      _this._background = original._background;
      _this._originalMime = original._originalMime;
      finish(null, _assertThisInitialized(_assertThisInitialized(_this)));
    } else if (isRawRGBAData(args[0])) {
      var imageData = args[0];
      cb = args[1] || noop;
      var isRGBA = imageData.width * imageData.height * 4 === imageData.data.length;
      var buffer = isRGBA ? Buffer.from(imageData.data) : makeRGBABufferFromRGB(imageData.data);
      _this.bitmap = {
        data: buffer,
        width: imageData.width,
        height: imageData.height
      };
      finish(null, _assertThisInitialized(_assertThisInitialized(_this)));
    } else if (typeof args[0] === 'string') {
      // read from a path
      var path = args[0];
      cb = args[1];

      if (typeof cb === 'undefined') {
        cb = noop;
      }

      if (typeof cb !== 'function') {
        return _possibleConstructorReturn(_this, throwError.call(_assertThisInitialized(_assertThisInitialized(_this)), 'cb must be a function', finish));
      }

      loadBufferFromPath(path, function (err, data) {
        if (err) {
          return throwError.call(_assertThisInitialized(_assertThisInitialized(_this)), err, finish);
        }

        _this.parseBitmap(data, path, finish);
      });
    } else if (_typeof(args[0]) === 'object' && Buffer.isBuffer(args[0])) {
      // read from a buffer
      var data = args[0];
      cb = args[1];

      if (typeof cb !== 'function') {
        return _possibleConstructorReturn(_this, throwError.call(_assertThisInitialized(_assertThisInitialized(_this)), 'cb must be a function', finish));
      }

      _this.parseBitmap(data, null, finish);
    } else {
      // Allow client libs to add new ways to build a Jimp object.
      // Extra constructors must be added by `Jimp.appendConstructorOption()`
      cb = args[args.length - 1];

      if (typeof cb !== 'function') {
        // TODO: try to solve the args after cb problem.
        cb = args[args.length - 2];

        if (typeof cb !== 'function') {
          cb = noop;
        }
      }

      var extraConstructor = Jimp.__extraConstructors.find(function (c) {
        return c.test.apply(c, args);
      });

      if (extraConstructor) {
        new Promise(function (resolve, reject) {
          var _extraConstructor$run;

          return (_extraConstructor$run = extraConstructor.run).call.apply(_extraConstructor$run, [_assertThisInitialized(_assertThisInitialized(_this)), resolve, reject].concat(args));
        }).then(function () {
          return finish(null, _assertThisInitialized(_assertThisInitialized(_this)));
        }).catch(finish);
      } else {
        return _possibleConstructorReturn(_this, throwError.call(_assertThisInitialized(_assertThisInitialized(_this)), 'No matching constructor overloading was found. ' + 'Please see the docs for how to call the Jimp constructor.', finish));
      }
    }

    return _this;
  }
  /**
   * Parse a bitmap with the loaded image types.
   *
   * @param {Buffer} data raw image data
   * @param {string} path optional path to file
   * @param {function(Error, Jimp)} cb (optional) a callback for when complete
   * @memberof Jimp
   */


  _createClass(Jimp, [{
    key: "parseBitmap",
    value: function parseBitmap(data, path, finish) {
      _parseBitmap.call(this, data, null, finish);
    }
    /**
     * Sets the type of the image (RGB or RGBA) when saving in a format that supports transparency (default is RGBA)
     * @param {boolean} bool A Boolean, true to use RGBA or false to use RGB
     * @param {function(Error, Jimp)} cb (optional) a callback for when complete
     * @returns {Jimp} this for chaining of methods
     */

  }, {
    key: "rgba",
    value: function rgba(bool, cb) {
      if (typeof bool !== 'boolean') {
        return throwError.call(this, 'bool must be a boolean, true for RGBA or false for RGB', cb);
      }

      this._rgba = bool;

      if (isNodePattern(cb)) {
        cb.call(this, null, this);
      }

      return this;
    }
    /**
     * Emit for multiple listeners
     * @param {string} methodName name of the method to emit an error for
     * @param {string} eventName name of the eventName to emit an error for
     * @param {object} data to emit
     */

  }, {
    key: "emitMulti",
    value: function emitMulti(methodName, eventName) {
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      data = Object.assign(data, {
        methodName: methodName,
        eventName: eventName
      });
      this.emit('any', data);

      if (methodName) {
        this.emit(methodName, data);
      }

      this.emit(eventName, data);
    }
  }, {
    key: "emitError",
    value: function emitError(methodName, err) {
      this.emitMulti(methodName, 'error', err);
    }
    /**
     * Get the current height of the image
     * @return {number} height of the image
     */

  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.bitmap.height;
    }
    /**
     * Get the current width of the image
     * @return {number} width of the image
     */

  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.bitmap.width;
    }
    /**
     * Nicely format Jimp object when sent to the console e.g. console.log(image)
     * @returns {string} pretty printed
     */

  }, {
    key: "inspect",
    value: function inspect() {
      return '<Jimp ' + (this.bitmap === emptyBitmap ? 'pending...' : this.bitmap.width + 'x' + this.bitmap.height) + '>';
    }
    /**
     * Nicely format Jimp object when converted to a string
     * @returns {string} pretty printed
     */

  }, {
    key: "toString",
    value: function toString() {
      return '[object Jimp]';
    }
    /**
     * Returns the original MIME of the image (default: "image/png")
     * @returns {string} the MIME
     */

  }, {
    key: "getMIME",
    value: function getMIME() {
      var mime = this._originalMime || Jimp.MIME_PNG;
      return mime;
    }
    /**
     * Returns the appropriate file extension for the original MIME of the image (default: "png")
     * @returns {string} the file extension
     */

  }, {
    key: "getExtension",
    value: function getExtension() {
      var mime = this.getMIME();
      return MIME.getExtension(mime);
    }
    /**
     * Writes the image to a file
     * @param {string} path a path to the destination file
     * @param {function(Error, Jimp)} cb (optional) a function to call when the image is saved to disk
     * @returns {Jimp} this for chaining of methods
     */

  }, {
    key: "write",
    value: function write(path, cb) {
      var _this2 = this;

      if (!fs || !fs.createWriteStream) {
        throw new Error('Cant access the filesystem. You can use the getBase64 method.');
      }

      if (typeof path !== 'string') {
        return throwError.call(this, 'path must be a string', cb);
      }

      if (typeof cb === 'undefined') {
        cb = noop;
      }

      if (typeof cb !== 'function') {
        return throwError.call(this, 'cb must be a function', cb);
      }

      var mime = MIME.getType(path) || this.getMIME();
      var pathObj = Path.parse(path);

      if (pathObj.dir) {
        mkdirp.sync(pathObj.dir);
      }

      this.getBuffer(mime, function (err, buffer) {
        if (err) {
          return throwError.call(_this2, err, cb);
        }

        var stream = fs.createWriteStream(path);
        stream.on('open', function () {
          stream.write(buffer);
          stream.end();
        }).on('error', function (err) {
          return throwError.call(_this2, err, cb);
        });
        stream.on('finish', function () {
          cb.call(_this2, null, _this2);
        });
      });
      return this;
    }
  }, {
    key: "getBase64",

    /**
     * Converts the image to a base 64 string
     * @param {string} mime the mime type of the image data to be created
     * @param {function(Error, Jimp)} cb a Node-style function to call with the buffer as the second argument
     * @returns {Jimp} this for chaining of methods
     */
    value: function getBase64(mime, cb) {
      if (mime === Jimp.AUTO) {
        // allow auto MIME detection
        mime = this.getMIME();
      }

      if (typeof mime !== 'string') {
        return throwError.call(this, 'mime must be a string', cb);
      }

      if (typeof cb !== 'function') {
        return throwError.call(this, 'cb must be a function', cb);
      }

      this.getBuffer(mime, function (err, data) {
        if (err) {
          return throwError.call(this, err, cb);
        }

        var src = 'data:' + mime + ';base64,' + data.toString('base64');
        cb.call(this, null, src);
      });
      return this;
    }
  }, {
    key: "hash",

    /**
     * Generates a perceptual hash of the image <https://en.wikipedia.org/wiki/Perceptual_hashing>. And pads the string. Can configure base.
     * @param {number} base (optional) a number between 2 and 64 representing the base for the hash (e.g. 2 is binary, 10 is decimal, 16 is hex, 64 is base 64). Defaults to 64.
     * @param {function(Error, Jimp)} cb (optional) a callback for when complete
     * @returns {string} a string representing the hash
     */
    value: function hash(base, cb) {
      base = base || 64;

      if (typeof base === 'function') {
        cb = base;
        base = 64;
      }

      if (typeof base !== 'number') {
        return throwError.call(this, 'base must be a number', cb);
      }

      if (base < 2 || base > 64) {
        return throwError.call(this, 'base must be a number between 2 and 64', cb);
      }

      var hash = this.pHash();
      hash = anyBase(anyBase.BIN, alphabet.slice(0, base))(hash);

      while (hash.length < maxHashLength[base]) {
        hash = '0' + hash; // pad out with leading zeros
      }

      if (isNodePattern(cb)) {
        cb.call(this, null, hash);
      }

      return hash;
    }
    /**
     * Calculates the perceptual hash
     * @returns {number} the perceptual hash
     */

  }, {
    key: "pHash",
    value: function pHash() {
      var pHash = new ImagePHash();
      return pHash.getHash(this);
    }
    /**
     * Calculates the hamming distance of the current image and a hash based on their perceptual hash
     * @param {hash} compareHash hash to compare to
     * @returns {number} a number ranging from 0 to 1, 0 means they are believed to be identical
     */

  }, {
    key: "distanceFromHash",
    value: function distanceFromHash(compareHash) {
      var pHash = new ImagePHash();
      var currentHash = pHash.getHash(this);
      return pHash.distance(currentHash, compareHash);
    }
    /**
     * Converts the image to a buffer
     * @param {string} mime the mime type of the image buffer to be created
     * @param {function(Error, Jimp)} cb a Node-style function to call with the buffer as the second argument
     * @returns {Jimp} this for chaining of methods
     */

  }, {
    key: "getPixelIndex",

    /**
     * Returns the offset of a pixel in the bitmap buffer
     * @param {number} x the x coordinate
     * @param {number} y the y coordinate
     * @param {string} edgeHandling (optional) define how to sum pixels from outside the border
     * @param {number} cb (optional) a callback for when complete
     * @returns {number} the index of the pixel or -1 if not found
     */
    value: function getPixelIndex(x, y, edgeHandling, cb) {
      var xi;
      var yi;

      if (typeof edgeHandling === 'function' && typeof cb === 'undefined') {
        cb = edgeHandling;
        edgeHandling = null;
      }

      if (!edgeHandling) {
        edgeHandling = Jimp.EDGE_EXTEND;
      }

      if (typeof x !== 'number' || typeof y !== 'number') {
        return throwError.call(this, 'x and y must be numbers', cb);
      } // round input


      x = Math.round(x);
      y = Math.round(y);
      xi = x;
      yi = y;

      if (edgeHandling === Jimp.EDGE_EXTEND) {
        if (x < 0) xi = 0;
        if (x >= this.bitmap.width) xi = this.bitmap.width - 1;
        if (y < 0) yi = 0;
        if (y >= this.bitmap.height) yi = this.bitmap.height - 1;
      }

      if (edgeHandling === Jimp.EDGE_WRAP) {
        if (x < 0) {
          xi = this.bitmap.width + x;
        }

        if (x >= this.bitmap.width) {
          xi = x % this.bitmap.width;
        }

        if (y < 0) {
          xi = this.bitmap.height + y;
        }

        if (y >= this.bitmap.height) {
          yi = y % this.bitmap.height;
        }
      }

      var i = this.bitmap.width * yi + xi << 2; // if out of bounds index is -1

      if (xi < 0 || xi >= this.bitmap.width) {
        i = -1;
      }

      if (yi < 0 || yi >= this.bitmap.height) {
        i = -1;
      }

      if (isNodePattern(cb)) {
        cb.call(this, null, i);
      }

      return i;
    }
    /**
     * Returns the hex colour value of a pixel
     * @param {number} x the x coordinate
     * @param {number} y the y coordinate
     * @param {function(Error, Jimp)} cb (optional) a callback for when complete
     * @returns {number} the color of the pixel
     */

  }, {
    key: "getPixelColor",
    value: function getPixelColor(x, y, cb) {
      if (typeof x !== 'number' || typeof y !== 'number') return throwError.call(this, 'x and y must be numbers', cb); // round input

      x = Math.round(x);
      y = Math.round(y);
      var idx = this.getPixelIndex(x, y);
      var hex = this.bitmap.data.readUInt32BE(idx);

      if (isNodePattern(cb)) {
        cb.call(this, null, hex);
      }

      return hex;
    }
  }, {
    key: "setPixelColor",

    /**
     * Returns the hex colour value of a pixel
     * @param {number} hex color to set
     * @param {number} x the x coordinate
     * @param {number} y the y coordinate
     * @param {function(Error, Jimp)} cb (optional) a callback for when complete
     * @returns {number} the index of the pixel or -1 if not found
     */
    value: function setPixelColor(hex, x, y, cb) {
      if (typeof hex !== 'number' || typeof x !== 'number' || typeof y !== 'number') return throwError.call(this, 'hex, x and y must be numbers', cb); // round input

      x = Math.round(x);
      y = Math.round(y);
      var idx = this.getPixelIndex(x, y);
      this.bitmap.data.writeUInt32BE(hex, idx);

      if (isNodePattern(cb)) {
        cb.call(this, null, this);
      }

      return this;
    }
  }, {
    key: "hasAlpha",

    /**
     * Determine if the image contains opaque pixels.
     * @return {boolean} hasAlpha whether the image contains opaque pixels
     */
    value: function hasAlpha() {
      for (var yIndex = 0; yIndex < this.bitmap.height; yIndex++) {
        for (var xIndex = 0; xIndex < this.bitmap.width; xIndex++) {
          var idx = this.bitmap.width * yIndex + xIndex << 2;
          var alpha = this.bitmap.data[idx + 3];

          if (alpha !== 0xff) {
            return true;
          }
        }
      }

      return false;
    }
  }]);

  return Jimp;
}(EventEmitter);

export function addConstants(constants) {
  var jimpInstance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Jimp;
  Object.entries(constants).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        value = _ref2[1];

    jimpInstance[name] = value;
  });
}
export function addJimpMethods(methods) {
  var jimpInstance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Jimp;
  Object.entries(methods).forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        name = _ref4[0],
        value = _ref4[1];

    jimpInstance.prototype[name] = value;
  });
}
addConstants(constants);
addJimpMethods({
  composite: composite
});
Jimp.__extraConstructors = [];
/**
 * Allow client libs to add new ways to build a Jimp object.
 * @param {string} name identify the extra constructor.
 * @param {function} test a function that returns true when it accepts the arguments passed to the main constructor.
 * @param {function} run where the magic happens.
 */

Jimp.appendConstructorOption = function (name, test, run) {
  Jimp.__extraConstructors.push({
    name: name,
    test: test,
    run: run
  });
};
/**
 * Read an image from a file or a Buffer. Takes the same args as the constructor
 * @returns {Promise} a promise
 */


Jimp.read = function () {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return new Promise(function (resolve, reject) {
    _construct(Jimp, args.concat([function (err, image) {
      if (err) reject(err);else resolve(image);
    }]));
  });
};

Jimp.create = Jimp.read;
/**
 * A static helper method that converts RGBA values to a single integer value
 * @param {number} r the red value (0-255)
 * @param {number} g the green value (0-255)
 * @param {number} b the blue value (0-255)
 * @param {number} a the alpha value (0-255)
 * @param {function(Error, Jimp)} cb (optional) A callback for when complete
 * @returns {number} an single integer colour value
 */

Jimp.rgbaToInt = function (r, g, b, a, cb) {
  if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number' || typeof a !== 'number') {
    return throwError.call(this, 'r, g, b and a must be numbers', cb);
  }

  if (r < 0 || r > 255) {
    return throwError.call(this, 'r must be between 0 and 255', cb);
  }

  if (g < 0 || g > 255) {
    throwError.call(this, 'g must be between 0 and 255', cb);
  }

  if (b < 0 || b > 255) {
    return throwError.call(this, 'b must be between 0 and 255', cb);
  }

  if (a < 0 || a > 255) {
    return throwError.call(this, 'a must be between 0 and 255', cb);
  }

  r = Math.round(r);
  b = Math.round(b);
  g = Math.round(g);
  a = Math.round(a);
  var i = r * Math.pow(256, 3) + g * Math.pow(256, 2) + b * Math.pow(256, 1) + a * Math.pow(256, 0);

  if (isNodePattern(cb)) {
    cb.call(this, null, i);
  }

  return i;
};
/**
 * A static helper method that converts RGBA values to a single integer value
 * @param {number} i a single integer value representing an RGBA colour (e.g. 0xFF0000FF for red)
 * @param {function(Error, Jimp)} cb (optional) A callback for when complete
 * @returns {object} an object with the properties r, g, b and a representing RGBA values
 */


Jimp.intToRGBA = function (i, cb) {
  if (typeof i !== 'number') {
    return throwError.call(this, 'i must be a number', cb);
  }

  var rgba = {};
  rgba.r = Math.floor(i / Math.pow(256, 3));
  rgba.g = Math.floor((i - rgba.r * Math.pow(256, 3)) / Math.pow(256, 2));
  rgba.b = Math.floor((i - rgba.r * Math.pow(256, 3) - rgba.g * Math.pow(256, 2)) / Math.pow(256, 1));
  rgba.a = Math.floor((i - rgba.r * Math.pow(256, 3) - rgba.g * Math.pow(256, 2) - rgba.b * Math.pow(256, 1)) / Math.pow(256, 0));

  if (isNodePattern(cb)) {
    cb.call(this, null, rgba);
  }

  return rgba;
};
/**
 * Converts a css color (Hex, 8-digit (RGBA) Hex, RGB, RGBA, HSL, HSLA, HSV, HSVA, Named) to a hex number
 * @param {string} cssColor a number
 * @returns {number} a hex number representing a color
 */


Jimp.cssColorToHex = function (cssColor) {
  cssColor = cssColor || 0; // 0, null, undefined, NaN

  if (typeof cssColor === 'number') return Number(cssColor);
  return parseInt(tinyColor(cssColor).toHex8(), 16);
};
/**
 * Limits a number to between 0 or 255
 * @param {number} n a number
 * @returns {number} the number limited to between 0 or 255
 */


Jimp.limit255 = function (n) {
  n = Math.max(n, 0);
  n = Math.min(n, 255);
  return n;
};
/**
 * Diffs two images and returns
 * @param {Jimp} img1 a Jimp image to compare
 * @param {Jimp} img2 a Jimp image to compare
 * @param {number} threshold (optional) a number, 0 to 1, the smaller the value the more sensitive the comparison (default: 0.1)
 * @returns {object} an object { percent: percent similar, diff: a Jimp image highlighting differences }
 */


Jimp.diff = function (img1, img2) {
  var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.1;
  if (!(img1 instanceof Jimp) || !(img2 instanceof Jimp)) return throwError.call(this, 'img1 and img2 must be an Jimp images');
  var bmp1 = img1.bitmap;
  var bmp2 = img2.bitmap;

  if (bmp1.width !== bmp2.width || bmp1.height !== bmp2.height) {
    if (bmp1.width * bmp1.height > bmp2.width * bmp2.height) {
      // img1 is bigger
      img1 = img1.cloneQuiet().resize(bmp2.width, bmp2.height);
    } else {
      // img2 is bigger (or they are the same in area)
      img2 = img2.cloneQuiet().resize(bmp1.width, bmp1.height);
    }
  }

  if (typeof threshold !== 'number' || threshold < 0 || threshold > 1) {
    return throwError.call(this, 'threshold must be a number between 0 and 1');
  }

  var diff = new Jimp(bmp1.width, bmp1.height, 0xffffffff);
  var numDiffPixels = pixelMatch(bmp1.data, bmp2.data, diff.bitmap.data, diff.bitmap.width, diff.bitmap.height, {
    threshold: threshold
  });
  return {
    percent: numDiffPixels / (diff.bitmap.width * diff.bitmap.height),
    image: diff
  };
};
/**
 * Calculates the hamming distance of two images based on their perceptual hash
 * @param {Jimp} img1 a Jimp image to compare
 * @param {Jimp} img2 a Jimp image to compare
 * @returns {number} a number ranging from 0 to 1, 0 means they are believed to be identical
 */


Jimp.distance = function (img1, img2) {
  var phash = new ImagePHash();
  var hash1 = phash.getHash(img1);
  var hash2 = phash.getHash(img2);
  return phash.distance(hash1, hash2);
};
/**
 * Calculates the hamming distance of two images based on their perceptual hash
 * @param {hash} hash1 a pHash
 * @param {hash} hash2 a pHash
 * @returns {number} a number ranging from 0 to 1, 0 means they are believed to be identical
 */


Jimp.compareHashes = function (hash1, hash2) {
  var phash = new ImagePHash();
  return phash.distance(hash1, hash2);
};
/**
 * Compute color difference
 * 0 means no difference, 1 means maximum difference.
 * @param {number} rgba1:    first color to compare.
 * @param {number} rgba2:    second color to compare.
 * Both parameters must be an color object {r:val, g:val, b:val, a:val}
 * Where `a` is optional and `val` is an integer between 0 and 255.
 * @returns {number} float between 0 and 1.
 */


Jimp.colorDiff = function (rgba1, rgba2) {
  var pow = function pow(n) {
    return Math.pow(n, 2);
  };

  var max = Math.max;
  var maxVal = 255 * 255 * 3;

  if (rgba1.a !== 0 && !rgba1.a) {
    rgba1.a = 255;
  }

  if (rgba2.a !== 0 && !rgba2.a) {
    rgba2.a = 255;
  }

  return (max(pow(rgba1.r - rgba2.r), pow(rgba1.r - rgba2.r - rgba1.a + rgba2.a)) + max(pow(rgba1.g - rgba2.g), pow(rgba1.g - rgba2.g - rgba1.a + rgba2.a)) + max(pow(rgba1.b - rgba2.b), pow(rgba1.b - rgba2.b - rgba1.a + rgba2.a))) / maxVal;
};
/**
 * Helper to create Jimp methods that emit events before and after its execution.
 * @param {string} methodName   The name to be appended to Jimp prototype.
 * @param {string} evName       The event name to be called.
 *                     It will be prefixed by `before-` and emitted when on method call.
 *                     It will be appended by `ed` and emitted after the method run.
 * @param {function} method       A function implementing the method itself.
 * It will also create a quiet version that will not emit events, to not
 * mess the user code with many `changed` event calls. You can call with
 * `methodName + "Quiet"`.
 *
 * The emitted event comes with a object parameter to the listener with the
 * `methodName` as one attribute.
 */


export function jimpEvMethod(methodName, evName, method) {
  var evNameBefore = 'before-' + evName;
  var evNameAfter = evName.replace(/e$/, '') + 'ed';

  Jimp.prototype[methodName] = function () {
    var wrappedCb;

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    var cb = args[method.length - 1];
    var jimpInstance = this;

    if (typeof cb === 'function') {
      wrappedCb = function wrappedCb() {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        var err = args[0],
            data = args[1];

        if (err) {
          jimpInstance.emitError(methodName, err);
        } else {
          jimpInstance.emitMulti(methodName, evNameAfter, _defineProperty({}, methodName, data));
        }

        cb.apply(this, args);
      };

      args[args.length - 1] = wrappedCb;
    } else {
      wrappedCb = false;
    }

    this.emitMulti(methodName, evNameBefore);
    var result;

    try {
      result = method.apply(this, args);

      if (!wrappedCb) {
        this.emitMulti(methodName, evNameAfter, _defineProperty({}, methodName, result));
      }
    } catch (error) {
      error.methodName = methodName;
      this.emitError(methodName, error);
    }

    return result;
  };

  Jimp.prototype[methodName + 'Quiet'] = method;
}
/**
 * Creates a new image that is a clone of this one.
 * @param {function(Error, Jimp)} cb (optional) A callback for when complete
 * @returns the new image
 */

jimpEvMethod('clone', 'clone', function (cb) {
  var clone = new Jimp(this);

  if (isNodePattern(cb)) {
    cb.call(clone, null, clone);
  }

  return clone;
});
/**
 * Simplify jimpEvMethod call for the common `change` evName.
 * @param {string} methodName name of the method
 * @param {function} method to watch changes for
 */

export function jimpEvChange(methodName, method) {
  jimpEvMethod(methodName, 'change', method);
}
/**
 * Sets the type of the image (RGB or RGBA) when saving as PNG format (default is RGBA)
 * @param b A Boolean, true to use RGBA or false to use RGB
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */

jimpEvChange('background', function (hex, cb) {
  if (typeof hex !== 'number') {
    return throwError.call(this, 'hex must be a hexadecimal rgba value', cb);
  }

  this._background = hex;

  if (isNodePattern(cb)) {
    cb.call(this, null, this);
  }

  return this;
});
/**
 * Scans through a region of the bitmap, calling a function for each pixel.
 * @param {number} x the x coordinate to begin the scan at
 * @param {number} y the y coordinate to begin the scan at
 * @param w the width of the scan region
 * @param h the height of the scan region
 * @param f a function to call on even pixel; the (x, y) position of the pixel
 * and the index of the pixel in the bitmap buffer are passed to the function
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */

jimpEvChange('scan', function (x, y, w, h, f, cb) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    return throwError.call(this, 'x and y must be numbers', cb);
  }

  if (typeof w !== 'number' || typeof h !== 'number') {
    return throwError.call(this, 'w and h must be numbers', cb);
  }

  if (typeof f !== 'function') {
    return throwError.call(this, 'f must be a function', cb);
  }

  var result = scan(this, x, y, w, h, f);

  if (isNodePattern(cb)) {
    cb.call(this, null, result);
  }

  return result;
});

if (process.env.ENVIRONMENT === 'BROWSER') {
  // For use in a web browser or web worker

  /* global self */
  var gl;

  if (typeof window !== 'undefined' && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
    gl = window;
  }

  if (typeof self !== 'undefined' && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object') {
    gl = self;
  }

  gl.Jimp = Jimp;
  gl.Buffer = Buffer;
}

export { addType } from './utils/mime';
export default Jimp;
//# sourceMappingURL=index.js.map