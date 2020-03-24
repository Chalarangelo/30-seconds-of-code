const createSearchPage = (searchPage, createPage, context, path = '/search') => {
  createPage({
    path,
    component: searchPage,
    context: {
      ...context,
    },
  });
};

export default createSearchPage;
