'use strict'

const fs = require('fs')
const pify = require('pify')
const pTry = require('p-try')
const pFinally = require('p-finally')

const fsP = pify(fs)

module.exports = (...args) => {
  const callback = args.pop()
  return fsP
    .open(...args)
    .then(fd => pFinally(pTry(callback, fd), _ => fsP.close(fd)))
}

module.exports.sync = (...args) => {
  const callback = args.pop()
  const fd = fs.openSync(...args)
  try {
    return callback(fd)
  } finally {
    fs.closeSync(fd)
  }
}
