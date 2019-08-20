var minimist = require('minimist')
var getAbi = require('node-abi').getAbi
var detectLibc = require('detect-libc')
var napi = require('napi-build-utils')

var env = process.env

var libc = env.LIBC || (detectLibc.isNonGlibcLinux && detectLibc.family) || ''

// Get `prebuild-install` arguments that were passed to the `npm` command
if (env.npm_config_argv) {
  var npmargs = ['prebuild', 'compile', 'build-from-source', 'debug']
  try {
    var npmArgv = JSON.parse(env.npm_config_argv).cooked
    for (var i = 0; i < npmargs.length; ++i) {
      if (npmArgv.indexOf('--' + npmargs[i]) !== -1) {
        process.argv.push('--' + npmargs[i])
      }
      if (npmArgv.indexOf('--no-' + npmargs[i]) !== -1) {
        process.argv.push('--no-' + npmargs[i])
      }
    }
    if ((i = npmArgv.indexOf('--download')) !== -1) {
      process.argv.push(npmArgv[i], npmArgv[i + 1])
    }
  } catch (e) { }
}

// Get the configuration
module.exports = function (pkg) {
  var pkgConf = pkg.config || {}
  var sourceBuild = env.npm_config_build_from_source
  var buildFromSource = sourceBuild === pkg.name || sourceBuild === 'true'
  var rc = require('rc')('prebuild-install', {
    target: pkgConf.target || env.npm_config_target || process.versions.node,
    runtime: pkgConf.runtime || env.npm_config_runtime || 'node',
    arch: pkgConf.arch || env.npm_config_arch || process.arch,
    libc: libc,
    platform: env.npm_config_platform || process.platform,
    debug: false,
    force: false,
    verbose: false,
    prebuild: true,
    compile: buildFromSource,
    path: '.',
    proxy: env.npm_config_proxy || env['HTTP_PROXY'],
    'https-proxy': env.npm_config_https_proxy || env['HTTPS_PROXY'],
    'local-address': env.npm_config_local_address,
    'tag-prefix': 'v'
  }, minimist(process.argv, {
    alias: {
      target: 't',
      runtime: 'r',
      help: 'h',
      arch: 'a',
      path: 'p',
      version: 'v',
      download: 'd',
      'build-from-source': 'compile',
      compile: 'c',
      token: 'T'
    }
  }))

  if (rc.path === true) {
    delete rc.path
  }

  if (napi.isNapiRuntime(rc.runtime) && rc.target === process.versions.node) {
    rc.target = napi.getBestNapiBuildVersion()
  }

  rc.abi = napi.isNapiRuntime(rc.runtime) ? rc.target : getAbi(rc.target, rc.runtime)

  return rc
}

// Print the configuration values when executed standalone for testing purposses
if (!module.parent) {
  console.log(JSON.stringify(module.exports({}), null, 2))
}
