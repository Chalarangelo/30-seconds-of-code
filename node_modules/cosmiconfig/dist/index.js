//      
'use strict';

const os = require('os');
const createExplorer = require('./createExplorer');
const loaders = require('./loaders');

module.exports = cosmiconfig;

function cosmiconfig(
  moduleName        ,
  options   
                         
                     
                                 
                                      
                     
                    
                                                       
   
) {
  options = options || {};
  const defaults = {
    packageProp: moduleName,
    searchPlaces: [
      'package.json',
      `.${moduleName}rc`,
      `.${moduleName}rc.json`,
      `.${moduleName}rc.yaml`,
      `.${moduleName}rc.yml`,
      `.${moduleName}rc.js`,
      `${moduleName}.config.js`,
    ],
    ignoreEmptySearchPlaces: true,
    stopDir: os.homedir(),
    cache: true,
    transform: identity,
  };
  const normalizedOptions                  = Object.assign(
    {},
    defaults,
    options,
    {
      loaders: normalizeLoaders(options.loaders),
    }
  );

  return createExplorer(normalizedOptions);
}

cosmiconfig.loadJs = loaders.loadJs;
cosmiconfig.loadJson = loaders.loadJson;
cosmiconfig.loadYaml = loaders.loadYaml;

function normalizeLoaders(rawLoaders         )          {
  const defaults = {
    '.js': { sync: loaders.loadJs, async: loaders.loadJs },
    '.json': { sync: loaders.loadJson, async: loaders.loadJson },
    '.yaml': { sync: loaders.loadYaml, async: loaders.loadYaml },
    '.yml': { sync: loaders.loadYaml, async: loaders.loadYaml },
    noExt: { sync: loaders.loadYaml, async: loaders.loadYaml },
  };

  if (!rawLoaders) {
    return defaults;
  }

  return Object.keys(rawLoaders).reduce((result, ext) => {
    const entry = rawLoaders && rawLoaders[ext];
    if (typeof entry === 'function') {
      result[ext] = { sync: entry, async: entry };
    } else {
      result[ext] = entry;
    }
    return result;
  }, defaults);
}

function identity(x) {
  return x;
}
