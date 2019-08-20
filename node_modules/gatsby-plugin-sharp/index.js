"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

const sharp = require(`./safe-sharp`);

const imageSize = require(`probe-image-size`);

const _ = require(`lodash`);

const fs = require(`fs-extra`);

const path = require(`path`);

const {
  scheduleJob
} = require(`./scheduler`);

const {
  createArgsDigest
} = require(`./process-file`);

const {
  reportError
} = require(`./report-error`);

const {
  getPluginOptions,
  healOptions
} = require(`./plugin-options`);

const {
  memoizedTraceSVG,
  notMemoizedtraceSVG
} = require(`./trace-svg`);

const imageSizeCache = new Map();

const getImageSize = file => {
  if (process.env.NODE_ENV !== `test` && imageSizeCache.has(file.internal.contentDigest)) {
    return imageSizeCache.get(file.internal.contentDigest);
  } else {
    const dimensions = imageSize.sync(toArray(fs.readFileSync(file.absolutePath)));
    imageSizeCache.set(file.internal.contentDigest, dimensions);
    return dimensions;
  }
};

const duotone = require(`./duotone`); // Bound action creators should be set when passed to onPreInit in gatsby-node.
// ** It is NOT safe to just directly require the gatsby module **.
// There is no guarantee that the module resolved is the module executing!
// This can occur in mono repos depending on how dependencies have been hoisted.
// The direct require has been left only to avoid breaking changes.


let {
  boundActionCreators
} = require(`gatsby/dist/redux/actions`);

exports.setBoundActionCreators = actions => {
  boundActionCreators = actions;
}; // We set the queue to a Map instead of an array to easily search in onCreateDevServer Api hook


const queue = new Map();
exports.queue = queue;

function queueImageResizing({
  file,
  args = {},
  reporter
}) {
  const pluginOptions = getPluginOptions();
  const options = healOptions(pluginOptions, args, file.extension);

  if (!options.toFormat) {
    options.toFormat = file.extension;
  }

  const argsDigestShort = createArgsDigest(options);
  const imgSrc = `/${file.name}.${options.toFormat}`;
  const dirPath = path.join(process.cwd(), `public`, `static`, file.internal.contentDigest, argsDigestShort);
  const filePath = path.join(dirPath, imgSrc);
  fs.ensureDirSync(dirPath);
  let width;
  let height; // Calculate the eventual width/height of the image.

  const dimensions = getImageSize(file);
  let aspectRatio = dimensions.width / dimensions.height;
  const originalName = file.base; // If the width/height are both set, we're cropping so just return
  // that.

  if (options.width && options.height) {
    width = options.width;
    height = options.height; // Recalculate the aspectRatio for the cropped photo

    aspectRatio = width / height;
  } else if (options.width) {
    // Use the aspect ratio of the image to calculate what will be the resulting
    // height.
    width = options.width;
    height = Math.round(options.width / aspectRatio);
  } else {
    // Use the aspect ratio of the image to calculate what will be the resulting
    // width.
    height = options.height;
    width = Math.round(options.height * aspectRatio);
  } // encode the file name for URL


  const encodedImgSrc = `/${encodeURIComponent(file.name)}.${options.toFormat}`; // Prefix the image src.

  const digestDirPrefix = `${file.internal.contentDigest}/${argsDigestShort}`;
  const prefixedSrc = options.pathPrefix + `/static/${digestDirPrefix}` + encodedImgSrc; // Create job and add it to the queue, the queue will be processed inside gatsby-node.js

  const job = {
    args: options,
    inputPath: file.absolutePath,
    contentDigest: file.internal.contentDigest,
    outputPath: filePath
  };
  queue.set(prefixedSrc, job); // schedule job immediately - this will be changed when image processing on demand is implemented

  const finishedPromise = scheduleJob(job, boundActionCreators, pluginOptions, reporter).then(() => {
    queue.delete(prefixedSrc);
  });
  return {
    src: prefixedSrc,
    absolutePath: filePath,
    width,
    height,
    aspectRatio,
    finishedPromise,
    // // finishedPromise is needed to not break our API (https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-transformer-sqip/src/extend-node-type.js#L115)
    // finishedPromise: {
    //   then: (resolve, reject) => {
    //     scheduleJob(job, boundActionCreators, pluginOptions).then(() => {
    //       queue.delete(prefixedSrc)
    //       resolve()
    //     }, reject)
    //   },
    // },
    originalName: originalName
  };
} // A value in pixels(Int)


