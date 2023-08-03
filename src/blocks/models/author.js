export const author = {
  name: 'Author',
  fields: {
    name: 'string',
    profile: 'string',
    intro: 'string',
    github: 'string',
  },
  properties: {
    contextObject: {
      body: author => ({
        name: author.name,
        intro: author.intro,
        github: author.github,
      }),
      cache: true,
    },
  },
};
