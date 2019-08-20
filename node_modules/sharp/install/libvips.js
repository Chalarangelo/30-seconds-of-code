'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const detectLibc = require('detect-libc');
const npmLog = require('npmlog');
const semver = require('semver');
const simpleGet = require('simple-get');
const tar = require('tar');
const copyFileSync = require('fs-copy-file-sync');

const agent = require('../lib/agent');
const libvips = require('../lib/libvips');
const platform = require('../lib/platform');

const minimumLibvipsVersion = libvips.minimumLibvipsVersion;
const distBaseUrl = process.env.npm_config_sharp_dist_base_url || process.env.SHARP_DIST_BASE_URL || `https://github.com/lovell/sharp-libvips/releases/download/v${minimumLibvipsVersion}/`;

const fail = function (err) {
  npmLog.error('sharp', err.message);
  npmLog.info('sharp', 'Attempting to build from source via node-gyp but this may fail due to the above error');
  npmLog.info('sharp', 'Please see https://sharp.pixelplumbing.com/page/install for required dependencies');
  process.exit(1);
};

const extractTarball = function (tarPath) {
  const vendorPath = path.join(__dirname, '..', 'vendor');
  libvips.mkdirSync(vendorPath);
  tar
    .extract({
      file: tarPath,
      cwd: vendorPath,
      strict: true
    })
    .catch(function (err) {
      if (/unexpected end of file/.test(err.message)) {
        npmLog.error('sharp', `Please delete ${tarPath} as it is not a valid tarball`);
      }
      fail(err);
    });
};

try {
  const useGlobalLibvips = libvips.useGlobalLibvips();
  if (useGlobalLibvips) {
    const globalLibvipsVersion = libvips.globalLibvipsVersion();
    npmLog.info('sharp', `Detected globally-installed libvips v${globalLibvipsVersion}`);
    npmLog.info('sharp', 'Building from source via node-gyp');
    process.exit(1);
  } else if (libvips.hasVendoredLibvips()) {
    npmLog.info('sharp', `Using existing vendored libvips v${minimumLibvipsVersion}`);
  } else {
    // Is this arch/platform supported?
    const arch = process.env.npm_config_arch || process.arch;
    const platformAndArch = platform();
    if (platformAndArch === 'win32-ia32') {
      throw new Error('Windows x86 (32-bit) node.exe is not supported');
    }
    if (arch === 'ia32') {
      throw new Error(`Intel Architecture 32-bit systems require manual installation of libvips >= ${minimumLibvipsVersion}`);
    }
    if (platformAndArch === 'freebsd-x64' || platformAndArch === 'openbsd-x64' || platformAndArch === 'sunos-x64') {
      throw new Error(`BSD/SunOS systems require manual installation of libvips >= ${minimumLibvipsVersion}`);
    }
    if (detectLibc.family === detectLibc.GLIBC && detectLibc.version && semver.lt(`${detectLibc.version}.0`, '2.13.0')) {
      throw new Error(`Use with glibc version ${detectLibc.version} requires manual installation of libvips >= ${minimumLibvipsVersion}`);
    }
    // Download to per-process temporary file
    const tarFilename = ['libvips', minimumLibvipsVersion, platformAndArch].join('-') + '.tar.gz';
    const tarPathCache = path.join(libvips.cachePath(), tarFilename);
    if (fs.existsSync(tarPathCache)) {
      npmLog.info('sharp', `Using cached ${tarPathCache}`);
      extractTarball(tarPathCache);
    } else {
      const tarPathTemp = path.join(os.tmpdir(), `${process.pid}-${tarFilename}`);
      const tmpFile = fs.createWriteStream(tarPathTemp);
      const url = distBaseUrl + tarFilename;
      npmLog.info('sharp', `Downloading ${url}`);
      simpleGet({ url: url, agent: agent() }, function (err, response) {
        if (err) {
          throw err;
        }
        if (response.statusCode !== 200) {
          throw new Error(`Status ${response.statusCode}`);
        }
        response
          .on('error', fail)
          .pipe(tmpFile);
      });
      tmpFile
        .on('error', fail)
        .on('close', function () {
          try {
            // Attempt to rename
            fs.renameSync(tarPathTemp, tarPathCache);
          } catch (err) {
            // Fall back to copy and unlink
            copyFileSync(tarPathTemp, tarPathCache);
            fs.unlinkSync(tarPathTemp);
          }
          extractTarball(tarPathCache);
        });
    }
  }
} catch (err) {
  fail(err);
}
