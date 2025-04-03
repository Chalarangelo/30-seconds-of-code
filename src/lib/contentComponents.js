import fs from 'fs-extra';
import settings from '#src/config/settings.js';

export default class ContentComponents {
  static copy() {
    return fs.cpSync(
      settings.paths.contentComponentsDirectory,
      settings.paths.out.contentComponents,
      { recursive: true, force: true }
    );
  }
}
