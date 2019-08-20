import {
  readFileSync,
  readdirSync,
  writeFileSync,
  unlinkSync,
  chmodSync,
  existsSync
} from 'fs';
import * as path from 'path';
import { exec, execSync, ExecSyncOptions } from 'child_process';
import * as tmp from 'tmp';
import * as Configstore from 'configstore';
import * as mkdirp from 'mkdirp';
import * as createDebug from 'debug';
import { sync as commandExists } from 'command-exists';

import {
  isMac,
  isLinux,
  isWindows,
  configDir,
  configPath,
  opensslConfTemplate,
  opensslConfPath,
  rootKeyPath,
  rootCertPath,
  caCertsDir
} from './constants';
import installCertificateAuthority from './root-authority';
import { openssl, generateKey } from './utils';

const debug = createDebug('devcert');

/**
 * Request an SSL certificate for the given app name signed by the devcert root certificate
 * authority. If devcert has previously generated a certificate for that app name on this machine,
 * it will reuse that certificate.
 *
 * If this is the first time devcert is being run on this machine, it will generate and attempt to
 * install a root certificate authority.
 *
 * Returns a promise that resolves with { keyPath, certPath, key, cert }, where `key` and `cert` are
 * Buffers with the contents of `keyPath` and `certPath`, respectively.
 */
export default async function devcert(appName: string, options: { installCertutil?: boolean } = {}) {
  debug(`development cert requested for ${ appName }`);

  if (!isMac && !isLinux && !isWindows) {
    throw new Error(`devcert: "${ process.platform }" platform not supported`);
  }

  if (!commandExists('openssl')) {
    throw new Error('Unable to find openssl - make sure it is installed and available in your PATH');
  }

  let appKeyPath = configPath(`${ appName }.key`);
  let appCertPath = configPath(`${ appName }.crt`);

  if (!existsSync(rootCertPath)) {
    debug('devcert root CA not installed yet, must be first run; installing root CA ...');
    await installCertificateAuthority(options.installCertutil);
  }

  if (!existsSync(configPath(`${ appName }.crt`))) {
    debug(`first request for ${ appName } cert, generating and caching ...`);
    generateKey(configPath(`${ appName }.key`));
    generateSignedCertificate(appName, appKeyPath);
  }

  debug(`returning app cert`);
  return {
    keyPath: appKeyPath,
    certPath: appCertPath,
    key: readFileSync(appKeyPath),
    cert: readFileSync(appCertPath)
  };

}

// Generate an app certificate signed by the devcert root CA
function generateSignedCertificate(name: string, keyPath: string): void {
  debug(`generating certificate signing request for ${ name }`);
  let csrFile = configPath(`${ name }.csr`)
  openssl(`req -config ${ opensslConfPath } -subj "/CN=${ name }" -key ${ keyPath } -out ${ csrFile } -new`);
  debug(`generating certificate for ${ name } from signing request; signing with devcert root CA`);
  let certPath = configPath(`${ name }.crt`);
  openssl(`ca -config ${ opensslConfPath } -in ${ csrFile } -out ${ certPath } -outdir ${ caCertsDir } -keyfile ${ rootKeyPath } -cert ${ rootCertPath } -notext -md sha256 -days 7000 -batch -extensions server_cert`)
}
