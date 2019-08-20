'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackSources = require('webpack-sources');

var _webpackSources2 = _interopRequireDefault(_webpackSources);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { ConcatSource, SourceMapSource, OriginalSource } = _webpackSources2.default;
const {
  Template,
  util: { createHash }
} = _webpack2.default;

const MODULE_TYPE = 'css/mini-extract';

const pluginName = 'mini-css-extract-plugin';

const REGEXP_CHUNKHASH = /\[chunkhash(?::(\d+))?\]/i;
const REGEXP_CONTENTHASH = /\[contenthash(?::(\d+))?\]/i;
const REGEXP_NAME = /\[name\]/i;

class CssDependency extends _webpack2.default.Dependency {
  constructor({ identifier, content, media, sourceMap }, context, identifierIndex) {
    super();
    this.identifier = identifier;
    this.identifierIndex = identifierIndex;
    this.content = content;
    this.media = media;
    this.sourceMap = sourceMap;
    this.context = context;
  }

  getResourceIdentifier() {
    return `css-module-${this.identifier}-${this.identifierIndex}`;
  }
}

class CssDependencyTemplate {
  apply() {}
}

class CssModule extends _webpack2.default.Module {
  constructor(dependency) {
    super(MODULE_TYPE, dependency.context);
    this.id = '';
    this._identifier = dependency.identifier;
    this._identifierIndex = dependency.identifierIndex;
    this.content = dependency.content;
    this.media = dependency.media;
    this.sourceMap = dependency.sourceMap;
  }

  // no source() so webpack doesn't do add stuff to the bundle

  size() {
    return this.content.length;
  }

  identifier() {
    return `css ${this._identifier} ${this._identifierIndex}`;
  }

  readableIdentifier(requestShortener) {
    return `css ${requestShortener.shorten(this._identifier)}${this._identifierIndex ? ` (${this._identifierIndex})` : ''}`;
  }

  nameForCondition() {
    const resource = this._identifier.split('!').pop();
    const idx = resource.indexOf('?');
    if (idx >= 0) return resource.substring(0, idx);
    return resource;
  }

  updateCacheModule(module) {
    this.content = module.content;
    this.media = module.media;
    this.sourceMap = module.sourceMap;
  }

  needRebuild() {
    return true;
  }

  build(options, compilation, resolver, fileSystem, callback) {
    this.buildInfo = {};
    this.buildMeta = {};
    callback();
  }

  updateHash(hash) {
    super.updateHash(hash);
    hash.update(this.content);
    hash.update(this.media || '');
    hash.update(this.sourceMap ? JSON.stringify(this.sourceMap) : '');
  }
}

class CssModuleFactory {
  create({
    dependencies: [dependency]
  }, callback) {
    callback(null, new CssModule(dependency));
  }
}

