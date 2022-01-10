export const pageSerializer = {
  name: 'PageSerializer',
  methods: {
    params: (page, { withParams } = {}) => {
      if (!withParams) return undefined;
      if (page.isSnippet) {
        const segments = page.relRoute.slice(1).split('/');
        return {
          lang: segments[0],
          snippet: segments.slice(-1)[0],
        };
      }
      if (page.isListing) {
        const [lang, ...listing] = page.relRoute.slice(1).split('/');
        return { lang, listing };
      }
      return {};
    },
  },
  attributes: [['context', 'props'], 'params'],
};
