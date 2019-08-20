"use strict";

const detectPort = require(`detect-port`);

const report = require(`gatsby-cli/lib/reporter`);

const readlinePort = (port, rlInterface) => {
  const question = `Something is already running at port ${port} \nWould you like to run the app at another port instead? [Y/n] `;
  return new Promise(resolve => {
    rlInterface.question(question, answer => {
      resolve(answer.length === 0 || answer.match(/^yes|y$/i));
    });
  });
};

const detectPortInUseAndPrompt = async (port, rlInterface) => {
  let foundPort = port;
  const detectedPort = await detectPort(port).catch(err => report.panic(err));

  if (port !== detectedPort) {
    if (await readlinePort(port, rlInterface)) {
      foundPort = detectedPort;
    }
  }

  return foundPort;
};

module.exports = detectPortInUseAndPrompt;
//# sourceMappingURL=detect-port-in-use-and-prompt.js.map