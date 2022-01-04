import childProcess from 'child_process';
import path from 'path';
import fs from 'fs';
import pathSettings from 'settings/paths';
import { Logger } from 'blocks/utilities/logger';
import { JSONHandler } from 'blocks/utilities/jsonHandler';

export class Content {
  /**
   * Initialize content sources from their respective GitHub repositories.
   * @returns {Promise} A promise that resolves as soon as the spawned git
   * command exits.
   */
  static init() {
    const logger = new Logger('Content.init');
    logger.log('Updating content sources started...');

    return new Promise((resolve, reject) => {
      const gitUpdate = childProcess.spawn('git', [
        'submodule',
        'update',
        '--init',
        '--recursive',
        '--progress',
      ]);
      logger.log(`${gitUpdate.spawnargs.join(' ')} (pid: ${gitUpdate.pid})`);

      /* istanbul ignore next */
      gitUpdate.stdout.on('data', data => {
        logger.log(`${data}`.replace('\n', ''));
      });
      /* istanbul ignore next */
      gitUpdate.on('error', err => {
        logger.error(`${err}`);
        reject();
      });
      /* istanbul ignore next */
      gitUpdate.on('exit', code => {
        logger.success(
          `Initializing content sources completed with exit code ${code}`
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
    const logger = new Logger('Content.update');
    logger.log('Updating content sources started...');

    return new Promise((resolve, reject) => {
      const gitUpdate = childProcess.spawn('git', [
        'submodule',
        'update',
        '--recursive',
        '--remote',
        '--depth=10000',
      ]);
      logger.log(`${gitUpdate.spawnargs.join(' ')} (pid: ${gitUpdate.pid})`);

      /* istanbul ignore next */
      gitUpdate.stdout.on('data', data => {
        logger.log(`${data}`.replace('\n', ''));
      });
      /* istanbul ignore next */
      gitUpdate.on('error', err => {
        logger.error(`${err}`);
        reject();
      });
      /* istanbul ignore next */
      gitUpdate.on('exit', code => {
        logger.success(
          `Updating content sources completed with exit code ${code}`
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
    const logger = new Logger('Content.create');
    logger.log('Creating new content source...');

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
      logger.log(`${gitAdd.spawnargs.join(' ')} (pid: ${gitAdd.pid})`);

      gitAdd.stdout.on('data', data => {
        logger.log(`${data}`.replace('\n', ''));
      });
      gitAdd.on('error', err => {
        logger.error(`${err}`);
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
            logger.log(
              `${gitConfig.spawnargs.join(' ')} (pid: ${gitConfig.pid})`
            );

            gitConfig.stdout.on('data', data => {
              logger.log(`${data}`.replace('\n', ''));
            });
            gitConfig.on('error', err => {
              logger.error(`${err}`);
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
            logger.log(
              `${gitUpdate.spawnargs.join(' ')} (pid: ${gitUpdate.pid})`
            );

            gitUpdate.stdout.on('data', data => {
              logger.log(`${data}`.replace('\n', ''));
            });
            gitUpdate.on('error', err => {
              logger.error(`${err}`);
              reject();
            });
            gitUpdate.on('exit', code => {
              logger.success(
                `Creating content source completed with exit code ${code}`
              );
              return JSONHandler.toFile(
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

  /**
   * Creates a new snippet from the template in the given content source
   * @param {string} submoduleName - Name of the submodule (e.g. '30blog')
   * @param {string} snippetName - Name of the new snippet (e.g. 'my-blog-post')
   */
  static createSnippet = (submoduleName, snippetName) => {
    const logger = new Logger('Content.createSnippet');
    logger.log(`Creating new snippet ${snippetName} in ${submoduleName}...`);

    const { rawContentPath: contentPath } = pathSettings;
    const submodulePath = path.join(
      process.cwd(),
      contentPath,
      'sources',
      submoduleName
    );
    const templatePath = path.join(submodulePath, 'snippet-template.md');
    const snippetPath = path.join(
      submodulePath,
      submoduleName === '30blog' ? 'blog_posts' : 'snippets'
    );
    try {
      if (!fs.existsSync(snippetPath)) {
        logger.log('Snippet directory not found! Creating directory...');
        fs.mkdirSync(snippetPath);
      }
      const template = fs.readFileSync(templatePath, 'utf8');

      const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
      const date = new Date();
      const dateString = `${date.getFullYear()}-${pad(
        date.getMonth() + 1
      )}-${pad(date.getDate())}T05:00:00-04:00`;

      const fileData = template
        .replace(/title:\s*.*\n/, `title: ${snippetName}\n`)
        .replace(/firstSeen:\s*.*\n/, `firstSeen: ${dateString}\n`);
      fs.writeFileSync(path.join(snippetPath, `${snippetName}.md`), fileData);

      logger.success('Snippet creation complete!');
    } catch (err) {
      logger.error('Snippet creation encountered an error');
      logger.error(err);
    }
  };
}
