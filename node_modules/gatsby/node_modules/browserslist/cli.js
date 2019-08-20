#!/usr/bin/env node

var fs = require('fs')

var browserslist = require('./')
var pkg = require('./package.json')
var args = process.argv.slice(2)

var USAGE = 'Usage:\n' +
            '  ' + pkg.name + '\n' +
            '  ' + pkg.name + ' "QUERIES"\n' +
            '  ' + pkg.name + ' --config="path/to/browserlist/file"\n' +
            '  ' + pkg.name + ' --coverage "QUERIES"\n' +
            '  ' + pkg.name + ' --coverage=US "QUERIES"\n' +
            '  ' + pkg.name + ' --env="environment name defined in config"\n' +
            '  ' + pkg.name + ' --stats="path/to/browserlist/stats/file"'

function isArg (arg) {
  return args.some(function (str) {
    return str === arg || str.indexOf(arg + '=') === 0
  })
}

function error (msg) {
  process.stderr.write(pkg.name + ': ' + msg + '\n')
  process.exit(1)
}

if (isArg('--help') || isArg('-h')) {
  process.stdout.write(pkg.description + '.\n\n' + USAGE + '\n')
} else if (isArg('--version') || isArg('-v')) {
  process.stdout.write(pkg.name + ' ' + pkg.version + '\n')
} else {
  var mode = 'browsers'
  var opts = { }
  var queries
  var country

  for (var i = 0; i < args.length; i++) {
    if (args[i][0] !== '-') {
      queries = args[i].replace(/^["']|["']$/g, '')
      continue
    }

    var arg = args[i].split('=')
    var name = arg[0]
    var value = arg[1]

    if (value) value = value.replace(/^["']|["']$/g, '')

    if (name === '--config' || name === '-b') {
      opts.config = value
    } else if (name === '--env' || name === '-e') {
      opts.env = value
    } else if (name === '--stats' || name === '-s') {
      opts.stats = value
    } else if (name === '--coverage' || name === '-c') {
      mode = 'coverage'
      if (value) country = value
    } else {
      error('Unknown arguments ' + args[i] + '.\n\n' + USAGE)
    }
  }

  var browsers
  try {
    if (!queries && !opts.config) {
      if (browserslist.findConfig(process.cwd())) {
        opts.path = process.cwd()
      } else {
        error(
          'Browserslist config was not found. ' +
          'Define queries or config path.' +
          '\n\n' + USAGE
        )
      }
    }
    browsers = browserslist(queries, opts)
  } catch (e) {
    if (e.name === 'BrowserslistError') {
      error(e.message)
    } else {
      throw e
    }
  }

  if (mode === 'browsers') {
    browsers.forEach(function (browser) {
      process.stdout.write(browser + '\n')
    })
  } else {
    var stats
    if (country) {
      stats = country
    } else if (opts.stats) {
      stats = JSON.parse(fs.readFileSync(opts.stats))
    }
    var result = browserslist.coverage(browsers, stats)
    var round = Math.round(result * 100) / 100.0

    var end = 'globally'
    if (country && country !== 'global') {
      end = 'in the ' + country.toUpperCase()
    } else if (opts.stats) {
      end = 'in custom statistics'
    }

    process.stdout.write(
      'These browsers account for ' + round + '% of all users ' +
            end + '\n')
  }
}
