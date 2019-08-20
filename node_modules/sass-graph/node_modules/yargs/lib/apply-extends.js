var fs = require('fs')
var path = require('path')
var assign = require('./assign')
var YError = require('./yerror')

var previouslyVisitedConfigs = []

function checkForCircularExtends (path) {
  if (previouslyVisitedConfigs.indexOf(path) > -1) {
    throw new YError("Circular extended configurations: '" + path + "'.")
  }
}

function getPathToDefaultConfig (cwd, pathToExtend) {
  return path.resolve(cwd, pathToExtend)
}

function applyExtends (config, cwd, subKey) {
  var defaultConfig = {}

  if (config.hasOwnProperty('extends')) {
    var pathToDefault = getPathToDefaultConfig(cwd, config.extends)

    checkForCircularExtends(pathToDefault)

    previouslyVisitedConfigs.push(pathToDefault)
    delete config.extends

    defaultConfig = JSON.parse(fs.readFileSync(pathToDefault, 'utf8'))
    if (subKey) {
      defaultConfig = defaultConfig[subKey] || {}
    }
    defaultConfig = applyExtends(defaultConfig, path.dirname(pathToDefault), subKey)
  }

  previouslyVisitedConfigs = []

  return assign(defaultConfig, config)
}

module.exports = applyExtends
