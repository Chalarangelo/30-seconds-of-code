export const pageSerializer = {
  name: 'PageSerializer',
  methods: {
    params: (page, { withParams } = {}) => {
      if (!withParams) return undefined;
      return page.params;
    },
  },
  attributes: ['props', 'params'],
};
