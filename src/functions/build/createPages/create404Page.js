const create404Page = (notFoundPage, createPage, context) => {
  createPage({
    path: '/404',
    component: notFoundPage,
    context: {
      ...context,
    },
  });
};

export default create404Page;
