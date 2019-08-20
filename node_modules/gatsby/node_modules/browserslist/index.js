var path = require('path')
var e2c = require('electron-to-chromium/versions')

var agents = require('caniuse-lite/dist/unpacker/agents').agents

var BrowserslistError = require('./error')
var env = require('./node') // Will load browser.js in webpack

var FLOAT_RANGE = /^\d+(\.\d+)?(-\d+(\.\d+)?)*$/

function normalize (versions) {
  return versions.filter(function (version) {
    return typeof version === 'string'
  })
}

function nameMapper (name) {
  return function mapName (version) {
    return name + ' ' + version
  }
}

function getMajor (version) {
  return parseInt(version.split('.')[0])
}

function getMajorVersions (released, number) {
  if (released.length === 0) return []
  var minimum = getMajor(released[released.length - 1]) - parseInt(number) + 1
  var selected = []
  for (var i = released.length - 1; i >= 0; i--) {
    if (minimum > getMajor(released[i])) break
    selected.unshift(released[i])
  }
  return selected
}

function uniq (array) {
  var filtered = []
  for (var i = 0; i < array.length; i++) {
    if (filtered.indexOf(array[i]) === -1) filtered.push(array[i])
  }
  return filtered
}

// Helpers

function fillUsage (result, name, data) {
  for (var i in data) {
    result[name + ' ' + i] = data[i]
  }
}

function generateFilter (sign, version) {
  version = parseFloat(version)
  if (sign === '>') {
    return function (v) {
      return parseFloat(v) > version
    }
  } else if (sign === '>=') {
    return function (v) {
      return parseFloat(v) >= version
    }
  } else if (sign === '<') {
    return function (v) {
      return parseFloat(v) < version
    }
  } else {
    return function (v) {
      return parseFloat(v) <= version
    }
  }
}

function compareStrings (a, b) {
  if (a < b) return -1
  if (a > b) return +1
  return 0
}

function normalizeVersion (data, version) {
  if (data.versions.indexOf(version) !== -1) {
    return version
  } else if (browserslist.versionAliases[data.name][version]) {
    return browserslist.versionAliases[data.name][version]
  } else if (data.versions.length === 1) {
    return data.versions[0]
  } else {
    return false
  }
}

function filterByYear (since) {
  return Object.keys(agents).reduce(function (selected, name) {
    var data = byName(name)
    if (!data) return selected
    var versions = Object.keys(data.releaseDate).filter(function (v) {
      return data.releaseDate[v] >= since
    })
    return selected.concat(versions.map(nameMapper(data.name)))
  }, [])
}

function byName (name) {
  name = name.toLowerCase()
  name = browserslist.aliases[name] || name
  return browserslist.data[name]
}

function checkName (name) {
  var data = byName(name)
  if (!data) throw new BrowserslistError('Unknown browser ' + name)
  return data
}

function unknownQuery (query) {
  return new BrowserslistError('Unknown browser query `' + query + '`')
}

function resolve (queries, context) {
  return queries.reduce(function (result, selection, index) {
    selection = selection.trim()
    if (selection === '') return result

    var isExclude = selection.indexOf('not ') === 0
    if (isExclude) {
      if (index === 0) {
        throw new BrowserslistError(
          'Write any browsers query (for instance, `defaults`) ' +
          'before `' + selection + '`')
      }
      selection = selection.slice(4)
    }

    for (var i = 0; i < QUERIES.length; i++) {
      var type = QUERIES[i]
      var match = selection.match(type.regexp)
      if (match) {
        var args = [context].concat(match.slice(1))
        var array = type.select.apply(browserslist, args)
        if (isExclude) {
          array = array.concat(array.map(function (j) {
            return j.replace(/\s\S+/, ' 0')
          }))
          return result.filter(function (j) {
            return array.indexOf(j) === -1
          })
        }
        return result.concat(array)
      }
    }

    throw unknownQuery(selection)
  }, [])
}