const defaultBase64Width = () => getPluginOptions().base64Width || 20;

async function generateBase64({
  file,
  args,
  reporter
}) {
  const pluginOptions = getPluginOptions();
  const options = healOptions(pluginOptions, args, file.extension, {
    width: defaultBase64Width()
  });
  let pipeline;

  try {
    pipeline = sharp(file.absolutePath);

    if (!options.rotate) {
      pipeline.rotate();
    }
  } catch (err) {
    reportError(`Failed to process image ${file.absolutePath}`, err, reporter);
    return null;
  }

  if (options.trim) {
    pipeline = pipeline.trim(options.trim);
  }

  const forceBase64Format = args.toFormatBase64 || pluginOptions.forceBase64Format;

  if (forceBase64Format) {
    args.toFormat = forceBase64Format;
  }

  pipeline.resize(options.width, options.height, {
    position: options.cropFocus
  }).png({
    compressionLevel: options.pngCompressionLevel,
    adaptiveFiltering: false,
    force: args.toFormat === `png`
  }).jpeg({
    quality: options.quality,
    progressive: options.jpegProgressive,
    force: args.toFormat === `jpg`
  }).webp({
    quality: options.quality,
    force: args.toFormat === `webp`
  }); // grayscale

  if (options.grayscale) {
    pipeline = pipeline.grayscale();
  } // rotate


  if (options.rotate && options.rotate !== 0) {
    pipeline = pipeline.rotate(options.rotate);
  } // duotone


  if (options.duotone) {
    pipeline = await duotone(options.duotone, args.toFormat, pipeline);
  }

  const {
    data: buffer,
    info
  } = await pipeline.toBuffer({
    resolveWithObject: true
  });
  const base64output = {
    src: `data:image/${info.format};base64,${buffer.toString(`base64`)}`,
    width: info.width,
    height: info.height,
    aspectRatio: info.width / info.height,
    originalName: file.base
  };
  return base64output;
}

const generateCacheKey = ({
  file,
  args
}) => `${file.id}${JSON.stringify(args)}`;

const memoizedBase64 = _.memoize(generateBase64, generateCacheKey);

const cachifiedProcess = async (_ref, genKey, processFn) => {
  let {
    cache
  } = _ref,
      arg = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["cache"]);
  const cachedKey = genKey(arg);
  const cached = await cache.get(cachedKey);

  if (cached) {
    return cached;
  }

  const result = await processFn(arg);
  await cache.set(cachedKey, result);
  return result;
};

async function base64(arg) {
  if (arg.cache) {
    // Not all tranformer plugins are going to provide cache
    return await cachifiedProcess(arg, generateCacheKey, generateBase64);
  }

  return await memoizedBase64(arg);
}

async function traceSVG(args) {
  if (args.cache) {
    // Not all tranformer plugins are going to provide cache
    return await cachifiedProcess(args, generateCacheKey, notMemoizedtraceSVG);
  }

  return await memoizedTraceSVG(args);
}

async function getTracedSVG({
  file,
  options,
  cache,
  reporter
}) {
  if (options.generateTracedSVG && options.tracedSVG) {
    const tracedSVG = await traceSVG({
      args: options.tracedSVG,
      fileArgs: options,
      file,
      cache,
      reporter
    });
    return tracedSVG;
  }

  return undefined;
}

