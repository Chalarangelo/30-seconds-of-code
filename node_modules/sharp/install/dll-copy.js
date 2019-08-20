'use strict';

const fs = require('fs');
const path = require('path');

const copyFileSync = require('fs-copy-file-sync');
const libvips = require('../lib/libvips');
const npmLog = require('npmlog');

if (process.platform === 'win32') {
  const buildDir = path.join(__dirname, '..', 'build');
  const buildReleaseDir = path.join(buildDir, 'Release');
  npmLog.info('sharp', `Creating ${buildReleaseDir}`);
  try {
    libvips.mkdirSync(buildDir);
    libvips.mkdirSync(buildReleaseDir);
  } catch (err) {}
  const vendorLibDir = path.join(__dirname, '..', 'vendor', 'lib');
  npmLog.info('sharp', `Copying DLLs from ${vendorLibDir} to ${buildReleaseDir}`);
  try {
    fs
      .readdirSync(vendorLibDir)
      .filter(function (filename) {
        return /\.dll$/.test(filename);
      })
      .forEach(function (filename) {
        copyFileSync(
          path.join(vendorLibDir, filename),
          path.join(buildReleaseDir, filename)
        );
      });
  } catch (err) {
    npmLog.error('sharp', err.message);
  }
}
