import fs from 'fs';
import Snippet from '#src/models/snippet.js';
import Collection from '#src/models/collection.js';
import settings from '#src/config/settings.js';

export default class Sitemap {
  static generate() {
    const data = `\
<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  >
${Sitemap.urls.join('\n')}
  </urlset>
</rss>`;

    // Write to file
    fs.writeFileSync(settings.paths.out.sitemap, data);
  }

  static get urls() {
    const homePageUrl = `${settings.website.url}${settings.pages.urls.home}`;
    const aboutPageUrl = `${settings.website.url}${settings.pages.urls.about}`;

    return [
      homePageUrl,
      ...Snippet.scope('published').map(snippet => snippet.fullUrl),
      ...Collection.all.map(collection => collection.allPageFullUrls).flat(),
      aboutPageUrl,
    ].map(
      url => `\
    <url>
      <loc>${url}</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>`
    );
  }
}
