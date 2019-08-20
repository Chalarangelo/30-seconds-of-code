"use strict";

const _ = require(`lodash`); /// Plugin options are loaded onPreBootstrap in gatsby-node


const pluginDefaults = {
  forceBase64Format: false,
  useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
  stripMetadata: true,
  lazyImageGeneration: true,
  defaultQuality: 50
};
const generalArgs = {
  quality: 50,
  jpegProgressive: true,
  pngCompressionLevel: 9,
  // default is 4 (https://github.com/kornelski/pngquant/blob/4219956d5e080be7905b5581314d913d20896934/rust/bin.rs#L61)
  pngCompressionSpeed: 4,
  base64: true,
  grayscale: false,
  duotone: false,
  pathPrefix: ``,
  toFormat: ``,
  toFormatBase64: ``,
  sizeByPixelDensity: false
};
let pluginOptions = Object.assign({}, pluginDefaults);

exports.setPluginOptions = opts => {
  pluginOptions = Object.assign({}, pluginOptions, opts);
  generalArgs.quality = pluginOptions.defaultQuality;
  return pluginOptions;
};

exports.getPluginOptions = () => pluginOptions;

const healOptions = ({
  defaultQuality: quality
}, args, fileExtension, defaultArgs = {}) => {
  let options = _.defaults({}, args, {
    quality
  }, defaultArgs, generalArgs);

  options.quality = parseInt(options.quality, 10);
  options.pngCompressionLevel = parseInt(options.pngCompressionLevel, 10);
  options.pngCompressionSpeed = parseInt(options.pngCompressionSpeed, 10);
  options.toFormat = options.toFormat.toLowerCase();
  options.toFormatBase64 = options.toFormatBase64.toLowerCase(); // when toFormat is not set we set it based on fileExtension

  if (options.toFormat === ``) {
    options.toFormat = fileExtension.toLowerCase();

    if (fileExtension === `jpeg`) {
      options.toFormat = `jpg`;
    }
  } // only set width to 400 if neither width nor height is passed


  if (options.width === undefined && options.height === undefined) {
    options.width = 400;
  } else if (options.width !== undefined) {
    options.width = parseInt(options.width, 10);
  } else if (options.height !== undefined) {
    options.height = parseInt(options.height, 10);
  } // only set maxWidth to 800 if neither maxWidth nor maxHeight is passed


  if (options.maxWidth === undefined && options.maxHeight === undefined) {
    options.maxWidth = 800;
  } else if (options.maxWidth !== undefined) {
    options.maxWidth = parseInt(options.maxWidth, 10);
  } else if (options.maxHeight !== undefined) {
    options.maxHeight = parseInt(options.maxHeight, 10);
  }

  return options;
};

exports.healOptions = healOptions;