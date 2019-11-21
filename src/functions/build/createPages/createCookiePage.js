const createCookiePage = (cookiePage, createPage, context) => {
  createPage({
    path: '/cookies',
    component: cookiePage,
    context: {
      ...context,
    },
  });
};

export default createCookiePage;
