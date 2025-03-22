const today = () => new Date();
const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d;
};
const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d;
};

const base = {
  cid: 'snippet',
  title: 'My Snippet',
  shortTitle: 'My Snippet',
  content: '<p>My snippet <code>description</code>.</p>',
  description: 'My snippet short description.',
  listed: true,
  tags: 'array;object',
  dateModified: today(),
  tableOfContents: null,
  languageCid: 'javascript',
  cover: 'cover',
  recTokens: 'my snippet short description',
  docTokens: 'my snippet short description',
  ranking: 0.65,
};

const traits = {
  listed: {
    listed: true,
  },
  unlisted: {
    listed: false,
  },
  published: {
    dateModified: yesterday(),
  },
  scheduled: {
    dateModified: tomorrow(),
  },
  withoutLanguage: {
    languageCid: null,
  },
  taggedNodeJs: {
    tags: 'node;array',
  },
};

export default { model: 'Snippet', base, traits };
