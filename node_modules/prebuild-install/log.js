var log = require('npmlog')

module.exports = function (rc, env) {
  log.heading = 'prebuild-install'

  if (rc.verbose) {
    log.level = 'verbose'
  } else {
    log.level = env.npm_config_loglevel || 'notice'
  }

  return log
}
