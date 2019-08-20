/**
 * Webpack Assets Manifest
 *
 * @author Eric King <eric@webdeveric.com>
 */

'use strict';

const fs = require('fs');
const url = require('url');
const path = require('path');
const get = require('lodash.get');
const has = require('lodash.has');
const validateOptions = require('schema-utils');
const { SyncHook, SyncWaterfallHook } = require('tapable');
const { RawSource } = require('webpack-sources');
const optionsSchema = require('./options-schema.json');
const {
  maybeArrayWrap,
  filterHashes,
  getSRIHash,
  warn,
  varType,
  getSortedObject,
} = require('./helpers.js');

const IS_MERGING = Symbol('isMerging');
const PLUGIN_NAME = 'WebpackAssetsManifest';

class WebpackAssetsManifest
{
  /**
   * @param {object} options - configuration options
   * @constructor
   */
  constructor(options = {})
  {
    /**
     * This is using hooks from {@link https://github.com/webpack/tapable Tapable}.
     */
    this.hooks = {
      apply: new SyncHook([ 'manifest' ]),
      customize: new SyncWaterfallHook([ 'entry', 'original', 'manifest', 'asset' ]),
      transform: new SyncWaterfallHook([ 'assets', 'manifest' ]),
      done: new SyncHook([ 'manifest', 'stats' ]),
      options: new SyncWaterfallHook([ 'options' ]),
      afterOptions: new SyncHook([ 'options' ]),
    };

    this.hooks.transform.tap(PLUGIN_NAME, assets => {
      const { sortManifest } = this.options;

      return sortManifest ? getSortedObject(
        assets,
        typeof sortManifest === 'function' ? sortManifest.bind(this) : undefined
      ) : assets;
    });

    this.hooks.afterOptions.tap(PLUGIN_NAME, options => {
      this.options = Object.assign( this.defaultOptions, options );
      this.options.integrityHashes = filterHashes( this.options.integrityHashes );

      validateOptions(optionsSchema, this.options, PLUGIN_NAME);

      // Copy over any entries that may have been added to the manifest before apply() was called.
      // If the same key exists in assets and options.assets, options.assets should be used.
      this.assets = Object.assign(this.options.assets, this.assets, this.options.assets);

      if ( this.options.hasOwnProperty('contextRelativeKeys') ) {
        warn('contextRelativeKeys has been removed. Please use the customize hook instead.');
      }

      [ 'apply', 'customize', 'transform', 'done' ].forEach( hookName => {
        if ( typeof this.options[ hookName ] === 'function' ) {
          this.hooks[ hookName ].tap(`${PLUGIN_NAME}.option.${hookName}`, this.options[ hookName ] );
        }
      });
    });

    this.options = Object.assign( this.defaultOptions, options );

    // This is what gets JSON stringified
    this.assets = this.options.assets;

    // hashed filename : original filename
    this.assetNames = new Map();

    // This is passed to the customize() hook
    this.currentAsset = null;

    // The Webpack compiler instance
    this.compiler = null;

    // compilation stats
    this.stats = null;

    // This is used to identify hot module replacement files
    this.hmrRegex = null;

    // Is a merge happening?
    this[ IS_MERGING ] = false;
  }

  /**
   * Hook into the Webpack compiler
   *
   * @param  {object} compiler - The Webpack compiler object
   */
  apply(compiler)
  {
    this.compiler = compiler;

    // Allow hooks to modify options
    this.options = this.hooks.options.call(this.options);

    // Ensure options contain defaults and are valid
    this.hooks.afterOptions.call(this.options);

    const { output: { filename, hotUpdateChunkFilename } } = compiler.options;

    if ( filename !== hotUpdateChunkFilename && typeof hotUpdateChunkFilename === 'string' ) {
      this.hmrRegex = new RegExp(
        hotUpdateChunkFilename
          .replace(/\./g, '\\.')
          .replace(/\[[a-z]+(:\d+)?\]/gi, (m, n) => (n ? `.{${n.substr(1)}}` : '.+')) + '$',
        'i'
      );
    }

    // compilation.assets contains the results of the build
    compiler.hooks.compilation.tap(PLUGIN_NAME, this.handleCompilation.bind(this));

    // Add manifest.json to compiler.assets
    compiler.hooks.emit.tapAsync(PLUGIN_NAME, this.handleEmit.bind(this));

    // Use fs to write the manifest.json to disk if `options.writeToDisk` is true
    compiler.hooks.afterEmit.tapPromise(PLUGIN_NAME, this.handleAfterEmit.bind(this));

    // The compilation has finished
    compiler.hooks.done.tap(PLUGIN_NAME, stats => this.hooks.done.call(this, stats));

    // Setup is complete.
    this.hooks.apply.call(this);
  }

