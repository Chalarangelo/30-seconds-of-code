#!/usr/bin/env node

var cp = require('child_process')
var fs = require('fs')
var path = require('path')

var shouldRunBrowserTests = !process.env.TRAVIS_PULL_REQUEST ||
  process.env.TRAVIS_PULL_REQUEST === 'false'

var node = cp.spawn('npm', ['run', 'test-node'], { stdio: 'inherit' })
node.on('close', function (code) {
  if (code === 0 && shouldRunBrowserTests) {
    runBrowserTests()
  } else {
    process.exit(code)
  }
})

function runBrowserTests () {
  var zuulYmlPath = path.join(__dirname, '..', '.zuul.yml')

  writeES5ZuulYml()
  cp.spawn('npm', ['run', 'test-browser-es5'], { stdio: 'inherit' })
    .on('close', function (code) {
      if (code !== 0) process.exit(code)
      writeES6ZuulYml()
      cp.spawn('npm', ['run', 'test-browser-es6'], { stdio: 'inherit' })
        .on('close', function (code) {
          process.exit(code)
        })
    })

  function writeES5ZuulYml () {
    fs.writeFileSync(zuulYmlPath, fs.readFileSync(path.join(__dirname, 'zuul-es5.yml')))
  }

  function writeES6ZuulYml () {
    fs.writeFileSync(zuulYmlPath, fs.readFileSync(path.join(__dirname, 'zuul-es6.yml')))
  }
}

