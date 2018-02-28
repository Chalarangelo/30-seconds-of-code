const fs = require('fs')
const path = require('path')
const marked = require('marked')
const pretty = require('pretty')
const { JSDOM } = require('jsdom')
const caniuseDb = require('caniuse-db/data.json')
const { toKebabCase, emptyHTML } = require('../utils/utils.js')

const renderer = new marked.Renderer()
renderer.heading = (text, level) =>
  level === 3
    ? `<h${level} id="${toKebabCase(text)}">${text}</h${level}>`
    : `<h${level} data-type="${text}">${text}</h${level}>`
renderer.link = (url, _, text) => `<a href="${url}" target="_blank">${text || url}</a>`

const SNIPPETS_PATH = './snippets'
const SNIPPET_CONTAINER_SELECTOR = '.main > .container'

const createElement = str => {
  const el = document.createElement('div')
  el.innerHTML = str
  return el.firstElementChild
}

const template = markdown => `
  <div class="snippet">
    ${markdown}
  </div>
`

const document = new JSDOM(fs.readFileSync('./index.html', 'utf8')).window.document
const snippetContainer = document.querySelector('.main > .container')
const sidebarLinks = document.querySelector('.sidebar__links')
emptyHTML(snippetContainer, sidebarLinks)

for (const snippetFile of fs.readdirSync(SNIPPETS_PATH)) {
  const snippetPath = path.join(SNIPPETS_PATH, snippetFile)
  const snippetData = fs.readFileSync(snippetPath, 'utf8')
  const markdown = marked(snippetData, { renderer })
  const snippetTemplate = template(markdown)
  const el = createElement(snippetTemplate)
  snippetContainer.append(el)

  sidebarLinks.append(
    createElement(
      `<a class="sidebar__link" href="#${snippetFile.replace('.md', '')}">${
        el.querySelector('h3').innerHTML
      }</a>`
    )
  )

  const featUsageShares = (snippetData.match(/https?:\/\/caniuse\.com\/#feat=.*/g) || []).map(
    feat => {
      const featData = caniuseDb.data[feat.match(/#feat=(.*)/)[1]]
      return featData ? Number(featData.usage_perc_y + featData.usage_perc_a) : 100
    }
  )

  el.querySelector('h4:last-of-type').after(
    createElement(`
      <div>
        <div class="snippet__browser-support">
          ${featUsageShares.length ? Math.min(...featUsageShares).toPrecision(3) : '99+'}%
        </div>
      </div>
      `)
  )
}

// doctype declaration gets stripped, add it back in
const html = `<!DOCTYPE html>
${pretty(document.documentElement.outerHTML, { ocd: true })}
`

fs.writeFileSync('./index.html', html)
