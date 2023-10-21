import fs from 'node:fs';
import { watch } from 'node:fs/promises';
import { Logger } from '#blocks/utilities/logger';

/**
 * Watches a directory for changes and calls the provided callback when a file
 * is updated, created or deleted.
 */
export class FileWatcher {
  /**
   * Watches a directory for changes and calls the provided callback when a file
   * is updated, created or deleted.
   * @param {string} path The path to the directory to watch.
   * @param {RegExp} pathMatcher A regular expression to match the path of the
   * file that was changed. If the path doesn't match the pattern, the callback
   * won't be called. If not provided, all files will be watched.
   * @param {function} callback A callback function that will be called when a
   * file is updated, created or deleted. The callback will receive two
   * arguments: the event type ('update', 'create' or 'delete') and the relative
   * path of the file that was changed.
   */
  static watch = async (path, pathMatcher, callback) => {
    const logger = new Logger(`FileWatcher.watch @${path}`);

    const watcher = watch(path, { recursive: true });
    logger.log(`Watching files in ${path}`);

    for await (const event of watcher) {
      const { eventType, filename } = event;

      let trueEventType;
      if (eventType === 'change') trueEventType = 'update';
      else if (eventType === 'rename') {
        const exists = fs.existsSync(`${path}/${filename}`);
        trueEventType = exists ? 'create' : 'delete';
      }

      if (pathMatcher && !pathMatcher.test(filename)) {
        logger.log(
          `Ignoring '${trueEventType}' event on file ${filename} (pattern doesn't match)`
        );
      } else {
        logger.log(`Detected '${trueEventType}' event on file ${filename}`);
        callback(trueEventType, filename);
      }
    }
  };
}
