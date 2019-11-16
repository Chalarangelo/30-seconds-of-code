const createSearchIndexPage = (searchPage, createPage, context) => {
  createPage({
    path: '/search_index',
    component: searchPage,
    context: {
      ...context,
    },
  });
};

export default createSearchIndexPage;
