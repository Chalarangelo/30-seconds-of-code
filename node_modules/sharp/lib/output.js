'use strict';

const is = require('./is');
const sharp = require('../build/Release/sharp.node');

/**
 * Write output image data to a file.
 *
 * If an explicit output format is not selected, it will be inferred from the extension,
 * with JPEG, PNG, WebP, TIFF, DZI, and libvips' V format supported.
 * Note that raw pixel data is only supported for buffer output.
 *
 * A `Promise` is returned when `callback` is not provided.
 *
 * @example
 * sharp(input)
 *   .toFile('output.png', (err, info) => { ... });
 *
 * @example
 * sharp(input)
 *   .toFile('output.png')
 *   .then(info => { ... })
 *   .catch(err => { ... });
 *
 * @param {String} fileOut - the path to write the image data to.
 * @param {Function} [callback] - called on completion with two arguments `(err, info)`.
 * `info` contains the output image `format`, `size` (bytes), `width`, `height`,
 * `channels` and `premultiplied` (indicating if premultiplication was used).
 * When using a crop strategy also contains `cropOffsetLeft` and `cropOffsetTop`.
 * @returns {Promise<Object>} - when no callback is provided
 * @throws {Error} Invalid parameters
 */
function toFile (fileOut, callback) {
  if (!fileOut || fileOut.length === 0) {
    const errOutputInvalid = new Error('Missing output file path');
    if (is.fn(callback)) {
      callback(errOutputInvalid);
    } else {
      return Promise.reject(errOutputInvalid);
    }
  } else {
    if (this.options.input.file === fileOut) {
      const errOutputIsInput = new Error('Cannot use same file for input and output');
      if (is.fn(callback)) {
        callback(errOutputIsInput);
      } else {
        return Promise.reject(errOutputIsInput);
      }
    } else {
      this.options.fileOut = fileOut;
      return this._pipeline(callback);
    }
  }
  return this;
}

/**
 * Write output to a Buffer.
 * JPEG, PNG, WebP, TIFF and RAW output are supported.
 * By default, the format will match the input image, except GIF and SVG input which become PNG output.
 *
 * `callback`, if present, gets three arguments `(err, data, info)` where:
 * - `err` is an error, if any.
 * - `data` is the output image data.
 * - `info` contains the output image `format`, `size` (bytes), `width`, `height`,
 * `channels` and `premultiplied` (indicating if premultiplication was used).
 * When using a crop strategy also contains `cropOffsetLeft` and `cropOffsetTop`.
 *
 * A `Promise` is returned when `callback` is not provided.
 *
 * @example
 * sharp(input)
 *   .toBuffer((err, data, info) => { ... });
 *
 * @example
 * sharp(input)
 *   .toBuffer()
 *   .then(data => { ... })
 *   .catch(err => { ... });
 *
 * @example
 * sharp(input)
 *   .toBuffer({ resolveWithObject: true })
 *   .then(({ data, info }) => { ... })
 *   .catch(err => { ... });
 *
 * @param {Object} [options]
 * @param {Boolean} [options.resolveWithObject] Resolve the Promise with an Object containing `data` and `info` properties instead of resolving only with `data`.
 * @param {Function} [callback]
 * @returns {Promise<Buffer>} - when no callback is provided
 */
function toBuffer (options, callback) {
  if (is.object(options)) {
    if (is.bool(options.resolveWithObject)) {
      this.options.resolveWithObject = options.resolveWithObject;
    }
  }
  return this._pipeline(is.fn(options) ? options : callback);
}

