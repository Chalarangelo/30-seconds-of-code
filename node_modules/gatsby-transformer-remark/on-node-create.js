"use strict";

const grayMatter = require(`gray-matter`);

const _ = require(`lodash`);

module.exports = async function onCreateNode({
  node,
  loadNodeContent,
  actions,
  createNodeId,
  reporter,
  createContentDigest
}, pluginOptions) {
  const {
    createNode,
    createParentChildLink
  } = actions; // We only care about markdown content.

  if (node.internal.mediaType !== `text/markdown` && node.internal.mediaType !== `text/x-markdown`) {
    return {};
  }

  const content = await loadNodeContent(node);

  try {
    let data = grayMatter(content, pluginOptions);

    if (data.data) {
      data.data = _.mapValues(data.data, value => {
        if (_.isDate(value)) {
          return value.toJSON();
        }

        return value;
      });
    }

    let markdownNode = {
      id: createNodeId(`${node.id} >>> MarkdownRemark`),
      children: [],
      parent: node.id,
      internal: {
        content: data.content,
        type: `MarkdownRemark`
      }
    };
    markdownNode.frontmatter = Object.assign({
      title: ``
    }, data.data);
    markdownNode.excerpt = data.excerpt;
    markdownNode.rawMarkdownBody = data.content; // Add path to the markdown file path

    if (node.internal.type === `File`) {
      markdownNode.fileAbsolutePath = node.absolutePath;
    }

    markdownNode.internal.contentDigest = createContentDigest(markdownNode);
    createNode(markdownNode);
    createParentChildLink({
      parent: node,
      child: markdownNode
    });
    return markdownNode;
  } catch (err) {
    reporter.panicOnBuild(`Error processing Markdown ${node.absolutePath ? `file ${node.absolutePath}` : `in node ${node.id}`}:\n
      ${err.message}`);
    return {}; // eslint
  }
};