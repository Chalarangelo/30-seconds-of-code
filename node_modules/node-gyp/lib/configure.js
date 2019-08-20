module.exports = exports = configure
module.exports.test = {
  PythonFinder: PythonFinder,
  findAccessibleSync: findAccessibleSync,
  findPython: findPython,
}

/**
 * Module dependencies.
 */

var fs = require('graceful-fs')
  , path = require('path')
  , log = require('npmlog')
  , osenv = require('osenv')
  , which = require('which')
  , semver = require('semver')
  , mkdirp = require('mkdirp')
  , cp = require('child_process')
  , extend = require('util')._extend
  , processRelease = require('./process-release')
  , win = process.platform === 'win32'
  , findNodeDirectory = require('./find-node-directory')
  , msgFormat = require('util').format
if (win)
  var findVS2017 = require('./find-vs2017')

exports.usage = 'Generates ' + (win ? 'MSVC project files' : 'a Makefile') + ' for the current module'

function configure (gyp, argv, callback) {

  var python = gyp.opts.python || process.env.PYTHON || 'python2'
    , buildDir = path.resolve('build')
    , configNames = [ 'config.gypi', 'common.gypi' ]
    , configs = []
    , nodeDir
    , release = processRelease(argv, gyp, process.version, process.release)

  findPython(python, function (err, found) {
    if (err) {
      callback(err)
    } else {
      python = found
      getNodeDir()
    }
  })

  function getNodeDir () {

    // 'python' should be set by now
    process.env.PYTHON = python

    if (gyp.opts.nodedir) {
      // --nodedir was specified. use that for the dev files
      nodeDir = gyp.opts.nodedir.replace(/^~/, osenv.home())

      log.verbose('get node dir', 'compiling against specified --nodedir dev files: %s', nodeDir)
      createBuildDir()

    } else {
      // if no --nodedir specified, ensure node dependencies are installed
      if ('v' + release.version !== process.version) {
        // if --target was given, then determine a target version to compile for
        log.verbose('get node dir', 'compiling against --target node version: %s', release.version)
      } else {
        // if no --target was specified then use the current host node version
        log.verbose('get node dir', 'no --target version specified, falling back to host node version: %s', release.version)
      }

      if (!release.semver) {
        // could not parse the version string with semver
        return callback(new Error('Invalid version number: ' + release.version))
      }

      // If the tarball option is set, always remove and reinstall the headers
      // into devdir. Otherwise only install if they're not already there.
      gyp.opts.ensure = gyp.opts.tarball ? false : true

      gyp.commands.install([ release.version ], function (err, version) {
        if (err) return callback(err)
        log.verbose('get node dir', 'target node version installed:', release.versionDir)
        nodeDir = path.resolve(gyp.devDir, release.versionDir)
        createBuildDir()
      })
    }
  }

  function createBuildDir () {
    log.verbose('build dir', 'attempting to create "build" dir: %s', buildDir)
    mkdirp(buildDir, function (err, isNew) {
      if (err) return callback(err)
      log.verbose('build dir', '"build" dir needed to be created?', isNew)
      if (win && (!gyp.opts.msvs_version || gyp.opts.msvs_version === '2017')) {
        findVS2017(function (err, vsSetup) {
          if (err) {
            log.verbose('Not using VS2017:', err.message)
            createConfigFile()
          } else {
            createConfigFile(null, vsSetup)
          }
        })
      } else {
        createConfigFile()
      }
    })
  }

  function createConfigFile (err, vsSetup) {
    if (err) return callback(err)

    var configFilename = 'config.gypi'
    var configPath = path.resolve(buildDir, configFilename)

    log.verbose('build/' + configFilename, 'creating config file')

    var config = process.config || {}
      , defaults = config.target_defaults
      , variables = config.variables

    // default "config.variables"
    if (!variables) variables = config.variables = {}

    // default "config.defaults"
    if (!defaults) defaults = config.target_defaults = {}

    // don't inherit the "defaults" from node's `process.config` object.
    // doing so could cause problems in cases where the `node` executable was
    // compiled on a different machine (with different lib/include paths) than
    // the machine where the addon is being built to
    defaults.cflags = []
    defaults.defines = []
    defaults.include_dirs = []
    defaults.libraries = []

    // set the default_configuration prop
    if ('debug' in gyp.opts) {
      defaults.default_configuration = gyp.opts.debug ? 'Debug' : 'Release'
    }
    if (!defaults.default_configuration) {
      defaults.default_configuration = 'Release'
    }

    // set the target_arch variable
    variables.target_arch = gyp.opts.arch || process.arch || 'ia32'

    // set the node development directory
    variables.nodedir = nodeDir

    // disable -T "thin" static archives by default
    variables.standalone_static_library = gyp.opts.thin ? 0 : 1

    if (vsSetup) {
      // GYP doesn't (yet) have support for VS2017, so we force it to VS2015
      // to avoid pulling a floating patch that has not landed upstream.
      // Ref: https://chromium-review.googlesource.com/#/c/433540/
      gyp.opts.msvs_version = '2015'
      process.env['GYP_MSVS_VERSION'] = 2015
      process.env['GYP_MSVS_OVERRIDE_PATH'] = vsSetup.path
      defaults['msbuild_toolset'] = 'v141'
      defaults['msvs_windows_target_platform_version'] = vsSetup.sdk
      variables['msbuild_path'] = path.join(vsSetup.path, 'MSBuild', '15.0',
                                            'Bin', 'MSBuild.exe')
    }

    // loop through the rest of the opts and add the unknown ones as variables.
    // this allows for module-specific configure flags like:
    //
    //   $ node-gyp configure --shared-libxml2
    Object.keys(gyp.opts).forEach(function (opt) {
      if (opt === 'argv') return
      if (opt in gyp.configDefs) return
      variables[opt.replace(/-/g, '_')] = gyp.opts[opt]
    })

    // ensures that any boolean values from `process.config` get stringified
    function boolsToString (k, v) {
      if (typeof v === 'boolean')
        return String(v)
      return v
    }

    log.silly('build/' + configFilename, config)

    // now write out the config.gypi file to the build/ dir
    var prefix = '# Do not edit. File was generated by node-gyp\'s "configure" step'
      , json = JSON.stringify(config, boolsToString, 2)
    log.verbose('build/' + configFilename, 'writing out config file: %s', configPath)
    configs.push(configPath)
    fs.writeFile(configPath, [prefix, json, ''].join('\n'), findConfigs)
  }

  function findConfigs (err) {
    if (err) return callback(err)
    var name = configNames.shift()
    if (!name) return runGyp()
    var fullPath = path.resolve(name)
    log.verbose(name, 'checking for gypi file: %s', fullPath)
    fs.stat(fullPath, function (err, stat) {
      if (err) {
        if (err.code == 'ENOENT') {
          findConfigs() // check next gypi filename
        } else {
          callback(err)
        }
      } else {
        log.verbose(name, 'found gypi file')
        configs.push(fullPath)
        findConfigs()
      }
    })
  }

  function runGyp (err) {
    if (err) return callback(err)

    if (!~argv.indexOf('-f') && !~argv.indexOf('--format')) {
      if (win) {
        log.verbose('gyp', 'gyp format was not specified; forcing "msvs"')
        // force the 'make' target for non-Windows
        argv.push('-f', 'msvs')
      } else {
        log.verbose('gyp', 'gyp format was not specified; forcing "make"')
        // force the 'make' target for non-Windows
        argv.push('-f', 'make')
      }
    }

    function hasMsvsVersion () {
      return argv.some(function (arg) {
        return arg.indexOf('msvs_version') === 0
      })
    }

    if (win && !hasMsvsVersion()) {
      if ('msvs_version' in gyp.opts) {
        argv.push('-G', 'msvs_version=' + gyp.opts.msvs_version)
      } else {
        argv.push('-G', 'msvs_version=auto')
      }
    }

    // include all the ".gypi" files that were found
    configs.forEach(function (config) {
      argv.push('-I', config)
    })

    // For AIX and z/OS we need to set up the path to the exports file
    // which contains the symbols needed for linking. 
    var node_exp_file = undefined
    if (process.platform === 'aix' || process.platform === 'os390') {
      var ext = process.platform === 'aix' ? 'exp' : 'x'
      var node_root_dir = findNodeDirectory()
      var candidates = undefined 
      if (process.platform === 'aix') {
        candidates = ['include/node/node',
                      'out/Release/node',
                      'out/Debug/node',
                      'node'
                     ].map(function(file) {
                       return file + '.' + ext
                     })
      } else {
        candidates = ['out/Release/obj.target/libnode',
                      'out/Debug/obj.target/libnode',
                      'lib/libnode'
                     ].map(function(file) {
                       return file + '.' + ext
                     })
      }
      var logprefix = 'find exports file'
      node_exp_file = findAccessibleSync(logprefix, node_root_dir, candidates)
      if (node_exp_file !== undefined) {
        log.verbose(logprefix, 'Found exports file: %s', node_exp_file)
      } else {
        var msg = msgFormat('Could not find node.%s file in %s', ext, node_root_dir)
        log.error(logprefix, 'Could not find exports file')
        return callback(new Error(msg))
      }
    }

    // this logic ported from the old `gyp_addon` python file
    var gyp_script = path.resolve(__dirname, '..', 'gyp', 'gyp_main.py')
    var addon_gypi = path.resolve(__dirname, '..', 'addon.gypi')
    var common_gypi = path.resolve(nodeDir, 'include/node/common.gypi')
    fs.stat(common_gypi, function (err, stat) {
      if (err)
        common_gypi = path.resolve(nodeDir, 'common.gypi')

      var output_dir = 'build'
      if (win) {
        // Windows expects an absolute path
        output_dir = buildDir
      }
      var nodeGypDir = path.resolve(__dirname, '..')
      var nodeLibFile = path.join(nodeDir,
        !gyp.opts.nodedir ? '<(target_arch)' : '$(Configuration)',
        release.name + '.lib')

      argv.push('-I', addon_gypi)
      argv.push('-I', common_gypi)
      argv.push('-Dlibrary=shared_library')
      argv.push('-Dvisibility=default')
      argv.push('-Dnode_root_dir=' + nodeDir)
      if (process.platform === 'aix' || process.platform === 'os390') {
        argv.push('-Dnode_exp_file=' + node_exp_file)
      }
      argv.push('-Dnode_gyp_dir=' + nodeGypDir)
      argv.push('-Dnode_lib_file=' + nodeLibFile)
      argv.push('-Dmodule_root_dir=' + process.cwd())
      argv.push('-Dnode_engine=' +
        (gyp.opts.node_engine || process.jsEngine || 'v8'))
      argv.push('--depth=.')
      argv.push('--no-parallel')

      // tell gyp to write the Makefile/Solution files into output_dir
      argv.push('--generator-output', output_dir)

      // tell make to write its output into the same dir
      argv.push('-Goutput_dir=.')

      // enforce use of the "binding.gyp" file
      argv.unshift('binding.gyp')

      // execute `gyp` from the current target nodedir
      argv.unshift(gyp_script)

      // make sure python uses files that came with this particular node package
      var pypath = [path.join(__dirname, '..', 'gyp', 'pylib')]
      if (process.env.PYTHONPATH) {
        pypath.push(process.env.PYTHONPATH)
      }
      process.env.PYTHONPATH = pypath.join(win ? ';' : ':')

      var cp = gyp.spawn(python, argv)
      cp.on('exit', onCpExit)
    })
  }

  /**
   * Called when the `gyp` child process exits.
   */

  function onCpExit (code, signal) {
    if (code !== 0) {
      callback(new Error('`gyp` failed with exit code: ' + code))
    } else {
      // we're done
      callback()
    }
  }

}

