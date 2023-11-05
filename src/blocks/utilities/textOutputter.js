import fs from 'fs-extra/esm';
import { writeFileSync } from 'node:fs';

/**
 * Outputs text to a log file with a timestamp.
 */
export class TextOutputter {
  static makeLog = (data, title) => {
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:]/g, '')
      .replace('T', '')
      .replace(/\..+/, '');

    let fileName = title || timestamp;
    let text = data;

    if (Array.isArray(data) && typeof data[0] === 'string') {
      text = data.join('\n');
    } else {
      text = JSON.stringify(data, null, 2);
    }

    fs.ensureDirSync('logs');
    writeFileSync(`logs/${fileName}.log`, `${text}\n`);
  };
}
