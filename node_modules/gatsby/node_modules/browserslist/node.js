var region = require('caniuse-lite/dist/unpacker/region').default
var path = require('path')
var fs = require('fs')

var BrowserslistError = require('./error')

var IS_SECTION = /^\s*\[(.+)\]\s*$/
var CONFIG_PATTERN = /^browserslist-config-/
var SCOPED_CONFIG__PATTERN = /@[^./]+\/browserslist-config(-|$)/
var FORMAT = 'Browserslist config should be a string or an array ' +
             'of strings with browser queries'

var filenessCache = { }
var configCache = { }

function checkExtend (name) {
  var use = ' Use `dangerousExtend` option to disable.'
  if (!CONFIG_PATTERN.test(name) && !SCOPED_CONFIG__PATTERN.test(name)) {
    throw new BrowserslistError(
      'Browserslist config needs `browserslist-config-` prefix. ' + use)
  }
  if (name.indexOf('.') !== -1) {
    throw new BrowserslistError(
      '`.` not allowed in Browserslist config name. ' + use)
  }
  if (name.indexOf('node_modules') !== -1) {
    throw new BrowserslistError(
      '`node_modules` not allowed in Browserslist config.' + use)
  }
}

function isFile (file) {
  if (file in filenessCache) {
    return filenessCache[file]
  }
  var result = fs.existsSync(file) && fs.statSync(file).isFile()
  if (!process.env.BROWSERSLIST_DISABLE_CACHE) {
    filenessCache[file] = result
  }
  return result
}

function eachParent (file, callback) {
  var loc = path.resolve(file)
  do {
    var result = callback(loc)
    if (typeof result !== 'undefined') return result
  } while (loc !== (loc = path.dirname(loc)))
  return undefined
}

function check (section) {
  if (Array.isArray(section)) {
    for (var i = 0; i < section.length; i++) {
      if (typeof section[i] !== 'string') {
        throw new BrowserslistError(FORMAT)
      }
    }
  } else if (typeof section !== 'string') {
    throw new BrowserslistError(FORMAT)
  }
}

function pickEnv (config, opts) {
  if (typeof config !== 'object') return config

  var name
  if (typeof opts.env === 'string') {
    name = opts.env
  } else if (process.env.BROWSERSLIST_ENV) {
    name = process.env.BROWSERSLIST_ENV
  } else if (process.env.NODE_ENV) {
    name = process.env.NODE_ENV
  } else {
    name = 'production'
  }

  return config[name] || config.defaults
}

function parsePackage (file) {
  var config = JSON.parse(fs.readFileSync(file))
  if (config.browserlist && !config.browserslist) {
    throw new BrowserslistError(
      '`browserlist` key instead of `browserslist` in ' + file)
  }
  var list = config.browserslist
  if (Array.isArray(list)) {
    list = { defaults: list }
  }

  for (var i in list) {
    check(list[i])
  }

  return list
}