  /**
   * Get the default options.
   *
   * @return {object}
   */
  get defaultOptions()
  {
    return {
      assets: Object.create(null),
      output: 'manifest.json',
      replacer: null, // Its easier to use the transform hook instead.
      space: 2,
      writeToDisk: false,
      fileExtRegex: /\.\w{2,4}\.(?:map|gz)$|\.\w+$/i,
      sortManifest: true,
      merge: false,
      publicPath: null,

      // Hooks
      apply: null,     // After setup is complete
      customize: null, // Customize each entry in the manifest
      transform: null, // Transform the entire manifest
      done: null,      // Compilation is done and the manifest has been written

      // Include `compilation.entrypoints` in the manifest file
      entrypoints: false,
      entrypointsKey: 'entrypoints',

      // https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
      integrity: false,
      integrityHashes: [ 'sha256', 'sha384', 'sha512' ],
      integrityPropertyName: 'integrity',
    };
  }

  /**
   * Determine if the manifest data is currently being merged.
   *
   * @return {boolean}
   */
  get isMerging()
  {
    return this[ IS_MERGING ];
  }

  /**
   * Get the file extension.
   *
   * @param  {string} filename
   * @return {string}
   */
  getExtension(filename)
  {
    if (! filename || typeof filename !== 'string') {
      return '';
    }

    filename = filename.split(/[?#]/)[0];

    if (this.options.fileExtRegex) {
      const ext = filename.match(this.options.fileExtRegex);

      return ext && ext.length ? ext[ 0 ] : '';
    }

    return path.extname(filename);
  }

  /**
   * Replace backslash with forward slash.
   *
   * @return {string}
   */
  fixKey(key)
  {
    return typeof key === 'string' ? key.replace( /\\/g, '/' ) : key;
  }

  /**
   * Determine if the filename matches the HMR filename pattern.
   *
   * @return {boolean}
   */
  isHMR(filename)
  {
    return this.hmrRegex ? this.hmrRegex.test( filename ) : false;
  }

  /**
   * Add item to assets without modifying the key or value.
   *
   * @param {string} key
   * @param {string} value
   * @return {object} this
   */
  setRaw(key, value)
  {
    this.assets[ key ] = value;

    return this;
  }

  /**
   * Add an item to the manifest.
   *
   * @param {string} key
   * @param {string} value
   * @return {object} this
   */
  set(key, value)
  {
    if ( this.isMerging && this.options.merge !== 'customize' ) {
      // Do not fix the key if merging since it should already be correct.
      return this.setRaw(key, value);
    }

    const fixedKey = this.fixKey(key);
    const publicPath = this.getPublicPath( value );

    const entry = this.hooks.customize.call(
      {
        key: fixedKey,
        value: publicPath,
      },
      {
        key,
        value,
      },
      this,
      this.currentAsset
    );

    // Allow the entry to be skipped
    if ( entry === false ) {
      return this;
    }

    // Use the customized values
    if ( varType(entry) === 'Object' ) {
      let { key = fixedKey, value = publicPath } = entry;

      // If the integrity should be returned but the entry value was
      // not customized lets do that now so it includes both.
      if ( value === publicPath && this.options.integrity ) {
        value = {
          src: value,
          integrity: get(this, `currentAsset.${this.options.integrityPropertyName}`, ''),
        };
      }

      return this.setRaw( key, value );
    }

    warn.once(`Unexpected customize() return type: ${varType(entry)}`);

    return this.setRaw( fixedKey, publicPath );
  }

  /**
   * Determine if an item exist in the manifest.
   *
   * @param {string} key
   * @return {boolean}
   */
  has(key)
  {
    return has(this.assets, key) || has(this.assets, this.fixKey(key));
  }

  /**
   * Get an item from the manifest.
   *
   * @param {string} key
   * @param {string} defaultValue - Defaults to empty string
   * @return {*}
   */
  get(key, defaultValue = '')
  {
    return this.assets[ key ] || this.assets[ this.fixKey(key) ] || defaultValue;
  }

  /**
   * Delete an item from the manifest.
   *
   * @param {string} key
   * @return {boolean}
   */
  delete(key)
  {
    if ( has(this.assets, key) ) {
      return (delete this.assets[ key ]);
    }

    key = this.fixKey(key);

    if ( has(this.assets, key) ) {
      return (delete this.assets[ key ]);
    }

    return false;
  }

  /**
   * Process compilation assets.
   *
   * @param  {object} assets - Assets by chunk name
   * @return {object}
   */
  processAssetsByChunkName(assets)
  {
    Object.keys(assets).forEach( chunkName => {
      maybeArrayWrap( assets[ chunkName ] )
        .filter( f => ! this.isHMR(f) ) // Remove hot module replacement files
        .forEach( filename => {
          this.assetNames.set( filename, chunkName + this.getExtension( filename ) );
        });
    });

    return this.assetNames;
  }

  /**
   * Get the data for `JSON.stringify()`.
   *
   * @return {object}
   */
  toJSON()
  {
    // This is the last chance to modify the data before the manifest file gets created.
    return this.hooks.transform.call(this.assets, this);
  }

  /**
   * `JSON.stringify()` the manifest.
   *
   * @return {string}
   */
  toString()
  {
    return JSON.stringify(this, this.options.replacer, this.options.space) || '{}';
  }

  /**
   * Merge data if the output file already exists
   */
  maybeMerge()
  {
    if ( this.options.merge ) {
      try {
        this[ IS_MERGING ] = true;

        const data = JSON.parse(fs.readFileSync(this.getOutputPath()));

        for ( const key in data ) {
          if ( ! this.has(key) ) {
            this.set(key, data[ key ]);
          }
        }
      } catch (err) { // eslint-disable-line
      } finally {
        this[ IS_MERGING ] = false;
      }
    }
  }

  /**
   * @param {object} entrypoints from a compilation
   */
  getEntrypointFilesGroupedByExtension( entrypoints )
  {
    const files = Object.create(null);
    const removeHMR = f => ! this.isHMR(f);
    const groupFilesByExtension = (files, file) => {
      const ext = this.getExtension(file).replace(/^\.+/, '').toLowerCase();

      files[ ext ] = files[ ext ] || [];
      files[ ext ].push( this.getPublicPath( file ) );

      return files;
    };

    for ( const [ name, entrypoint ] of entrypoints ) {
      files[ name ] = entrypoint
        .getFiles()
        .filter( removeHMR )
        .reduce( groupFilesByExtension, Object.create(null) );
    }

    return files;
  }

  /**
   * Handle the `emit` event
   *
   * @param  {object} compilation - the Webpack compilation object
   * @param  {Function} callback
   */
  handleEmit(compilation, callback)
  {
    this.stats = compilation.getStats().toJson();

    this.processAssetsByChunkName( this.stats.assetsByChunkName );

    for ( const [ hashedFile, filename ] of this.assetNames ) {
      this.currentAsset = compilation.assets[ hashedFile ];

      // `integrity` may have already been set by another plugin, like `webpack-subresource-integrity`.
      // Only generate the SRI hash if `integrity` is not found.
      if ( this.options.integrity && this.currentAsset && ! this.currentAsset[ this.options.integrityPropertyName ] ) {
        this.currentAsset[ this.options.integrityPropertyName ] = getSRIHash( this.options.integrityHashes, this.currentAsset.source() );
      }

      this.set( filename, hashedFile );

      this.currentAsset = null;
    }

    if ( this.options.entrypoints ) {
      const entrypoints = this.getEntrypointFilesGroupedByExtension( compilation.entrypoints );

      if ( this.options.entrypointsKey === false ) {
        for ( const key in entrypoints ) {
          this.setRaw( key, entrypoints[ key ] );
        }
      } else {
        this.setRaw( this.options.entrypointsKey, entrypoints );
      }
    }

    this.maybeMerge();

    const output = this.getManifestPath(
      compilation,
      this.inDevServer() ?
        path.basename( this.getOutputPath() ) :
        path.relative( compilation.compiler.outputPath, this.getOutputPath() )
    );

    compilation.assets[ output ] = new RawSource(this.toString());

    callback();
  }

  /**
   * Get the parsed output path. [hash] is supported.
   *
   * @param  {object} compilation - the Webpack compilation object
   * @param  {string} filename
   * @return {string}
   */
  getManifestPath(compilation, filename)
  {
    return compilation.getPath( filename, { chunk: { name: 'manifest' }, filename: 'manifest.json' } );
  }

  /**
   * Write to disk using `fs`.
   *
   * This is likely only needed if you're using webpack-dev-server
   * and you don't want to keep the manifest file only in memory.
   *
   * @param  {object} compilation - the Webpack compilation object
   */
  handleAfterEmit(compilation)
  {
    // Reset the internal mapping of hashed name to original name after every compilation.
    this.assetNames.clear();

    if ( ! this.options.writeToDisk ) {
      return Promise.resolve();
    }

    return new Promise( (resolve, reject) => {
      const output = this.getManifestPath( compilation, this.getOutputPath() );

      require('mkdirp')(
        path.dirname(output),
        err => {
          if ( err ) {
            reject( err );

            return;
          }

          fs.writeFile( output, this.toString(), resolve );
        }
      );
    });
  }

  /**
   * Record asset names
   *
   * @param  {object} loaderContext
   * @param  {object} module
   */
  handleNormalModuleLoader(loaderContext, module)
  {
    const { emitFile } = loaderContext;

    loaderContext.emitFile = (name, content, sourceMap) => {
      if ( ! this.assetNames.has( name ) ) {
        const originalName = path.join(
          path.dirname(name),
          path.basename(module.userRequest)
        );

        this.assetNames.set(name, originalName);
      }

      return emitFile.call(module, name, content, sourceMap);
    };
  }

  /**
   * Hook into the compilation object
   *
   * @param  {object} compilation - the Webpack compilation object
   */
  handleCompilation(compilation)
  {
    compilation.hooks.normalModuleLoader.tap(PLUGIN_NAME, this.handleNormalModuleLoader.bind(this));
  }

  /**
   * Determine if webpack-dev-server is being used
   *
   * @return {boolean}
   */
  inDevServer()
  {
    if ( process.argv.some( arg => arg.includes('webpack-dev-server') ) ) {
      return true;
    }

    return has(this, 'compiler.outputFileSystem') && this.compiler.outputFileSystem.constructor.name === 'MemoryFileSystem';
  }

  /**
   * Get the file system path to the manifest
   *
   * @return {string} path to manifest file
   */
  getOutputPath()
  {
    if ( ! this.compiler ) {
      return '';
    }

    if ( path.isAbsolute( this.options.output ) ) {
      return this.options.output;
    }

    if ( this.inDevServer() ) {
      let outputPath = get( this, 'compiler.options.devServer.outputPath', get( this, 'compiler.outputPath', '/' ) );

      if ( outputPath === '/' ) {
        warn.once('Please use an absolute path in options.output when using webpack-dev-server.');
        outputPath = get( this, 'compiler.context', process.cwd() );
      }

      return path.resolve( outputPath, this.options.output );
    }

    return path.resolve( this.compiler.outputPath, this.options.output );
  }

  /**
   * Get the public path for the filename
   *
   * @param  {string} filePath
   */
  getPublicPath(filename)
  {
    if ( typeof filename === 'string' ) {
      const { publicPath } = this.options;

      if ( typeof publicPath === 'function' ) {
        return publicPath( filename, this );
      }

      if ( typeof publicPath === 'string' ) {
        return url.resolve( publicPath, filename );
      }

      if ( publicPath === true ) {
        return url.resolve(
          get( this, 'compiler.options.output.publicPath', '' ),
          filename
        );
      }
    }

    return filename;
  }

  /**
   * Get a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler|Proxy} for the manifest.
   * This allows you to use `[]` to manage entries.
   *
   * @param {boolean} raw - Should the proxy use `setRaw` instead of `set`?
   * @return {Proxy}
   */
  getProxy(raw = false)
  {
    const setMethod = raw ? 'setRaw' : 'set';

    return new Proxy(this, {
      has(target, property) {
        return target.has(property);
      },
      get(target, property) {
        return target.get(property) || undefined;
      },
      set(target, property, value) {
        return target[ setMethod ](property, value).has(property);
      },
      deleteProperty(target, property) {
        return target.delete(property);
      },
    });
  }
}

module.exports = WebpackAssetsManifest;
