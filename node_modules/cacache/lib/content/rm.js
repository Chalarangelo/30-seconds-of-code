'use strict'

const BB = require('bluebird')

const contentPath = require('./path')
const hasContent = require('./read').hasContent
const rimraf = BB.promisify(require('rimraf'))

module.exports = rm
function rm (cache, integrity) {
  return hasContent(cache, integrity).then(content => {
    if (content) {
      const sri = content.sri
      if (sri) {
        return rimraf(contentPath(cache, sri)).then(() => true)
      }
    } else {
      return false
    }
  })
}
