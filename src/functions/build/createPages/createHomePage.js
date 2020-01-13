import { transformSnippetIndex } from 'functions/utils';

const createHomePage = (searchIndex, listingMetas, homePage, createPage, context) => {
  const featuredSources = listingMetas
    .filter(meta => meta.featured > 0)
    .sort((a, b) => a.featured - b.featured)
    .map(meta => ({
      link: meta.link,
      name: meta.name,
      style: meta.style,
      count: meta.count,
    }))
    .slice(0, 4);

  const featuredSnippets = searchIndex.edges
    .filter(s => s.node.recommendationRanking !== 0)
    .sort((a, b) => b.node.recommendationRanking - a.node.recommendationRanking);

  createPage({
    path: '/',
    component: homePage,
    context: {
      ...context,
      listingAnchors: featuredSources,
      recommendedSnippets: transformSnippetIndex(featuredSnippets.slice(0, 10)),
    },
  });
};

export default createHomePage;
