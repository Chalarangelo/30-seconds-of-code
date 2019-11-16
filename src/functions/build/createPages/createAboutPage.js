const createAboutPage = (aboutPage, createPage, context) => {
  createPage({
    path: '/about',
    component: aboutPage,
    context: {
      ...context,
    },
  });
};

export default createAboutPage;
