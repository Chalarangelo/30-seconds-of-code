'use strict'

const fs = require('graceful-fs')
const path = require('path')
const mkdirp = require('../mkdirs').mkdirs
const pathExists = require('../path-exists').pathExists
const utimes = require('../util/utimes').utimesMillis

const notExist = Symbol('notExist')
const existsReg = Symbol('existsReg')

function copy (src, dest, opts, cb) {
  if (typeof opts === 'function' && !cb) {
    cb = opts
    opts = {}
  } else if (typeof opts === 'function') {
    opts = {filter: opts}
  }

  cb = cb || function () {}
  opts = opts || {}

  opts.clobber = 'clobber' in opts ? !!opts.clobber : true // default to true for now
  opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber // overwrite falls back to clobber

  // Warn about using preserveTimestamps on 32-bit node
  if (opts.preserveTimestamps && process.arch === 'ia32') {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`)
  }

  src = path.resolve(src)
  dest = path.resolve(dest)

  // don't allow src and dest to be the same
  if (src === dest) return cb(new Error('Source and destination must not be the same.'))

  if (opts.filter) return handleFilter(checkParentDir, src, dest, opts, cb)
  return checkParentDir(src, dest, opts, cb)
}

function checkParentDir (src, dest, opts, cb) {
  const destParent = path.dirname(dest)
  pathExists(destParent, (err, dirExists) => {
    if (err) return cb(err)
    if (dirExists) return startCopy(src, dest, opts, cb)
    mkdirp(destParent, err => {
      if (err) return cb(err)
      return startCopy(src, dest, opts, cb)
    })
  })
}

function startCopy (src, dest, opts, cb) {
  if (opts.filter) return handleFilter(getStats, src, dest, opts, cb)
  return getStats(src, dest, opts, cb)
}

function handleFilter (onInclude, src, dest, opts, cb) {
  Promise.resolve(opts.filter(src, dest))
    .then(include => {
      if (include) return onInclude(src, dest, opts, cb)
      return cb()
    }, error => cb(error))
}

function getStats (src, dest, opts, cb) {
  const stat = opts.dereference ? fs.stat : fs.lstat
  stat(src, (err, st) => {
    if (err) return cb(err)

    if (st.isDirectory()) return onDir(st, src, dest, opts, cb)
    else if (st.isFile() ||
             st.isCharacterDevice() ||
             st.isBlockDevice()) return onFile(st, src, dest, opts, cb)
    else if (st.isSymbolicLink()) return onLink(src, dest, opts, cb)
  })
}

function onFile (srcStat, src, dest, opts, cb) {
  checkDest(dest, (err, resolvedPath) => {
    if (err) return cb(err)
    if (resolvedPath === notExist) {
      return copyFile(srcStat, src, dest, opts, cb)
    } else if (resolvedPath === existsReg) {
      return mayCopyFile(srcStat, src, dest, opts, cb)
    } else {
      if (src === resolvedPath) return cb()
      return mayCopyFile(srcStat, src, dest, opts, cb)
    }
  })
}

function mayCopyFile (srcStat, src, dest, opts, cb) {
  if (opts.overwrite) {
    fs.unlink(dest, err => {
      if (err) return cb(err)
      return copyFile(srcStat, src, dest, opts, cb)
    })
  } else if (opts.errorOnExist) {
    return cb(new Error(`'${dest}' already exists`))
  } else return cb()
}

function copyFile (srcStat, src, dest, opts, cb) {
  if (typeof fs.copyFile === 'function') {
    return fs.copyFile(src, dest, err => {
      if (err) return cb(err)
      return setDestModeAndTimestamps(srcStat, dest, opts, cb)
    })
  }
  return copyFileFallback(srcStat, src, dest, opts, cb)
}

function copyFileFallback (srcStat, src, dest, opts, cb) {
  const rs = fs.createReadStream(src)
  rs.on('error', err => cb(err))
    .once('open', () => {
      const ws = fs.createWriteStream(dest, { mode: srcStat.mode })
      ws.on('error', err => cb(err))
        .on('open', () => rs.pipe(ws))
        .once('close', () => setDestModeAndTimestamps(srcStat, dest, opts, cb))
    })
}

function setDestModeAndTimestamps (srcStat, dest, opts, cb) {
  fs.chmod(dest, srcStat.mode, err => {
    if (err) return cb(err)
    if (opts.preserveTimestamps) {
      return utimes(dest, srcStat.atime, srcStat.mtime, cb)
    }
    return cb()
  })
}

function onDir (srcStat, src, dest, opts, cb) {
  checkDest(dest, (err, resolvedPath) => {
    if (err) return cb(err)
    if (resolvedPath === notExist) {
      if (isSrcSubdir(src, dest)) {
        return cb(new Error(`Cannot copy '${src}' to a subdirectory of itself, '${dest}'.`))
      }
      return mkDirAndCopy(srcStat, src, dest, opts, cb)
    } else if (resolvedPath === existsReg) {
      if (isSrcSubdir(src, dest)) {
        return cb(new Error(`Cannot copy '${src}' to a subdirectory of itself, '${dest}'.`))
      }
      return mayCopyDir(src, dest, opts, cb)
    } else {
      if (src === resolvedPath) return cb()
      return copyDir(src, dest, opts, cb)
    }
  })
}

function mayCopyDir (src, dest, opts, cb) {
  fs.stat(dest, (err, st) => {
    if (err) return cb(err)
    if (!st.isDirectory()) {
      return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`))
    }
    return copyDir(src, dest, opts, cb)
  })
}

