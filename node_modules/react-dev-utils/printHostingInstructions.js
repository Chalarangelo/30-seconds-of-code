/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const chalk = require('chalk');
const url = require('url');
const globalModules = require('global-modules');
const fs = require('fs');

function printHostingInstructions(
  appPackage,
  publicUrl,
  publicPath,
  buildFolder,
  useYarn
) {
  const publicPathname = url.parse(publicPath).pathname;
  if (publicUrl && publicUrl.indexOf('.github.io/') !== -1) {
    // "homepage": "http://user.github.io/project"
    console.log(
      `The project was built assuming it is hosted at ${chalk.green(
        publicPathname
      )}.`
    );
    console.log(
      `You can control this with the ${chalk.green(
        'homepage'
      )} field in your ${chalk.cyan('package.json')}.`
    );
    console.log();
    console.log(`The ${chalk.cyan('build')} folder is ready to be deployed.`);
    console.log(`To publish it at ${chalk.green(publicUrl)}, run:`);
    // If script deploy has been added to package.json, skip the instructions
    if (typeof appPackage.scripts.deploy === 'undefined') {
      console.log();
      if (useYarn) {
        console.log(`  ${chalk.cyan('yarn')} add --dev gh-pages`);
      } else {
        console.log(`  ${chalk.cyan('npm')} install --save-dev gh-pages`);
      }
      console.log();
      console.log(
        `Add the following script in your ${chalk.cyan('package.json')}.`
      );
      console.log();
      console.log(`    ${chalk.dim('// ...')}`);
      console.log(`    ${chalk.yellow('"scripts"')}: {`);
      console.log(`      ${chalk.dim('// ...')}`);
      console.log(
        `      ${chalk.yellow('"predeploy"')}: ${chalk.yellow(
          '"npm run build",'
        )}`
      );
      console.log(
        `      ${chalk.yellow('"deploy"')}: ${chalk.yellow(
          '"gh-pages -d build"'
        )}`
      );
      console.log('    }');
      console.log();
      console.log('Then run:');
    }
    console.log();
    console.log(`  ${chalk.cyan(useYarn ? 'yarn' : 'npm')} run deploy`);
    console.log();
  } else if (publicPath !== '/') {
    // "homepage": "http://mywebsite.com/project"
    console.log(
      `The project was built assuming it is hosted at ${chalk.green(
        publicPath
      )}.`
    );
    console.log(
      `You can control this with the ${chalk.green(
        'homepage'
      )} field in your ${chalk.cyan('package.json')}.`
    );
    console.log();
    console.log(`The ${chalk.cyan('build')} folder is ready to be deployed.`);
    console.log();
  } else {
    if (publicUrl) {
      // "homepage": "http://mywebsite.com"
      console.log(
        `The project was built assuming it is hosted at ${chalk.green(
          publicUrl
        )}.`
      );
      console.log(
        `You can control this with the ${chalk.green(
          'homepage'
        )} field in your ${chalk.cyan('package.json')}.`
      );
      console.log();
    } else {
      // no homepage
      console.log(
        'The project was built assuming it is hosted at the server root.'
      );
      console.log(
        `To override this, specify the ${chalk.green(
          'homepage'
        )} in your ${chalk.cyan('package.json')}.`
      );
      console.log('For example, add this to build it for GitHub Pages:');
      console.log();
      console.log(
        `  ${chalk.green('"homepage"')} ${chalk.cyan(':')} ${chalk.green(
          '"http://myname.github.io/myapp"'
        )}${chalk.cyan(',')}`
      );
      console.log();
    }
    console.log(
      `The ${chalk.cyan(buildFolder)} folder is ready to be deployed.`
    );
    console.log('You may serve it with a static server:');
    console.log();
    if (!fs.existsSync(`${globalModules}/serve`)) {
      if (useYarn) {
        console.log(`  ${chalk.cyan('yarn')} global add serve`);
      } else {
        console.log(`  ${chalk.cyan('npm')} install -g serve`);
      }
    }
    console.log(`  ${chalk.cyan('serve')} -s ${buildFolder}`);
    console.log();
  }
}

module.exports = printHostingInstructions;
