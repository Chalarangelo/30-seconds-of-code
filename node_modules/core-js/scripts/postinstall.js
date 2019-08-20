/* eslint-disable max-len */
var env = process.env;
var ADBLOCK = is(env.ADBLOCK);
var CI = is(env.CI);
var COLOR = is(env.npm_config_color);
var SILENT = !!~['silent', 'error', 'warn'].indexOf(env.npm_config_loglevel);

function is(it) {
  return !!it && it !== '0' && it !== 'false';
}

function log(it) {
  // eslint-disable-next-line no-console,no-control-regex
  console.log(COLOR ? it : it.replace(/\u001B\[\d+m/g, ''));
}

if (!ADBLOCK && !CI && !SILENT) {
  log('\u001B[96mThank you for using core-js (\u001B[94m https://github.com/zloirock/core-js \u001B[96m) for polyfilling JavaScript standard library!\u001B[0m\n');
  log('\u001B[96mThe project needs your help! Please consider supporting of core-js on Open Collective or Patreon: \u001B[0m');
  log('\u001B[96m>\u001B[94m https://opencollective.com/core-js \u001B[0m');
  log('\u001B[96m>\u001B[94m https://www.patreon.com/zloirock \u001B[0m\n');
  log('\u001B[96mAlso, the author of core-js (\u001B[94m https://github.com/zloirock \u001B[96m) is looking for a good job -)\u001B[0m\n');
}
