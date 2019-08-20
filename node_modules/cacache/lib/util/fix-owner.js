'use strict'

const BB = require('bluebird')

const chownr = BB.promisify(require('chownr'))
const mkdirp = BB.promisify(require('mkdirp'))
const inflight = require('promise-inflight')

module.exports.chownr = fixOwner
function fixOwner (filepath, uid, gid) {
  if (!process.getuid) {
    // This platform doesn't need ownership fixing
    return BB.resolve()
  }
  if (typeof uid !== 'number' && typeof gid !== 'number') {
    // There's no permissions override. Nothing to do here.
    return BB.resolve()
  }
  if ((typeof uid === 'number' && process.getuid() === uid) &&
      (typeof gid === 'number' && process.getgid() === gid)) {
    // No need to override if it's already what we used.
    return BB.resolve()
  }
  return inflight(
    'fixOwner: fixing ownership on ' + filepath,
    () => chownr(
      filepath,
      typeof uid === 'number' ? uid : process.getuid(),
      typeof gid === 'number' ? gid : process.getgid()
    ).catch({ code: 'ENOENT' }, () => null)
  )
}

module.exports.chownr.sync = fixOwnerSync
function fixOwnerSync (filepath, uid, gid) {
  if (!process.getuid) {
    // This platform doesn't need ownership fixing
    return
  }
  if (typeof uid !== 'number' && typeof gid !== 'number') {
    // There's no permissions override. Nothing to do here.
    return
  }
  if ((typeof uid === 'number' && process.getuid() === uid) &&
      (typeof gid === 'number' && process.getgid() === gid)) {
    // No need to override if it's already what we used.
    return
  }
  try {
    chownr.sync(
      filepath,
      typeof uid === 'number' ? uid : process.getuid(),
      typeof gid === 'number' ? gid : process.getgid()
    )
  } catch (err) {
    if (err.code === 'ENOENT') {
      return null
    }
  }
}

module.exports.mkdirfix = mkdirfix
function mkdirfix (p, uid, gid, cb) {
  return mkdirp(p).then(made => {
    if (made) {
      return fixOwner(made, uid, gid).then(() => made)
    }
  }).catch({ code: 'EEXIST' }, () => {
    // There's a race in mkdirp!
    return fixOwner(p, uid, gid).then(() => null)
  })
}

module.exports.mkdirfix.sync = mkdirfixSync
function mkdirfixSync (p, uid, gid) {
  try {
    const made = mkdirp.sync(p)
    if (made) {
      fixOwnerSync(made, uid, gid)
      return made
    }
  } catch (err) {
    if (err.code === 'EEXIST') {
      fixOwnerSync(p, uid, gid)
      return null
    } else {
      throw err
    }
  }
}