/**
 * Include all metadata (EXIF, XMP, IPTC) from the input image in the output image.
 * The default behaviour, when `withMetadata` is not used, is to strip all metadata and convert to the device-independent sRGB colour space.
 * This will also convert to and add a web-friendly sRGB ICC profile.
 *
 * @example
 * sharp('input.jpg')
 *   .withMetadata()
 *   .toFile('output-with-metadata.jpg')
 *   .then(info => { ... });
 *
 * @param {Object} [withMetadata]
 * @param {Number} [withMetadata.orientation] value between 1 and 8, used to update the EXIF `Orientation` tag.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function withMetadata (withMetadata) {
  this.options.withMetadata = is.bool(withMetadata) ? withMetadata : true;
  if (is.object(withMetadata)) {
    if (is.defined(withMetadata.orientation)) {
      if (is.integer(withMetadata.orientation) && is.inRange(withMetadata.orientation, 1, 8)) {
        this.options.withMetadataOrientation = withMetadata.orientation;
      } else {
        throw new Error('Invalid orientation (1 to 8) ' + withMetadata.orientation);
      }
    }
  }
  return this;
}

/**
 * Use these JPEG options for output image.
 *
 * @example
 * // Convert any input to very high quality JPEG output
 * const data = await sharp(input)
 *   .jpeg({
 *     quality: 100,
 *     chromaSubsampling: '4:4:4'
 *   })
 *   .toBuffer();
 *
 * @param {Object} [options] - output options
 * @param {Number} [options.quality=80] - quality, integer 1-100
 * @param {Boolean} [options.progressive=false] - use progressive (interlace) scan
 * @param {String} [options.chromaSubsampling='4:2:0'] - set to '4:4:4' to prevent chroma subsampling when quality <= 90
 * @param {Boolean} [options.trellisQuantisation=false] - apply trellis quantisation, requires libvips compiled with support for mozjpeg
 * @param {Boolean} [options.overshootDeringing=false] - apply overshoot deringing, requires libvips compiled with support for mozjpeg
 * @param {Boolean} [options.optimiseScans=false] - optimise progressive scans, forces progressive, requires libvips compiled with support for mozjpeg
 * @param {Boolean} [options.optimizeScans=false] - alternative spelling of optimiseScans
 * @param {Boolean} [options.optimiseCoding=true] - optimise Huffman coding tables
 * @param {Boolean} [options.optimizeCoding=true] - alternative spelling of optimiseCoding
 * @param {Number} [options.quantisationTable=0] - quantization table to use, integer 0-8, requires libvips compiled with support for mozjpeg
 * @param {Number} [options.quantizationTable=0] - alternative spelling of quantisationTable
 * @param {Boolean} [options.force=true] - force JPEG output, otherwise attempt to use input format
 * @returns {Sharp}
 * @throws {Error} Invalid options
 */
function jpeg (options) {
  if (is.object(options)) {
    if (is.defined(options.quality)) {
      if (is.integer(options.quality) && is.inRange(options.quality, 1, 100)) {
        this.options.jpegQuality = options.quality;
      } else {
        throw new Error('Invalid quality (integer, 1-100) ' + options.quality);
      }
    }
    if (is.defined(options.progressive)) {
      this._setBooleanOption('jpegProgressive', options.progressive);
    }
    if (is.defined(options.chromaSubsampling)) {
      if (is.string(options.chromaSubsampling) && is.inArray(options.chromaSubsampling, ['4:2:0', '4:4:4'])) {
        this.options.jpegChromaSubsampling = options.chromaSubsampling;
      } else {
        throw new Error('Invalid chromaSubsampling (4:2:0, 4:4:4) ' + options.chromaSubsampling);
      }
    }
    const trellisQuantisation = is.bool(options.trellisQuantization) ? options.trellisQuantization : options.trellisQuantisation;
    if (is.defined(trellisQuantisation)) {
      this._setBooleanOption('jpegTrellisQuantisation', trellisQuantisation);
    }
    if (is.defined(options.overshootDeringing)) {
      this._setBooleanOption('jpegOvershootDeringing', options.overshootDeringing);
    }
    const optimiseScans = is.bool(options.optimizeScans) ? options.optimizeScans : options.optimiseScans;
    if (is.defined(optimiseScans)) {
      this._setBooleanOption('jpegOptimiseScans', optimiseScans);
      if (optimiseScans) {
        this.options.jpegProgressive = true;
      }
    }
    const optimiseCoding = is.bool(options.optimizeCoding) ? options.optimizeCoding : options.optimiseCoding;
    if (is.defined(optimiseCoding)) {
      this._setBooleanOption('jpegOptimiseCoding', optimiseCoding);
    }
    const quantisationTable = is.number(options.quantizationTable) ? options.quantizationTable : options.quantisationTable;
    if (is.defined(quantisationTable)) {
      if (is.integer(quantisationTable) && is.inRange(quantisationTable, 0, 8)) {
        this.options.jpegQuantisationTable = quantisationTable;
      } else {
        throw new Error('Invalid quantisation table (integer, 0-8) ' + quantisationTable);
      }
    }
  }
  return this._updateFormatOut('jpeg', options);
}

