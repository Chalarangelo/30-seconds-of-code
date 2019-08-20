//      
'use strict';

const path = require('path');
const loaders = require('./loaders');
const readFile = require('./readFile');
const cacheWrapper = require('./cacheWrapper');
const getDirectory = require('./getDirectory');
const getPropertyByPath = require('./getPropertyByPath');

const MODE_SYNC = 'sync';

// An object value represents a config object.
// null represents that the loader did not find anything relevant.
// undefined represents that the loader found something relevant
// but it was empty.
                                              

class Explorer {
                                                      
                                                 
                                                        
                                                   
                          

  constructor(options                 ) {
    this.loadCache = options.cache ? new Map() : null;
    this.loadSyncCache = options.cache ? new Map() : null;
    this.searchCache = options.cache ? new Map() : null;
    this.searchSyncCache = options.cache ? new Map() : null;
    this.config = options;
    this.validateConfig();
  }

  clearLoadCache() {
    if (this.loadCache) {
      this.loadCache.clear();
    }
    if (this.loadSyncCache) {
      this.loadSyncCache.clear();
    }
  }

  clearSearchCache() {
    if (this.searchCache) {
      this.searchCache.clear();
    }
    if (this.searchSyncCache) {
      this.searchSyncCache.clear();
    }
  }

  clearCaches() {
    this.clearLoadCache();
    this.clearSearchCache();
  }

  validateConfig() {
    const config = this.config;

    config.searchPlaces.forEach(place => {
      const loaderKey = path.extname(place) || 'noExt';
      const loader = config.loaders[loaderKey];
      if (!loader) {
        throw new Error(
          `No loader specified for ${getExtensionDescription(
            place
          )}, so searchPlaces item "${place}" is invalid`
        );
      }
    });
  }

  search(searchFrom         )                             {
    searchFrom = searchFrom || process.cwd();
    return getDirectory(searchFrom).then(dir => {
      return this.searchFromDirectory(dir);
    });
  }

  searchFromDirectory(dir        )                             {
    const absoluteDir = path.resolve(process.cwd(), dir);
    const run = () => {
      return this.searchDirectory(absoluteDir).then(result => {
        const nextDir = this.nextDirectoryToSearch(absoluteDir, result);
        if (nextDir) {
          return this.searchFromDirectory(nextDir);
        }
        return this.config.transform(result);
      });
    };

    if (this.searchCache) {
      return cacheWrapper(this.searchCache, absoluteDir, run);
    }
    return run();
  }

  searchSync(searchFrom         )                    {
    searchFrom = searchFrom || process.cwd();
    const dir = getDirectory.sync(searchFrom);
    return this.searchFromDirectorySync(dir);
  }

  searchFromDirectorySync(dir        )                    {
    const absoluteDir = path.resolve(process.cwd(), dir);
    const run = () => {
      const result = this.searchDirectorySync(absoluteDir);
      const nextDir = this.nextDirectoryToSearch(absoluteDir, result);
      if (nextDir) {
        return this.searchFromDirectorySync(nextDir);
      }
      return this.config.transform(result);
    };

    if (this.searchSyncCache) {
      return cacheWrapper(this.searchSyncCache, absoluteDir, run);
    }
    return run();
  }

  searchDirectory(dir        )                             {
    return this.config.searchPlaces.reduce((prevResultPromise, place) => {
      return prevResultPromise.then(prevResult => {
        if (this.shouldSearchStopWithResult(prevResult)) {
          return prevResult;
        }
        return this.loadSearchPlace(dir, place);
      });
    }, Promise.resolve(null));
  }

  searchDirectorySync(dir        )                    {
    let result = null;
    for (const place of this.config.searchPlaces) {
      result = this.loadSearchPlaceSync(dir, place);
      if (this.shouldSearchStopWithResult(result)) break;
    }
    return result;
  }

  shouldSearchStopWithResult(result                   )          {
    if (result === null) return false;
    if (result.isEmpty && this.config.ignoreEmptySearchPlaces) return false;
    return true;
  }

  loadSearchPlace(dir        , place        )                             {
    const filepath = path.join(dir, place);
    return readFile(filepath).then(content => {
      return this.createCosmiconfigResult(filepath, content);
    });
  }

  loadSearchPlaceSync(dir        , place        )                    {
    const filepath = path.join(dir, place);
    const content = readFile.sync(filepath);
    return this.createCosmiconfigResultSync(filepath, content);
  }

