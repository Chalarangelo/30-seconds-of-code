'use strict'

const path = require('path')
const y18n = require('y18n')({
  directory: path.join(__dirname, '../../locales'),
  locale: 'en',
  updateFiles: process.env.CACACHE_UPDATE_LOCALE_FILES === 'true'
})

module.exports = yTag
function yTag (parts) {
  let str = ''
  parts.forEach((part, i) => {
    const arg = arguments[i + 1]
    str += part
    if (arg) {
      str += '%s'
    }
  })
  return y18n.__.apply(null, [str].concat([].slice.call(arguments, 1)))
}

module.exports.setLocale = locale => {
  y18n.setLocale(locale)
}
