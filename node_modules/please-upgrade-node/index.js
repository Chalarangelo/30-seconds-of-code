var semverCompare = require('semver-compare')

module.exports = function pleaseUpgradeNode(pkg, opts) {
  var opts = opts || {}
  var requiredVersion = pkg.engines.node.replace('>=', '')
  var currentVersion = process.version.replace('v', '')
  if (semverCompare(currentVersion, requiredVersion) === -1) {
    if (opts.message) {
      console.error(opts.message(requiredVersion))
    } else {
      console.error(
        pkg.name +
          ' requires at least version ' +
          requiredVersion +
          ' of Node, please upgrade'
      )
    }

    if (opts.hasOwnProperty('exitCode')) {
      process.exit(opts.exitCode)
    } else {
      process.exit(1)
    }
  }
}