async function fluid({
  file,
  args = {},
  reporter,
  cache
}) {
  const options = healOptions(getPluginOptions(), args, file.extension);

  if (options.sizeByPixelDensity) {
    /*
     * We learned that `sizeByPixelDensity` is only valid for vector images,
     * and Gatsby’s implementation of Sharp doesn’t support vector images.
     * This means we should remove this option in the next major version of
     * Gatsby, but for now we can no-op and warn.
     *
     * See https://github.com/gatsbyjs/gatsby/issues/12743
     *
     * TODO: remove the sizeByPixelDensity option in the next breaking release
     */
    reporter.warn(`the option sizeByPixelDensity is deprecated and should not be used. It will be removed in the next major release of Gatsby.`);
  } // Account for images with a high pixel density. We assume that these types of
  // images are intended to be displayed at their native resolution.


  let metadata;

  try {
    metadata = await sharp(file.absolutePath).metadata();
  } catch (err) {
    reportError(`Failed to process image ${file.absolutePath}`, err, reporter);
    return null;
  }

  const {
    width,
    height,
    density,
    format
  } = metadata; // if no maxWidth is passed, we need to resize the image based on the passed maxHeight

  const fixedDimension = options.maxWidth === undefined ? `maxHeight` : `maxWidth`;

  if (options[fixedDimension] < 1) {
    throw new Error(`${fixedDimension} has to be a positive int larger than zero (> 0), now it's ${options[fixedDimension]}`);
  }

  let presentationWidth, presentationHeight;

  if (fixedDimension === `maxWidth`) {
    presentationWidth = Math.min(options.maxWidth, width);
    presentationHeight = Math.round(presentationWidth * (height / width));
  } else {
    presentationHeight = Math.min(options.maxHeight, height);
    presentationWidth = Math.round(presentationHeight * (width / height));
  } // If the users didn't set default sizes, we'll make one.


  if (!options.sizes) {
    options.sizes = `(max-width: ${presentationWidth}px) 100vw, ${presentationWidth}px`;
  } // Create sizes (in width) for the image if no custom breakpoints are
  // provided. If the max width of the container for the rendered markdown file
  // is 800px, the sizes would then be: 200, 400, 800, 1200, 1600.
  //
  // This is enough sizes to provide close to the optimal image size for every
  // device size / screen resolution while (hopefully) not requiring too much
  // image processing time (Sharp has optimizations thankfully for creating
  // multiple sizes of the same input file)


  const fluidSizes = [options[fixedDimension]];

  // use standard breakpoints if no custom breakpoints are specified
  if (!options.srcSetBreakpoints || !options.srcSetBreakpoints.length) {
    fluidSizes.push(options[fixedDimension] / 4);
    fluidSizes.push(options[fixedDimension] / 2);
    fluidSizes.push(options[fixedDimension] * 1.5);
    fluidSizes.push(options[fixedDimension] * 2);
  } else {
    options.srcSetBreakpoints.forEach(breakpoint => {
      if (breakpoint < 1) {
        throw new Error(`All ints in srcSetBreakpoints should be positive ints larger than zero (> 0), found ${breakpoint}`);
      } // ensure no duplicates are added


      if (fluidSizes.includes(breakpoint)) {
        return;
      }

      fluidSizes.push(breakpoint);
    });
  }

  const filteredSizes = fluidSizes.filter(size => size < (fixedDimension === `maxWidth` ? width : height)); // Add the original image to ensure the largest image possible
  // is available for small images. Also so we can link to
  // the original image.

  filteredSizes.push(fixedDimension === `maxWidth` ? width : height); // Sort sizes for prettiness.

  const sortedSizes = _.sortBy(filteredSizes); // Queue sizes for processing.


  const dimensionAttr = fixedDimension === `maxWidth` ? `width` : `height`;
  const otherDimensionAttr = fixedDimension === `maxWidth` ? `height` : `width`;
  const images = sortedSizes.map(size => {
    const arrrgs = Object.assign({}, options, {
      [otherDimensionAttr]: undefined,
      [dimensionAttr]: Math.round(size) // Queue sizes for processing.

    });

    if (options.maxWidth !== undefined && options.maxHeight !== undefined) {
      arrrgs.height = Math.round(size * (options.maxHeight / options.maxWidth));
    }

    return queueImageResizing({
      file,
      args: arrrgs,
      // matey
      reporter
    });
  });
  let base64Image;

  if (options.base64) {
    const base64Width = options.base64Width || defaultBase64Width();
    const base64Height = Math.max(1, Math.round(base64Width * height / width));
    const base64Args = {
      duotone: options.duotone,
      grayscale: options.grayscale,
      rotate: options.rotate,
      trim: options.trim,
      toFormat: options.toFormat,
      toFormatBase64: options.toFormatBase64,
      width: base64Width,
      height: base64Height // Get base64 version

    };
    base64Image = await base64({
      file,
      args: base64Args,
      reporter,
      cache
    });
  }

  const tracedSVG = await getTracedSVG({
    options,
    file,
    cache,
    reporter
  }); // Construct src and srcSet strings.

  const originalImg = _.maxBy(images, image => image.width).src;

  const fallbackSrc = _.minBy(images, image => Math.abs(options[fixedDimension] - image[dimensionAttr])).src;

  const srcSet = images.map(image => `${image.src} ${Math.round(image.width)}w`).join(`,\n`);
  const originalName = file.base; // figure out the srcSet format

  let srcSetType = `image/${format}`;

  if (options.toFormat) {
    switch (options.toFormat) {
      case `png`:
        srcSetType = `image/png`;
        break;

      case `jpg`:
        srcSetType = `image/jpeg`;
        break;

      case `webp`:
        srcSetType = `image/webp`;
        break;

      case ``:
      case `no_change`:
      default:
        break;
    }
  }

  return {
    base64: base64Image && base64Image.src,
    aspectRatio: images[0].aspectRatio,
    src: fallbackSrc,
    srcSet,
    srcSetType,
    sizes: options.sizes,
    originalImg: originalImg,
    originalName: originalName,
    density,
    presentationWidth,
    presentationHeight,
    tracedSVG
  };
}

