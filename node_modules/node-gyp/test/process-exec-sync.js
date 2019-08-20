'use strict'

var fs = require('graceful-fs')
var child_process = require('child_process')

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(search, pos) {
    return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search
  }
}

function processExecSync(file, args, options) {
  var child, error, timeout, tmpdir, command, quote
  command = makeCommand(file, args)

  /*
    this function emulates child_process.execSync for legacy node <= 0.10.x
    derived from https://github.com/gvarsanyi/sync-exec/blob/master/js/sync-exec.js
  */

  options = options || {}
  // init timeout
  timeout = Date.now() + options.timeout
  // init tmpdir
  var os_temp_base = '/tmp'
  var os = determine_os()
  os_temp_base = '/tmp'

  if (process.env.TMP) {
    os_temp_base = process.env.TMP
  }

  if (os_temp_base[os_temp_base.length - 1] !== '/') {
    os_temp_base += '/'
  }

  tmpdir = os_temp_base + 'processExecSync.' + Date.now() + Math.random()
  fs.mkdirSync(tmpdir)

  // init command
  if (os === 'linux') {
    command = '(' + command + ' > ' + tmpdir + '/stdout 2> ' + tmpdir +
      '/stderr); echo $? > ' + tmpdir + '/status'
  } else {
    command = '(' + command + ' > ' + tmpdir + '/stdout 2> ' + tmpdir +
      '/stderr) | echo %errorlevel% > ' + tmpdir + '/status | exit'
  }

  // init child
  child = child_process.exec(command, options)

  var maxTry = 100000 // increases the test time by 6 seconds on win-2016-node-0.10
  var tryCount = 0
  while (tryCount < maxTry) {
    try {
      var x = fs.readFileSync(tmpdir + '/status')
      if (x.toString() === '0') {
        break
      }
    } catch (ignore) {}
    tryCount++
    if (Date.now() > timeout) {
      error = child
      break
    }
  }

  ['stdout', 'stderr', 'status'].forEach(function (file) {
    child[file] = fs.readFileSync(tmpdir + '/' + file, options.encoding)
    setTimeout(unlinkFile, 500, tmpdir + '/' + file)
  })

  child.status = Number(child.status)
  if (child.status !== 0) {
    error = child
  }

  try {
    fs.rmdirSync(tmpdir)
  } catch (ignore) {}
  if (error) {
    throw error
  }
  return child.stdout
}

function makeCommand(file, args) {
  var command, quote
  command = file
  if (args.length > 0) {
    for(var i in args) {
      command = command + ' '
      if (args[i][0] === '-') {
        command = command + args[i]
      } else {
        if (!quote) {
          command = command + '\"'
          quote = true
        }
        command = command + args[i]
        if (quote) {
          if (args.length === (parseInt(i) + 1)) {
            command = command + '\"'
          }
        }
      }
    }
  }
  return command
}

function determine_os() {
  var os = ''
  var tmpVar = ''
  if (process.env.OSTYPE) {
    tmpVar = process.env.OSTYPE
  } else  if (process.env.OS) {
    tmpVar = process.env.OS
  } else {
    //default is linux
    tmpVar = 'linux'
  }

  if (tmpVar.startsWith('linux')) {
    os = 'linux'
  }
  if (tmpVar.startsWith('win')) {
    os = 'win'
  }

  return os
}

function unlinkFile(file) {
  fs.unlinkSync(file)
}

module.exports = processExecSync
