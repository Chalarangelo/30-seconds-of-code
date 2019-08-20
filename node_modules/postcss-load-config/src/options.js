'use strict'

const req = require('import-cwd')

/**
 * Load Options
 *
 * @private
 * @method options
 *
 * @param  {Object} config  PostCSS Config
 *
 * @return {Object} options PostCSS Options
 */
const options = (config, file) => {
  if (config.parser && typeof config.parser === 'string') {
    try {
      config.parser = req(config.parser)
    } catch (err) {
      throw new Error(`Loading PostCSS Parser failed: ${err.message}\n\n(@${file})`)
    }
  }

  if (config.syntax && typeof config.syntax === 'string') {
    try {
      config.syntax = req(config.syntax)
    } catch (err) {
      throw new Error(`Loading PostCSS Syntax failed: ${err.message}\n\n(@${file})`)
    }
  }

  if (config.stringifier && typeof config.stringifier === 'string') {
    try {
      config.stringifier = req(config.stringifier)
    } catch (err) {
      throw new Error(`Loading PostCSS Stringifier failed: ${err.message}\n\n(@${file})`)
    }
  }

  if (config.plugins) {
    delete config.plugins
  }

  return config
}

module.exports = options
