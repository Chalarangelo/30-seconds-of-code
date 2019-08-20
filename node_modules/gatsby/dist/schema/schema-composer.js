"use strict";

const {
  SchemaComposer,
  GraphQLJSON
} = require(`graphql-compose`);

const {
  getNodeInterface
} = require(`./types/node-interface`);

const {
  GraphQLDate
} = require(`./types/date`);

const {
  addDirectives
} = require(`./extensions`);

const createSchemaComposer = ({
  fieldExtensions
} = {}) => {
  const schemaComposer = new SchemaComposer(); // Workaround, mainly relevant in testing
  // See https://github.com/graphql-compose/graphql-compose/commit/70995f7f4a07996cfbe92ebf19cae5ee4fa74ea2
  // This is fixed in v7, so can be removed once we upgrade

  const {
    BUILT_IN_DIRECTIVES
  } = require(`graphql-compose/lib/SchemaComposer`);

  schemaComposer._directives = [...BUILT_IN_DIRECTIVES];
  getNodeInterface({
    schemaComposer
  });
  schemaComposer.addAsComposer(GraphQLDate);
  schemaComposer.addAsComposer(GraphQLJSON);
  addDirectives({
    schemaComposer,
    fieldExtensions
  });
  return schemaComposer;
};

module.exports = {
  createSchemaComposer
};
//# sourceMappingURL=schema-composer.js.map