/**
 * Add custom field resolvers to the GraphQL schema.
 * Used to resolve the HTML parts of the Snippet nodes
 * asynchronously from the MarkdownRemark nodes.
 */
const createResolvers = resolvers => ({ createResolvers }) =>
  createResolvers({
    Snippet: {
      html: {
        resolve: async(source, _, context, info) => {
          const resolver = info.schema.getType('MarkdownRemark').getFields()['html'].resolve;
          const node = await context.nodeModel.nodeModel.nodeStore.getNodesByType('MarkdownRemark').filter(v => v.fileAbsolutePath.includes(source.id))[0];
          const args = {}; // arguments passed to the resolver
          const html = await resolver(node, args);
          return {
            full: `${html}`,
            ...resolvers[source.resolver](html),
          };
        },
      },
    },
  });

export default createResolvers;
