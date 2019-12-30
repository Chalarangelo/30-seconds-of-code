export default `
  searchIndex: allSnippet(
    sort: {fields: ranking, order: DESC}, 
    filter: {archived: {ne: true}}
  ) {
    edges {
      node {
        slug
        blog
        title
        html {
          description
        }
        tags {
          primary
          all
        }
        expertise
        language {
          long
        }
        searchTokens
        recommendationRanking
      }
    }
  }
`;
