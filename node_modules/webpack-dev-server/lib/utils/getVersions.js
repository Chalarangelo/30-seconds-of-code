'use strict';

function getVersions() {
  return (
    `webpack-dev-server ${require('../../package.json').version}\n` +
    `webpack ${require('webpack/package.json').version}`
  );
}

module.exports = getVersions;
