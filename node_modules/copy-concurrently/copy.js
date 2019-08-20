'use strict'
module.exports = copy
module.exports.item = copyItem
module.exports.recurse = recurseDir
module.exports.symlink = copySymlink
module.exports.file = copyFile

var nodeFs = require('fs')
var path = require('path')
var validate = require('aproba')
var stockWriteStreamAtomic = require('fs-write-stream-atomic')
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')
var isWindows = require('./is-windows')
var RunQueue = require('run-queue')
var extend = Object.assign || require('util')._extend

function promisify (Promise, fn) {
  return function () {
    var args = [].slice.call(arguments)
    return new Promise(function (resolve, reject) {
      return fn.apply(null, args.concat(function (err, value) {
        if (err) {
          reject(err)
        } else {
          resolve(value)
        }
      }))
    })
  }
}

function copy (from, to, opts) {
  validate('SSO|SS', arguments)
  opts = extend({}, opts || {})

  var Promise = opts.Promise || global.Promise
  var fs = opts.fs || nodeFs

  if (opts.isWindows == null) opts.isWindows = isWindows
  if (!opts.Promise) opts.Promise = Promise
  if (!opts.fs) opts.fs = fs
  if (!opts.recurseWith) opts.recurseWith = copyItem
  if (!opts.lstat) opts.lstat = promisify(opts.Promise, fs.lstat)
  if (!opts.stat) opts.stat = promisify(opts.Promise, fs.stat)
  if (!opts.chown) opts.chown = promisify(opts.Promise, fs.chown)
  if (!opts.readdir) opts.readdir = promisify(opts.Promise, fs.readdir)
  if (!opts.readlink) opts.readlink = promisify(opts.Promise, fs.readlink)
  if (!opts.symlink) opts.symlink = promisify(opts.Promise, fs.symlink)
  if (!opts.chmod) opts.chmod = promisify(opts.Promise, fs.chmod)

  opts.top = from
  opts.mkdirpAsync = promisify(opts.Promise, mkdirp)
  var rimrafAsync = promisify(opts.Promise, rimraf)

  var queue = new RunQueue({
    maxConcurrency: opts.maxConcurrency,
    Promise: Promise
  })
  opts.queue = queue

  queue.add(0, copyItem, [from, to, opts])

  return queue.run().catch(function (err) {
    // if the target already exists don't clobber it
    if (err.code === 'EEXIST' || err.code === 'EPERM') {
      return passThroughError()
    } else {
      return remove(to).then(passThroughError, passThroughError)
    }
    function passThroughError () {
      return Promise.reject(err)
    }
  })

  function remove (target) {
    var opts = {
      unlink: fs.unlink,
      chmod: fs.chmod,
      stat: fs.stat,
      lstat: fs.lstat,
      rmdir: fs.rmdir,
      readdir: fs.readdir,
      glob: false
    }
    return rimrafAsync(target, opts)
  }
}

function copyItem (from, to, opts) {
  validate('SSO', [from, to, opts])
  var fs = opts.fs || nodeFs
  var Promise = opts.Promise || global.Promise
  var lstat = opts.lstat || promisify(Promise, fs.lstat)

  return lstat(to).then(function () {
    return Promise.reject(eexists(from, to))
  }, function (err) {
    if (err && err.code !== 'ENOENT') return Promise.reject(err)
    return lstat(from)
  }).then(function (fromStat) {
    var cmdOpts = extend(extend({}, opts), fromStat)
    if (fromStat.isDirectory()) {
      return recurseDir(from, to, cmdOpts)
    } else if (fromStat.isSymbolicLink()) {
      opts.queue.add(1, copySymlink, [from, to, cmdOpts])
    } else if (fromStat.isFile()) {
      return copyFile(from, to, cmdOpts)
    } else if (fromStat.isBlockDevice()) {
      return Promise.reject(eunsupported(from + " is a block device, and we don't know how to copy those."))
    } else if (fromStat.isCharacterDevice()) {
      return Promise.reject(eunsupported(from + " is a character device, and we don't know how to copy those."))
    } else if (fromStat.isFIFO()) {
      return Promise.reject(eunsupported(from + " is a FIFO, and we don't know how to copy those."))
    } else if (fromStat.isSocket()) {
      return Promise.reject(eunsupported(from + " is a socket, and we don't know how to copy those."))
    } else {
      return Promise.reject(eunsupported("We can't tell what " + from + " is and so we can't copy it."))
    }
  })
}

