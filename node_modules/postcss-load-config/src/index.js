'use strict'

const resolve = require('path').resolve

const config = require('cosmiconfig')

const loadOptions = require('./options.js')
const loadPlugins = require('./plugins.js')

/**
 * Process the result from cosmiconfig
 *
 * @param  {Object} ctx Config Context
 * @param  {Object} result Cosmiconfig result
 *
 * @return {Object} PostCSS Config
 */
const processResult = (ctx, result) => {
  let file = result.filepath || ''
  let config = result.config || {}

  if (typeof config === 'function') {
    config = config(ctx)
  } else {
    config = Object.assign({}, config, ctx)
  }

  if (!config.plugins) {
    config.plugins = []
  }

  return {
    plugins: loadPlugins(config, file),
    options: loadOptions(config, file),
    file: file
  }
}

/**
 * Builds the Config Context
 *
 * @param  {Object} ctx Config Context
 *
 * @return {Object} Config Context
 */
const createContext = (ctx) => {
  /**
   * @type {Object}
   *
   * @prop {String} cwd=process.cwd() Config search start location
   * @prop {String} env=process.env.NODE_ENV Config Enviroment, will be set to `development` by `postcss-load-config` if `process.env.NODE_ENV` is `undefined`
   */
  ctx = Object.assign({
    cwd: process.cwd(),
    env: process.env.NODE_ENV
  }, ctx)

  if (!ctx.env) {
    process.env.NODE_ENV = 'development'
  }

  return ctx
}

/**
 * Load Config
 *
 * @method rc
 *
 * @param  {Object} ctx Config Context
 * @param  {String} path Config Path
 * @param  {Object} options Config Options
 *
 * @return {Promise} config PostCSS Config
 */
const rc = (ctx, path, options) => {
  /**
   * @type {Object} The full Config Context
   */
  ctx = createContext(ctx)

  /**
   * @type {String} `process.cwd()`
   */
  path = path ? resolve(path) : process.cwd()

  return config('postcss', options)
    .search(path)
    .then((result) => {
      if (!result) {
        throw new Error(`No PostCSS Config found in: ${path}`)
      }

      return processResult(ctx, result)
    })
}

rc.sync = (ctx, path, options) => {
  /**
   * @type {Object} The full Config Context
   */
  ctx = createContext(ctx)

  /**
   * @type {String} `process.cwd()`
   */
  path = path ? resolve(path) : process.cwd()

  const result = config('postcss', options).searchSync(path)

  if (!result) {
    throw new Error(`No PostCSS Config found in: ${path}`)
  }

  return processResult(ctx, result)
}

/**
 * Autoload Config for PostCSS
 *
 * @author Michael Ciniawsky @michael-ciniawsky <michael.ciniawsky@gmail.com>
 * @license MIT
 *
 * @module postcss-load-config
 * @version 2.0.0
 *
 * @requires comsiconfig
 * @requires ./options
 * @requires ./plugins
 */
module.exports = rc
