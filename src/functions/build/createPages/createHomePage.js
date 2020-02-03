import { transformSnippetIndex } from 'functions/transformers';

const createHomePage = (searchIndex, listingMetas, homePage, createPage, context) => {
  const featuredSources = listingMetas
    .filter(v => !v.unlisted)
    .map(v => v.featured > 0 ? v : {...v, featured: 500 })
    .sort((a, b) => a.featured === b.featured ? a.name - b.name : a.featured - b.featured)
    .map(meta => ({
      link: meta.link,
      name: meta.name,
      style: meta.style,
      icon: meta.icon,
    }));

  const featuredSnippets = searchIndex.edges
    .filter(s => s.node.recommendationRanking !== 0)
    .sort((a, b) => b.node.recommendationRanking - a.node.recommendationRanking);

  createPage({
    path: '/',
    component: homePage,
    context: {
      ...context,
      listingAnchors: featuredSources,
      recommendedSnippets: transformSnippetIndex(featuredSnippets.slice(0, 25)),
    },
  });
};

export default createHomePage;
