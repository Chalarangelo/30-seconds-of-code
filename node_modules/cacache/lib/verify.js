'use strict'

const BB = require('bluebird')

const contentPath = require('./content/path')
const figgyPudding = require('figgy-pudding')
const finished = BB.promisify(require('mississippi').finished)
const fixOwner = require('./util/fix-owner')
const fs = require('graceful-fs')
const glob = BB.promisify(require('glob'))
const index = require('./entry-index')
const path = require('path')
const rimraf = BB.promisify(require('rimraf'))
const ssri = require('ssri')

BB.promisifyAll(fs)

const VerifyOpts = figgyPudding({
  concurrency: {
    default: 20
  },
  filter: {},
  log: {
    default: { silly () {} }
  },
  uid: {},
  gid: {}
})

module.exports = verify
function verify (cache, opts) {
  opts = VerifyOpts(opts)
  opts.log.silly('verify', 'verifying cache at', cache)
  return BB.reduce([
    markStartTime,
    fixPerms,
    garbageCollect,
    rebuildIndex,
    cleanTmp,
    writeVerifile,
    markEndTime
  ], (stats, step, i) => {
    const label = step.name || `step #${i}`
    const start = new Date()
    return BB.resolve(step(cache, opts)).then(s => {
      s && Object.keys(s).forEach(k => {
        stats[k] = s[k]
      })
      const end = new Date()
      if (!stats.runTime) { stats.runTime = {} }
      stats.runTime[label] = end - start
      return stats
    })
  }, {}).tap(stats => {
    stats.runTime.total = stats.endTime - stats.startTime
    opts.log.silly('verify', 'verification finished for', cache, 'in', `${stats.runTime.total}ms`)
  })
}

function markStartTime (cache, opts) {
  return { startTime: new Date() }
}

function markEndTime (cache, opts) {
  return { endTime: new Date() }
}

function fixPerms (cache, opts) {
  opts.log.silly('verify', 'fixing cache permissions')
  return fixOwner.mkdirfix(cache, opts.uid, opts.gid).then(() => {
    // TODO - fix file permissions too
    return fixOwner.chownr(cache, opts.uid, opts.gid)
  }).then(() => null)
}

// Implements a naive mark-and-sweep tracing garbage collector.
//
// The algorithm is basically as follows:
// 1. Read (and filter) all index entries ("pointers")
// 2. Mark each integrity value as "live"
// 3. Read entire filesystem tree in `content-vX/` dir
// 4. If content is live, verify its checksum and delete it if it fails
// 5. If content is not marked as live, rimraf it.
//
function garbageCollect (cache, opts) {
  opts.log.silly('verify', 'garbage collecting content')
  const indexStream = index.lsStream(cache)
  const liveContent = new Set()
  indexStream.on('data', entry => {
    if (opts.filter && !opts.filter(entry)) { return }
    liveContent.add(entry.integrity.toString())
  })
  return finished(indexStream).then(() => {
    const contentDir = contentPath._contentDir(cache)
    return glob(path.join(contentDir, '**'), {
      follow: false,
      nodir: true,
      nosort: true
    }).then(files => {
      return BB.resolve({
        verifiedContent: 0,
        reclaimedCount: 0,
        reclaimedSize: 0,
        badContentCount: 0,
        keptSize: 0
      }).tap((stats) => BB.map(files, (f) => {
        const split = f.split(/[/\\]/)
        const digest = split.slice(split.length - 3).join('')
        const algo = split[split.length - 4]
        const integrity = ssri.fromHex(digest, algo)
        if (liveContent.has(integrity.toString())) {
          return verifyContent(f, integrity).then(info => {
            if (!info.valid) {
              stats.reclaimedCount++
              stats.badContentCount++
              stats.reclaimedSize += info.size
            } else {
              stats.verifiedContent++
              stats.keptSize += info.size
            }
            return stats
          })
        } else {
          // No entries refer to this content. We can delete.
          stats.reclaimedCount++
          return fs.statAsync(f).then(s => {
            return rimraf(f).then(() => {
              stats.reclaimedSize += s.size
              return stats
            })
          })
        }
      }, { concurrency: opts.concurrency }))
    })
  })
}

function verifyContent (filepath, sri) {
  return fs.statAsync(filepath).then(stat => {
    const contentInfo = {
      size: stat.size,
      valid: true
    }
    return ssri.checkStream(
      fs.createReadStream(filepath),
      sri
    ).catch(err => {
      if (err.code !== 'EINTEGRITY') { throw err }
      return rimraf(filepath).then(() => {
        contentInfo.valid = false
      })
    }).then(() => contentInfo)
  }).catch({ code: 'ENOENT' }, () => ({ size: 0, valid: false }))
}

function rebuildIndex (cache, opts) {
  opts.log.silly('verify', 'rebuilding index')
  return index.ls(cache).then(entries => {
    const stats = {
      missingContent: 0,
      rejectedEntries: 0,
      totalEntries: 0
    }
    const buckets = {}
    for (let k in entries) {
      if (entries.hasOwnProperty(k)) {
        const hashed = index._hashKey(k)
        const entry = entries[k]
        const excluded = opts.filter && !opts.filter(entry)
        excluded && stats.rejectedEntries++
        if (buckets[hashed] && !excluded) {
          buckets[hashed].push(entry)
        } else if (buckets[hashed] && excluded) {
          // skip
        } else if (excluded) {
          buckets[hashed] = []
          buckets[hashed]._path = index._bucketPath(cache, k)
        } else {
          buckets[hashed] = [entry]
          buckets[hashed]._path = index._bucketPath(cache, k)
        }
      }
    }
    return BB.map(Object.keys(buckets), key => {
      return rebuildBucket(cache, buckets[key], stats, opts)
    }, { concurrency: opts.concurrency }).then(() => stats)
  })
}

function rebuildBucket (cache, bucket, stats, opts) {
  return fs.truncateAsync(bucket._path).then(() => {
    // This needs to be serialized because cacache explicitly
    // lets very racy bucket conflicts clobber each other.
    return BB.mapSeries(bucket, entry => {
      const content = contentPath(cache, entry.integrity)
      return fs.statAsync(content).then(() => {
        return index.insert(cache, entry.key, entry.integrity, {
          uid: opts.uid,
          gid: opts.gid,
          metadata: entry.metadata,
          size: entry.size
        }).then(() => { stats.totalEntries++ })
      }).catch({ code: 'ENOENT' }, () => {
        stats.rejectedEntries++
        stats.missingContent++
      })
    })
  })
}

function cleanTmp (cache, opts) {
  opts.log.silly('verify', 'cleaning tmp directory')
  return rimraf(path.join(cache, 'tmp'))
}

function writeVerifile (cache, opts) {
  const verifile = path.join(cache, '_lastverified')
  opts.log.silly('verify', 'writing verifile to ' + verifile)
  return fs.writeFileAsync(verifile, '' + (+(new Date())))
}

module.exports.lastRun = lastRun
function lastRun (cache) {
  return fs.readFileAsync(
    path.join(cache, '_lastverified'), 'utf8'
  ).then(data => new Date(+data))
}
