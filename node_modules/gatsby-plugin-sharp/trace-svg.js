"use strict";

const {
  promisify
} = require(`bluebird`);

const crypto = require(`crypto`);

const _ = require(`lodash`);

const tmpDir = require(`os`).tmpdir();

const sharp = require(`./safe-sharp`);

const duotone = require(`./duotone`);

const {
  getPluginOptions,
  healOptions
} = require(`./plugin-options`);

const {
  reportError
} = require(`./report-error`);

exports.notMemoizedPrepareTraceSVGInputFile = async ({
  file,
  options,
  tmpFilePath,
  reporter
}) => {
  let pipeline;

  try {
    pipeline = sharp(file.absolutePath);

    if (!options.rotate) {
      pipeline.rotate();
    }
  } catch (err) {
    reportError(`Failed to process image ${file.absolutePath}`, err, reporter);
    return;
  }

  pipeline.resize(options.width, options.height, {
    position: options.cropFocus
  }).png({
    compressionLevel: options.pngCompressionLevel,
    adaptiveFiltering: false,
    force: options.toFormat === `png`
  }).jpeg({
    quality: options.quality,
    progressive: options.jpegProgressive,
    force: options.toFormat === `jpg`
  }); // grayscale

  if (options.grayscale) {
    pipeline = pipeline.grayscale();
  } // rotate


  if (options.rotate && options.rotate !== 0) {
    pipeline = pipeline.rotate(options.rotate);
  } // duotone


  if (options.duotone) {
    pipeline = await duotone(options.duotone, options.toFormat, pipeline);
  }

  await new Promise((resolve, reject) => pipeline.toFile(tmpFilePath, err => {
    if (err) {
      return reject(err);
    }

    return resolve();
  }));
};

const optimize = svg => {
  const SVGO = require(`svgo`);

  const svgo = new SVGO({
    multipass: true,
    floatPrecision: 0
  });
  return svgo.optimize(svg).then(({
    data
  }) => data);
};

exports.notMemoizedtraceSVG = async ({
  file,
  args,
  fileArgs,
  reporter
}) => {
  const options = healOptions(getPluginOptions(), Object.assign({}, fileArgs && fileArgs.maxWidth && fileArgs.maxHeight ? {
    height: fileArgs.maxHeight,
    width: fileArgs.maxWidth
  } : {}, fileArgs), file.extension);
  const tmpFilePath = `${tmpDir}/${file.internal.contentDigest}-${file.name}-${crypto.createHash(`md5`).update(JSON.stringify(options)).digest(`hex`)}.${file.extension}`;

  try {
    await exports.memoizedPrepareTraceSVGInputFile({
      tmpFilePath,
      file,
      options,
      reporter
    });

    const svgToMiniDataURI = require(`mini-svg-data-uri`);

    const potrace = require(`potrace`);

    const trace = promisify(potrace.trace);
    const defaultArgs = {
      color: `lightgray`,
      optTolerance: 0.4,
      turdSize: 100,
      turnPolicy: potrace.Potrace.TURNPOLICY_MAJORITY
    };

    const optionsSVG = _.defaults(args, defaultArgs); // `srcset` attribute rejects URIs with literal spaces


    const encodeSpaces = str => str.replace(/ /gi, `%20`);

    return trace(tmpFilePath, optionsSVG).then(optimize).then(svgToMiniDataURI).then(encodeSpaces);
  } catch (e) {
    throw e;
  }
};

let memoizedPrepareTraceSVGInputFile, memoizedTraceSVG;

const createMemoizedFunctions = () => {
  exports.memoizedPrepareTraceSVGInputFile = memoizedPrepareTraceSVGInputFile = _.memoize(exports.notMemoizedPrepareTraceSVGInputFile, ({
    tmpFilePath
  }) => tmpFilePath);
  exports.memoizedTraceSVG = memoizedTraceSVG = _.memoize(exports.notMemoizedtraceSVG, ({
    file,
    args,
    fileArgs
  }) => `${file.internal.contentDigest}${JSON.stringify(args)}${JSON.stringify(fileArgs)}`);
}; // This is very hacky, but memoized function are pretty tricky to spy on
// in tests ;(


createMemoizedFunctions();

exports.createMemoizedFunctions = () => {
  createMemoizedFunctions();
};

exports.clearMemoizeCaches = () => {
  memoizedTraceSVG.cache.clear();
  memoizedPrepareTraceSVGInputFile.cache.clear();
};