/**
 * Returns the first file or directory from an array of candidates that is
 * readable by the current user, or undefined if none of the candidates are
 * readable.
 */
function findAccessibleSync (logprefix, dir, candidates) {
  for (var next = 0; next < candidates.length; next++) {
     var candidate = path.resolve(dir, candidates[next])
     try {
       var fd = fs.openSync(candidate, 'r')
     } catch (e) {
       // this candidate was not found or not readable, do nothing
       log.silly(logprefix, 'Could not open %s: %s', candidate, e.message)
       continue
     }
     fs.closeSync(fd)
     log.silly(logprefix, 'Found readable %s', candidate)
     return candidate
  }

  return undefined
}

function PythonFinder(python, callback) {
  this.callback = callback
  this.python = python
}

PythonFinder.prototype = {
  checkPythonLauncherDepth: 0,
  env: process.env,
  execFile: cp.execFile,
  log: log,
  resolve: path.win32 && path.win32.resolve || path.resolve,
  stat: fs.stat,
  which: which,
  win: win,

  checkPython: function checkPython () {
    this.log.verbose('check python',
                     'checking for Python executable "%s" in the PATH',
                     this.python)
    this.which(this.python, function (err, execPath) {
      if (err) {
        this.log.verbose('`which` failed', this.python, err)
        if (this.python === 'python2') {
          this.python = 'python'
          return this.checkPython()
        }
        if (this.win) {
          this.checkPythonLauncher()
        } else {
          this.failNoPython()
        }
      } else {
        this.log.verbose('`which` succeeded', this.python, execPath)
        // Found the `python` executable, and from now on we use it explicitly.
        // This solves #667 and #750 (`execFile` won't run batch files
        // (*.cmd, and *.bat))
        this.python = execPath
        this.checkPythonVersion()
      }
    }.bind(this))
  },

  // Distributions of Python on Windows by default install with the "py.exe"
  // Python launcher which is more likely to exist than the Python executable
  // being in the $PATH.
  // Because the Python launcher supports all versions of Python, we have to
  // explicitly request a Python 2 version. This is done by supplying "-2" as
  // the first command line argument. Since "py.exe -2" would be an invalid
  // executable for "execFile", we have to use the launcher to figure out
  // where the actual "python.exe" executable is located.
  checkPythonLauncher: function checkPythonLauncher () {
    this.checkPythonLauncherDepth += 1

    this.log.verbose(
        'could not find "' + this.python + '". checking python launcher')
    var env = extend({}, this.env)
    env.TERM = 'dumb'

    var launcherArgs = ['-2', '-c', 'import sys; print sys.executable']
    this.execFile('py.exe', launcherArgs, { env: env }, function (err, stdout) {
      if (err) {
        this.guessPython()
      } else {
        this.python = stdout.trim()
        this.log.verbose('check python launcher',
                         'python executable found: %j',
                         this.python)
        this.checkPythonVersion()
      }
      this.checkPythonLauncherDepth -= 1
    }.bind(this))
  },

  checkPythonVersion: function checkPythonVersion () {
    var args = ['-c', 'import sys; print "%s.%s.%s" % sys.version_info[:3];']
    var env = extend({}, this.env)
    env.TERM = 'dumb'

    this.execFile(this.python, args, { env: env }, function (err, stdout) {
      if (err) {
        return this.callback(err)
      }
      this.log.verbose('check python version',
                       '`%s -c "' + args[1] + '"` returned: %j',
                       this.python, stdout)
      var version = stdout.trim()
      var range = semver.Range('>=2.5.0 <3.0.0')
      var valid = false
      try {
        valid = range.test(version)
      } catch (e) {
        this.log.silly('range.test() error', e)
      }
      if (valid) {
        this.callback(null, this.python)
      } else if (this.win && this.checkPythonLauncherDepth === 0) {
        this.checkPythonLauncher()
      } else {
        this.failPythonVersion(version)
      }
    }.bind(this))
  },

  failNoPython: function failNoPython () {
    var errmsg =
        'Can\'t find Python executable "' + this.python +
        '", you can set the PYTHON env variable.'
    this.callback(new Error(errmsg))
  },

  failPythonVersion: function failPythonVersion (badVersion) {
    var errmsg =
        'Python executable "' + this.python +
        '" is v' + badVersion + ', which is not supported by gyp.\n' +
        'You can pass the --python switch to point to ' +
        'Python >= v2.5.0 & < 3.0.0.'
    this.callback(new Error(errmsg))
  },

  // Called on Windows when "python" isn't available in the current $PATH.
  // We are going to check if "%SystemDrive%\python27\python.exe" exists.
  guessPython: function guessPython () {
    this.log.verbose('could not find "' + this.python + '". guessing location')
    var rootDir = this.env.SystemDrive || 'C:\\'
    if (rootDir[rootDir.length - 1] !== '\\') {
      rootDir += '\\'
    }
    var pythonPath = this.resolve(rootDir, 'Python27', 'python.exe')
    this.log.verbose('ensuring that file exists:', pythonPath)
    this.stat(pythonPath, function (err, stat) {
      if (err) {
        if (err.code == 'ENOENT') {
          this.failNoPython()
        } else {
          this.callback(err)
        }
        return
      }
      this.python = pythonPath
      this.checkPythonVersion()
    }.bind(this))
  },
}

function findPython (python, callback) {
  var finder = new PythonFinder(python, callback)
  finder.checkPython()
}
