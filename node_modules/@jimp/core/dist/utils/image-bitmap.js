"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseBitmap = parseBitmap;
exports.getBuffer = getBuffer;
exports.getBufferAsync = getBufferAsync;

var _fileType = _interopRequireDefault(require("file-type"));

var _exifParser = _interopRequireDefault(require("exif-parser"));

var _utils = require("@jimp/utils");

var constants = _interopRequireWildcard(require("../constants"));

var MIME = _interopRequireWildcard(require("./mime"));

var _promisify = _interopRequireDefault(require("./promisify"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMIMEFromBuffer(buffer, path) {
  var fileTypeFromBuffer = (0, _fileType.default)(buffer);

  if (fileTypeFromBuffer) {
    // If fileType returns something for buffer, then return the mime given
    return fileTypeFromBuffer.mime;
  }

  if (path) {
    // If a path is supplied, and fileType yields no results, then retry with MIME
    // Path can be either a file path or a url
    return MIME.getType(path);
  }

  return null;
}
/*
 * Automagically rotates an image based on its EXIF data (if present)
 * @param img a constants object
*/


function exifRotate(img) {
  var exif = img._exif;

  if (exif && exif.tags && exif.tags.Orientation) {
    switch (img._exif.tags.Orientation) {
      case 1:
        // Horizontal (normal)
        // do nothing
        break;

      case 2:
        // Mirror horizontal
        img.mirror(true, false);
        break;

      case 3:
        // Rotate 180
        img.rotate(180, false);
        break;

      case 4:
        // Mirror vertical
        img.mirror(false, true);
        break;

      case 5:
        // Mirror horizontal and rotate 270 CW
        img.rotate(-90, false).mirror(true, false);
        break;

      case 6:
        // Rotate 90 CW
        img.rotate(-90, false);
        break;

      case 7:
        // Mirror horizontal and rotate 90 CW
        img.rotate(90, false).mirror(true, false);
        break;

      case 8:
        // Rotate 270 CW
        img.rotate(-270, false);
        break;

      default:
        break;
    }
  }

  return img;
} // parses a bitmap from the constructor to the JIMP bitmap property


function parseBitmap(data, path, cb) {
  var mime = getMIMEFromBuffer(data, path);

  if (typeof mime !== 'string') {
    return cb(new Error('Could not find MIME for Buffer <' + path + '>'));
  }

  this._originalMime = mime.toLowerCase();

  try {
    var _mime = this.getMIME();

    if (this.constructor.decoders[_mime]) {
      this.bitmap = this.constructor.decoders[_mime](data);
    } else {
      return _utils.throwError.call(this, 'Unsupported MIME type: ' + _mime, cb);
    }
  } catch (error) {
    return cb.call(this, error, this);
  }

  try {
    this._exif = _exifParser.default.create(data).parse();
    exifRotate(this); // EXIF data
  } catch (error) {
    /* meh */
  }

  cb.call(this, null, this);
  return this;
}

function compositeBitmapOverBackground(Jimp, image) {
  return new Jimp(image.bitmap.width, image.bitmap.height, image._background).composite(image, 0, 0).bitmap;
}
/**
 * Converts the image to a buffer
 * @param {string} mime the mime type of the image buffer to be created
 * @param {function(Error, Jimp)} cb a Node-style function to call with the buffer as the second argument
 * @returns {Jimp} this for chaining of methods
 */


function getBuffer(mime, cb) {
  if (mime === constants.AUTO) {
    // allow auto MIME detection
    mime = this.getMIME();
  }

  if (typeof mime !== 'string') {
    return _utils.throwError.call(this, 'mime must be a string', cb);
  }

  if (typeof cb !== 'function') {
    return _utils.throwError.call(this, 'cb must be a function', cb);
  }

  mime = mime.toLowerCase();

  if (this._rgba && this.constructor.hasAlpha[mime]) {
    this.bitmap.data = Buffer.from(this.bitmap.data);
  } else {
    // when format doesn't support alpha
    // composite onto a new image so that the background shows through alpha channels
    this.bitmap.data = compositeBitmapOverBackground(this.constructor, this).data;
  }

  if (this.constructor.encoders[mime]) {
    var buffer = this.constructor.encoders[mime](this);
    cb.call(this, null, buffer);
  } else {
    cb.call(this, 'Unsupported MIME type: ' + mime);
  }

  return this;
}

function getBufferAsync(mime) {
  return (0, _promisify.default)(getBuffer, this, mime);
}
//# sourceMappingURL=image-bitmap.js.map