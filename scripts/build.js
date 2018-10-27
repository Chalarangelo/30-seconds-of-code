const fs = require('fs')
const path = require('path')
const marked = require('marked')
const pretty = require('pretty')
const caniuseDb = require('caniuse-db/data.json')
const sass = require('node-sass')
const { toKebabCase, createElement, template, dom, getCode } = require('../utils/utils.js')
const { differenceInDays } = require('date-fns')

const SNIPPETS_PATH = './snippets'
const TAGS = [
  {
    name: 'all',
    icon: 'check'
  },
  {
    name: 'layout',
    icon: 'layout'
  },
  {
    name: 'visual',
    icon: 'eye'
  },
  {
    name: 'animation',
    icon: 'loader'
  },
  {
    name: 'interactivity',
    icon: 'edit-2'
  },
  {
    name: 'other',
    icon: 'tag'
  }
]

const renderer = new marked.Renderer()
renderer.heading = (text, level) => {
  if (level === 3) {
    return `<h${level} id="${toKebabCase(text)}"><span>${text}</span></h${level}>`
  } else {
    return ['HTML', 'CSS', 'JavaScript'].includes(text)
      ? `<h${level} data-type="${text}">${text}</h${level}>`
      : `<h${level}>${text}</h${level}>`
  }
}
renderer.link = (url, _, text) => `<a href="${url}" target="_blank">${text || url}</a>`

const document = dom('./src/html/index.html')
const components = {
  backToTopButton: dom('./src/html/components/back-to-top-button.html'),
  sidebar: dom('./src/html/components/sidebar.html'),
  header: dom('./src/html/components/header.html'),
  main: dom('./src/html/components/main.html'),
  tags: dom('./src/html/components/tags.html')
}

const snippetContainer = components.main.querySelector('.container')
const sidebarLinkContainer = components.sidebar.querySelector('.sidebar__links')
TAGS.slice(1).forEach(tag => {
  sidebarLinkContainer.append(
    createElement(`
      <section data-type="${tag.name}" class="sidebar__section">
        <h4 class="sidebar__section-heading">${tag.name}</h4>
      </section>
    `)
  )
})

for (const snippetFile of fs.readdirSync(SNIPPETS_PATH)) {
  const snippetPath = path.join(SNIPPETS_PATH, snippetFile)
  const snippetData = fs.readFileSync(snippetPath, 'utf8')

  const html = getCode('html', snippetData).trim()
  const css = getCode('css', snippetData)
  const scopedCSS = sass.renderSync({
    data: `[data-scope="${snippetFile}"] { ${css} }`
  })
  const js = getCode('js', snippetData)

  const demo =
    `<div class="snippet-demo" data-scope="${snippetFile}">${html}</div>` +
    `<style>${scopedCSS.css.toString()}</style>` +
    `${js ? `<script>(function(){${js}})();</script>` : ''}`

  const markdown = marked(snippetData, { renderer }).replace(
    '<h4>Demo</h4>',
    `<h4>Demo</h4>${demo}`
  )
  const snippetEl = createElement(`<div class="snippet">${markdown}</div>`)
  snippetContainer.append(snippetEl)

  // browser support usage
  const featUsageShares = (snippetData.match(/https?:\/\/caniuse\.com\/#feat=.*/g) || []).map(
    feat => {
      const featData = caniuseDb.data[feat.match(/#feat=(.*)/)[1]]
      return featData ? Number(featData.usage_perc_y + featData.usage_perc_a) : 100
    }
  )
  const browserSupportHeading = snippetEl.querySelector('h4:last-of-type')
  browserSupportHeading.after(
    createElement(`
      <div>
        <div class="snippet__browser-support">
          ${featUsageShares.length ? Math.min(...featUsageShares).toPrecision(3) : '99+'}%
        </div>
      </div>
    `)
  )

  // sidebar link
  const link = createElement(
    `<a class="sidebar__link" href="#${snippetFile.replace('.md', '')}">${
      snippetEl.querySelector('h3').innerHTML
    }</a>`
  )

  // new icon = less than 31 days old
  const date = (snippetData.match(/<!--\s*date:\s*(.+?)-->/) || [, ''])[1]
  if (date && differenceInDays(new Date(date), new Date()) < 31) {
    snippetEl.prepend(
      createElement(
        '<img alt="New" draggable="false" class="snippet__new" src="./src/img/new.svg">'
      )
    )
    link.prepend(
      createElement(
        '<img alt="New" draggable="false" class="sidebar__new" src="./src/img/new.svg">'
      )
    )
  }

  // tags
  const tags = (snippetData.match(/<!--\s*tags:\s*(.+?)-->/) || [, ''])[1]
    .split(/,\s*/)
    .forEach(tag => {
      tag = tag.trim().toLowerCase()
      snippetEl
        .querySelector('h3')
        .append(
          createElement(
            `<span class="tags__tag snippet__tag" data-type="${tag}"><i data-feather="${
              TAGS.find(t => t.name === tag).icon
            }"></i>${tag}</span>`
          )
        )

      sidebarLinkContainer.querySelector(`section[data-type="${tag}"]`).append(link)
    })
}

// build dom
TAGS.forEach(tag =>
  components.tags.append(
    createElement(
      `<button class="tags__tag is-large ${tag.name === 'all' ? 'is-active' : ''}" data-type="${
        tag.name
      }"><i data-feather="${tag.icon}"></i>${tag.name}</button>`
    )
  )
)
const content = document.querySelector('.content-wrapper')
content.before(components.backToTopButton)
content.before(components.sidebar)
content.append(components.header)
content.append(components.main)
components.main.querySelector('.container').prepend(components.tags)

// doctype declaration gets stripped, add it back in
const html = `<!DOCTYPE html>
${pretty(document.documentElement.outerHTML, { ocd: true })}
`

fs.writeFileSync('./index.html', html)
