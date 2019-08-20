
module.exports = exports = build

/**
 * Module dependencies.
 */

var fs = require('graceful-fs')
  , rm = require('rimraf')
  , path = require('path')
  , glob = require('glob')
  , log = require('npmlog')
  , which = require('which')
  , exec = require('child_process').exec
  , processRelease = require('./process-release')
  , win = process.platform === 'win32'

exports.usage = 'Invokes `' + (win ? 'msbuild' : 'make') + '` and builds the module'

function build (gyp, argv, callback) {
  var platformMake = 'make'
  if (process.platform === 'aix') {
    platformMake = 'gmake'
  } else if (process.platform.indexOf('bsd') !== -1) {
    platformMake = 'gmake'
  } else if (win && argv.length > 0) {
    argv = argv.map(function(target) {
      return '/t:' + target
    })
  }

  var release = processRelease(argv, gyp, process.version, process.release)
    , makeCommand = gyp.opts.make || process.env.MAKE || platformMake
    , command = win ? 'msbuild' : makeCommand
    , buildDir = path.resolve('build')
    , configPath = path.resolve(buildDir, 'config.gypi')
    , jobs = gyp.opts.jobs || process.env.JOBS
    , buildType
    , config
    , arch
    , nodeDir

  loadConfigGypi()

  /**
   * Load the "config.gypi" file that was generated during "configure".
   */

  function loadConfigGypi () {
    fs.readFile(configPath, 'utf8', function (err, data) {
      if (err) {
        if (err.code == 'ENOENT') {
          callback(new Error('You must run `node-gyp configure` first!'))
        } else {
          callback(err)
        }
        return
      }
      config = JSON.parse(data.replace(/\#.+\n/, ''))

      // get the 'arch', 'buildType', and 'nodeDir' vars from the config
      buildType = config.target_defaults.default_configuration
      arch = config.variables.target_arch
      nodeDir = config.variables.nodedir

      if ('debug' in gyp.opts) {
        buildType = gyp.opts.debug ? 'Debug' : 'Release'
      }
      if (!buildType) {
        buildType = 'Release'
      }

      log.verbose('build type', buildType)
      log.verbose('architecture', arch)
      log.verbose('node dev dir', nodeDir)

      if (win) {
        findSolutionFile()
      } else {
        doWhich()
      }
    })
  }

  /**
   * On Windows, find the first build/*.sln file.
   */

  function findSolutionFile () {
    glob('build/*.sln', function (err, files) {
      if (err) return callback(err)
      if (files.length === 0) {
        return callback(new Error('Could not find *.sln file. Did you run "configure"?'))
      }
      guessedSolution = files[0]
      log.verbose('found first Solution file', guessedSolution)
      doWhich()
    })
  }

  /**
   * Uses node-which to locate the msbuild / make executable.
   */

  function doWhich () {
    // First make sure we have the build command in the PATH
    which(command, function (err, execPath) {
      if (err) {
        if (win && /not found/.test(err.message)) {
          // On windows and no 'msbuild' found. Let's guess where it is
          findMsbuild()
        } else {
          // Some other error or 'make' not found on Unix, report that to the user
          callback(err)
        }
        return
      }
      log.verbose('`which` succeeded for `' + command + '`', execPath)
      doBuild()
    })
  }

  /**
   * Search for the location of "msbuild.exe" file on Windows.
   */

  function findMsbuild () {
    if (config.variables.msbuild_path) {
      command = config.variables.msbuild_path
      log.verbose('using MSBuild:', command)
      doBuild()
      return
    }

    log.verbose('could not find "msbuild.exe" in PATH - finding location in registry')
    var notfoundErr = 'Can\'t find "msbuild.exe". Do you have Microsoft Visual Studio C++ 2008+ installed?'
    var cmd = 'reg query "HKLM\\Software\\Microsoft\\MSBuild\\ToolsVersions" /s'
    if (process.arch !== 'ia32')
      cmd += ' /reg:32'
    exec(cmd, function (err, stdout, stderr) {
      if (err) {
        return callback(new Error(err.message + '\n' + notfoundErr))
      }
      var reVers = /ToolsVersions\\([^\\]+)$/i
        , rePath = /\r\n[ \t]+MSBuildToolsPath[ \t]+REG_SZ[ \t]+([^\r]+)/i
        , msbuilds = []
        , r
        , msbuildPath
      stdout.split('\r\n\r\n').forEach(function(l) {
        if (!l) return
        l = l.trim()
        if (r = reVers.exec(l.substring(0, l.indexOf('\r\n')))) {
          var ver = parseFloat(r[1], 10)
          if (ver >= 3.5) {
            if (r = rePath.exec(l)) {
              msbuilds.push({
                version: ver,
                path: r[1]
              })
            }
          }
        }
      })
      msbuilds.sort(function (x, y) {
        return (x.version < y.version ? -1 : 1)
      })
      ;(function verifyMsbuild () {
        if (!msbuilds.length) return callback(new Error(notfoundErr))
        msbuildPath = path.resolve(msbuilds.pop().path, 'msbuild.exe')
        fs.stat(msbuildPath, function (err, stat) {
          if (err) {
            if (err.code == 'ENOENT') {
              if (msbuilds.length) {
                return verifyMsbuild()
              } else {
                callback(new Error(notfoundErr))
              }
            } else {
              callback(err)
            }
            return
          }
          command = msbuildPath
          doBuild()
        })
      })()
    })
  }


  /**
   * Actually spawn the process and compile the module.
   */

  function doBuild () {

    // Enable Verbose build
    var verbose = log.levels[log.level] <= log.levels.verbose
    if (!win && verbose) {
      argv.push('V=1')
    }
    if (win && !verbose) {
      argv.push('/clp:Verbosity=minimal')
    }

    if (win) {
      // Turn off the Microsoft logo on Windows
      argv.push('/nologo')
    }

    // Specify the build type, Release by default
    if (win) {
      var archLower = arch.toLowerCase()
      var p = archLower === 'x64' ? 'x64' :
              (archLower === 'arm' ? 'ARM' : 'Win32')
      argv.push('/p:Configuration=' + buildType + ';Platform=' + p)
      if (jobs) {
        var j = parseInt(jobs, 10)
        if (!isNaN(j) && j > 0) {
          argv.push('/m:' + j)
        } else if (jobs.toUpperCase() === 'MAX') {
          argv.push('/m:' + require('os').cpus().length)
        }
      }
    } else {
      argv.push('BUILDTYPE=' + buildType)
      // Invoke the Makefile in the 'build' dir.
      argv.push('-C')
      argv.push('build')
      if (jobs) {
        var j = parseInt(jobs, 10)
        if (!isNaN(j) && j > 0) {
          argv.push('--jobs')
          argv.push(j)
        } else if (jobs.toUpperCase() === 'MAX') {
          argv.push('--jobs')
          argv.push(require('os').cpus().length)
        }
      }
    }

    if (win) {
      // did the user specify their own .sln file?
      var hasSln = argv.some(function (arg) {
        return path.extname(arg) == '.sln'
      })
      if (!hasSln) {
        argv.unshift(gyp.opts.solution || guessedSolution)
      }
    }

    var proc = gyp.spawn(command, argv)
    proc.on('exit', onExit)
  }

  /**
   * Invoked after the make/msbuild command exits.
   */

  function onExit (code, signal) {
    if (code !== 0) {
      return callback(new Error('`' + command + '` failed with exit code: ' + code))
    }
    if (signal) {
      return callback(new Error('`' + command + '` got signal: ' + signal))
    }
    callback()
  }

}
