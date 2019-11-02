export default `
  searchIndex: allSnippet(
    sort: {fields: id}, 
    filter: {archived: {ne: true}}
  ) {
    edges {
      node {
        slug
        title
        html {
          description
        }
        tags {
          primary
        }
        expertise
        language {
          short
          long
        }
      }
    }
  }
`;
