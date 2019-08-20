"use strict";

const getOrCreateNodeInterface = schemaComposer => {
  // TODO: why is `mediaType` on Internal? Applies only to File!?
  // `fieldOwners` is an object
  // Should we drop ignoreType?
  const internalTC = schemaComposer.getOrCreateOTC(`Internal`, tc => {
    tc.addFields({
      content: `String`,
      contentDigest: `String!`,
      description: `String`,
      fieldOwners: [`String`],
      ignoreType: `Boolean`,
      mediaType: `String`,
      owner: `String!`,
      type: `String!`
    }); // TODO: Can be removed with graphql-compose 5.11

    tc.getInputTypeComposer();
  });
  const nodeInterfaceTC = schemaComposer.getOrCreateIFTC(`Node`, tc => {
    tc.setDescription(`Node Interface`);
    tc.addFields({
      id: `ID!`,
      parent: {
        type: `Node`,
        resolve: (source, args, context, info) => {
          const {
            path
          } = context;
          return context.nodeModel.getNodeById({
            id: source.parent
          }, {
            path
          });
        }
      },
      children: {
        type: `[Node!]!`,
        resolve: (source, args, context, info) => {
          const {
            path
          } = context;
          return context.nodeModel.getNodesByIds({
            ids: source.children
          }, {
            path
          });
        }
      },
      internal: internalTC.getTypeNonNull()
    }); // TODO: In Gatsby v2, the NodeInput.id field is of type String, not ID.
    // Remove this workaround for v3.

    const nodeInputTC = tc.getInputTypeComposer();
    nodeInputTC.extendField(`id`, {
      type: `String`
    });
  });
  return nodeInterfaceTC;
};

const addNodeInterface = ({
  schemaComposer,
  typeComposer
}) => {
  const nodeInterfaceTC = getOrCreateNodeInterface(schemaComposer);
  typeComposer.addInterface(nodeInterfaceTC);
  addNodeInterfaceFields({
    schemaComposer,
    typeComposer
  });
};

const addNodeInterfaceFields = ({
  schemaComposer,
  typeComposer
}) => {
  const nodeInterfaceTC = getOrCreateNodeInterface(schemaComposer);
  typeComposer.addFields(nodeInterfaceTC.getFields());
  nodeInterfaceTC.setResolveType(node => node.internal.type);
  schemaComposer.addSchemaMustHaveType(typeComposer);
};

const getNodeInterface = ({
  schemaComposer
}) => getOrCreateNodeInterface(schemaComposer);

module.exports = {
  addNodeInterface,
  addNodeInterfaceFields,
  getNodeInterface
};
//# sourceMappingURL=node-interface.js.map