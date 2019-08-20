"use strict";

const GatsbyGraphQLTypeKind = {
  OBJECT: `OBJECT`,
  INPUT_OBJECT: `INPUT_OBJECT`,
  UNION: `UNION`,
  INTERFACE: `INTERFACE`,
  ENUM: `ENUM`,
  SCALAR: `SCALAR`
};

const buildObjectType = config => {
  return {
    kind: GatsbyGraphQLTypeKind.OBJECT,
    config
  };
};

const buildUnionType = config => {
  return {
    kind: GatsbyGraphQLTypeKind.UNION,
    config
  };
};

const buildInterfaceType = config => {
  return {
    kind: GatsbyGraphQLTypeKind.INTERFACE,
    config
  };
};

const buildInputObjectType = config => {
  return {
    kind: GatsbyGraphQLTypeKind.INPUT_OBJECT,
    config
  };
};

const buildEnumType = config => {
  return {
    kind: GatsbyGraphQLTypeKind.ENUM,
    config
  };
};

const buildScalarType = config => {
  return {
    kind: GatsbyGraphQLTypeKind.SCALAR,
    config
  };
};

const isGatsbyType = something => typeof something === `object` && something.kind && GatsbyGraphQLTypeKind[something.kind];

module.exports = {
  GatsbyGraphQLTypeKind,
  buildObjectType,
  buildUnionType,
  buildInterfaceType,
  buildInputObjectType,
  buildEnumType,
  buildScalarType,
  isGatsbyType
};
//# sourceMappingURL=type-builders.js.map