/**
 * Use these PNG options for output image.
 *
 * PNG output is always full colour at 8 or 16 bits per pixel.
 * Indexed PNG input at 1, 2 or 4 bits per pixel is converted to 8 bits per pixel.
 *
 * @example
 * // Convert any input to PNG output
 * const data = await sharp(input)
 *   .png()
 *   .toBuffer();
 *
 * @param {Object} [options]
 * @param {Boolean} [options.progressive=false] - use progressive (interlace) scan
 * @param {Number} [options.compressionLevel=9] - zlib compression level, 0-9
 * @param {Boolean} [options.adaptiveFiltering=false] - use adaptive row filtering
 * @param {Boolean} [options.palette=false] - quantise to a palette-based image with alpha transparency support, requires libvips compiled with support for libimagequant
 * @param {Number} [options.quality=100] - use the lowest number of colours needed to achieve given quality, requires libvips compiled with support for libimagequant
 * @param {Number} [options.colours=256] - maximum number of palette entries, requires libvips compiled with support for libimagequant
 * @param {Number} [options.colors=256] - alternative spelling of `options.colours`, requires libvips compiled with support for libimagequant
 * @param {Number} [options.dither=1.0] - level of Floyd-Steinberg error diffusion, requires libvips compiled with support for libimagequant
 * @param {Boolean} [options.force=true] - force PNG output, otherwise attempt to use input format
 * @returns {Sharp}
 * @throws {Error} Invalid options
 */
function png (options) {
  if (is.object(options)) {
    if (is.defined(options.progressive)) {
      this._setBooleanOption('pngProgressive', options.progressive);
    }
    if (is.defined(options.compressionLevel)) {
      if (is.integer(options.compressionLevel) && is.inRange(options.compressionLevel, 0, 9)) {
        this.options.pngCompressionLevel = options.compressionLevel;
      } else {
        throw new Error('Invalid compressionLevel (integer, 0-9) ' + options.compressionLevel);
      }
    }
    if (is.defined(options.adaptiveFiltering)) {
      this._setBooleanOption('pngAdaptiveFiltering', options.adaptiveFiltering);
    }
    if (is.defined(options.palette)) {
      this._setBooleanOption('pngPalette', options.palette);
      if (this.options.pngPalette) {
        if (is.defined(options.quality)) {
          if (is.integer(options.quality) && is.inRange(options.quality, 0, 100)) {
            this.options.pngQuality = options.quality;
          } else {
            throw is.invalidParameterError('quality', 'integer between 0 and 100', options.quality);
          }
        }
        const colours = options.colours || options.colors;
        if (is.defined(colours)) {
          if (is.integer(colours) && is.inRange(colours, 2, 256)) {
            this.options.pngColours = colours;
          } else {
            throw is.invalidParameterError('colours', 'integer between 2 and 256', colours);
          }
        }
        if (is.defined(options.dither)) {
          if (is.number(options.dither) && is.inRange(options.dither, 0, 1)) {
            this.options.pngDither = options.dither;
          } else {
            throw is.invalidParameterError('dither', 'number between 0.0 and 1.0', options.dither);
          }
        }
      }
    }
  }
  return this._updateFormatOut('png', options);
}

