const createHomePage = (homePage, createPage, context) => {
  createPage({
    path: '/',
    component: homePage,
    context: {
      ...context,
    },
  });
};

export default createHomePage;
