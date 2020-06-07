import literals from 'lang/en/listing';

/**
 * Combines the given requirables, creating a usable array of
 * listing metadata objects.
 * @param {array} requirables - An array of requirables.
 */
const parseListingMetas = requirables =>
  requirables
    .map(rq => ({
      featured: rq.meta.featured,
      blog: rq.meta.blog,
      url: `/${rq.meta.slugPrefix.slice(0, rq.meta.slugPrefix.indexOf('/'))}/p/1`,
      name: rq.meta.blog ? literals.blog : literals.codelang(rq.meta.language.long),
      icon: rq.meta.theme && rq.meta.theme.iconName,
      slugPrefix: `/${rq.meta.slugPrefix.slice(0, rq.meta.slugPrefix.indexOf('/'))}`,
      count: literals.snippetCount(rq.data.length),
      tags: [...new Set(rq.data.map(snippet => snippet.attributes.tags[0]))].sort((a, b) => a.localeCompare(b)),
    }));

export default parseListingMetas;
