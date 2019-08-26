const fs = require('fs-extra'),
  path = require('path'),
  { red } = require('kleur'),
  crypto = require('crypto'),
  frontmatter = require('front-matter')
const sass = require('node-sass')
const caniuseDb = require('caniuse-db/data.json')
const config = require('../../config')

// Reade all files in a directory
const getFilesInDir = (directoryPath, withPath, exclude = null) => {
  try {
    let directoryFilenames = fs.readdirSync(directoryPath)
    directoryFilenames.sort((a, b) => {
      a = a.toLowerCase()
      b = b.toLowerCase()
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })

    if (withPath) {
      // a hacky way to do conditional array.map
      return directoryFilenames.reduce((fileNames, fileName) => {
        if (exclude == null || !exclude.some(toExclude => fileName === toExclude))
          fileNames.push(`${directoryPath}/${fileName}`)
        return fileNames
      }, [])
    }
    return directoryFilenames.filter(v => v !== 'README.md')
  } catch (err) {
    console.log(`${red('ERROR!')} During snippet loading: ${err}`)
    process.exit(1)
  }
}
// Creates a hash for a value using the SHA-256 algorithm.
const hashData = val =>
  crypto
    .createHash('sha256')
    .update(val)
    .digest('hex')
// Gets the code blocks for a snippet file.
const getCodeBlocks = str => {
  const regex = /```[.\S\s]*?```/g
  let results = []
  let m = null
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) regex.lastIndex += 1

    m.forEach((match, groupIndex) => {
      results.push(match)
    })
  }
  const replacer = new RegExp(`\`\`\`${config.language}([\\s\\S]*?)\`\`\``, 'g')
  const secondReplacer = new RegExp(`\`\`\`${config.secondLanguage}([\\s\\S]*?)\`\`\``, 'g')
  const optionalReplacer = new RegExp(`\`\`\`${config.optionalLanguage}([\\s\\S]*?)\`\`\``, 'g')
  results = results.map(v =>
    v
      .replace(replacer, '$1')
      .replace(secondReplacer, '$1')
      .replace(optionalReplacer, '$1')
      .trim()
  )
  if (results.length > 2)
    return {
      html: results[0],
      css: results[1],
      js: results[2]
    }
  return {
    html: results[0],
    css: results[1],
    js: ''
  }
}
// Gets the textual content for a snippet file.
const getTextualContent = str => {
  const regex = /([\s\S]*?)```/g
  const results = []
  let m = null
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) regex.lastIndex += 1

    m.forEach((match, groupIndex) => {
      results.push(match)
    })
  }
  return results[1].replace(/\r\n/g, '\n')
}

// Gets the explanation for a snippet file.
const getExplanation = str => {
  const regex = /####\s*Explanation([\s\S]*)####/g
  const results = []
  let m = null
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) regex.lastIndex += 1

    m.forEach((match, groupIndex) => {
      results.push(match)
    })
  }
  // console.log(results);
  return results[1].replace(/\r\n/g, '\n')
}

// Gets the browser support for a snippet file.
const getBrowserSupport = str => {
  const regex = /####\s*Browser [s|S]upport([\s\S]*)/g
  const results = []
  let m = null
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) regex.lastIndex += 1

    m.forEach((match, groupIndex) => {
      results.push(match)
    })
  }
  let browserSupportText = results[1].replace(/\r\n/g, '\n')
  const supportPercentage = (
    browserSupportText.match(/https?:\/\/caniuse\.com\/#feat=.*/g) || []
  ).map(feat => {
    const featData = caniuseDb.data[feat.match(/#feat=(.*)/)[1]]
    // caniuse doesn't count "untracked" users, which makes the overall share appear much lower
    // than it probably is. Most of these untracked browsers probably support these features.
    // Currently it's around 5.3% untracked, so we'll use 4% as probably supporting the feature.
    // Also the npm package appears to be show higher usage % than the main website, this shows
    // about 0.2% lower than the main website when selecting "tracked users" (as of Feb 2019).
    const UNTRACKED_PERCENT = 4
    const usage = featData
      ? Number(featData.usage_perc_y + featData.usage_perc_a) + UNTRACKED_PERCENT
      : 100
    return Math.min(100, usage)
  })
  return {
    text: browserSupportText,
    supportPercentage: Math.min(...supportPercentage, 100)
  }
}

// Synchronously read all snippets and sort them as necessary (case-insensitive)
const readSnippets = snippetsPath => {
  const snippetFilenames = getFilesInDir(snippetsPath, false)

  let snippets = {}
  try {
    for (let snippet of snippetFilenames) {
      let data = frontmatter(fs.readFileSync(path.join(snippetsPath, snippet), 'utf8'))
      snippets[snippet] = {
        id: snippet.slice(0, -3),
        title: data.attributes.title,
        type: 'snippet',
        attributes: {
          fileName: snippet,
          text: getTextualContent(data.body),
          explanation: getExplanation(data.body),
          browserSupport: getBrowserSupport(data.body),
          codeBlocks: getCodeBlocks(data.body),
          tags: data.attributes.tags.split(',').map(t => t.trim())
        },
        meta: {
          hash: hashData(data.body)
        }
      }
      snippets[snippet].attributes.codeBlocks.scopedCss = sass
        .renderSync({
          data: `[data-scope="${snippets[snippet].id}"] { ${snippets[snippet].attributes.codeBlocks.css} }`
        })
        .css.toString()
    }
  } catch (err) {
    console.log(`${red('ERROR!')} During snippet loading: ${err}`)
    process.exit(1)
  }
  return snippets
}

module.exports = {
  getFilesInDir,
  hashData,
  getCodeBlocks,
  getTextualContent,
  getExplanation,
  getBrowserSupport,
  readSnippets
}
