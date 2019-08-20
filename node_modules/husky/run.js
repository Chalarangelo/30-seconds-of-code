const pleaseUpgradeNode = require('please-upgrade-node')
const pkg = require('./package.json')

// Node version isn't supported, skip
pleaseUpgradeNode(pkg, {
  message: function(requiredVersion) {
    return 'Husky requires Node ' + requiredVersion + ', can\'t run Git hook.'
  }
})

// Node version is supported, continue
require('./lib/runner/bin')
