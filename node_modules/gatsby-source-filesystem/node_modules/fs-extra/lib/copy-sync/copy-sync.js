'use strict'

const fs = require('graceful-fs')
const path = require('path')
const mkdirpSync = require('../mkdirs').mkdirsSync
const utimesSync = require('../util/utimes.js').utimesMillisSync

const notExist = Symbol('notExist')
const existsReg = Symbol('existsReg')

function copySync (src, dest, opts) {
  if (typeof opts === 'function') {
    opts = {filter: opts}
  }

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
  if (src === dest) throw new Error('Source and destination must not be the same.')

  if (opts.filter && !opts.filter(src, dest)) return

  const destParent = path.dirname(dest)
  if (!fs.existsSync(destParent)) mkdirpSync(destParent)
  return startCopy(src, dest, opts)
}

function startCopy (src, dest, opts) {
  if (opts.filter && !opts.filter(src, dest)) return
  return getStats(src, dest, opts)
}

function getStats (src, dest, opts) {
  const statSync = opts.dereference ? fs.statSync : fs.lstatSync
  const st = statSync(src)

  if (st.isDirectory()) return onDir(st, src, dest, opts)
  else if (st.isFile() ||
           st.isCharacterDevice() ||
           st.isBlockDevice()) return onFile(st, src, dest, opts)
  else if (st.isSymbolicLink()) return onLink(src, dest, opts)
}

function onFile (srcStat, src, dest, opts) {
  const resolvedPath = checkDest(dest)
  if (resolvedPath === notExist) {
    return copyFile(srcStat, src, dest, opts)
  } else if (resolvedPath === existsReg) {
    return mayCopyFile(srcStat, src, dest, opts)
  } else {
    if (src === resolvedPath) return
    return mayCopyFile(srcStat, src, dest, opts)
  }
}

function mayCopyFile (srcStat, src, dest, opts) {
  if (opts.overwrite) {
    fs.unlinkSync(dest)
    return copyFile(srcStat, src, dest, opts)
  } else if (opts.errorOnExist) {
    throw new Error(`'${dest}' already exists`)
  }
}

function copyFile (srcStat, src, dest, opts) {
  if (typeof fs.copyFileSync === 'function') {
    fs.copyFileSync(src, dest)
    fs.chmodSync(dest, srcStat.mode)
    if (opts.preserveTimestamps) {
      return utimesSync(dest, srcStat.atime, srcStat.mtime)
    }
    return
  }
  return copyFileFallback(srcStat, src, dest, opts)
}

function copyFileFallback (srcStat, src, dest, opts) {
  const BUF_LENGTH = 64 * 1024
  const _buff = require('../util/buffer')(BUF_LENGTH)

  const fdr = fs.openSync(src, 'r')
  const fdw = fs.openSync(dest, 'w', srcStat.mode)
  let bytesRead = 1
  let pos = 0

  while (bytesRead > 0) {
    bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos)
    fs.writeSync(fdw, _buff, 0, bytesRead)
    pos += bytesRead
  }

  if (opts.preserveTimestamps) fs.futimesSync(fdw, srcStat.atime, srcStat.mtime)

  fs.closeSync(fdr)
  fs.closeSync(fdw)
}

function onDir (srcStat, src, dest, opts) {
  const resolvedPath = checkDest(dest)
  if (resolvedPath === notExist) {
    if (isSrcSubdir(src, dest)) {
      throw new Error(`Cannot copy '${src}' to a subdirectory of itself, '${dest}'.`)
    }
    return mkDirAndCopy(srcStat, src, dest, opts)
  } else if (resolvedPath === existsReg) {
    if (isSrcSubdir(src, dest)) {
      throw new Error(`Cannot copy '${src}' to a subdirectory of itself, '${dest}'.`)
    }
    return mayCopyDir(src, dest, opts)
  } else {
    if (src === resolvedPath) return
    return copyDir(src, dest, opts)
  }
}

function mayCopyDir (src, dest, opts) {
  if (!fs.statSync(dest).isDirectory()) {
    throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`)
  }
  return copyDir(src, dest, opts)
}

function mkDirAndCopy (srcStat, src, dest, opts) {
  fs.mkdirSync(dest, srcStat.mode)
  fs.chmodSync(dest, srcStat.mode)
  return copyDir(src, dest, opts)
}

function copyDir (src, dest, opts) {
  fs.readdirSync(src).forEach(item => {
    startCopy(path.join(src, item), path.join(dest, item), opts)
  })
}

function onLink (src, dest, opts) {
  let resolvedSrcPath = fs.readlinkSync(src)

  if (opts.dereference) {
    resolvedSrcPath = path.resolve(process.cwd(), resolvedSrcPath)
  }

  let resolvedDestPath = checkDest(dest)
  if (resolvedDestPath === notExist || resolvedDestPath === existsReg) {
    // if dest already exists, fs throws error anyway,
    // so no need to guard against it here.
    return fs.symlinkSync(resolvedSrcPath, dest)
  } else {
    if (opts.dereference) {
      resolvedDestPath = path.resolve(process.cwd(), resolvedDestPath)
    }
    if (resolvedDestPath === resolvedSrcPath) return

    // prevent copy if src is a subdir of dest since unlinking
    // dest in this case would result in removing src contents
    // and therefore a broken symlink would be created.
    if (fs.statSync(dest).isDirectory() && isSrcSubdir(resolvedDestPath, resolvedSrcPath)) {
      throw new Error(`Cannot overwrite '${resolvedDestPath}' with '${resolvedSrcPath}'.`)
    }
    return copyLink(resolvedSrcPath, dest)
  }
}

function copyLink (resolvedSrcPath, dest) {
  fs.unlinkSync(dest)
  return fs.symlinkSync(resolvedSrcPath, dest)
}

// check if dest exists and/or is a symlink
function checkDest (dest) {
  let resolvedPath
  try {
    resolvedPath = fs.readlinkSync(dest)
  } catch (err) {
    if (err.code === 'ENOENT') return notExist

    // dest exists and is a regular file or directory, Windows may throw UNKNOWN error
    if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return existsReg

    throw err
  }
  return resolvedPath // dest exists and is a symlink
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

module.exports = copySync
