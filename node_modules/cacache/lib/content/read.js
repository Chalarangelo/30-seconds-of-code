'use strict'

const BB = require('bluebird')

const contentPath = require('./path')
const figgyPudding = require('figgy-pudding')
const fs = require('graceful-fs')
const PassThrough = require('stream').PassThrough
const pipe = BB.promisify(require('mississippi').pipe)
const ssri = require('ssri')
const Y = require('../util/y.js')

const lstatAsync = BB.promisify(fs.lstat)
const readFileAsync = BB.promisify(fs.readFile)

const ReadOpts = figgyPudding({
  size: {}
})

module.exports = read
function read (cache, integrity, opts) {
  opts = ReadOpts(opts)
  return withContentSri(cache, integrity, (cpath, sri) => {
    return readFileAsync(cpath, null).then(data => {
      if (typeof opts.size === 'number' && opts.size !== data.length) {
        throw sizeError(opts.size, data.length)
      } else if (ssri.checkData(data, sri)) {
        return data
      } else {
        throw integrityError(sri, cpath)
      }
    })
  })
}

module.exports.sync = readSync
function readSync (cache, integrity, opts) {
  opts = ReadOpts(opts)
  return withContentSriSync(cache, integrity, (cpath, sri) => {
    const data = fs.readFileSync(cpath)
    if (typeof opts.size === 'number' && opts.size !== data.length) {
      throw sizeError(opts.size, data.length)
    } else if (ssri.checkData(data, sri)) {
      return data
    } else {
      throw integrityError(sri, cpath)
    }
  })
}

module.exports.stream = readStream
module.exports.readStream = readStream
function readStream (cache, integrity, opts) {
  opts = ReadOpts(opts)
  const stream = new PassThrough()
  withContentSri(cache, integrity, (cpath, sri) => {
    return lstatAsync(cpath).then(stat => ({ cpath, sri, stat }))
  }).then(({ cpath, sri, stat }) => {
    return pipe(
      fs.createReadStream(cpath),
      ssri.integrityStream({
        integrity: sri,
        size: opts.size
      }),
      stream
    )
  }).catch(err => {
    stream.emit('error', err)
  })
  return stream
}

let copyFileAsync
if (fs.copyFile) {
  module.exports.copy = copy
  module.exports.copy.sync = copySync
  copyFileAsync = BB.promisify(fs.copyFile)
}

function copy (cache, integrity, dest, opts) {
  opts = ReadOpts(opts)
  return withContentSri(cache, integrity, (cpath, sri) => {
    return copyFileAsync(cpath, dest)
  })
}

function copySync (cache, integrity, dest, opts) {
  opts = ReadOpts(opts)
  return withContentSriSync(cache, integrity, (cpath, sri) => {
    return fs.copyFileSync(cpath, dest)
  })
}

module.exports.hasContent = hasContent
function hasContent (cache, integrity) {
  if (!integrity) { return BB.resolve(false) }
  return withContentSri(cache, integrity, (cpath, sri) => {
    return lstatAsync(cpath).then(stat => ({ size: stat.size, sri, stat }))
  }).catch(err => {
    if (err.code === 'ENOENT') { return false }
    if (err.code === 'EPERM') {
      if (process.platform !== 'win32') {
        throw err
      } else {
        return false
      }
    }
  })
}

module.exports.hasContent.sync = hasContentSync
function hasContentSync (cache, integrity) {
  if (!integrity) { return false }
  return withContentSriSync(cache, integrity, (cpath, sri) => {
    try {
      const stat = fs.lstatSync(cpath)
      return { size: stat.size, sri, stat }
    } catch (err) {
      if (err.code === 'ENOENT') { return false }
      if (err.code === 'EPERM') {
        if (process.platform !== 'win32') {
          throw err
        } else {
          return false
        }
      }
    }
  })
}

function withContentSri (cache, integrity, fn) {
  return BB.try(() => {
    const sri = ssri.parse(integrity)
    // If `integrity` has multiple entries, pick the first digest
    // with available local data.
    const algo = sri.pickAlgorithm()
    const digests = sri[algo]
    if (digests.length <= 1) {
      const cpath = contentPath(cache, digests[0])
      return fn(cpath, digests[0])
    } else {
      return BB.any(sri[sri.pickAlgorithm()].map(meta => {
        return withContentSri(cache, meta, fn)
      }, { concurrency: 1 }))
        .catch(err => {
          if ([].some.call(err, e => e.code === 'ENOENT')) {
            throw Object.assign(
              new Error('No matching content found for ' + sri.toString()),
              { code: 'ENOENT' }
            )
          } else {
            throw err[0]
          }
        })
    }
  })
}

function withContentSriSync (cache, integrity, fn) {
  const sri = ssri.parse(integrity)
  // If `integrity` has multiple entries, pick the first digest
  // with available local data.
  const algo = sri.pickAlgorithm()
  const digests = sri[algo]
  if (digests.length <= 1) {
    const cpath = contentPath(cache, digests[0])
    return fn(cpath, digests[0])
  } else {
    let lastErr = null
    for (const meta of sri[sri.pickAlgorithm()]) {
      try {
        return withContentSriSync(cache, meta, fn)
      } catch (err) {
        lastErr = err
      }
    }
    if (lastErr) { throw lastErr }
  }
}

function sizeError (expected, found) {
  var err = new Error(Y`Bad data size: expected inserted data to be ${expected} bytes, but got ${found} instead`)
  err.expected = expected
  err.found = found
  err.code = 'EBADSIZE'
  return err
}

function integrityError (sri, path) {
  var err = new Error(Y`Integrity verification failed for ${sri} (${path})`)
  err.code = 'EINTEGRITY'
  err.sri = sri
  err.path = path
  return err
}
