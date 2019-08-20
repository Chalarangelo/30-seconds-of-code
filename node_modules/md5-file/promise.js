'use strict'

var md5File = require('./')

function md5FileAsPromised (filename) {
  return new Promise(function (resolve, reject) {
    md5File(filename, function (err, hash) {
      if (err) return reject(err)

      resolve(hash)
    })
  })
}

module.exports = md5FileAsPromised
module.exports.sync = md5File.sync
