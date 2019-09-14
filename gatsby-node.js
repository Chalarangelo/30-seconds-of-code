const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const config = require('./config');

const requirables = [];

config.requirables.forEach(fileName => {
  requirables.push(require(`./snippet_data/${fileName}`));
})

const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
/*
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const snippetPage = path.resolve(`./src/docs/templates/SnippetPage.js`);
  const tagPage = path.resolve(`./src/docs/templates/TagPage.js`);
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
    `,
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    // Create individual snippet pages.
    const snippets = result.data.allMarkdownRemark.edges;

    snippets.forEach((post, index) => {
      if(post.node.fileAbsolutePath.indexOf('README') !== -1)
        return;
      if (post.node.fileAbsolutePath.indexOf(config.snippetArchivePath) === -1)
        createPage({
          path: `/snippet${post.node.fields.slug}`,
          component: snippetPage,
          context: {
            slug: post.node.fields.slug,
            scope: `./snippets`,
          },
        });
      else
        createPage({
          path: `/archive${post.node.fields.slug}`,
          component: snippetPage,
          context: {
            slug: post.node.fields.slug,
            scope: `./snippets_archive`,
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

    createPage({
      path: `/beginner`,
      component: tagPage,
      context: {
        tag: `beginner snippets`,
        tagRegex: `/beginner/`,
      },
    });

    return null;
  });
};
*/
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField, createNode } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }

};

exports.sourceNodes = ({ actions, createNodeId, createContentDigest, getNodesByType }) => {
  const { createTypes, createNode } = actions;
  const typeDefs = `
    type Snippet implements Node {
      html: String
      tags: [String]
      title: String
      code: String
      id: String
    }
  `;
  createTypes(typeDefs);

  const markdownNodes = getNodesByType('MarkdownRemark');

  const snippetNodes = requirables
    .reduce((acc, sArr) => {
      return ({
        ...acc,
        ...sArr.data.reduce((snippets, snippet) => {
          return ({
            ...snippets,
            [snippet.id]: snippet
          });
        }, {})
      });
    }, {});

  Object.entries(snippetNodes).forEach(([id, sNode]) => {
    let mNode = markdownNodes.find(mN => mN.frontmatter.title === id);
    let nodeContent = {
      id,
      html: mNode.html,
      tags: sNode.attributes.tags,
      title: mNode.frontmatter.title,
      code: sNode.attributes.codeBlocks.es6
    };
    createNode({
      id: createNodeId(`snippet-${sNode.meta.hash}`),
      parent: null,
      children: [],
      internal: {
        type: 'Snippet',
        content: JSON.stringify(nodeContent),
        contentDigest: createContentDigest(nodeContent)
      },
      ...nodeContent
    });
  });

};

exports.createResolvers = ({ createResolvers }) => createResolvers({
  Snippet: {
    html: {
      resolve: async (source, _, context, info) => {
        const resolver = info.schema.getType("MarkdownRemark").getFields()["html"].resolve;
        const node = await context.nodeModel.nodeStore.getNodesByType('MarkdownRemark').filter(v => v.frontmatter.title === source.title)[0];
        const args = {}; // arguments passed to the resolver
        const html = await resolver(node, args);
        return html;
      }
    }
  }
});
