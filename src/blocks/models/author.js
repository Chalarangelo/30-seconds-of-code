export const author = {
  name: 'Author',
  fields: [
    { name: 'name', type: 'stringRequired' },
    { name: 'profile', type: 'stringRequired' },
    { name: 'intro', type: 'stringRequired' },
    { name: 'github', type: 'stringRequired' },
  ],
  properties: {
    contextObject: author => ({
      name: author.name,
      intro: author.intro,
      github: author.github,
    }),
  },
  cacheProperties: ['contextObject'],
};
