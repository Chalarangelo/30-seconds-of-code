#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('../');

program
  .version('0.0.1')
  .option('-s, --sessions', 'add session support')
  .option('-t, --template <engine>', 'specify template engine (jade|ejs) [jade]', 'jade')
  .option('-c, --css <engine>', 'specify stylesheet engine (stylus|sass|less) [css]', 'css')
  .parse(process.argv);

console.log(' - sessions %j', program.sessions);
console.log(' - template %j', program.template);
console.log(' - css %j', program.css);