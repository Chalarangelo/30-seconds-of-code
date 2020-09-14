import { capitalize } from 'utils';
import config from 'config/global';
/* istanbul ignore next */
const literals = {
  orders: {
    popularity: 'Recommended',
    alphabetical: 'Alphabetical',
    expertise: 'Expertise',
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
      return `Browse ${p.snippetCount} ${p.listingLanguage} code snippets for all your development needs on ${config.websiteName}.`;
    case 'tag':
      return `Browse ${p.snippetCount} ${p.listingLanguage} ${capitalize(p.listingTag)} code snippets for all your development needs on ${config.websiteName}.`;
    case 'blog':
      return `Browse ${p.snippetCount} code blogs for all your development needs on ${config.websiteName}.`;
    case 'main':
      return `Browse ${p.snippetCount} ${config.websiteDescription.toLowerCase()} on ${config.websiteName}.`;
    default:
      return `Find ${config.websiteDescription.toLowerCase()} on ${config.websiteName}.`;
    }
  },
};

export default literals;