class MiniCssExtractPlugin {
  constructor(options) {
    this.options = Object.assign({
      filename: '[name].css'
    }, options);
    if (!this.options.chunkFilename) {
      const { filename } = this.options;
      const hasName = filename.includes('[name]');
      const hasId = filename.includes('[id]');
      const hasChunkHash = filename.includes('[chunkhash]');
      // Anything changing depending on chunk is fine
      if (hasChunkHash || hasName || hasId) {
        this.options.chunkFilename = filename;
      } else {
        // Elsewise prefix '[id].' in front of the basename to make it changing
        this.options.chunkFilename = filename.replace(/(^|\/)([^/]*(?:\?|$))/, '$1[id].$2');
      }
    }
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap(pluginName, compilation => {
      compilation.hooks.normalModuleLoader.tap(pluginName, (lc, m) => {
        const loaderContext = lc;
        const module = m;
        loaderContext[MODULE_TYPE] = content => {
          if (!Array.isArray(content) && content != null) {
            throw new Error(`Exported value was not extracted as an array: ${JSON.stringify(content)}`);
          }

          const identifierCountMap = new Map();
          for (const line of content) {
            const count = identifierCountMap.get(line.identifier) || 0;
            module.addDependency(new CssDependency(line, m.context, count));
            identifierCountMap.set(line.identifier, count + 1);
          }
        };
      });
      compilation.dependencyFactories.set(CssDependency, new CssModuleFactory());
      compilation.dependencyTemplates.set(CssDependency, new CssDependencyTemplate());
      compilation.mainTemplate.hooks.renderManifest.tap(pluginName, (result, { chunk }) => {
        const renderedModules = Array.from(chunk.modulesIterable).filter(module => module.type === MODULE_TYPE);
        if (renderedModules.length > 0) {
          result.push({
            render: () => this.renderContentAsset(compilation, chunk, renderedModules, compilation.runtimeTemplate.requestShortener),
            filenameTemplate: this.options.filename,
            pathOptions: {
              chunk,
              contentHashType: MODULE_TYPE
            },
            identifier: `${pluginName}.${chunk.id}`,
            hash: chunk.contentHash[MODULE_TYPE]
          });
        }
      });
      compilation.chunkTemplate.hooks.renderManifest.tap(pluginName, (result, { chunk }) => {
        const renderedModules = Array.from(chunk.modulesIterable).filter(module => module.type === MODULE_TYPE);
        if (renderedModules.length > 0) {
          result.push({
            render: () => this.renderContentAsset(compilation, chunk, renderedModules, compilation.runtimeTemplate.requestShortener),
            filenameTemplate: this.options.chunkFilename,
            pathOptions: {
              chunk,
              contentHashType: MODULE_TYPE
            },
            identifier: `${pluginName}.${chunk.id}`,
            hash: chunk.contentHash[MODULE_TYPE]
          });
        }
      });
      compilation.mainTemplate.hooks.hashForChunk.tap(pluginName, (hash, chunk) => {
        const { chunkFilename } = this.options;
        if (REGEXP_CHUNKHASH.test(chunkFilename)) {
          hash.update(JSON.stringify(chunk.getChunkMaps(true).hash));
        }
        if (REGEXP_CONTENTHASH.test(chunkFilename)) {
          hash.update(JSON.stringify(chunk.getChunkMaps(true).contentHash[MODULE_TYPE] || {}));
        }
        if (REGEXP_NAME.test(chunkFilename)) {
          hash.update(JSON.stringify(chunk.getChunkMaps(true).name));
        }
      });
      compilation.hooks.contentHash.tap(pluginName, chunk => {
        const { outputOptions } = compilation;
        const { hashFunction, hashDigest, hashDigestLength } = outputOptions;
        const hash = createHash(hashFunction);
        for (const m of chunk.modulesIterable) {
          if (m.type === MODULE_TYPE) {
            m.updateHash(hash);
          }
        }
        const { contentHash } = chunk;
        contentHash[MODULE_TYPE] = hash.digest(hashDigest).substring(0, hashDigestLength);
      });
      const { mainTemplate } = compilation;
      mainTemplate.hooks.localVars.tap(pluginName, (source, chunk) => {
        const chunkMap = this.getCssChunkObject(chunk);
        if (Object.keys(chunkMap).length > 0) {
          return Template.asString([source, '', '// object to store loaded CSS chunks', 'var installedCssChunks = {', Template.indent(chunk.ids.map(id => `${JSON.stringify(id)}: 0`).join(',\n')), '}']);
        }
        return source;
      });
      mainTemplate.hooks.requireEnsure.tap(pluginName, (source, chunk, hash) => {
        const chunkMap = this.getCssChunkObject(chunk);
        if (Object.keys(chunkMap).length > 0) {
          const chunkMaps = chunk.getChunkMaps();
          const linkHrefPath = mainTemplate.getAssetPath(JSON.stringify(this.options.chunkFilename), {
            hash: `" + ${mainTemplate.renderCurrentHashCode(hash)} + "`,
            hashWithLength: length => `" + ${mainTemplate.renderCurrentHashCode(hash, length)} + "`,
            chunk: {
              id: '" + chunkId + "',
              hash: `" + ${JSON.stringify(chunkMaps.hash)}[chunkId] + "`,
              hashWithLength(length) {
                const shortChunkHashMap = Object.create(null);
                for (const chunkId of Object.keys(chunkMaps.hash)) {
                  if (typeof chunkMaps.hash[chunkId] === 'string') {
                    shortChunkHashMap[chunkId] = chunkMaps.hash[chunkId].substring(0, length);
                  }
                }
                return `" + ${JSON.stringify(shortChunkHashMap)}[chunkId] + "`;
              },
              contentHash: {
                [MODULE_TYPE]: `" + ${JSON.stringify(chunkMaps.contentHash[MODULE_TYPE])}[chunkId] + "`
              },
              contentHashWithLength: {
                [MODULE_TYPE]: length => {
                  const shortContentHashMap = {};
                  const contentHash = chunkMaps.contentHash[MODULE_TYPE];
                  for (const chunkId of Object.keys(contentHash)) {
                    if (typeof contentHash[chunkId] === 'string') {
                      shortContentHashMap[chunkId] = contentHash[chunkId].substring(0, length);
                    }
                  }
                  return `" + ${JSON.stringify(shortContentHashMap)}[chunkId] + "`;
                }
              },
              name: `" + (${JSON.stringify(chunkMaps.name)}[chunkId]||chunkId) + "`
            },
            contentHashType: MODULE_TYPE
          });
          return Template.asString([source, '', `// ${pluginName} CSS loading`, `var cssChunks = ${JSON.stringify(chunkMap)};`, 'if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);', 'else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {', Template.indent(['promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {', Template.indent([`var href = ${linkHrefPath};`, `var fullhref = ${mainTemplate.requireFn}.p + href;`, 'var existingLinkTags = document.getElementsByTagName("link");', 'for(var i = 0; i < existingLinkTags.length; i++) {', Template.indent(['var tag = existingLinkTags[i];', 'var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");', 'if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();']), '}', 'var existingStyleTags = document.getElementsByTagName("style");', 'for(var i = 0; i < existingStyleTags.length; i++) {', Template.indent(['var tag = existingStyleTags[i];', 'var dataHref = tag.getAttribute("data-href");', 'if(dataHref === href || dataHref === fullhref) return resolve();']), '}', 'var linkTag = document.createElement("link");', 'linkTag.rel = "stylesheet";', 'linkTag.type = "text/css";', 'linkTag.onload = resolve;', 'linkTag.onerror = function(event) {', Template.indent(['var request = event && event.target && event.target.src || fullhref;', 'var err = new Error("Loading CSS chunk " + chunkId + " failed.\\n(" + request + ")");', 'err.request = request;', 'delete installedCssChunks[chunkId]', 'linkTag.parentNode.removeChild(linkTag)', 'reject(err);']), '};', 'linkTag.href = fullhref;', 'var head = document.getElementsByTagName("head")[0];', 'head.appendChild(linkTag);']), '}).then(function() {', Template.indent(['installedCssChunks[chunkId] = 0;']), '}));']), '}']);
        }
        return source;
      });
    });
  }

