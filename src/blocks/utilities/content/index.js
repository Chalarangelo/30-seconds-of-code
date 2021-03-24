import childProcess from 'child_process';
import { Logger } from 'blocks/utilities/logger';
import { JSONSerializer } from 'blocks/serializers/json';

export class Content {
  /**
   * Initialize content sources from their respective GitHub repositories.
   * Returns a promise that resolves as soon as the spawned git command exits.
   */
  static init() {
    const boundLog = Logger.bind('utilities.content.update');
    boundLog('Updating content sources started...', 'info');

    return new Promise((resolve, reject) => {
      const gitUpdate = childProcess.spawn('git', [
        'submodule',
        'update',
        '--init',
        '--recursive',
        '--progress',
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
          `Initializing content sources completed with exit code ${code}`,
          'success'
        );
        resolve();
      });
    });
  }

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

  /**
   * Adds a new content source
   * @param {string} repoUrl - GitHub repositoy URL (e.g. 'https://github.com/30-seconds/30-seconds-of-yada')
   * @param {string} dirName - Directory name (e.g. '30yada')
   * @param {string} name - Name (e.g. '30 seconds of yada')
   * @param {string} slug - Slug (e.g. 'yada')
   * Returns a promise that resolves as soon as the spawned git command exits.
   */
  static create = (repoUrl, dirName, name, slug) => {
    const boundLog = Logger.bind('utilities.content.create');
    boundLog('Creating new content source...', 'info');

    /* istanbul ignore next */
    return new Promise((resolve, reject) => {
      const gitAdd = childProcess.spawn('git', [
        'submodule',
        'add',
        '-b',
        'master',
        repoUrl,
        `./content/sources/${dirName}`,
      ]);
      boundLog(`${gitAdd.spawnargs.join(' ')} (pid: ${gitAdd.pid})`, 'info');

      gitAdd.stdout.on('data', data => {
        boundLog(`${data}`.replace('\n', ''), 'info');
      });
      gitAdd.on('error', err => {
        boundLog(`${err}`, 'error');
        reject();
      });
      gitAdd.on('exit', () => resolve());
    })
      .then(
        () =>
          new Promise((resolve, reject) => {
            const gitConfig = childProcess.spawn('git', [
              'config',
              '-f',
              '.gitmodules',
              `submodule.content/sources/${dirName}.update`,
              'checkout',
            ]);
            boundLog(
              `${gitConfig.spawnargs.join(' ')} (pid: ${gitConfig.pid})`,
              'info'
            );

            gitConfig.stdout.on('data', data => {
              boundLog(`${data}`.replace('\n', ''), 'info');
            });
            gitConfig.on('error', err => {
              boundLog(`${err}`, 'error');
              reject();
            });
            gitConfig.on('exit', () => resolve());
          })
      )
      .then(
        () =>
          new Promise((resolve, reject) => {
            const gitUpdate = childProcess.spawn('git', [
              'submodule',
              'update',
              '--remote',
            ]);
            boundLog(
              `${gitUpdate.spawnargs.join(' ')} (pid: ${gitUpdate.pid})`,
              'info'
            );

            gitUpdate.stdout.on('data', data => {
              boundLog(`${data}`.replace('\n', ''), 'info');
            });
            gitUpdate.on('error', err => {
              boundLog(`${err}`, 'error');
              reject();
            });
            gitUpdate.on('exit', code => {
              boundLog(
                `Creating content source completed with exit code ${code}`,
                'success'
              );
              return JSONSerializer.serializeToFile(
                `./content/configs/repos/${dirName}.json`,
                {
                  name,
                  dirName,
                  repoUrl,
                  snippetPath: 'snippets',
                  slug,
                  featured: true,
                  iconName: slug,
                  biasPenaltyMultiplier: 1,
                }
              ).then(() => resolve());
            });
          })
      );
  };
}