  nextDirectoryToSearch(
    currentDir        ,
    currentResult                   
  )          {
    if (this.shouldSearchStopWithResult(currentResult)) {
      return null;
    }
    const nextDir = nextDirUp(currentDir);
    if (nextDir === currentDir || currentDir === this.config.stopDir) {
      return null;
    }
    return nextDir;
  }

  loadPackageProp(filepath        , content        ) {
    const parsedContent = loaders.loadJson(filepath, content);
    const packagePropValue = getPropertyByPath(
      parsedContent,
      this.config.packageProp
    );
    return packagePropValue || null;
  }

  getLoaderEntryForFile(filepath        )              {
    if (path.basename(filepath) === 'package.json') {
      const loader = this.loadPackageProp.bind(this);
      return { sync: loader, async: loader };
    }

    const loaderKey = path.extname(filepath) || 'noExt';
    return this.config.loaders[loaderKey] || {};
  }

  getSyncLoaderForFile(filepath        )             {
    const entry = this.getLoaderEntryForFile(filepath);
    if (!entry.sync) {
      throw new Error(
        `No sync loader specified for ${getExtensionDescription(filepath)}`
      );
    }
    return entry.sync;
  }

  getAsyncLoaderForFile(filepath        )              {
    const entry = this.getLoaderEntryForFile(filepath);
    const loader = entry.async || entry.sync;
    if (!loader) {
      throw new Error(
        `No async loader specified for ${getExtensionDescription(filepath)}`
      );
    }
    return loader;
  }

  loadFileContent(
    mode                  ,
    filepath        ,
    content               
  )                                                 {
    if (content === null) {
      return null;
    }
    if (content.trim() === '') {
      return undefined;
    }
    const loader =
      mode === MODE_SYNC
        ? this.getSyncLoaderForFile(filepath)
        : this.getAsyncLoaderForFile(filepath);
    return loader(filepath, content);
  }

  loadedContentToCosmiconfigResult(
    filepath        ,
    loadedContent                   
  )                    {
    if (loadedContent === null) {
      return null;
    }
    if (loadedContent === undefined) {
      return { filepath, config: undefined, isEmpty: true };
    }
    return { config: loadedContent, filepath };
  }

  createCosmiconfigResult(
    filepath        ,
    content               
  )                             {
    return Promise.resolve()
      .then(() => {
        return this.loadFileContent('async', filepath, content);
      })
      .then(loaderResult => {
        return this.loadedContentToCosmiconfigResult(filepath, loaderResult);
      });
  }

  createCosmiconfigResultSync(
    filepath        ,
    content               
  )                    {
    const loaderResult = this.loadFileContent('sync', filepath, content);
    return this.loadedContentToCosmiconfigResult(filepath, loaderResult);
  }

  validateFilePath(filepath         ) {
    if (!filepath) {
      throw new Error('load and loadSync must pass a non-empty string');
    }
  }

  load(filepath        )                             {
    return Promise.resolve().then(() => {
      this.validateFilePath(filepath);
      const absoluteFilePath = path.resolve(process.cwd(), filepath);
      return cacheWrapper(this.loadCache, absoluteFilePath, () => {
        return readFile(absoluteFilePath, { throwNotFound: true })
          .then(content => {
            return this.createCosmiconfigResult(absoluteFilePath, content);
          })
          .then(this.config.transform);
      });
    });
  }

  loadSync(filepath        )                    {
    this.validateFilePath(filepath);
    const absoluteFilePath = path.resolve(process.cwd(), filepath);
    return cacheWrapper(this.loadSyncCache, absoluteFilePath, () => {
      const content = readFile.sync(absoluteFilePath, { throwNotFound: true });
      const result = this.createCosmiconfigResultSync(
        absoluteFilePath,
        content
      );
      return this.config.transform(result);
    });
  }
}

module.exports = function createExplorer(options                 ) {
  const explorer = new Explorer(options);

  return {
    search: explorer.search.bind(explorer),
    searchSync: explorer.searchSync.bind(explorer),
    load: explorer.load.bind(explorer),
    loadSync: explorer.loadSync.bind(explorer),
    clearLoadCache: explorer.clearLoadCache.bind(explorer),
    clearSearchCache: explorer.clearSearchCache.bind(explorer),
    clearCaches: explorer.clearCaches.bind(explorer),
  };
};

function nextDirUp(dir        )         {
  return path.dirname(dir);
}

function getExtensionDescription(filepath        )         {
  const ext = path.extname(filepath);
  return ext ? `extension "${ext}"` : 'files without extensions';
}
