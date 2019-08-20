'use strict'
module.exports = move

var nodeFs = require('fs')
var rimraf = require('rimraf')
var validate = require('aproba')
var copy = require('copy-concurrently')
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

function move (from, to, opts) {
  validate('SSO|SS', arguments)
  opts = extend({}, opts || {})

  var Promise = opts.Promise || global.Promise
  var fs = opts.fs || nodeFs
  var rimrafAsync = promisify(Promise, rimraf)
  var renameAsync = promisify(Promise, fs.rename)

  opts.top = from

  var queue = new RunQueue({
    maxConcurrency: opts.maxConcurrency,
    Promise: Promise
  })
  opts.queue = queue
  opts.recurseWith = rename

  queue.add(0, rename, [from, to, opts])

  return queue.run().then(function () {
    return remove(from)
  }, function (err) {
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

  function rename (from, to, opts, done) {
    return renameAsync(from, to).catch(function (err) {
      if (err.code !== 'EXDEV') {
        return Promise.reject(err)
      } else {
        return remove(to).then(function () {
          return copy.item(from, to, opts)
        })
      }
    })
  }
}
