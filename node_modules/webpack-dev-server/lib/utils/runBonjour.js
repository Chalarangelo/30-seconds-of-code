'use strict';

function runBonjour({ port }) {
  const bonjour = require('bonjour')();

  bonjour.publish({
    name: 'Webpack Dev Server',
    port,
    type: 'http',
    subtypes: ['webpack'],
  });

  process.on('exit', () => {
    bonjour.unpublishAll(() => {
      bonjour.destroy();
    });
  });
}

module.exports = runBonjour;
