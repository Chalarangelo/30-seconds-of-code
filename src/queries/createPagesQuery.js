export default `
  simpleSnippets: allSnippet(
    sort: {fields: id}, 
    filter: {code: {src: {ne: null}}}
  ) {
    edges {
      node {
        id
        slug
        url
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
        ranking
        firstSeen
        lastUpdated
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
        url
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
        ranking
        firstSeen
        lastUpdated
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

  blogSnippets: allSnippet(
    sort: {fields: firstSeen, order: DESC}, 
    filter: {blog: {eq: true}}
  ) {
    edges {
      node {
        id
        slug
        url
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
          description
          fullDescription
        }
        expertise
        ranking
        firstSeen
        lastUpdated
        archived
        authors {
          name
          profile
        }
        cover
        blog
      }
    }
  }
`;
