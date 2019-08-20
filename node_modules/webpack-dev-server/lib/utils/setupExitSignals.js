'use strict';

const signals = ['SIGINT', 'SIGTERM'];

function setupExitSignals(serverData) {
  signals.forEach((signal) => {
    process.on(signal, () => {
      if (serverData.server) {
        serverData.server.close(() => {
          // eslint-disable-next-line no-process-exit
          process.exit();
        });
      } else {
        // eslint-disable-next-line no-process-exit
        process.exit();
      }
    });
  });
}

module.exports = setupExitSignals;
