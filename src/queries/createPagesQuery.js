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
          description
          fullDescription
        }
        code {
          src
          example
        }
        expertise
        language {
          long
          short
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
