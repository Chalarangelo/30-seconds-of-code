'use strict';

const path = require('path');
const util = require('util');
const stream = require('stream');
const events = require('events');
const is = require('./is');

require('./libvips').hasVendoredLibvips();

let sharp;
try {
  sharp = require('../build/Release/sharp.node');
} catch (err) {
  // Bail early if bindings aren't available
  const help = ['', 'Something went wrong installing the "sharp" module', '', err.message, ''];
  if (/NODE_MODULE_VERSION/.test(err.message)) {
    help.push('- Ensure the version of Node.js used at install time matches that used at runtime');
  } else if (/invalid ELF header/.test(err.message)) {
    help.push(`- Ensure "${process.platform}" is used at install time as well as runtime`);
  } else {
    help.push('- Remove the "node_modules/sharp" directory, run "npm install" and look for errors');
  }
  help.push(
    '- Consult the installation documentation at https://sharp.pixelplumbing.com/en/stable/install/',
    '- Search for this error at https://github.com/lovell/sharp/issues', ''
  );
  console.error(help.join('\n'));
  process.exit(1);
}

// Use NODE_DEBUG=sharp to enable libvips warnings
const debuglog = util.debuglog('sharp');

/**
 * @class Sharp
 *
 * Constructor factory to create an instance of `sharp`, to which further methods are chained.
 *
 * JPEG, PNG, WebP or TIFF format image data can be streamed out from this object.
 * When using Stream based output, derived attributes are available from the `info` event.
 *
 * Implements the [stream.Duplex](http://nodejs.org/api/stream.html#stream_class_stream_duplex) class.
 *
 * @example
 * sharp('input.jpg')
 *   .resize(300, 200)
 *   .toFile('output.jpg', function(err) {
 *     // output.jpg is a 300 pixels wide and 200 pixels high image
 *     // containing a scaled and cropped version of input.jpg
 *   });
 *
 * @example
 * // Read image data from readableStream,
 * // resize to 300 pixels wide,
 * // emit an 'info' event with calculated dimensions
 * // and finally write image data to writableStream
 * var transformer = sharp()
 *   .resize(300)
 *   .on('info', function(info) {
 *     console.log('Image height is ' + info.height);
 *   });
 * readableStream.pipe(transformer).pipe(writableStream);
 *
 * @example
 * // Create a blank 300x200 PNG image of semi-transluent red pixels
 * sharp({
 *   create: {
 *     width: 300,
 *     height: 200,
 *     channels: 4,
 *     background: { r: 255, g: 0, b: 0, alpha: 0.5 }
 *   }
 * })
 * .png()
 * .toBuffer()
 * .then( ... );
 *
 * @param {(Buffer|String)} [input] - if present, can be
 *  a Buffer containing JPEG, PNG, WebP, GIF, SVG, TIFF or raw pixel image data, or
 *  a String containing the path to an JPEG, PNG, WebP, GIF, SVG or TIFF image file.
 *  JPEG, PNG, WebP, GIF, SVG, TIFF or raw pixel image data can be streamed into the object when not present.
 * @param {Object} [options] - if present, is an Object with optional attributes.
 * @param {Boolean} [options.failOnError=true] - by default halt processing and raise an error when loading invalid images.
 *  Set this flag to `false` if you'd rather apply a "best effort" to decode images, even if the data is corrupt or invalid.
 * @param {Number} [options.density=72] - number representing the DPI for vector images.
 * @param {Number} [options.pages=1] - number of pages to extract for multi-page input (GIF, TIFF, PDF), use -1 for all pages.
 * @param {Number} [options.page=0] - page number to start extracting from for multi-page input (GIF, TIFF, PDF), zero based.
 * @param {Object} [options.raw] - describes raw pixel input image data. See `raw()` for pixel ordering.
 * @param {Number} [options.raw.width]
 * @param {Number} [options.raw.height]
 * @param {Number} [options.raw.channels] - 1-4
 * @param {Object} [options.create] - describes a new image to be created.
 * @param {Number} [options.create.width]
 * @param {Number} [options.create.height]
 * @param {Number} [options.create.channels] - 3-4
 * @param {String|Object} [options.create.background] - parsed by the [color](https://www.npmjs.org/package/color) module to extract values for red, green, blue and alpha.
 * @returns {Sharp}
 * @throws {Error} Invalid parameters
 */
