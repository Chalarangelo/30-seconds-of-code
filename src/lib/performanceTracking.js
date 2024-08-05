import fs from 'fs';
import Redirects from '#src/lib/redirects.js';
import settings from '#src/config/settings.js';

export default class PerforanceTracking {
  static {
    if (fs.existsSync(settings.paths.pagePerformanceCSV)) {
      const csvData = fs.readFileSync(
        settings.paths.pagePerformanceCSV,
        'utf8'
      );
      this.data = csvData
        .split('\n')
        .map(row => row.split(','))
        .reduce((acc, [key, clicks, impressions]) => {
          const slug = key.replace(settings.website.url, '');
          acc[slug] = {
            clicks: Number.parseInt(clicks, 10),
            impressions: Number.parseInt(impressions, 10),
          };
          return acc;
        }, {});
    }
  }

  static for(...slugs) {
    let allSlugs = slugs.length === 1 ? Redirects.for(slugs[0]) : slugs;
    return allSlugs.reduce(
      (acc, slug) => {
        if (this.data[slug]) {
          acc.clicks += this.data[slug].clicks;
          acc.impressions += this.data[slug].impressions;
        }
        return acc;
      },
      { clicks: 0, impressions: 0 }
    );
  }
}
