const createSearchPage = (searchPage, createPage, context) => {
  createPage({
    path: '/search',
    component: searchPage,
    context: {
      ...context,
    },
  });
};

export default createSearchPage;
