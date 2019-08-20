import { chmodSync } from 'fs';
import { exec, execSync, ExecSyncOptions } from 'child_process';
import * as createDebug from 'debug';
import * as path from 'path';

import {
  configPath,
} from './constants';

const debug = createDebug('devcert');

export function openssl(cmd: string) {
  return run(`openssl ${ cmd }`, {
    stdio: 'ignore',
    env: Object.assign({
      RANDFILE: path.join(configPath('.rnd'))
    }, process.env)
  });
}

export function run(cmd: string, options: ExecSyncOptions = {}) {
  debug(`exec: \`${ cmd }\``);
  return execSync(cmd, options);
}

export function waitForUser() {
  return new Promise((resolve) => {
    process.stdin.resume();
    process.stdin.on('data', resolve);
  });
}

// Generate a cryptographic key, used to sign certificates or certificate signing requests.
export function generateKey(filename: string): void {
  debug(`generateKey: ${ filename }`);
  openssl(`genrsa -out ${ filename } 2048`);
  chmodSync(filename, 400);
}
