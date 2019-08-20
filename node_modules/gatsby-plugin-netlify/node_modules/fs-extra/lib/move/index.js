'use strict'

// most of this code was written by Andrew Kelley
// licensed under the BSD license: see
// https://github.com/andrewrk/node-mv/blob/master/package.json

// this needs a cleanup

const u = require('universalify').fromCallback
const fs = require('graceful-fs')
const ncp = require('../copy/ncp')
const path = require('path')
const remove = require('../remove').remove
const mkdirp = require('../mkdirs').mkdirs

function move (src, dest, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  const overwrite = options.overwrite || options.clobber || false

  isSrcSubdir(src, dest, (err, itIs) => {
    if (err) return callback(err)
    if (itIs) return callback(new Error(`Cannot move '${src}' to a subdirectory of itself, '${dest}'.`))
    mkdirp(path.dirname(dest), err => {
      if (err) return callback(err)
      doRename()
    })
  })

  function doRename () {
    if (path.resolve(src) === path.resolve(dest)) {
      fs.access(src, callback)
    } else if (overwrite) {
      fs.rename(src, dest, err => {
        if (!err) return callback()

        if (err.code === 'ENOTEMPTY' || err.code === 'EEXIST') {
          remove(dest, err => {
            if (err) return callback(err)
            options.overwrite = false // just overwriteed it, no need to do it again
            move(src, dest, options, callback)
          })
          return
        }

        // weird Windows shit
        if (err.code === 'EPERM') {
          setTimeout(() => {
            remove(dest, err => {
              if (err) return callback(err)
              options.overwrite = false
              move(src, dest, options, callback)
            })
          }, 200)
          return
        }

        if (err.code !== 'EXDEV') return callback(err)
        moveAcrossDevice(src, dest, overwrite, callback)
      })
    } else {
      fs.link(src, dest, err => {
        if (err) {
          if (err.code === 'EXDEV' || err.code === 'EISDIR' || err.code === 'EPERM' || err.code === 'ENOTSUP') {
            return moveAcrossDevice(src, dest, overwrite, callback)
          }
          return callback(err)
        }
        return fs.unlink(src, callback)
      })
    }
  }
}

function moveAcrossDevice (src, dest, overwrite, callback) {
  fs.stat(src, (err, stat) => {
    if (err) return callback(err)

    if (stat.isDirectory()) {
      moveDirAcrossDevice(src, dest, overwrite, callback)
    } else {
      moveFileAcrossDevice(src, dest, overwrite, callback)
    }
  })
}

function moveFileAcrossDevice (src, dest, overwrite, callback) {
  const flags = overwrite ? 'w' : 'wx'
  const ins = fs.createReadStream(src)
  const outs = fs.createWriteStream(dest, { flags })

  ins.on('error', err => {
    ins.destroy()
    outs.destroy()
    outs.removeListener('close', onClose)

    // may want to create a directory but `out` line above
    // creates an empty file for us: See #108
    // don't care about error here
    fs.unlink(dest, () => {
      // note: `err` here is from the input stream errror
      if (err.code === 'EISDIR' || err.code === 'EPERM') {
        moveDirAcrossDevice(src, dest, overwrite, callback)
      } else {
        callback(err)
      }
    })
  })

  outs.on('error', err => {
    ins.destroy()
    outs.destroy()
    outs.removeListener('close', onClose)
    callback(err)
  })

  outs.once('close', onClose)
  ins.pipe(outs)

  function onClose () {
    fs.unlink(src, callback)
  }
}

function moveDirAcrossDevice (src, dest, overwrite, callback) {
  const options = {
    overwrite: false
  }

  if (overwrite) {
    remove(dest, err => {
      if (err) return callback(err)
      startNcp()
    })
  } else {
    startNcp()
  }

  function startNcp () {
    ncp(src, dest, options, err => {
      if (err) return callback(err)
      remove(src, callback)
    })
  }
}

// return true if dest is a subdir of src, otherwise false.
// extract dest base dir and check if that is the same as src basename
function isSrcSubdir (src, dest, cb) {
  fs.stat(src, (err, st) => {
    if (err) return cb(err)
    if (st.isDirectory()) {
      const baseDir = dest.split(path.dirname(src) + path.sep)[1]
      if (baseDir) {
        const destBasename = baseDir.split(path.sep)[0]
        if (destBasename) return cb(null, src !== dest && dest.indexOf(src) > -1 && destBasename === path.basename(src))
        return cb(null, false)
      }
      return cb(null, false)
    }
    return cb(null, false)
  })
}

module.exports = {
  move: u(move)
}
