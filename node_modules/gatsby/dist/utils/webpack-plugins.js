"use strict";

const webpack = require(`webpack`);

const plugin = (name, optimize) => {
  let Plugin = (optimize ? webpack.optimize : webpack)[name];
  return (...args) => new Plugin(...args);
};

const plugins = {
  normalModuleReplacement: plugin(`NormalModuleReplacementPlugin`),
  contextReplacement: plugin(`ContextReplacementPlugin`),
  ignore: plugin(`IgnorePlugin`),
  watchIgnore: plugin(`WatchIgnorePlugin`),
  banner: plugin(`BannerPlugin`),
  prefetch: plugin(`PrefetchPlugin`),
  automaticPrefetch: plugin(`AutomaticPrefetchPlugin`),
  define: plugin(`DefinePlugin`),
  provide: plugin(`ProvidePlugin`),
  hotModuleReplacement: plugin(`HotModuleReplacementPlugin`),
  sourceMapDevTool: plugin(`SourceMapDevToolPlugin`),
  evalSourceMapDevTool: plugin(`EvalSourceMapDevToolPlugin`),
  evalDevToolModule: plugin(`EvalDevToolModulePlugin`),
  cache: plugin(`CachePlugin`),
  extendedAPI: plugin(`ExtendedAPIPlugin`),
  externals: plugin(`ExternalsPlugin`),
  jsonpTemplate: plugin(`JsonpTemplatePlugin`),
  libraryTemplate: plugin(`LibraryTemplatePlugin`),
  loaderTarget: plugin(`LoaderTargetPlugin`),
  memoryOutputFile: plugin(`MemoryOutputFileSystem`),
  progress: plugin(`ProgressPlugin`),
  setVarMainTemplate: plugin(`SetVarMainTemplatePlugin`),
  umdMainTemplate: plugin(`UmdMainTemplatePlugin`),
  noErrors: plugin(`NoErrorsPlugin`),
  noEmitOnErrors: plugin(`NoEmitOnErrorsPlugin`),
  newWatching: plugin(`NewWatchingPlugin`),
  environment: plugin(`EnvironmentPlugin`),
  dll: plugin(`DllPlugin`),
  dllReference: plugin(`DllReferencePlugin`),
  loaderOptions: plugin(`LoaderOptionsPlugin`),
  namedModules: plugin(`NamedModulesPlugin`),
  namedChunks: plugin(`NamedChunksPlugin`),
  hashedModuleIds: plugin(`HashedModuleIdsPlugin`),
  moduleFilenameH: plugin(`ModuleFilenameHelpers`),
  aggressiveMerging: plugin(`AggressiveMergingPlugin`, true),
  aggressiveSplitting: plugin(`AggressiveSplittingPlugin`, true),
  splitChunks: plugin(`SplitChunks`, true),
  chunkModuleIdRange: plugin(`ChunkModuleIdRangePlugin`, true),
  dedupe: plugin(`DedupePlugin`, true),
  limitChunkCount: plugin(`LimitChunkCountPlugin`, true),
  minChunkSize: plugin(`MinChunkSizePlugin`, true),
  occurrenceOrder: plugin(`OccurrenceOrderPlugin`, true),
  moduleConcatenation: plugin(`ModuleConcatenationPlugin`, true)
};
module.exports = plugins;
//# sourceMappingURL=webpack-plugins.js.map