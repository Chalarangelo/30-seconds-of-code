'use strict'
function inCommand (cmd) {
  try {
    var npm_config_argv = JSON.parse(process.env['npm_config_argv'])
  } catch (e) {
    return false
  }

  if (typeof npm_config_argv !== 'object') process.exit(1)
  if (!npm_config_argv.cooked) process.exit(1)
  if (!npm_config_argv.cooked instanceof Array) process.exit(1)

  var V
  while ((V = npm_config_argv.cooked.shift()) !== undefined) {
    if (/^-/.test(V)) continue
    if (cmd.test(V)) return true
    return false
  }
  return false
}

exports.inPublish = function () {
  return inCommand(/^pu(b(l(i(sh?)?)?)?)?$/)
}

exports.inInstall = function () {
  return inCommand(/^i(n(s(t(a(ll?)?)?)?)?)?$/)
}