/**
 * Use these WebP options for output image.
 *
 * @example
 * // Convert any input to lossless WebP output
 * const data = await sharp(input)
 *   .webp({ lossless: true })
 *   .toBuffer();
 *
 * @param {Object} [options] - output options
 * @param {Number} [options.quality=80] - quality, integer 1-100
 * @param {Number} [options.alphaQuality=100] - quality of alpha layer, integer 0-100
 * @param {Boolean} [options.lossless=false] - use lossless compression mode
 * @param {Boolean} [options.nearLossless=false] - use near_lossless compression mode
 * @param {Boolean} [options.force=true] - force WebP output, otherwise attempt to use input format
 * @returns {Sharp}
 * @throws {Error} Invalid options
 */
function webp (options) {
  if (is.object(options) && is.defined(options.quality)) {
    if (is.integer(options.quality) && is.inRange(options.quality, 1, 100)) {
      this.options.webpQuality = options.quality;
    } else {
      throw new Error('Invalid quality (integer, 1-100) ' + options.quality);
    }
  }
  if (is.object(options) && is.defined(options.alphaQuality)) {
    if (is.integer(options.alphaQuality) && is.inRange(options.alphaQuality, 0, 100)) {
      this.options.webpAlphaQuality = options.alphaQuality;
    } else {
      throw new Error('Invalid webp alpha quality (integer, 0-100) ' + options.alphaQuality);
    }
  }
  if (is.object(options) && is.defined(options.lossless)) {
    this._setBooleanOption('webpLossless', options.lossless);
  }
  if (is.object(options) && is.defined(options.nearLossless)) {
    this._setBooleanOption('webpNearLossless', options.nearLossless);
  }
  return this._updateFormatOut('webp', options);
}

/**
 * Use these TIFF options for output image.
 *
 * @example
 * // Convert SVG input to LZW-compressed, 1 bit per pixel TIFF output
 * sharp('input.svg')
 *   .tiff({
 *     compression: 'lzw',
 *     squash: true
 *   })
 *   .toFile('1-bpp-output.tiff')
 *   .then(info => { ... });
 *
 * @param {Object} [options] - output options
 * @param {Number} [options.quality=80] - quality, integer 1-100
 * @param {Boolean} [options.force=true] - force TIFF output, otherwise attempt to use input format
 * @param {Boolean} [options.compression='jpeg'] - compression options: lzw, deflate, jpeg, ccittfax4
 * @param {Boolean} [options.predictor='horizontal'] - compression predictor options: none, horizontal, float
 * @param {Boolean} [options.pyramid=false] - write an image pyramid
 * @param {Boolean} [options.tile=false] - write a tiled tiff
 * @param {Boolean} [options.tileWidth=256] - horizontal tile size
 * @param {Boolean} [options.tileHeight=256] - vertical tile size
 * @param {Number} [options.xres=1.0] - horizontal resolution in pixels/mm
 * @param {Number} [options.yres=1.0] - vertical resolution in pixels/mm
 * @param {Boolean} [options.squash=false] - squash 8-bit images down to 1 bit
 * @returns {Sharp}
 * @throws {Error} Invalid options
 */
