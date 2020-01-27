/**
 * Add custom field resolvers to the GraphQL schema.
 * Used to resolve the HTML parts of the Snippet nodes
 * asynchronously from the MarkdownRemark nodes.
 */
const createResolvers = resolvers => ({ createResolvers }) =>
  createResolvers({
    Snippet: {
      html: {
        type: `HtmlData`,
        resolve: async(source, _, context, info) => {
          const resolver = info.schema.getType('MarkdownRemark').getFields()['html'].resolve;
          const node = await context.nodeModel.getAllNodes({ type: 'MarkdownRemark' }).filter(v => v.fileAbsolutePath.includes(`${source.id}.md`))[0];
          const args = {}; // arguments passed to the resolver
          const html = await resolver(node, args);
          return {
            full: `${html}`,
            ...resolvers[source.resolver](html, source),
          };
        },
      },
    },
  });

export default createResolvers;