function recurseDir (from, to, opts) {
  validate('SSO', [from, to, opts])
  var recurseWith = opts.recurseWith || copyItem
  var fs = opts.fs || nodeFs
  var chown = opts.chown || promisify(Promise, fs.chown)
  var readdir = opts.readdir || promisify(Promise, fs.readdir)
  var mkdirpAsync = opts.mkdirpAsync || promisify(Promise, mkdirp)

  return mkdirpAsync(to, {fs: fs, mode: opts.mode}).then(function () {
    var getuid = opts.getuid || process.getuid
    if (getuid && opts.uid != null && getuid() === 0) {
      return chown(to, opts.uid, opts.gid)
    }
  }).then(function () {
    return readdir(from)
  }).then(function (files) {
    files.forEach(function (file) {
      opts.queue.add(0, recurseWith, [path.join(from, file), path.join(to, file), opts])
    })
  })
}

function copySymlink (from, to, opts) {
  validate('SSO', [from, to, opts])
  var fs = opts.fs || nodeFs
  var readlink = opts.readlink || promisify(Promise, fs.readlink)
  var stat = opts.stat || promisify(Promise, fs.symlink)
  var symlink = opts.symlink || promisify(Promise, fs.symlink)
  var Promise = opts.Promise || global.Promise

  return readlink(from).then(function (fromDest) {
    var absoluteDest = path.resolve(path.dirname(from), fromDest)
    // Treat absolute paths that are inside the tree we're
    // copying as relative. This necessary to properly support junctions
    // on windows (which are always absolute) but is also DWIM with symlinks.
    var relativeDest = path.relative(opts.top, absoluteDest)
    var linkFrom = relativeDest.substr(0, 2) === '..' ? fromDest : path.relative(path.dirname(from), absoluteDest)
    if (opts.isWindows) {
      return stat(absoluteDest).catch(function () { return null }).then(function (destStat) {
        var isDir = destStat && destStat.isDirectory()
        var type = isDir ? 'dir' : 'file'
        return symlink(linkFrom, to, type).catch(function (err) {
          if (type === 'dir') {
            return symlink(linkFrom, to, 'junction')
          } else {
            return Promise.reject(err)
          }
        })
      })
    } else {
      return symlink(linkFrom, to)
    }
  })
}

function copyFile (from, to, opts) {
  validate('SSO', [from, to, opts])
  var fs = opts.fs || nodeFs
  var writeStreamAtomic = opts.writeStreamAtomic || stockWriteStreamAtomic
  var Promise = opts.Promise || global.Promise
  var chmod = opts.chmod || promisify(Promise, fs.chmod)

  var writeOpts = {}
  var getuid = opts.getuid || process.getuid
  if (getuid && opts.uid != null && getuid() === 0) {
    writeOpts.chown = {
      uid: opts.uid,
      gid: opts.gid
    }
  }

  return new Promise(function (resolve, reject) {
    var errored = false
    function onError (err) {
      errored = true
      reject(err)
    }
    fs.createReadStream(from)
      .once('error', onError)
      .pipe(writeStreamAtomic(to, writeOpts))
      .once('error', onError)
      .once('close', function () {
        if (errored) return
        if (opts.mode != null) {
          resolve(chmod(to, opts.mode))
        } else {
          resolve()
        }
      })
  })
}

function eexists (from, to) {
  var err = new Error('Could not move ' + from + ' to ' + to + ': destination already exists.')
  err.code = 'EEXIST'
  return err
}

function eunsupported (msg) {
  var err = new Error(msg)
  err.code = 'EUNSUPPORTED'
  return err
}
