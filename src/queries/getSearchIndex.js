export default `
  searchIndex: allSnippet(
    sort: {fields: ranking, order: DESC}
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
          short
          long
        }
        icon
        searchTokens
      }
    }
  }
`;