  getCssChunkObject(mainChunk) {
    const obj = {};
    for (const chunk of mainChunk.getAllAsyncChunks()) {
      for (const module of chunk.modulesIterable) {
        if (module.type === MODULE_TYPE) {
          obj[chunk.id] = 1;
          break;
        }
      }
    }
    return obj;
  }

  renderContentAsset(compilation, chunk, modules, requestShortener) {
    let usedModules;

    const [chunkGroup] = chunk.groupsIterable;
    if (typeof chunkGroup.getModuleIndex2 === 'function') {
      // Store dependencies for modules
      const moduleDependencies = new Map(modules.map(m => [m, new Set()]));

      // Get ordered list of modules per chunk group
      // This loop also gathers dependencies from the ordered lists
      // Lists are in reverse order to allow to use Array.pop()
      const modulesByChunkGroup = Array.from(chunk.groupsIterable, cg => {
        const sortedModules = modules.map(m => {
          return {
            module: m,
            index: cg.getModuleIndex2(m)
          };
        }).filter(item => item.index !== undefined).sort((a, b) => b.index - a.index).map(item => item.module);
        for (let i = 0; i < sortedModules.length; i++) {
          const set = moduleDependencies.get(sortedModules[i]);
          for (let j = i + 1; j < sortedModules.length; j++) {
            set.add(sortedModules[j]);
          }
        }

        return sortedModules;
      });

      // set with already included modules in correct order
      usedModules = new Set();

      const unusedModulesFilter = m => !usedModules.has(m);

      while (usedModules.size < modules.length) {
        let success = false;
        let bestMatch;
        let bestMatchDeps;
        // get first module where dependencies are fulfilled
        for (const list of modulesByChunkGroup) {
          // skip and remove already added modules
          while (list.length > 0 && usedModules.has(list[list.length - 1])) list.pop();

          // skip empty lists
          if (list.length !== 0) {
            const module = list[list.length - 1];
            const deps = moduleDependencies.get(module);
            // determine dependencies that are not yet included
            const failedDeps = Array.from(deps).filter(unusedModulesFilter);

            // store best match for fallback behavior
            if (!bestMatchDeps || bestMatchDeps.length > failedDeps.length) {
              bestMatch = list;
              bestMatchDeps = failedDeps;
            }
            if (failedDeps.length === 0) {
              // use this module and remove it from list
              usedModules.add(list.pop());
              success = true;
              break;
            }
          }
        }

        if (!success) {
          // no module found => there is a conflict
          // use list with fewest failed deps
          // and emit a warning
          const fallbackModule = bestMatch.pop();
          compilation.warnings.push(new Error(`chunk ${chunk.name || chunk.id} [mini-css-extract-plugin]\n` + 'Conflicting order between:\n' + ` * ${fallbackModule.readableIdentifier(requestShortener)}\n` + `${bestMatchDeps.map(m => ` * ${m.readableIdentifier(requestShortener)}`).join('\n')}`));
          usedModules.add(fallbackModule);
        }
      }
    } else {
      // fallback for older webpack versions
      // (to avoid a breaking change)
      // TODO remove this in next mayor version
      // and increase minimum webpack version to 4.12.0
      modules.sort((a, b) => a.index2 - b.index2);
      usedModules = modules;
    }
    const source = new ConcatSource();
    const externalsSource = new ConcatSource();
    for (const m of usedModules) {
      if (/^@import url/.test(m.content)) {
        // HACK for IE
        // http://stackoverflow.com/a/14676665/1458162
        let { content } = m;
        if (m.media) {
          // insert media into the @import
          // this is rar
          // TODO improve this and parse the CSS to support multiple medias
          content = content.replace(/;|\s*$/, m.media);
        }
        externalsSource.add(content);
        externalsSource.add('\n');
      } else {
        if (m.media) {
          source.add(`@media ${m.media} {\n`);
        }
        if (m.sourceMap) {
          source.add(new SourceMapSource(m.content, m.readableIdentifier(requestShortener), m.sourceMap));
        } else {
          source.add(new OriginalSource(m.content, m.readableIdentifier(requestShortener)));
        }
        source.add('\n');
        if (m.media) {
          source.add('}\n');
        }
      }
    }
    return new ConcatSource(externalsSource, source);
  }
}

MiniCssExtractPlugin.loader = require.resolve('./loader');

exports.default = MiniCssExtractPlugin;