const createStaticPage = (staticPage, createPage, context, path) => {
  createPage({
    path,
    component: staticPage,
    context: {
      ...context,
    },
  });
};

export default createStaticPage;