function mkDirAndCopy (srcStat, src, dest, opts, cb) {
  fs.mkdir(dest, srcStat.mode, err => {
    if (err) return cb(err)
    fs.chmod(dest, srcStat.mode, err => {
      if (err) return cb(err)
      return copyDir(src, dest, opts, cb)
    })
  })
}

function copyDir (src, dest, opts, cb) {
  fs.readdir(src, (err, items) => {
    if (err) return cb(err)
    return copyDirItems(items, src, dest, opts, cb)
  })
}

function copyDirItems (items, src, dest, opts, cb) {
  const item = items.pop()
  if (!item) return cb()
  startCopy(path.join(src, item), path.join(dest, item), opts, err => {
    if (err) return cb(err)
    return copyDirItems(items, src, dest, opts, cb)
  })
}

function onLink (src, dest, opts, cb) {
  fs.readlink(src, (err, resolvedSrcPath) => {
    if (err) return cb(err)

    if (opts.dereference) {
      resolvedSrcPath = path.resolve(process.cwd(), resolvedSrcPath)
    }

    checkDest(dest, (err, resolvedDestPath) => {
      if (err) return cb(err)

      if (resolvedDestPath === notExist || resolvedDestPath === existsReg) {
        // if dest already exists, fs throws error anyway,
        // so no need to guard against it here.
        return fs.symlink(resolvedSrcPath, dest, cb)
      } else {
        if (opts.dereference) {
          resolvedDestPath = path.resolve(process.cwd(), resolvedDestPath)
        }
        if (resolvedDestPath === resolvedSrcPath) return cb()

        // prevent copy if src is a subdir of dest since unlinking
        // dest in this case would result in removing src contents
        // and therefore a broken symlink would be created.
        fs.stat(dest, (err, st) => {
          if (err) return cb(err)
          if (st.isDirectory() && isSrcSubdir(resolvedDestPath, resolvedSrcPath)) {
            return cb(new Error(`Cannot overwrite '${resolvedDestPath}' with '${resolvedSrcPath}'.`))
          }
          return copyLink(resolvedSrcPath, dest, cb)
        })
      }
    })
  })
}

function copyLink (resolvedSrcPath, dest, cb) {
  fs.unlink(dest, err => {
    if (err) return cb(err)
    return fs.symlink(resolvedSrcPath, dest, cb)
  })
}

// check if dest exists and/or is a symlink
function checkDest (dest, cb) {
  fs.readlink(dest, (err, resolvedPath) => {
    if (err) {
      if (err.code === 'ENOENT') return cb(null, notExist)

      // dest exists and is a regular file or directory, Windows may throw UNKNOWN error.
      if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return cb(null, existsReg)

      return cb(err)
    }
    return cb(null, resolvedPath) // dest exists and is a symlink
  })
}

// return true if dest is a subdir of src, otherwise false.
// extract dest base dir and check if that is the same as src basename
function isSrcSubdir (src, dest) {
  const baseDir = dest.split(path.dirname(src) + path.sep)[1]
  if (baseDir) {
    const destBasename = baseDir.split(path.sep)[0]
    if (destBasename) {
      return src !== dest && dest.indexOf(src) > -1 && destBasename === path.basename(src)
    }
    return false
  }
  return false
}

module.exports = copy
