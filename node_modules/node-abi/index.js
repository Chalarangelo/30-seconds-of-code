var semver = require('semver')

function getNextTarget (runtime, targets) {
  if (targets == null) targets = allTargets
  var latest = targets.filter(function (t) { return t.runtime === runtime }).slice(-1)[0]
  var increment = runtime === 'electron' ? 'minor' : 'major'
  return semver.inc(latest.target, increment)
}

function getAbi (target, runtime) {
  if (target === String(Number(target))) return target
  if (target) target = target.replace(/^v/, '')
  if (!runtime) runtime = 'node'

  if (runtime === 'node') {
    if (!target) return process.versions.modules
    if (target === process.versions.node) return process.versions.modules
  }

  var abi

  for (var i = 0; i < allTargets.length; i++) {
    var t = allTargets[i]
    if (t.runtime !== runtime) continue
    if (semver.lte(t.target, target)) abi = t.abi
    else break
  }

  if (abi && semver.lt(target, getNextTarget(runtime))) return abi
  throw new Error('Could not detect abi for version ' + target + ' and runtime ' + runtime + '.  Updating "node-abi" might help solve this issue if it is a new release of ' + runtime)
}

function getTarget (abi, runtime) {
  if (abi && abi !== String(Number(abi))) return abi
  if (!runtime) runtime = 'node'

  if (runtime === 'node' && !abi) return process.versions.node

  var match = allTargets
    .filter(function (t) {
      return t.abi === abi && t.runtime === runtime
    })
    .map(function (t) {
      return t.target
    })
  if (match.length) return match[0]

  throw new Error('Could not detect target for abi ' + abi + ' and runtime ' + runtime)
}

var supportedTargets = [
  {runtime: 'node', target: '5.0.0', abi: '47', lts: false},
  {runtime: 'node', target: '6.0.0', abi: '48', lts: false},
  {runtime: 'node', target: '7.0.0', abi: '51', lts: false},
  {runtime: 'node', target: '8.0.0', abi: '57', lts: new Date() < new Date(2019, 4, 31)},
  {runtime: 'node', target: '9.0.0', abi: '59', lts: false},
  {runtime: 'node', target: '10.0.0', abi: '64', lts: new Date(2018, 10, 1) < new Date() && new Date() < new Date(2020, 4, 31)},
  {runtime: 'node', target: '11.0.0', abi: '67', lts: false},
  {runtime: 'node', target: '12.0.0', abi: '72', lts: false},
  {runtime: 'electron', target: '0.36.0', abi: '47', lts: false},
  {runtime: 'electron', target: '1.1.0', abi: '48', lts: false},
  {runtime: 'electron', target: '1.3.0', abi: '49', lts: false},
  {runtime: 'electron', target: '1.4.0', abi: '50', lts: false},
  {runtime: 'electron', target: '1.5.0', abi: '51', lts: false},
  {runtime: 'electron', target: '1.6.0', abi: '53', lts: false},
  {runtime: 'electron', target: '1.7.0', abi: '54', lts: false},
  {runtime: 'electron', target: '1.8.0', abi: '57', lts: false},
  {runtime: 'electron', target: '2.0.0', abi: '57', lts: false},
  {runtime: 'electron', target: '3.0.0', abi: '64', lts: false},
  {runtime: 'electron', target: '4.0.0', abi: '64', lts: false},
  {runtime: 'electron', target: '4.0.4', abi: '69', lts: false},
  {runtime: 'electron', target: '5.0.0', abi: '70', lts: false},
  {runtime: 'electron', target: '6.0.0', abi: '73', lts: false}
]

var additionalTargets = [
  {runtime: 'node-webkit', target: '0.13.0', abi: '47', lts: false},
  {runtime: 'node-webkit', target: '0.15.0', abi: '48', lts: false},
  {runtime: 'node-webkit', target: '0.18.3', abi: '51', lts: false},
  {runtime: 'node-webkit', target: '0.23.0', abi: '57', lts: false},
  {runtime: 'node-webkit', target: '0.26.5', abi: '59', lts: false}
]

var deprecatedTargets = [
  {runtime: 'node', target: '0.2.0', abi: '1', lts: false},
  {runtime: 'node', target: '0.9.1', abi: '0x000A', lts: false},
  {runtime: 'node', target: '0.9.9', abi: '0x000B', lts: false},
  {runtime: 'node', target: '0.10.4', abi: '11', lts: false},
  {runtime: 'node', target: '0.11.0', abi: '0x000C', lts: false},
  {runtime: 'node', target: '0.11.8', abi: '13', lts: false},
  {runtime: 'node', target: '0.11.11', abi: '14', lts: false},
  {runtime: 'node', target: '1.0.0', abi: '42', lts: false},
  {runtime: 'node', target: '1.1.0', abi: '43', lts: false},
  {runtime: 'node', target: '2.0.0', abi: '44', lts: false},
  {runtime: 'node', target: '3.0.0', abi: '45', lts: false},
  {runtime: 'node', target: '4.0.0', abi: '46', lts: false},
  {runtime: 'electron', target: '0.30.0', abi: '44', lts: false},
  {runtime: 'electron', target: '0.31.0', abi: '45', lts: false},
  {runtime: 'electron', target: '0.33.0', abi: '46', lts: false}
]

var futureTargets = [
  {runtime: 'electron', target: '7.0.0-beta.0', abi: '75', lts: false}
]

var allTargets = deprecatedTargets
  .concat(supportedTargets)
  .concat(additionalTargets)
  .concat(futureTargets)

exports.getAbi = getAbi
exports.getTarget = getTarget
exports.deprecatedTargets = deprecatedTargets
exports.supportedTargets = supportedTargets
exports.additionalTargets = additionalTargets
exports.futureTargets = futureTargets
exports.allTargets = allTargets
exports._getNextTarget = getNextTarget
