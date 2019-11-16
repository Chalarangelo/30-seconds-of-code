const createHomePage = (listingMetas, homePage, createPage, context) => {
  const featuredSources = listingMetas
    .filter(meta => meta.featured > 0)
    .sort((a, b) => a.featured - b.featured)
    .map(meta => ({
      link: meta.link,
      name: meta.name,
      style: meta.style,
      count: meta.count,
    }));

  createPage({
    path: '/',
    component: homePage,
    context: {
      ...context,
      listingAnchors: featuredSources,
    },
  });
};

export default createHomePage;
