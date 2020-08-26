/**
 * Tell plugins to add pages.
 * Takes a list of requirable objects and a templates object.
 * Creates pages by running createPage for each ne.
 */
const createPages = (templates, requirables) => ({ actions }) => {
  const { createPage } = actions;

  requirables.forEach(req =>
    createPage({
      path: req.relRoute,
      component: templates[req.template],
      context: req.context,
    })
  );

  const mainListing = requirables.find(req => req.context.isMainListing);
  createPage({
    path: '/',
    component: templates[mainListing.template],
    context: mainListing.context,
  });
};

export default createPages;
