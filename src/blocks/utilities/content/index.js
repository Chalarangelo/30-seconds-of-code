import childProcess from 'child_process';
import { Logger } from 'blocks/utilities/logger';

export class Content {
  /**
   * Update content sources from their respective GitHub repositories.
   * Returns a promise that resolves as soon as the spawned git command exits.
   */
  static update = () => {
    const boundLog = Logger.bind('utilities.content.update');
    boundLog('Updating content sources started...', 'info');

    return new Promise((resolve, reject) => {
      const gitUpdate = childProcess.spawn('git', [
        'submodule',
        'update',
        '--recursive',
        '--remote',
        '--depth=10000',
      ]);
      boundLog(
        `${gitUpdate.spawnargs.join(' ')} (pid: ${gitUpdate.pid})`,
        'info'
      );

      /* istanbul ignore next */
      gitUpdate.stdout.on('data', data => {
        boundLog(`${data}`.replace('\n', ''), 'info');
      });
      /* istanbul ignore next */
      gitUpdate.on('error', err => {
        boundLog(`${err}`, 'error');
        reject();
      });
      /* istanbul ignore next */
      gitUpdate.on('exit', code => {
        boundLog(
          `Updating content sources completed with exit code ${code}`,
          'success'
        );
        resolve();
      });
    });
  };
}
