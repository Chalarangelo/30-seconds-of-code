#!/usr/bin/env node

var path = require('path')
var fs = require('fs')
var whichPmRuns = require('which-pm-runs')
var napi = require('napi-build-utils')

var pkg = require(path.resolve('package.json'))
var rc = require('./rc')(pkg)
var log = require('./log')(rc, process.env)
var download = require('./download')
var asset = require('./asset')
var util = require('./util')

var prebuildClientVersion = require('./package.json').version
if (rc.version) {
  console.log(prebuildClientVersion)
  process.exit(0)
}

if (rc.path) process.chdir(rc.path)

if (rc.runtime === 'electron' && rc.target[0] === '4' && rc.abi === '64') {
  log.error(`Electron version ${rc.target} found - skipping prebuild-install work due to known ABI issue`)
  log.error('More information about this issue can be found at https://github.com/lgeiger/node-abi/issues/54')
  process.exit(1)
}

if (!fs.existsSync('package.json')) {
  log.error('setup', 'No package.json found. Aborting...')
  process.exit(1)
}

if (rc.help) {
  console.error(fs.readFileSync(path.join(__dirname, 'help.txt'), 'utf-8'))
  process.exit(0)
}

log.info('begin', 'Prebuild-install version', prebuildClientVersion)

var opts = Object.assign({}, rc, {pkg: pkg, log: log})

if (napi.isNapiRuntime(rc.runtime)) napi.logUnsupportedVersion(rc.target, log)

var pm = whichPmRuns()
var isNpm = !pm || pm.name === 'npm'

if (!isNpm && /node_modules/.test(process.cwd())) {
  // From yarn repository
} else if (opts.force) {
  log.warn('install', 'prebuilt binaries enforced with --force!')
  log.warn('install', 'prebuilt binaries may be out of date!')
} else if (!(typeof pkg._from === 'string')) {
  log.info('install', 'installing standalone, skipping download.')
  process.exit(1)
} else if (pkg._from.length > 4 && pkg._from.substr(0, 4) === 'git+') {
  log.info('install', 'installing from git repository, skipping download.')
  process.exit(1)
} else if (opts.compile === true || opts.prebuild === false) {
  log.info('install', '--build-from-source specified, not attempting download.')
  process.exit(1)
}

var startDownload = function (downloadUrl) {
  download(downloadUrl, opts, function (err) {
    if (err) {
      log.warn('install', err.message)
      return process.exit(1)
    }
    log.info('install', 'Successfully installed prebuilt binary!')
  })
}

if (opts.token) {
  asset(opts, function (err, assetId) {
    if (err) {
      log.warn('install', err.message)
      return process.exit(1)
    }

    startDownload(util.getAssetUrl(opts, assetId))
  })
} else {
  startDownload(util.getDownloadUrl(opts))
}
