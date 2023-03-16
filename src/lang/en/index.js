import settings from 'settings/global';
import tagSettings from 'settings/tags';
import { capitalize } from 'utils';

const { specialTagsDictionary } = tagSettings;

const formatTag = tag => {
  if (!tag.length) return '';
  if (specialTagsDictionary[tag]) return specialTagsDictionary[tag];
  return capitalize(tag);
};

/* istanbul ignore next */
const literals = {
  featuredSnippets: 'New & Popular Snippets',
  popularSnippets: 'Popular Snippets',
  tagline: 'Discover short code snippets for all your development needs.',
  browseByCollection:
    'Browse snippets by collection or check out our top picks and latest articles below.',
  moreCollections: 'More collections',
  blogSingular: 'Article',
  blog: 'Articles',
  examples: 'Examples',
  recommendedContent: 'More like this',
  snippetCollection: 'Snippet collection',
  snippetCollectionShort: 'Collection',
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
        return `Browse ${p.snippetCount} snippet collections on ${settings.websiteName}.`;
      case 'search':
        return `Search for answers to your development problems among ${p.snippetCount} code snippets on ${settings.websiteName}.`;
      default:
        return `Find ${settings.websiteDescription.toLowerCase()} on ${
          settings.websiteName
        }.`;
    }
  },
  nextPage: 'Next',
  previousPage: 'Previous',
  cookieDisclaimer: `${settings.websiteName} uses cookies to provide a high quality user experience and gather anonymized data for statistical analysis of the website's traffic. `,
  cookieLearnMore: 'You can learn more by reading our ',
  cookiePolicy: 'cookie policy',
  cookieWhatYouAccept: 'By clicking "Accept" you accept their installation.',
  accept: 'Accept',
  decline: 'Decline',
  home: 'Home',
  skipToContent: 'Skip to main content',
  startOfContent: 'Start of main content',
  siteName: settings.websiteName,
  siteAuthor: settings.orgName,
  siteDescription: settings.websiteDescription,
  snippets: 'Snippets',
  collections: 'Collections',
};

export default literals;