function tiff (options) {
  if (is.object(options)) {
    if (is.defined(options.quality)) {
      if (is.integer(options.quality) && is.inRange(options.quality, 1, 100)) {
        this.options.tiffQuality = options.quality;
      } else {
        throw new Error('Invalid quality (integer, 1-100) ' + options.quality);
      }
    }
    if (is.defined(options.squash)) {
      if (is.bool(options.squash)) {
        this.options.tiffSquash = options.squash;
      } else {
        throw new Error('Invalid Value for squash ' + options.squash + ' Only Boolean Values allowed for options.squash.');
      }
    }
    // tiling
    if (is.defined(options.tile)) {
      if (is.bool(options.tile)) {
        this.options.tiffTile = options.tile;
      } else {
        throw new Error('Invalid Value for tile ' + options.tile + ' Only Boolean values allowed for options.tile');
      }
    }
    if (is.defined(options.tileWidth)) {
      if (is.number(options.tileWidth) && options.tileWidth > 0) {
        this.options.tiffTileWidth = options.tileWidth;
      } else {
        throw new Error('Invalid Value for tileWidth ' + options.tileWidth + ' Only positive numeric values allowed for options.tileWidth');
      }
    }
    if (is.defined(options.tileHeight)) {
      if (is.number(options.tileHeight) && options.tileHeight > 0) {
        this.options.tiffTileHeight = options.tileHeight;
      } else {
        throw new Error('Invalid Value for tileHeight ' + options.tileHeight + ' Only positive numeric values allowed for options.tileHeight');
      }
    }
    // pyramid
    if (is.defined(options.pyramid)) {
      if (is.bool(options.pyramid)) {
        this.options.tiffPyramid = options.pyramid;
      } else {
        throw new Error('Invalid Value for pyramid ' + options.pyramid + ' Only Boolean values allowed for options.pyramid');
      }
    }
    // resolution
    if (is.defined(options.xres)) {
      if (is.number(options.xres)) {
        this.options.tiffXres = options.xres;
      } else {
        throw new Error('Invalid Value for xres ' + options.xres + ' Only numeric values allowed for options.xres');
      }
    }
    if (is.defined(options.yres)) {
      if (is.number(options.yres)) {
        this.options.tiffYres = options.yres;
      } else {
        throw new Error('Invalid Value for yres ' + options.yres + ' Only numeric values allowed for options.yres');
      }
    }
    // compression
    if (is.defined(options.compression)) {
      if (is.string(options.compression) && is.inArray(options.compression, ['lzw', 'deflate', 'jpeg', 'ccittfax4', 'none'])) {
        this.options.tiffCompression = options.compression;
      } else {
        const message = `Invalid compression option "${options.compression}". Should be one of: lzw, deflate, jpeg, ccittfax4, none`;
        throw new Error(message);
      }
    }
    // predictor
    if (is.defined(options.predictor)) {
      if (is.string(options.predictor) && is.inArray(options.predictor, ['none', 'horizontal', 'float'])) {
        this.options.tiffPredictor = options.predictor;
      } else {
        const message = `Invalid predictor option "${options.predictor}". Should be one of: none, horizontal, float`;
        throw new Error(message);
      }
    }
  }
  return this._updateFormatOut('tiff', options);
}

/**
 * Force output to be raw, uncompressed uint8 pixel data.
 *
 * @example
 * // Extract raw RGB pixel data from JPEG input
 * const { data, info } = await sharp('input.jpg')
 *   .raw()
 *   .toBuffer({ resolveWithObject: true });
 *
 * @returns {Sharp}
 */
function raw () {
  return this._updateFormatOut('raw');
}

/**
 * Force output to a given format.
 *
 * @example
 * // Convert any input to PNG output
 * const data = await sharp(input)
 *   .toFormat('png')
 *   .toBuffer();
 *
 * @param {(String|Object)} format - as a String or an Object with an 'id' attribute
 * @param {Object} options - output options
 * @returns {Sharp}
 * @throws {Error} unsupported format or options
 */
function toFormat (format, options) {
  if (is.object(format) && is.string(format.id)) {
    format = format.id;
  }
  if (format === 'jpg') format = 'jpeg';
  if (!is.inArray(format, ['jpeg', 'png', 'webp', 'tiff', 'raw'])) {
    throw new Error('Unsupported output format ' + format);
  }
  return this[format](options);
}

