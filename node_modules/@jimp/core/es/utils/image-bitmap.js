import fileType from 'file-type';
import EXIFParser from 'exif-parser';
import { throwError } from '@jimp/utils';
import * as constants from '../constants';
import * as MIME from './mime';
import promisify from './promisify';

function getMIMEFromBuffer(buffer, path) {
  var fileTypeFromBuffer = fileType(buffer);

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


export function parseBitmap(data, path, cb) {
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
      return throwError.call(this, 'Unsupported MIME type: ' + _mime, cb);
    }
  } catch (error) {
    return cb.call(this, error, this);
  }

  try {
    this._exif = EXIFParser.create(data).parse();
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


export function getBuffer(mime, cb) {
  if (mime === constants.AUTO) {
    // allow auto MIME detection
    mime = this.getMIME();
  }

  if (typeof mime !== 'string') {
    return throwError.call(this, 'mime must be a string', cb);
  }

  if (typeof cb !== 'function') {
    return throwError.call(this, 'cb must be a function', cb);
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
export function getBufferAsync(mime) {
  return promisify(getBuffer, this, mime);
}
//# sourceMappingURL=image-bitmap.js.map