/**
 * Return array of browsers by selection queries.
 *
 * @param {(string|string[])} [queries=browserslist.defaults] Browser queries.
 * @param {object} [opts] Options.
 * @param {string} [opts.path="."] Path to processed file.
 *                                 It will be used to find config files.
 * @param {string} [opts.env="production"] Processing environment.
 *                                         It will be used to take right
 *                                         queries from config file.
 * @param {string} [opts.config] Path to config file with queries.
 * @param {object} [opts.stats] Custom browser usage statistics
 *                              for "> 1% in my stats" query.
 * @param {boolean} [opts.ignoreUnknownVersions=false] Do not throw on unknown
 *                                                     version in direct query.
 * @param {boolean} [opts.dangerousExtend] Disable security checks
 *                                         for extend query.
 * @return {string[]} Array with browser names in Can I Use.
 *
 * @example
 * browserslist('IE >= 10, IE 8') //=> ['ie 11', 'ie 10', 'ie 8']
 */
function browserslist (queries, opts) {
  if (typeof opts === 'undefined') opts = { }

  if (typeof opts.path === 'undefined') {
    opts.path = path.resolve ? path.resolve('.') : '.'
  }

  if (typeof queries === 'undefined' || queries === null) {
    var config = browserslist.loadConfig(opts)
    if (config) {
      queries = config
    } else {
      queries = browserslist.defaults
    }
  }

  if (typeof queries === 'string') {
    queries = queries.split(/,\s*/)
  }

  if (!Array.isArray(queries)) {
    throw new BrowserslistError(
      'Browser queries must be an array. Got ' + typeof queries + '.')
  }

  var context = {
    ignoreUnknownVersions: opts.ignoreUnknownVersions,
    dangerousExtend: opts.dangerousExtend
  }

  var stats = env.getStat(opts)
  if (stats) {
    context.customUsage = { }
    for (var browser in stats) {
      fillUsage(context.customUsage, browser, stats[browser])
    }
  }

  var result = resolve(queries, context).map(function (i) {
    var parts = i.split(' ')
    var name = parts[0]
    var version = parts[1]
    if (version === '0') {
      return name + ' ' + byName(name).versions[0]
    } else {
      return i
    }
  }).sort(function (name1, name2) {
    name1 = name1.split(' ')
    name2 = name2.split(' ')
    if (name1[0] === name2[0]) {
      if (FLOAT_RANGE.test(name1[1]) && FLOAT_RANGE.test(name2[1])) {
        return parseFloat(name2[1]) - parseFloat(name1[1])
      } else {
        return compareStrings(name2[1], name1[1])
      }
    } else {
      return compareStrings(name1[0], name2[0])
    }
  })

  return uniq(result)
}

// Will be filled by Can I Use data below
browserslist.data = { }
browserslist.usage = {
  global: { },
  custom: null
}

// Default browsers query
browserslist.defaults = [
  '> 0.5%',
  'last 2 versions',
  'Firefox ESR',
  'not dead'
]

// Browser names aliases
browserslist.aliases = {
  fx: 'firefox',
  ff: 'firefox',
  ios: 'ios_saf',
  explorer: 'ie',
  blackberry: 'bb',
  explorermobile: 'ie_mob',
  operamini: 'op_mini',
  operamobile: 'op_mob',
  chromeandroid: 'and_chr',
  firefoxandroid: 'and_ff',
  ucandroid: 'and_uc',
  qqandroid: 'and_qq'
}

// Aliases to work with joined versions like `ios_saf 7.0-7.1`
browserslist.versionAliases = { }

browserslist.clearCaches = env.clearCaches
browserslist.parseConfig = env.parseConfig
browserslist.readConfig = env.readConfig
browserslist.findConfig = env.findConfig
browserslist.loadConfig = env.loadConfig

/**
 * Return browsers market coverage.
 *
 * @param {string[]} browsers Browsers names in Can I Use.
 * @param {string|object} [stats="global"] Which statistics should be used.
 *                                         Country code or custom statistics.
 *                                         Pass `"my stats"` to load statistics
 *                                         from Browserslist files.
 *
 * @return {number} Total market coverage for all selected browsers.
 *
 * @example
 * browserslist.coverage(browserslist('> 1% in US'), 'US') //=> 83.1
 */
