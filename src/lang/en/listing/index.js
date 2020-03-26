import { capitalize } from 'functions/utils';
import config from '../../../../config';

const literals = {
  orders: {
    popularity: 'Popularity',
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
      return `Browse ${p.snippetCount} ${p.listingLanguage} code snippets for all your development needs on ${config.name}.`;
    case 'tag':
      return `Browse ${p.snippetCount} ${p.listingLanguage} ${capitalize(p.listingTag)} code snippets for all your development needs on ${config.name}.`;
    case 'blog':
      return `Browse ${p.snippetCount} code blogs for all your development needs on ${config.name}.`;
    case 'main':
      return `Browse ${p.snippetCount} ${config.description.toLowerCase()} on ${config.name}.`;
    default:
      return `Find ${config.description.toLowerCase()} on ${config.name}.`;
    }
  },
};

export default literals;