async function fixed({
  file,
  args = {},
  reporter,
  cache
}) {
  const options = healOptions(getPluginOptions(), args, file.extension); // if no width is passed, we need to resize the image based on the passed height

  const fixedDimension = options.width === undefined ? `height` : `width`; // Create sizes for different resolutions — we do 1x, 1.5x, and 2x.

  const sizes = [];
  sizes.push(options[fixedDimension]);
  sizes.push(options[fixedDimension] * 1.5);
  sizes.push(options[fixedDimension] * 2);
  const dimensions = getImageSize(file);
  const filteredSizes = sizes.filter(size => size <= dimensions[fixedDimension]); // If there's no fluid images after filtering (e.g. image is smaller than what's
  // requested, add back the original so there's at least something)

  if (filteredSizes.length === 0) {
    filteredSizes.push(dimensions[fixedDimension]);
    console.warn(`
                 The requested ${fixedDimension} "${options[fixedDimension]}px" for a resolutions field for
                 the file ${file.absolutePath}
                 was larger than the actual image ${fixedDimension} of ${dimensions[fixedDimension]}px!
                 If possible, replace the current image with a larger one.
                 `);
  } // Sort images for prettiness.


  const sortedSizes = _.sortBy(filteredSizes);

  const images = sortedSizes.map(size => {
    const arrrgs = Object.assign({}, options, {
      [fixedDimension]: Math.round(size) // Queue images for processing.

    });

    if (options.width !== undefined && options.height !== undefined) {
      arrrgs.height = Math.round(size * (options.height / options.width));
    }

    return queueImageResizing({
      file,
      args: arrrgs,
      reporter
    });
  });
  let base64Image;

  if (options.base64) {
    const base64Args = {
      // height is adjusted accordingly with respect to the aspect ratio
      width: options.base64Width,
      duotone: options.duotone,
      grayscale: options.grayscale,
      rotate: options.rotate,
      toFormat: options.toFormat,
      toFormatBase64: options.toFormatBase64 // Get base64 version

    };
    base64Image = await base64({
      file,
      args: base64Args,
      reporter,
      cache
    });
  }

  const tracedSVG = await getTracedSVG({
    options,
    file,
    reporter,
    cache
  });
  const fallbackSrc = images[0].src;
  const srcSet = images.map((image, i) => {
    let resolution;

    switch (i) {
      case 0:
        resolution = `1x`;
        break;

      case 1:
        resolution = `1.5x`;
        break;

      case 2:
        resolution = `2x`;
        break;

      default:
    }

    return `${image.src} ${resolution}`;
  }).join(`,\n`);
  const originalName = file.base;
  return {
    base64: base64Image && base64Image.src,
    aspectRatio: images[0].aspectRatio,
    width: images[0].width,
    height: images[0].height,
    src: fallbackSrc,
    srcSet,
    originalName: originalName,
    tracedSVG
  };
}

function toArray(buf) {
  var arr = new Array(buf.length);

  for (var i = 0; i < buf.length; i++) {
    arr[i] = buf[i];
  }

  return arr;
}

exports.queueImageResizing = queueImageResizing;
exports.resize = queueImageResizing;
exports.base64 = base64;
exports.traceSVG = traceSVG;
exports.sizes = fluid;
exports.resolutions = fixed;
exports.fluid = fluid;
exports.fixed = fixed;
exports.getImageSize = getImageSize;