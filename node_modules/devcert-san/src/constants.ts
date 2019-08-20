import * as path from 'path';
import * as mkdirp from 'mkdirp';

export const isMac = process.platform === 'darwin';
export const isLinux = process.platform === 'linux';
export const isWindows = process.platform === 'win32';

// use %LOCALAPPDATA%/devcert on Windows otherwise use ~/.config/devcert
export let configDir: string;
if (isWindows && process.env.LOCALAPPDATA) {
  configDir = path.join(process.env.LOCALAPPDATA, 'devcert', 'config');
} else {
  let uid = process.getuid && process.getuid();
  let userHome = (isLinux && uid === 0) ? path.resolve('/usr/local/share') : require('os').homedir();
  configDir = path.join(userHome, '.config', 'devcert');
}
export const configPath: (...pathSegments: string[]) => string = path.join.bind(path, configDir);

export const opensslConfTemplate = path.join(__dirname, '..', 'openssl.conf');
export const opensslConfPath = configPath('openssl.conf');
export const rootKeyPath = configPath('devcert-ca-root.key');
export const rootCertPath = configPath('devcert-ca-root.crt');
export const caCertsDir = configPath('certs');

mkdirp.sync(configDir);
mkdirp.sync(caCertsDir);
