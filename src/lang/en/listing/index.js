import { capitalize } from 'utils';
import settings from 'settings/global';
/* istanbul ignore next */
const literals = {
  orders: {
    popularity: 'Recommended',
    alphabetical: 'Alphabetical',
    expertise: 'Expertise',
    newest: 'Newest',
  },
  snippetList: 'Snippet List',
  blog: 'Blog',
  tag: t => `${capitalize(t)}`,
  codelang: l => l,
  codelangTag: (l, t) => `${l} ${capitalize(t)}`,
  snippetCount: c => `${c} snippets`,
  pageDescription: (t, p) => {
    switch (t) {
      case 'language':
        return `Browse ${p.snippetCount} ${p.listingLanguage} code snippets for all your development needs on ${settings.websiteName}.`;
      case 'tag':
        return `Browse ${p.snippetCount} ${p.listingLanguage} ${capitalize(
          p.listingTag
        )} code snippets for all your development needs on ${
          settings.websiteName
        }.`;
      case 'blog':
        return `Browse ${p.snippetCount} code blogs for all your development needs on ${settings.websiteName}.`;
      case 'main':
        return `Browse ${
          p.snippetCount
        } ${settings.websiteDescription.toLowerCase()} on ${
          settings.websiteName
        }.`;
      default:
        return `Find ${settings.websiteDescription.toLowerCase()} on ${
          settings.websiteName
        }.`;
    }
  },
};

export default literals;
