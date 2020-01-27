export default `
  images: allFile(filter: {relativePath: {regex: "/.(png|jpg)$/"}}) {
    edges {
      node {
        id
        absolutePath
        childImageSharp {
          fluid (maxWidth: 800, quality: 80) {
            src
          }
        }
      }
    }
  }
`;
