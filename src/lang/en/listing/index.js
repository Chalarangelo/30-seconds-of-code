import { capitalize } from 'functions/utils';

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
};

export default literals;
