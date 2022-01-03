import settings from 'settings/global';
import tagSettings from 'settings/tags';
import { capitalize } from 'utils';

const { specialTagsDictionary } = tagSettings;
// TODO: Ideally, the tag values received here should be formatted already, so
// we can remove this utility function.
const formatTag = tag => {
  if (!tag.length) return '';
  if (specialTagsDictionary[tag]) return specialTagsDictionary[tag];
  return capitalize(tag);
};

/* istanbul ignore next */
const literals = {
  featuredCollections: 'Featured Collections',
  collections: 'Snippet Collections',
  newBlogs: 'Latest Articles',
  topSnippets: 'Top Snippets',
  snippetList: 'Snippet List',
  blog: 'Articles',
  tag: t => `${formatTag(t)}`,
  shortCodelang: l => `${l}`,
  shortCodelangTag: (l, t) => `${l} ${formatTag(t)}`,
  shortBlogTag: t => `${formatTag(t)}`,
  codelang: l => `${l} Snippets`,
  codelangTag: (l, t) => `${l} ${formatTag(t)} Snippets`,
  blogTag: t => `${formatTag(t)} Articles`,
  snippetCount: c => `${c} snippets`,
  pageDescription: (t, p) => {
    switch (t) {
      case 'language':
        return `Browse ${p.snippetCount} ${p.listingLanguage} code snippets for all your development needs on ${settings.websiteName}.`;
      case 'tag':
        return p.listingLanguage
          ? `Browse ${p.snippetCount} ${p.listingLanguage} ${formatTag(
              p.listingTag
            )} code snippets for all your development needs on ${
              settings.websiteName
            }.`
          : `Browse ${p.snippetCount} ${formatTag(
              p.listingTag
            )} articles for all your development needs on ${
              settings.websiteName
            }.`;
      case 'blog':
        return `Browse ${p.snippetCount} code articles for all your development needs on ${settings.websiteName}.`;
      case 'main':
        return `Browse ${
          p.snippetCount
        } ${settings.websiteDescription.toLowerCase()} on ${
          settings.websiteName
        }.`;
      case 'collections':
        return `Browse ${p.collectionCount} snippet collections on ${settings.websiteName}.`;
      default:
        return `Find ${settings.websiteDescription.toLowerCase()} on ${
          settings.websiteName
        }.`;
    }
  },
};

export default literals;
