'use strict'

const BB = require('bluebird')

const contentPath = require('./content/path')
const crypto = require('crypto')
const figgyPudding = require('figgy-pudding')
const fixOwner = require('./util/fix-owner')
const fs = require('graceful-fs')
const hashToSegments = require('./util/hash-to-segments')
const ms = require('mississippi')
const path = require('path')
const ssri = require('ssri')
const Y = require('./util/y.js')

const indexV = require('../package.json')['cache-version'].index

const appendFileAsync = BB.promisify(fs.appendFile)
const readFileAsync = BB.promisify(fs.readFile)
const readdirAsync = BB.promisify(fs.readdir)
const concat = ms.concat
const from = ms.from

module.exports.NotFoundError = class NotFoundError extends Error {
  constructor (cache, key) {
    super(Y`No cache entry for \`${key}\` found in \`${cache}\``)
    this.code = 'ENOENT'
    this.cache = cache
    this.key = key
  }
}

const IndexOpts = figgyPudding({
  metadata: {},
  size: {},
  uid: {},
  gid: {}
})

module.exports.insert = insert
function insert (cache, key, integrity, opts) {
  opts = IndexOpts(opts)
  const bucket = bucketPath(cache, key)
  const entry = {
    key,
    integrity: integrity && ssri.stringify(integrity),
    time: Date.now(),
    size: opts.size,
    metadata: opts.metadata
  }
  return fixOwner.mkdirfix(
    path.dirname(bucket), opts.uid, opts.gid
  ).then(() => {
    const stringified = JSON.stringify(entry)
    // NOTE - Cleverness ahoy!
    //
    // This works because it's tremendously unlikely for an entry to corrupt
    // another while still preserving the string length of the JSON in
    // question. So, we just slap the length in there and verify it on read.
    //
    // Thanks to @isaacs for the whiteboarding session that ended up with this.
    return appendFileAsync(
      bucket, `\n${hashEntry(stringified)}\t${stringified}`
    )
  }).then(
    () => fixOwner.chownr(bucket, opts.uid, opts.gid)
  ).catch({ code: 'ENOENT' }, () => {
    // There's a class of race conditions that happen when things get deleted
    // during fixOwner, or between the two mkdirfix/chownr calls.
    //
    // It's perfectly fine to just not bother in those cases and lie
    // that the index entry was written. Because it's a cache.
  }).then(() => {
    return formatEntry(cache, entry)
  })
}

module.exports.insert.sync = insertSync
function insertSync (cache, key, integrity, opts) {
  opts = IndexOpts(opts)
  const bucket = bucketPath(cache, key)
  const entry = {
    key,
    integrity: integrity && ssri.stringify(integrity),
    time: Date.now(),
    size: opts.size,
    metadata: opts.metadata
  }
  fixOwner.mkdirfix.sync(path.dirname(bucket), opts.uid, opts.gid)
  const stringified = JSON.stringify(entry)
  fs.appendFileSync(
    bucket, `\n${hashEntry(stringified)}\t${stringified}`
  )
  try {
    fixOwner.chownr.sync(bucket, opts.uid, opts.gid)
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
  }
  return formatEntry(cache, entry)
}

module.exports.find = find
function find (cache, key) {
  const bucket = bucketPath(cache, key)
  return bucketEntries(bucket).then(entries => {
    return entries.reduce((latest, next) => {
      if (next && next.key === key) {
        return formatEntry(cache, next)
      } else {
        return latest
      }
    }, null)
  }).catch(err => {
    if (err.code === 'ENOENT') {
      return null
    } else {
      throw err
    }
  })
}

module.exports.find.sync = findSync
function findSync (cache, key) {
  const bucket = bucketPath(cache, key)
  try {
    return bucketEntriesSync(bucket).reduce((latest, next) => {
      if (next && next.key === key) {
        return formatEntry(cache, next)
      } else {
        return latest
      }
    }, null)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return null
    } else {
      throw err
    }
  }
}

