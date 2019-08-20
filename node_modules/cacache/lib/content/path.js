'use strict'

const contentVer = require('../../package.json')['cache-version'].content
const hashToSegments = require('../util/hash-to-segments')
const path = require('path')
const ssri = require('ssri')

// Current format of content file path:
//
// sha512-BaSE64Hex= ->
// ~/.my-cache/content-v2/sha512/ba/da/55deadbeefc0ffee
//
module.exports = contentPath
function contentPath (cache, integrity) {
  const sri = ssri.parse(integrity, { single: true })
  // contentPath is the *strongest* algo given
  return path.join.apply(path, [
    contentDir(cache),
    sri.algorithm
  ].concat(hashToSegments(sri.hexDigest())))
}

module.exports._contentDir = contentDir
function contentDir (cache) {
  return path.join(cache, `content-v${contentVer}`)
}