browserslist.coverage = function (browsers, stats) {
  var data
  if (typeof stats === 'undefined') {
    data = browserslist.usage.global
  } else if (stats === 'my stats') {
    var opts = {}
    opts.path = path.resolve ? path.resolve('.') : '.'
    var customStats = env.getStat(opts)
    if (!customStats) {
      throw new BrowserslistError('Custom usage statistics was not provided')
    }
    data = {}
    for (var browser in customStats) {
      fillUsage(data, browser, customStats[browser])
    }
  } else if (typeof stats === 'string') {
    if (stats.length > 2) {
      stats = stats.toLowerCase()
    } else {
      stats = stats.toUpperCase()
    }
    env.loadCountry(browserslist.usage, stats)
    data = browserslist.usage[stats]
  } else {
    if ('dataByBrowser' in stats) {
      stats = stats.dataByBrowser
    }
    data = { }
    for (var name in stats) {
      for (var version in stats[name]) {
        data[name + ' ' + version] = stats[name][version]
      }
    }
  }

  return browsers.reduce(function (all, i) {
    var usage = data[i]
    if (usage === undefined) {
      usage = data[i.replace(/ \S+$/, ' 0')]
    }
    return all + (usage || 0)
  }, 0)
}

var QUERIES = [
  {
    regexp: /^last\s+(\d+)\s+major versions?$/i,
    select: function (context, versions) {
      return Object.keys(agents).reduce(function (selected, name) {
        var data = byName(name)
        if (!data) return selected
        var array = getMajorVersions(data.released, versions)

        array = array.map(nameMapper(data.name))
        return selected.concat(array)
      }, [])
    }
  },
  {
    regexp: /^last\s+(\d+)\s+versions?$/i,
    select: function (context, versions) {
      return Object.keys(agents).reduce(function (selected, name) {
        var data = byName(name)
        if (!data) return selected
        var array = data.released.slice(-versions)

        array = array.map(nameMapper(data.name))
        return selected.concat(array)
      }, [])
    }
  },
  {
    regexp: /^last\s+(\d+)\s+electron\s+major versions?$/i,
    select: function (context, versions) {
      var validVersions = getMajorVersions(Object.keys(e2c).reverse(), versions)
      return validVersions.map(function (i) {
        return 'chrome ' + e2c[i]
      })
    }
  },
  {
    regexp: /^last\s+(\d+)\s+(\w+)\s+major versions?$/i,
    select: function (context, versions, name) {
      var data = checkName(name)
      var validVersions = getMajorVersions(data.released, versions)
      return validVersions.map(nameMapper(data.name))
    }
  },
  {
    regexp: /^last\s+(\d+)\s+electron\s+versions?$/i,
    select: function (context, versions) {
      return Object.keys(e2c).reverse().slice(-versions).map(function (i) {
        return 'chrome ' + e2c[i]
      })
    }
  },
  {
    regexp: /^last\s+(\d+)\s+(\w+)\s+versions?$/i,
    select: function (context, versions, name) {
      var data = checkName(name)
      return data.released.slice(-versions).map(nameMapper(data.name))
    }
  },
  {
    regexp: /^unreleased\s+versions$/i,
    select: function () {
      return Object.keys(agents).reduce(function (selected, name) {
        var data = byName(name)
        if (!data) return selected
        var array = data.versions.filter(function (v) {
          return data.released.indexOf(v) === -1
        })

        array = array.map(nameMapper(data.name))
        return selected.concat(array)
      }, [])
    }
  },
  {
    regexp: /^unreleased\s+electron\s+versions?$/i,
    select: function () {
      return []
    }
  },
  {
    regexp: /^unreleased\s+(\w+)\s+versions?$/i,
    select: function (context, name) {
      var data = checkName(name)
      return data.versions.filter(function (v) {
        return data.released.indexOf(v) === -1
      }).map(nameMapper(data.name))
    }
  },
  {
    regexp: /^last\s+(\d+)\s+years?$/i,
    select: function (context, years) {
      var date = new Date()
      var since = date.setFullYear(date.getFullYear() - years) / 1000

      return filterByYear(since)
    }
  },
  {
    regexp: /^since (\d+)(?:-(\d+))?(?:-(\d+))?$/i,
    select: function (context, year, month, date) {
      year = parseInt(year)
      month = parseInt(month || '01') - 1
      date = parseInt(date || '01')
      var since = Date.UTC(year, month, date, 0, 0, 0) / 1000

      return filterByYear(since)
    }
  },
  {
    regexp: /^(>=?|<=?)\s*(\d*\.?\d+)%$/,
    select: function (context, sign, popularity) {
      popularity = parseFloat(popularity)
      var usage = browserslist.usage.global

      return Object.keys(usage).reduce(function (result, version) {
        if (sign === '>') {
          if (usage[version] > popularity) {
            result.push(version)
          }
        } else if (sign === '<') {
          if (usage[version] < popularity) {
            result.push(version)
          }
        } else if (sign === '<=') {
          if (usage[version] <= popularity) {
            result.push(version)
          }
        } else if (usage[version] >= popularity) {
          result.push(version)
        }
        return result
      }, [])
    }
  },
  {
    regexp: /^(>=?|<=?)\s*(\d*\.?\d+)%\s+in\s+my\s+stats$/,
    select: function (context, sign, popularity) {
      popularity = parseFloat(popularity)

      if (!context.customUsage) {
        throw new BrowserslistError('Custom usage statistics was not provided')
      }

      var usage = context.customUsage

      return Object.keys(usage).reduce(function (result, version) {
        if (sign === '>') {
          if (usage[version] > popularity) {
            result.push(version)
          }
        } else if (sign === '<') {
          if (usage[version] < popularity) {
            result.push(version)
          }
        } else if (sign === '<=') {
          if (usage[version] <= popularity) {
            result.push(version)
          }
        } else if (usage[version] >= popularity) {
          result.push(version)
        }
        return result
      }, [])
    }
  },
  {
    regexp: /^(>=?|<=?)\s*(\d*\.?\d+)%\s+in\s+((alt-)?\w\w)$/,
    select: function (context, sign, popularity, place) {
      popularity = parseFloat(popularity)

      if (place.length === 2) {
        place = place.toUpperCase()
      } else {
        place = place.toLowerCase()
      }

      env.loadCountry(browserslist.usage, place)
      var usage = browserslist.usage[place]

      return Object.keys(usage).reduce(function (result, version) {
        if (sign === '>') {
          if (usage[version] > popularity) {
            result.push(version)
          }
        } else if (sign === '<') {
          if (usage[version] < popularity) {
            result.push(version)
          }
        } else if (sign === '<=') {
          if (usage[version] <= popularity) {
            result.push(version)
          }
        } else if (usage[version] >= popularity) {
          result.push(version)
        }
        return result
      }, [])
    }
  },
  {
    regexp: /^cover\s+(\d*\.?\d+)%(\s+in\s+(my\s+stats|(alt-)?\w\w))?$/,
    select: function (context, coverage, statMode) {
      coverage = parseFloat(coverage)

      var usage = browserslist.usage.global
      if (statMode) {
        if (statMode.match(/^\s+in\s+my\s+stats$/)) {
          if (!context.customUsage) {
            throw new BrowserslistError(
              'Custom usage statistics was not provided'
            )
          }
          usage = context.customUsage
        } else {
          var match = statMode.match(/\s+in\s+((alt-)?\w\w)/)
          var place = match[1]
          if (place.length === 2) {
            place = place.toUpperCase()
          } else {
            place = place.toLowerCase()
          }
          env.loadCountry(browserslist.usage, place)
          usage = browserslist.usage[place]
        }
      }

      var versions = Object.keys(usage).sort(function (a, b) {
        return usage[b] - usage[a]
      })

      var coveraged = 0
      var result = []
      var version
      for (var i = 0; i <= versions.length; i++) {
        version = versions[i]
        if (usage[version] === 0) break

        coveraged += usage[version]
        result.push(version)
        if (coveraged >= coverage) break
      }

      return result
    }
  },
  {
    regexp: /^electron\s+([\d.]+)\s*-\s*([\d.]+)$/i,
    select: function (context, from, to) {
      if (!e2c[from]) {
        throw new BrowserslistError('Unknown version ' + from + ' of electron')
      }
      if (!e2c[to]) {
        throw new BrowserslistError('Unknown version ' + to + ' of electron')
      }

      from = parseFloat(from)
      to = parseFloat(to)

      return Object.keys(e2c).filter(function (i) {
        var parsed = parseFloat(i)
        return parsed >= from && parsed <= to
      }).map(function (i) {
        return 'chrome ' + e2c[i]
      })
    }
  },
  {
    regexp: /^(\w+)\s+([\d.]+)\s*-\s*([\d.]+)$/i,
    select: function (context, name, from, to) {
      var data = checkName(name)
      from = parseFloat(normalizeVersion(data, from) || from)
      to = parseFloat(normalizeVersion(data, to) || to)

      function filter (v) {
        var parsed = parseFloat(v)
        return parsed >= from && parsed <= to
      }

      return data.released.filter(filter).map(nameMapper(data.name))
    }
  },
  {
    regexp: /^electron\s*(>=?|<=?)\s*([\d.]+)$/i,
    select: function (context, sign, version) {
      return Object.keys(e2c)
        .filter(generateFilter(sign, version))
        .map(function (i) {
          return 'chrome ' + e2c[i]
        })
    }
  },
  {
    regexp: /^(\w+)\s*(>=?|<=?)\s*([\d.]+)$/,
    select: function (context, name, sign, version) {
      var data = checkName(name)
      var alias = browserslist.versionAliases[data.name][version]
      if (alias) {
        version = alias
      }
      return data.released
        .filter(generateFilter(sign, version))
        .map(function (v) {
          return data.name + ' ' + v
        })
    }
  },
  {
    regexp: /^(firefox|ff|fx)\s+esr$/i,
    select: function () {
      return ['firefox 52', 'firefox 60']
    }
  },
  {
    regexp: /(operamini|op_mini)\s+all/i,
    select: function () {
      return ['op_mini all']
    }
  },
  {
    regexp: /^electron\s+([\d.]+)$/i,
    select: function (context, version) {
      var chrome = e2c[version]
      if (!chrome) {
        throw new BrowserslistError(
          'Unknown version ' + version + ' of electron')
      }
      return ['chrome ' + chrome]
    }
  },
  {
    regexp: /^(\w+)\s+(tp|[\d.]+)$/i,
    select: function (context, name, version) {
      if (/^tp$/i.test(version)) version = 'TP'
      var data = checkName(name)
      var alias = normalizeVersion(data, version)
      if (alias) {
        version = alias
      } else {
        if (version.indexOf('.') === -1) {
          alias = version + '.0'
        } else {
          alias = version.replace(/\.0$/, '')
        }
        alias = normalizeVersion(data, alias)
        if (alias) {
          version = alias
        } else if (context.ignoreUnknownVersions) {
          return []
        } else {
          throw new BrowserslistError(
            'Unknown version ' + version + ' of ' + name)
        }
      }
      return [data.name + ' ' + version]
    }
  },
  {
    regexp: /^extends (.+)$/i,
    select: function (context, name) {
      return resolve(env.loadQueries(context, name), context)
    }
  },
  {
    regexp: /^defaults$/i,
    select: function () {
      return browserslist(browserslist.defaults)
    }
  },
  {
    regexp: /^dead$/i,
    select: function (context) {
      var dead = ['ie <= 10', 'ie_mob <= 10', 'bb <= 10', 'op_mob <= 12.1']
      return resolve(dead, context)
    }
  },
  {
    regexp: /^(\w+)$/i,
    select: function (context, name) {
      if (byName(name)) {
        throw new BrowserslistError(
          'Specify versions in Browserslist query for browser ' + name)
      } else {
        throw unknownQuery(name)
      }
    }
  }
];

// Get and convert Can I Use data

(function () {
  for (var name in agents) {
    var browser = agents[name]
    browserslist.data[name] = {
      name: name,
      versions: normalize(agents[name].versions),
      released: normalize(agents[name].versions.slice(0, -3)),
      releaseDate: agents[name].release_date
    }
    fillUsage(browserslist.usage.global, name, browser.usage_global)

    browserslist.versionAliases[name] = { }
    for (var i = 0; i < browser.versions.length; i++) {
      var full = browser.versions[i]
      if (!full) continue

      if (full.indexOf('-') !== -1) {
        var interval = full.split('-')
        for (var j = 0; j < interval.length; j++) {
          browserslist.versionAliases[name][interval[j]] = full
        }
      }
    }
  }
}())

module.exports = browserslist