module.exports.delete = del
function del (cache, key, opts) {
  return insert(cache, key, null, opts)
}

module.exports.delete.sync = delSync
function delSync (cache, key, opts) {
  return insertSync(cache, key, null, opts)
}

module.exports.lsStream = lsStream
function lsStream (cache) {
  const indexDir = bucketDir(cache)
  const stream = from.obj()

  // "/cachename/*"
  readdirOrEmpty(indexDir).map(bucket => {
    const bucketPath = path.join(indexDir, bucket)

    // "/cachename/<bucket 0xFF>/*"
    return readdirOrEmpty(bucketPath).map(subbucket => {
      const subbucketPath = path.join(bucketPath, subbucket)

      // "/cachename/<bucket 0xFF>/<bucket 0xFF>/*"
      return readdirOrEmpty(subbucketPath).map(entry => {
        const getKeyToEntry = bucketEntries(
          path.join(subbucketPath, entry)
        ).reduce((acc, entry) => {
          acc.set(entry.key, entry)
          return acc
        }, new Map())

        return getKeyToEntry.then(reduced => {
          for (let entry of reduced.values()) {
            const formatted = formatEntry(cache, entry)
            formatted && stream.push(formatted)
          }
        }).catch({ code: 'ENOENT' }, nop)
      })
    })
  }).then(() => {
    stream.push(null)
  }, err => {
    stream.emit('error', err)
  })

  return stream
}

module.exports.ls = ls
function ls (cache) {
  return BB.fromNode(cb => {
    lsStream(cache).on('error', cb).pipe(concat(entries => {
      cb(null, entries.reduce((acc, xs) => {
        acc[xs.key] = xs
        return acc
      }, {}))
    }))
  })
}

function bucketEntries (bucket, filter) {
  return readFileAsync(
    bucket, 'utf8'
  ).then(data => _bucketEntries(data, filter))
}

function bucketEntriesSync (bucket, filter) {
  const data = fs.readFileSync(bucket, 'utf8')
  return _bucketEntries(data, filter)
}

function _bucketEntries (data, filter) {
  let entries = []
  data.split('\n').forEach(entry => {
    if (!entry) { return }
    const pieces = entry.split('\t')
    if (!pieces[1] || hashEntry(pieces[1]) !== pieces[0]) {
      // Hash is no good! Corruption or malice? Doesn't matter!
      // EJECT EJECT
      return
    }
    let obj
    try {
      obj = JSON.parse(pieces[1])
    } catch (e) {
      // Entry is corrupted!
      return
    }
    if (obj) {
      entries.push(obj)
    }
  })
  return entries
}

module.exports._bucketDir = bucketDir
function bucketDir (cache) {
  return path.join(cache, `index-v${indexV}`)
}

module.exports._bucketPath = bucketPath
function bucketPath (cache, key) {
  const hashed = hashKey(key)
  return path.join.apply(path, [bucketDir(cache)].concat(
    hashToSegments(hashed)
  ))
}

module.exports._hashKey = hashKey
function hashKey (key) {
  return hash(key, 'sha256')
}

module.exports._hashEntry = hashEntry
function hashEntry (str) {
  return hash(str, 'sha1')
}

function hash (str, digest) {
  return crypto
    .createHash(digest)
    .update(str)
    .digest('hex')
}

function formatEntry (cache, entry) {
  // Treat null digests as deletions. They'll shadow any previous entries.
  if (!entry.integrity) { return null }
  return {
    key: entry.key,
    integrity: entry.integrity,
    path: contentPath(cache, entry.integrity),
    size: entry.size,
    time: entry.time,
    metadata: entry.metadata
  }
}

function readdirOrEmpty (dir) {
  return readdirAsync(dir)
    .catch({ code: 'ENOENT' }, () => [])
    .catch({ code: 'ENOTDIR' }, () => [])
}

function nop () {
}
