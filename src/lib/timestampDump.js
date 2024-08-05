import fs from 'fs';
import settings from '#src/config/settings.js';

export default class TimestampDump {
  static generate() {
    return fs.writeFileSync(
      settings.paths.out.timestamp,
      `export default '${(+new Date()).toString(16)}';\n`
    );
  }
}