/**
 * Use tile-based deep zoom (image pyramid) output.
 * Set the format and options for tile images via the `toFormat`, `jpeg`, `png` or `webp` functions.
 * Use a `.zip` or `.szi` file extension with `toFile` to write to a compressed archive file format.
 *
 * Warning: multiple sharp instances concurrently producing tile output can expose a possible race condition in some versions of libgsf.
 *
 * @example
 *  sharp('input.tiff')
 *   .png()
 *   .tile({
 *     size: 512
 *   })
 *   .toFile('output.dz', function(err, info) {
 *     // output.dzi is the Deep Zoom XML definition
 *     // output_files contains 512x512 tiles grouped by zoom level
 *   });
 *
 * @param {Object} [tile]
 * @param {Number} [tile.size=256] tile size in pixels, a value between 1 and 8192.
 * @param {Number} [tile.overlap=0] tile overlap in pixels, a value between 0 and 8192.
 * @param {Number} [tile.angle=0] tile angle of rotation, must be a multiple of 90.
 * @param {String} [tile.depth] how deep to make the pyramid, possible values are `onepixel`, `onetile` or `one`, default based on layout.
 * @param {String} [tile.container='fs'] tile container, with value `fs` (filesystem) or `zip` (compressed file).
 * @param {String} [tile.layout='dz'] filesystem layout, possible values are `dz`, `zoomify` or `google`.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
function tile (tile) {
  if (is.object(tile)) {
    // Size of square tiles, in pixels
    if (is.defined(tile.size)) {
      if (is.integer(tile.size) && is.inRange(tile.size, 1, 8192)) {
        this.options.tileSize = tile.size;
      } else {
        throw new Error('Invalid tile size (1 to 8192) ' + tile.size);
      }
    }
    // Overlap of tiles, in pixels
    if (is.defined(tile.overlap)) {
      if (is.integer(tile.overlap) && is.inRange(tile.overlap, 0, 8192)) {
        if (tile.overlap > this.options.tileSize) {
          throw new Error('Tile overlap ' + tile.overlap + ' cannot be larger than tile size ' + this.options.tileSize);
        }
        this.options.tileOverlap = tile.overlap;
      } else {
        throw new Error('Invalid tile overlap (0 to 8192) ' + tile.overlap);
      }
    }
    // Container
    if (is.defined(tile.container)) {
      if (is.string(tile.container) && is.inArray(tile.container, ['fs', 'zip'])) {
        this.options.tileContainer = tile.container;
      } else {
        throw new Error('Invalid tile container ' + tile.container);
      }
    }
    // Layout
    if (is.defined(tile.layout)) {
      if (is.string(tile.layout) && is.inArray(tile.layout, ['dz', 'google', 'zoomify'])) {
        this.options.tileLayout = tile.layout;
      } else {
        throw new Error('Invalid tile layout ' + tile.layout);
      }
    }

    // Angle of rotation,
    if (is.defined(tile.angle)) {
      if (is.integer(tile.angle) && !(tile.angle % 90)) {
        this.options.tileAngle = tile.angle;
      } else {
        throw new Error('Unsupported angle: angle must be a positive/negative multiple of 90 ' + tile.angle);
      }
    }

    // Depth of tiles
    if (is.defined(tile.depth)) {
      if (is.string(tile.depth) && is.inArray(tile.depth, ['onepixel', 'onetile', 'one'])) {
        this.options.tileDepth = tile.depth;
      } else {
        throw new Error("Invalid tile depth '" + tile.depth + "', should be one of 'onepixel', 'onetile' or 'one'");
      }
    }
  }
  // Format
  if (is.inArray(this.options.formatOut, ['jpeg', 'png', 'webp'])) {
    this.options.tileFormat = this.options.formatOut;
  } else if (this.options.formatOut !== 'input') {
    throw new Error('Invalid tile format ' + this.options.formatOut);
  }

  return this._updateFormatOut('dz');
}

/**
 * Update the output format unless options.force is false,
 * in which case revert to input format.
 * @private
 * @param {String} formatOut
 * @param {Object} [options]
 * @param {Boolean} [options.force=true] - force output format, otherwise attempt to use input format
 * @returns {Sharp}
 */