module.exports = {
  loadQueries: function loadQueries (context, name) {
    if (!context.dangerousExtend) checkExtend(name)
    // eslint-disable-next-line security/detect-non-literal-require
    var queries = require(require.resolve(name, { paths: ['.'] }))
    if (!Array.isArray(queries)) {
      throw new BrowserslistError(
        '`' + name + '` config exports not an array of queries')
    }
    return queries
  },

  getStat: function getStat (opts) {
    var stats
    if (opts.stats) {
      stats = opts.stats
    } else if (process.env.BROWSERSLIST_STATS) {
      stats = process.env.BROWSERSLIST_STATS
    } else if (opts.path && path.resolve && fs.existsSync) {
      stats = eachParent(opts.path, function (dir) {
        var file = path.join(dir, 'browserslist-stats.json')
        return isFile(file) ? file : undefined
      })
    }

    if (typeof stats === 'string') {
      try {
        stats = JSON.parse(fs.readFileSync(stats))
      } catch (e) {
        throw new BrowserslistError('Can\'t read ' + stats)
      }
    }

    if (stats && 'dataByBrowser' in stats) {
      stats = stats.dataByBrowser
    }

    return stats
  },

  loadConfig: function loadConfig (opts) {
    if (process.env.BROWSERSLIST) {
      return process.env.BROWSERSLIST
    } else if (opts.config || process.env.BROWSERSLIST_CONFIG) {
      var file = opts.config || process.env.BROWSERSLIST_CONFIG
      if (path.basename(file) === 'package.json') {
        return pickEnv(parsePackage(file), opts)
      } else {
        return pickEnv(module.exports.readConfig(file), opts)
      }
    } else if (opts.path) {
      return pickEnv(module.exports.findConfig(opts.path), opts)
    } else {
      return undefined
    }
  },

  loadCountry: function loadCountry (usage, country) {
    var code = country.replace(/[^\w-]/g, '')
    if (!usage[code]) {
      // eslint-disable-next-line security/detect-non-literal-require
      var compressed = require('caniuse-lite/data/regions/' + code + '.js')
      var data = region(compressed)
      usage[country] = { }
      for (var i in data) {
        for (var j in data[i]) {
          usage[country][i + ' ' + j] = data[i][j]
        }
      }
    }
  },

  parseConfig: function parseConfig (string) {
    var result = { defaults: [] }
    var sections = ['defaults']

    string.toString()
      .replace(/#[^\n]*/g, '')
      .split(/\n/)
      .map(function (line) {
        return line.trim()
      })
      .filter(function (line) {
        return line !== ''
      })
      .forEach(function (line) {
        if (IS_SECTION.test(line)) {
          sections = line.match(IS_SECTION)[1].trim().split(' ')
          sections.forEach(function (section) {
            if (result[section]) {
              throw new BrowserslistError(
                'Dublicate section ' + section + ' in Browserslist config')
            }
            result[section] = []
          })
        } else {
          sections.forEach(function (section) {
            result[section].push(line)
          })
        }
      })

    return result
  },

  readConfig: function readConfig (file) {
    if (!isFile(file)) {
      throw new BrowserslistError('Can\'t read ' + file + ' config')
    }
    return module.exports.parseConfig(fs.readFileSync(file))
  },

  findConfig: function findConfig (from) {
    from = path.resolve(from)

    var cacheKey = isFile(from) ? path.dirname(from) : from
    if (cacheKey in configCache) {
      return configCache[cacheKey]
    }

    var resolved = eachParent(from, function (dir) {
      var config = path.join(dir, 'browserslist')
      var pkg = path.join(dir, 'package.json')
      var rc = path.join(dir, '.browserslistrc')

      var pkgBrowserslist
      if (isFile(pkg)) {
        try {
          pkgBrowserslist = parsePackage(pkg)
        } catch (e) {
          if (e.name === 'BrowserslistError') throw e
          console.warn(
            '[Browserslist] Could not parse ' + pkg + '. Ignoring it.')
        }
      }

      if (isFile(config) && pkgBrowserslist) {
        throw new BrowserslistError(
          dir + ' contains both browserslist and package.json with browsers')
      } else if (isFile(rc) && pkgBrowserslist) {
        throw new BrowserslistError(
          dir + ' contains both .browserslistrc and package.json with browsers')
      } else if (isFile(config) && isFile(rc)) {
        throw new BrowserslistError(
          dir + ' contains both .browserslistrc and browserslist')
      } else if (isFile(config)) {
        return module.exports.readConfig(config)
      } else if (isFile(rc)) {
        return module.exports.readConfig(rc)
      } else {
        return pkgBrowserslist
      }
    })
    if (!process.env.BROWSERSLIST_DISABLE_CACHE) {
      configCache[cacheKey] = resolved
    }
    return resolved
  },

  clearCaches: function clearCaches () {
    filenessCache = { }
    configCache = { }
  }
}
