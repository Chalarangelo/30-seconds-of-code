'use strict';

const detectLibc = require('detect-libc');

const env = process.env;

module.exports = function () {
  const arch = env.npm_config_arch || process.arch;
  const platform = env.npm_config_platform || process.platform;
  const libc = (platform === 'linux' && detectLibc.isNonGlibcLinux) ? detectLibc.family : '';

  const platformId = [`${platform}${libc}`];

  if (arch === 'arm') {
    platformId.push(`armv${env.npm_config_arm_version || process.config.variables.arm_version || '6'}`);
  } else if (arch === 'arm64') {
    platformId.push(`arm64v${env.npm_config_arm_version || '8'}`);
  } else {
    platformId.push(arch);
  }

  return platformId.join('-');
};
