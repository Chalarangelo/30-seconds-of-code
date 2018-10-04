const fs = require('fs')
const { JSDOM } = require('jsdom')

exports.toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')

exports.dom = path => {
  const doc = new JSDOM(fs.readFileSync(path, 'utf8')).window.document
  return path.includes('component') ? doc.body.firstElementChild : doc
}

exports.createElement = str => {
  const el = new JSDOM().window.document.createElement('div')
  el.innerHTML = str
  return el.firstElementChild
}

exports.getCode = (type, str) =>
  (str.match(new RegExp('```' + type + '([\\s\\S]*?)```')) || [])[1] || ''
