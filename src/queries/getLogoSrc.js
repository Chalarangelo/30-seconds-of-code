export default `
  logoSrc: file(relativePath: { eq: "30s-icon.png" }) {
    id
    childImageSharp {
      original {
        src
      }
    }
  }
`;
