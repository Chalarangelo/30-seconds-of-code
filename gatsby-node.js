const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const config = require('./config');

const { getTextualContent, getCodeBlocks, optimizeAllNodes  } = require(`./src/docs/util`);

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
      html: HtmlData
      tags: TagData
      title: String
      code: CodeData
      id: String
      slug: String
      path: String
      text: TextData
    }

    type HtmlData @infer {
      full: String
      text: String
      code: String
      example: String
    }

    type CodeData @infer {
      src: String
      example: String
    }

    type TextData @infer {
      full: String
      short: String
    }

    type TagData @infer {
      primary: String
      all: [String]
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
      tags: {
        all: sNode.attributes.tags,
        primary: sNode.attributes.tags[0]
      },
      title: mNode.frontmatter.title,
      code: {
        src: sNode.attributes.codeBlocks.es6,
        example: sNode.attributes.codeBlocks.example
      },
      slug: mNode.fields.slug,
      path: mNode.fileAbsolutePath,
      text: {
        full: sNode.attributes.text,
        short: sNode.attributes.text.slice(0, sNode.attributes.text.indexOf('\n\n'))
      }
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
        return {
          full: `${html}`,
          text: `${getTextualContent(html)}`,
          code: `${optimizeAllNodes(getCodeBlocks(html).code)}`,
          example: `${optimizeAllNodes(getCodeBlocks(html).example)}`
        };
      }
    }
  }
});
