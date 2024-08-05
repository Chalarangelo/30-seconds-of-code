import fs from 'fs';
import yaml from 'js-yaml';
import settings from '#src/config/settings.js';

export default class Redirects {
  static {
    this.redirects = [];

    const data = fs.readFileSync(settings.paths.redirectsYAML, 'utf8');
    const redirects = yaml.load(data);

    this.redirects = redirects;
  }

  static generate() {
    const redirectsString = this.redirects
      .map(redirect => `${redirect.from} ${redirect.to} ${redirect.status}`)
      .join('\n');

    // Write to file
    fs.writeFileSync(settings.paths.out.redirects, redirectsString);
  }

  static for(slug) {
    const lookupPaths = [slug];
    const redirectedPaths = new Set();

    while (lookupPaths.length > 0) {
      redirectedPaths.add(lookupPaths[0]);

      const fromPaths = this.redirects.filter(
        redirect => redirect.to === lookupPaths[0]
      );

      fromPaths.forEach(fromPath => {
        if (!redirectedPaths.has(fromPath.from)) {
          lookupPaths.push(fromPath.from);
          redirectedPaths.add(fromPath.from);
        }
      });

      lookupPaths.shift();
    }

    return Array.from(redirectedPaths);
  }
}
