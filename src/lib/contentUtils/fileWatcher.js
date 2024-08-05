import fs from 'fs';
import { contentDir } from '#src/lib/contentUtils/config.js';

export default class FileWatcher {
  static watch(callback) {
    console.log(`Watching for changes in ${contentDir}.`);
    fs.watch(contentDir, { recursive: true }, (eventType, filename) => {
      if (filename) console.log(`Changes detected in ${filename}.`);
      callback(eventType, filename);
    });
  }
}
