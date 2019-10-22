
const path = require(`path`);
const {onCreateNode} = require(`./src/functions/build`);
const { createFilePath } = require(`gatsby-source-filesystem`);

const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const snippetPage = path.resolve(`./src/templates/snippetPage/index.jsx`);
  const tagPage = path.resolve(`./src/templates/tagPage/index.jsx`);
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___title], order: ASC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
              }
              fileAbsolutePath
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors)
      throw result.errors;


    // Create individual snippet pages.
    const snippets = result.data.allMarkdownRemark.edges;
    /* eslint-disable-next-line */
    snippets.forEach((post, index) => {
      if (post.node.fileAbsolutePath.indexOf('README') !== -1)
        return;
      createPage({
        path: `/snippet${post.node.fields.slug}`,
        component: snippetPage,
        context: {
          slug: post.node.fields.slug,
        },
      });
    });

    // Create tag pages.
    const tags = snippets.reduce((acc, post) => {
      if (!post.node.frontmatter || !post.node.frontmatter.tags) return acc;
      const primaryTag = post.node.frontmatter.tags.split(',')[0];
      if (!acc.includes(primaryTag)) acc.push(primaryTag);
      return acc;
    }, []);

    tags.forEach(tag => {
      const tagPath = `/tag/${toKebabCase(tag)}/`;
      const tagRegex = `/^\\s*${tag}/`;
      createPage({
        path: tagPath,
        component: tagPage,
        context: {
          tag,
          tagRegex,
        },
      });
    });

    return null;
  });
};

exports.onCreateNode = onCreateNode;