function _updateFormatOut (formatOut, options) {
  if (!(is.object(options) && options.force === false)) {
    this.options.formatOut = formatOut;
  }
  return this;
}

/**
 * Update a Boolean attribute of the this.options Object.
 * @private
 * @param {String} key
 * @param {Boolean} val
 * @throws {Error} Invalid key
 */
function _setBooleanOption (key, val) {
  if (is.bool(val)) {
    this.options[key] = val;
  } else {
    throw new Error('Invalid ' + key + ' (boolean) ' + val);
  }
}

/**
 * Called by a WriteableStream to notify us it is ready for data.
 * @private
 */
function _read () {
  if (!this.options.streamOut) {
    this.options.streamOut = true;
    this._pipeline();
  }
}

/**
 * Invoke the C++ image processing pipeline
 * Supports callback, stream and promise variants
 * @private
 */
function _pipeline (callback) {
  const that = this;
  if (typeof callback === 'function') {
    // output=file/buffer
    if (this._isStreamInput()) {
      // output=file/buffer, input=stream
      this.on('finish', function () {
        that._flattenBufferIn();
        sharp.pipeline(that.options, callback);
      });
    } else {
      // output=file/buffer, input=file/buffer
      sharp.pipeline(this.options, callback);
    }
    return this;
  } else if (this.options.streamOut) {
    // output=stream
    if (this._isStreamInput()) {
      // output=stream, input=stream
      if (this.streamInFinished) {
        this._flattenBufferIn();
        sharp.pipeline(this.options, function (err, data, info) {
          if (err) {
            that.emit('error', err);
          } else {
            that.emit('info', info);
            that.push(data);
          }
          that.push(null);
        });
      } else {
        this.on('finish', function () {
          that._flattenBufferIn();
          sharp.pipeline(that.options, function (err, data, info) {
            if (err) {
              that.emit('error', err);
            } else {
              that.emit('info', info);
              that.push(data);
            }
            that.push(null);
          });
        });
      }
    } else {
      // output=stream, input=file/buffer
      sharp.pipeline(this.options, function (err, data, info) {
        if (err) {
          that.emit('error', err);
        } else {
          that.emit('info', info);
          that.push(data);
        }
        that.push(null);
      });
    }
    return this;
  } else {
    // output=promise
    if (this._isStreamInput()) {
      // output=promise, input=stream
      return new Promise(function (resolve, reject) {
        that.on('finish', function () {
          that._flattenBufferIn();
          sharp.pipeline(that.options, function (err, data, info) {
            if (err) {
              reject(err);
            } else {
              if (that.options.resolveWithObject) {
                resolve({ data: data, info: info });
              } else {
                resolve(data);
              }
            }
          });
        });
      });
    } else {
      // output=promise, input=file/buffer
      return new Promise(function (resolve, reject) {
        sharp.pipeline(that.options, function (err, data, info) {
          if (err) {
            reject(err);
          } else {
            if (that.options.resolveWithObject) {
              resolve({ data: data, info: info });
            } else {
              resolve(data);
            }
          }
        });
      });
    }
  }
}

/**
 * Decorate the Sharp prototype with output-related functions.
 * @private
 */
module.exports = function (Sharp) {
  Object.assign(Sharp.prototype, {
    // Public
    toFile,
    toBuffer,
    withMetadata,
    jpeg,
    png,
    webp,
    tiff,
    raw,
    toFormat,
    tile,
    // Private
    _updateFormatOut,
    _setBooleanOption,
    _read,
    _pipeline
  });
};
