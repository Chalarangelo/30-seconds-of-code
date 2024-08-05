import fs from 'fs';
import Snippet from '#src/models/snippet.js';
import StringUtils from '#src/lib/stringUtils.js';
import settings from '#src/config/settings.js';

export default class Feed {
  static generate() {
    const { name, description, url } = settings.website;

    const data = `\
<rss
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  version="2.0"
>
  <channel>
    <title>${name}</title>
    <description>${description}</description>
    <link>${url}</link>
    <language>en-us</language>
    <image>
      <url>${url}/assets/logo.png</url>
      <title>${name}</title>
      <link>${url}</link>
    </image>
    <ttl>1440</ttl>
    <atom:link href="${url}/feed.xml" rel="self" type="application/rss+xml" />
${Feed.nodes.join('\n')}
  </channel>
</rss>`;

    // Write to file
    fs.writeFileSync(settings.paths.out.feed, data);
  }

  static get nodes() {
    return Snippet.scope('published', 'listed', 'byNew')
      .slice(0, 50)
      .map(
        snippet => `\
      <item>
        <title>${StringUtils.escapeHtml(snippet.title)}</title>
        <link>${snippet.fullUrl}</link>
        <description>${StringUtils.escapeHtml(
          snippet.seoDescription
        )}</description>
        <pubDate>${new Date(snippet.dateModified).toUTCString()}</pubDate>
      <item>`
      );
  }
}
