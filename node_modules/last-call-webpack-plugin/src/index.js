const assign = require('lodash/assign');
const each = require('lodash/each');
const find = require('lodash/find');
const isArray = require('lodash/isArray');
const isFunction = require('lodash/isFunction');
const isRegExp = require('lodash/isRegExp');
const keys = require('lodash/keys');
const values = require('lodash/values');
const webpackSources = require('webpack-sources');

const PHASES = {
  OPTIMIZE_CHUNK_ASSETS: 'compilation.optimize-chunk-assets',
  OPTIMIZE_ASSETS: 'compilation.optimize-assets',
  EMIT: 'emit'
};
const PHASE_LIST = values(PHASES);

function ensureAssetProcessor(processor, index) {
  if (!processor) {
    throw new Error('LastCallWebpackPlugin Error: invalid options.assetProcessors[' + String(index) + '] (must be an object).');
  }
  if (!isRegExp(processor.regExp)) {
    throw new Error('LastCallWebpackPlugin Error: invalid options.assetProcessors[' + String(index) + '].regExp (must be an regular expression).');
  }
  if (!isFunction(processor.processor)) {
    throw new Error('LastCallWebpackPlugin Error: invalid options.assetProcessors[' + String(index) + '].processor (must be a function).');
  }
  if (processor.phase === undefined) {
    processor.phase = PHASES.OPTIMIZE_ASSETS;
  }
  if (!find(PHASE_LIST, function(p) { return p === processor.phase; })) {
    throw new Error('LastCallWebpackPlugin Error: invalid options.assetProcessors[' + String(index) + '].phase (must be on of: ' + PHASES.join(', ') + ').');
  }
}

class LastCallWebpackPlugin {
  constructor(options) {
    this.pluginDescriptor = this.buildPluginDescriptor();

    this.options = assign(
      {
        assetProcessors: [],
        canPrint: true
      },
      options || {}
    );

    this.phaseAssetProcessors = {};
    each(PHASE_LIST, (phase)  => {
      this.phaseAssetProcessors[phase] = [];
    });

    if (!isArray(this.options.assetProcessors)) {
      throw new Error('LastCallWebpackPlugin Error: invalid options.assetProcessors (must be an Array).');
    }
    each(this.options.assetProcessors, (processor, index) => {
      ensureAssetProcessor(processor, index);
      this.phaseAssetProcessors[processor.phase].push(processor);
    });

    this.resetInternalState();
  }

  buildPluginDescriptor() {
    return { name: 'LastCallWebpackPlugin' };
  }

  resetInternalState() {
    this.deleteAssetsMap = {};
  }

  setAsset(assetName, assetValue, immediate, compilation) {
    if (assetName) {
      if (assetValue === null) {
        this.deleteAssetsMap[assetName] = true;
        if (immediate) {
          delete compilation.assets[assetName];
        }
      } else {
        if (assetValue !== undefined) {
          compilation.assets[assetName] = this.createAsset(assetValue, compilation.assets[assetName]);
        }
      }
    }
  }

  deleteAssets(compilation) {
    if (this.deleteAssetsMap && compilation) {
      each(keys(this.deleteAssetsMap), (key) => {
        delete compilation.assets[key];
      });
    }
  }

  print() {
    if (this.options.canPrint) {
      console.log.apply(console, arguments);
    }
  }

  createAsset(content, originalAsset) {
    return new webpackSources.RawSource(content);
  }

  getAssetsAndProcessors(assets, phase) {
    const assetProcessors = this.phaseAssetProcessors[phase];
    const assetNames = keys(assets);
    const assetsAndProcessors = [];

    each(assetNames, (assetName) => {
      each(assetProcessors, (assetProcessor) => {
        const regExpResult = assetProcessor.regExp.exec(assetName);
        assetProcessor.regExp.lastIndex = 0;
        if (regExpResult) {
          const assetAndProcessor = {
            assetName: assetName,
            regExp: assetProcessor.regExp,
            processor: assetProcessor.processor,
            regExpResult: regExpResult,
          };
          assetsAndProcessors.push(assetAndProcessor);
        }
      });
    });

    return assetsAndProcessors;
  }

  process(compilation, phase) {
    const assetsAndProcessors = this.getAssetsAndProcessors(compilation.assets, phase);
    if (assetsAndProcessors.length <= 0) {
      return Promise.resolve(undefined);
    }

    const promises = [];

    const assetsManipulationObject = {
      setAsset: (assetName, assetValue, immediate) => {
        this.setAsset(assetName, assetValue, immediate, compilation);
      },
      getAsset: (assetName) => {
        var asset = assetName && compilation.assets[assetName] && compilation.assets[assetName].source();
        return asset || undefined;
      }
    };

    each(assetsAndProcessors, (assetAndProcessor) => {
      const asset = compilation.assets[assetAndProcessor.assetName];
      const promise = assetAndProcessor
        .processor(assetAndProcessor.assetName, asset, assetsManipulationObject)
        .then((result) => {
          if (result !== undefined) {
            this.setAsset(assetAndProcessor.assetName, result, false, compilation);
          }
        });
      promises.push(promise);
    });

    return Promise.all(promises);
  }

  apply(compiler) {
    const hasOptimizeChunkAssetsProcessors =
      this.phaseAssetProcessors[PHASES.OPTIMIZE_CHUNK_ASSETS].length > 0;
    const hasOptimizeAssetsProcessors =
      this.phaseAssetProcessors[PHASES.OPTIMIZE_ASSETS].length > 0;
    const hasEmitProcessors =
      this.phaseAssetProcessors[PHASES.EMIT].length > 0;

    compiler.hooks.compilation.tap(
      this.pluginDescriptor,
      (compilation, params) => {
        this.resetInternalState();

        if (hasOptimizeChunkAssetsProcessors) {
          compilation.hooks.optimizeChunkAssets.tapPromise(
            this.pluginDescriptor,
            chunks => this.process(compilation, PHASES.OPTIMIZE_CHUNK_ASSETS, { chunks: chunks })
          );
        }

        if (hasOptimizeAssetsProcessors) {
          compilation.hooks.optimizeAssets.tapPromise(
            this.pluginDescriptor,
            assets => this.process(compilation, PHASES.OPTIMIZE_ASSETS, { assets: assets })
          );
        }
      }
    );
    compiler.hooks.emit.tapPromise(
      this.pluginDescriptor,
      compilation =>
        (
          hasEmitProcessors ?
            this.process(compilation, PHASES.EMIT) :
            Promise.resolve(undefined)
        )
        .then((result) => {
          this.deleteAssets(compilation);
          return result;
        })
    );
  }
}
LastCallWebpackPlugin.PHASES = PHASES;

module.exports = LastCallWebpackPlugin;
