'use strict'

// TODO: consider migrate to the "conventional-changelog-angular"

const url = require('./package.json').repository.url
const exec = require('child_process').exec

exec('git log --pretty=format:"%b"', (error, stdout, stderr) => {
  if (error) {
    console.error(error)
    process.exit(1)
  }

  // "reverts commit 6537cab0bf940cf7b780a87c8c754d380b4cd5ba"
  // -> "6537cab0bf940cf7b780a87c8c754d380b4cd5ba"
  const pattern = 'reverts commit ([\\w\\d]{40})'
  const strs = stdout.match(new RegExp(pattern, 'g')) || []
  const reverts = strs.map((str) => (str.match(new RegExp(pattern)))[1])

  const script = 'git log --pretty=format:"[%ai] %H %an : %s" --decorate=full'
  exec(script, (error, stdout, stderr) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }

    const logs = []
    stdout.split('\n').forEach((line) => {
      const matches = line.match(/^\[(.+?)\] (\w+) (.+?) : (.+?)$/)
      const date = matches[1]
      const hash = matches[2]
      const commiter = matches[3]
      const subject = matches[4] || ''

      if (reverts.indexOf(hash) > -1) {
        return
      }

      const semver = subject.match(/^([\d.]+)/)
      if (semver) {
        const version = semver[0]
        logs.push('')
        logs.push(version)
        logs.push('---')

        const isTag = version === subject
        if (isTag) {
          return
        }
      }

      const commitUrl = url.replace(/(.git|\/)$/, '') + '/commit/' + hash
      const normalizeCommiter = commiter.replace('horse_n_deer', '59naga')
      const issueUrlBase = url.replace(/(.git|\/)$/, '') + '/issues/'
      const linkedDescription = subject.split('`').map((chunk, i) => {
        if (i % 2 === 1) {
          return chunk // ignore if code-block
        }
        return chunk.replace(/#([\d]+)/g, (str, issueNumber) => {
          return `[${str}](${issueUrlBase}${issueNumber})`
        })
      }).join('`')

      let log = ` - [${date}](${commitUrl}) ${linkedDescription} by ${normalizeCommiter}`
      logs.push(log)
    })
    process.stdout.write(logs.join('\n') + '\n')
    process.exit(0)
  })
})
