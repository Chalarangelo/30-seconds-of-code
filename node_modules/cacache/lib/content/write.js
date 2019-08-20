'use strict'

const BB = require('bluebird')

const contentPath = require('./path')
const fixOwner = require('../util/fix-owner')
const fs = require('graceful-fs')
const moveFile = require('../util/move-file')
const PassThrough = require('stream').PassThrough
const path = require('path')
const pipe = BB.promisify(require('mississippi').pipe)
const rimraf = BB.promisify(require('rimraf'))
const ssri = require('ssri')
const to = require('mississippi').to
const uniqueFilename = require('unique-filename')
const Y = require('../util/y.js')

const writeFileAsync = BB.promisify(fs.writeFile)

module.exports = write
function write (cache, data, opts) {
  opts = opts || {}
  if (opts.algorithms && opts.algorithms.length > 1) {
    throw new Error(
      Y`opts.algorithms only supports a single algorithm for now`
    )
  }
  if (typeof opts.size === 'number' && data.length !== opts.size) {
    return BB.reject(sizeError(opts.size, data.length))
  }
  const sri = ssri.fromData(data, {
    algorithms: opts.algorithms
  })
  if (opts.integrity && !ssri.checkData(data, opts.integrity, opts)) {
    return BB.reject(checksumError(opts.integrity, sri))
  }
  return BB.using(makeTmp(cache, opts), tmp => (
    writeFileAsync(
      tmp.target, data, { flag: 'wx' }
    ).then(() => (
      moveToDestination(tmp, cache, sri, opts)
    ))
  )).then(() => ({ integrity: sri, size: data.length }))
}

module.exports.stream = writeStream
function writeStream (cache, opts) {
  opts = opts || {}
  const inputStream = new PassThrough()
  let inputErr = false
  function errCheck () {
    if (inputErr) { throw inputErr }
  }

  let allDone
  const ret = to((c, n, cb) => {
    if (!allDone) {
      allDone = handleContent(inputStream, cache, opts, errCheck)
    }
    inputStream.write(c, n, cb)
  }, cb => {
    inputStream.end(() => {
      if (!allDone) {
        const e = new Error(Y`Cache input stream was empty`)
        e.code = 'ENODATA'
        return ret.emit('error', e)
      }
      allDone.then(res => {
        res.integrity && ret.emit('integrity', res.integrity)
        res.size !== null && ret.emit('size', res.size)
        cb()
      }, e => {
        ret.emit('error', e)
      })
    })
  })
  ret.once('error', e => {
    inputErr = e
  })
  return ret
}

function handleContent (inputStream, cache, opts, errCheck) {
  return BB.using(makeTmp(cache, opts), tmp => {
    errCheck()
    return pipeToTmp(
      inputStream, cache, tmp.target, opts, errCheck
    ).then(res => {
      return moveToDestination(
        tmp, cache, res.integrity, opts, errCheck
      ).then(() => res)
    })
  })
}

function pipeToTmp (inputStream, cache, tmpTarget, opts, errCheck) {
  return BB.resolve().then(() => {
    let integrity
    let size
    const hashStream = ssri.integrityStream({
      integrity: opts.integrity,
      algorithms: opts.algorithms,
      size: opts.size
    }).on('integrity', s => {
      integrity = s
    }).on('size', s => {
      size = s
    })
    const outStream = fs.createWriteStream(tmpTarget, {
      flags: 'wx'
    })
    errCheck()
    return pipe(inputStream, hashStream, outStream).then(() => {
      return { integrity, size }
    }).catch(err => {
      return rimraf(tmpTarget).then(() => { throw err })
    })
  })
}

function makeTmp (cache, opts) {
  const tmpTarget = uniqueFilename(path.join(cache, 'tmp'), opts.tmpPrefix)
  return fixOwner.mkdirfix(
    path.dirname(tmpTarget), opts.uid, opts.gid
  ).then(() => ({
    target: tmpTarget,
    moved: false
  })).disposer(tmp => (!tmp.moved && rimraf(tmp.target)))
}

function moveToDestination (tmp, cache, sri, opts, errCheck) {
  errCheck && errCheck()
  const destination = contentPath(cache, sri)
  const destDir = path.dirname(destination)

  return fixOwner.mkdirfix(
    destDir, opts.uid, opts.gid
  ).then(() => {
    errCheck && errCheck()
    return moveFile(tmp.target, destination)
  }).then(() => {
    errCheck && errCheck()
    tmp.moved = true
    return fixOwner.chownr(destination, opts.uid, opts.gid)
  })
}

function sizeError (expected, found) {
  var err = new Error(Y`Bad data size: expected inserted data to be ${expected} bytes, but got ${found} instead`)
  err.expected = expected
  err.found = found
  err.code = 'EBADSIZE'
  return err
}

function checksumError (expected, found) {
  var err = new Error(Y`Integrity check failed:
  Wanted: ${expected}
   Found: ${found}`)
  err.code = 'EINTEGRITY'
  err.expected = expected
  err.found = found
  return err
}
