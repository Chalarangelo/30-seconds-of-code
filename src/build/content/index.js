import childProcess from 'child_process';
import { bindLogger } from 'build/core';

/**
 * Update content sources from their respective GitHub repositories.
 * Returns a promise that resolves as soon as the spawned git command exits.
 */
export const updateContent = () => {
  const boundLog = bindLogger('updateContent');
  boundLog('Updating content sources started...', 'info');

  return new Promise((resolve, reject) => {
    const gitUpdate = childProcess.spawn('git', ['submodule', 'update', '--recursive', '--remote', '--depth=10000']);
    boundLog(`${gitUpdate.spawnargs.join(' ')} (pid: ${gitUpdate.pid})`, 'info');

    gitUpdate.stdout.on('data', data => {
      boundLog(`${data}`.replace('\n', ''), 'info');
    });
    gitUpdate.on('error', err => {
      boundLog(`${err}`, 'error');
      reject();
    });
    gitUpdate.on('exit', code => {
      boundLog(`Updating content sources completed with exit code ${code}`, 'success');
      resolve();
    });
  });
};
