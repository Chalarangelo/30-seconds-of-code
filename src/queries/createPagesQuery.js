export default `
  simpleSnippets: allSnippet(
    sort: {fields: id}, 
    filter: {code: {src: {ne: null}}}
  ) {
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
          style
          description
          fullDescription
        }
        code {
          src
          example
          style
        }
        expertise
        language {
          long
          short
          otherLanguages {
            short
            long
          }
        }
        archived
      }
    }
  }

  cssSnippets: allSnippet(
    sort: {fields: id},
    filter: {language: {short: {eq: "css"}}}
  ) {
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
          htmlCode
          cssCode
          jsCode
          browserSupport
          description
          fullDescription
        }
        code {
          html
          css
          js
          scopedCss
        }
        expertise
        browserSupport {
          supportPercentage
        }
        language {
          long
          short
        }
        archived
      }
    }
  }
`;
