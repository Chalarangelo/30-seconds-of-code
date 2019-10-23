export default `
  {
    allSnippet(sort: {fields: id}) {
      edges {
        node {
          id
          slug
          tags {
            all
            primary
          }
          text {
            full
            short
          }
          title
          html {
            code
            example
            description
            fullDescription
          }
          code {
            src
            example
          }
          language {
            long
            short
          }
          archived
        }
      }
    }
  }
`;
