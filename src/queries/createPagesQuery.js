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
            full
            text
            fullText
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
