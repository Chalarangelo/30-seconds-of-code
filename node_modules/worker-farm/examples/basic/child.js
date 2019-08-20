'use strict'

module.exports = function (inp, callback) {
  callback(null, inp + ' BAR (' + process.pid + ')')
}