const Sharp = function (input, options) {
  if (arguments.length === 1 && !is.defined(input)) {
    throw new Error('Invalid input');
  }
  if (!(this instanceof Sharp)) {
    return new Sharp(input, options);
  }
  stream.Duplex.call(this);
  this.options = {
    // input options
    sequentialRead: false,
    limitInputPixels: Math.pow(0x3FFF, 2),
    // ICC profiles
    iccProfilePath: path.join(__dirname, 'icc') + path.sep,
    // resize options
    topOffsetPre: -1,
    leftOffsetPre: -1,
    widthPre: -1,
    heightPre: -1,
    topOffsetPost: -1,
    leftOffsetPost: -1,
    widthPost: -1,
    heightPost: -1,
    width: -1,
    height: -1,
    canvas: 'crop',
    position: 0,
    resizeBackground: [0, 0, 0, 255],
    useExifOrientation: false,
    angle: 0,
    rotationAngle: 0,
    rotationBackground: [0, 0, 0, 255],
    rotateBeforePreExtract: false,
    flip: false,
    flop: false,
    extendTop: 0,
    extendBottom: 0,
    extendLeft: 0,
    extendRight: 0,
    extendBackground: [0, 0, 0, 255],
    withoutEnlargement: false,
    kernel: 'lanczos3',
    fastShrinkOnLoad: true,
    // operations
    tintA: 128,
    tintB: 128,
    flatten: false,
    flattenBackground: [0, 0, 0],
    negate: false,
    medianSize: 0,
    blurSigma: 0,
    sharpenSigma: 0,
    sharpenFlat: 1,
    sharpenJagged: 2,
    threshold: 0,
    thresholdGrayscale: true,
    trimThreshold: 0,
    gamma: 0,
    gammaOut: 0,
    greyscale: false,
    normalise: 0,
    brightness: 1,
    saturation: 1,
    hue: 0,
    booleanBufferIn: null,
    booleanFileIn: '',
    joinChannelIn: [],
    extractChannel: -1,
    removeAlpha: false,
    ensureAlpha: false,
    colourspace: 'srgb',
    composite: [],
    // output
    fileOut: '',
    formatOut: 'input',
    streamOut: false,
    withMetadata: false,
    withMetadataOrientation: -1,
    resolveWithObject: false,
    // output format
    jpegQuality: 80,
    jpegProgressive: false,
    jpegChromaSubsampling: '4:2:0',
    jpegTrellisQuantisation: false,
    jpegOvershootDeringing: false,
    jpegOptimiseScans: false,
    jpegOptimiseCoding: true,
    jpegQuantisationTable: 0,
    pngProgressive: false,
    pngCompressionLevel: 9,
    pngAdaptiveFiltering: false,
    pngPalette: false,
    pngQuality: 100,
    pngColours: 256,
    pngDither: 1,
    webpQuality: 80,
    webpAlphaQuality: 100,
    webpLossless: false,
    webpNearLossless: false,
    tiffQuality: 80,
    tiffCompression: 'jpeg',
    tiffPredictor: 'horizontal',
    tiffPyramid: false,
    tiffSquash: false,
    tiffTile: false,
    tiffTileHeight: 256,
    tiffTileWidth: 256,
    tiffXres: 1.0,
    tiffYres: 1.0,
    tileSize: 256,
    tileOverlap: 0,
    linearA: 1,
    linearB: 0,
    // Function to notify of libvips warnings
    debuglog: debuglog,
    // Function to notify of queue length changes
    queueListener: function (queueLength) {
      queue.emit('change', queueLength);
    }
  };
  this.options.input = this._createInputDescriptor(input, options, { allowStream: true });
  return this;
};
util.inherits(Sharp, stream.Duplex);

/**
 * An EventEmitter that emits a `change` event when a task is either:
 * - queued, waiting for _libuv_ to provide a worker thread
 * - complete
 * @member
 * @example
 * sharp.queue.on('change', function(queueLength) {
 *   console.log('Queue contains ' + queueLength + ' task(s)');
 * });
 */
const queue = new events.EventEmitter();
Sharp.queue = queue;

/**
 * An Object containing nested boolean values representing the available input and output formats/methods.
 * @example
 * console.log(sharp.format);
 * @returns {Object}
 */
Sharp.format = sharp.format();

/**
 * An Object containing the version numbers of libvips and its dependencies.
 * @member
 * @example
 * console.log(sharp.versions);
 */
Sharp.versions = {
  vips: sharp.libvipsVersion()
};
try {
  Sharp.versions = require('../vendor/versions.json');
} catch (err) {}

/**
 * Export constructor.
 * @private
 */
module.exports = Sharp;
