"use strict";

const {
  getNamedType,
  getNullableType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLList,
  isSpecifiedScalarType
} = require(`graphql`);

const {
  InputTypeComposer
} = require(`graphql-compose`);

const {
  GraphQLJSON
} = require(`graphql-compose`);

const {
  GraphQLDate
} = require(`./date`);

const convert = ({
  schemaComposer,
  inputTypeComposer,
  filterInputComposer
}) => {
  const inputTypeName = inputTypeComposer.getTypeName().replace(/Input$/, `FilterInput`);
  let convertedITC;

  if (filterInputComposer) {
    convertedITC = filterInputComposer;
  } else if (schemaComposer.has(inputTypeName)) {
    return schemaComposer.getITC(inputTypeName);
  } else {
    convertedITC = new InputTypeComposer(new GraphQLInputObjectType({
      name: inputTypeName,
      fields: {}
    }), schemaComposer);
  }

  schemaComposer.addAsComposer(convertedITC);
  const fieldNames = inputTypeComposer.getFieldNames();
  const convertedFields = {};
  fieldNames.forEach(fieldName => {
    const fieldConfig = inputTypeComposer.getFieldConfig(fieldName);
    const type = getNamedType(fieldConfig.type);

    if (type instanceof GraphQLInputObjectType) {
      const itc = new InputTypeComposer(type, schemaComposer);
      const operatorsInputTC = convert({
        schemaComposer,
        inputTypeComposer: itc
      }); // TODO: array of arrays?

      const isListType = getNullableType(fieldConfig.type) instanceof GraphQLList; // elemMatch operator

      convertedFields[fieldName] = isListType ? getQueryOperatorListInput({
        schemaComposer,
        inputTypeComposer: operatorsInputTC
      }) : operatorsInputTC;
    } else {
      // GraphQLScalarType || GraphQLEnumType
      const operatorFields = getQueryOperatorInput({
        schemaComposer,
        type
      });

      if (operatorFields) {
        convertedFields[fieldName] = operatorFields;
      }
    }
  });
  convertedITC.addFields(convertedFields);
  return convertedITC;
};

const removeEmptyFields = ({
  schemaComposer,
  inputTypeComposer
}, cache = new Set()) => {
  const convert = itc => {
    if (cache.has(itc)) {
      return itc;
    }

    cache.add(itc);
    const fields = itc.getFields();
    const nonEmptyFields = {};
    Object.keys(fields).forEach(fieldName => {
      const fieldITC = fields[fieldName];

      if (fieldITC instanceof InputTypeComposer) {
        const convertedITC = convert(fieldITC);

        if (convertedITC.getFieldNames().length) {
          nonEmptyFields[fieldName] = convertedITC;
        }
      } else {
        nonEmptyFields[fieldName] = fieldITC;
      }
    });
    itc.setFields(nonEmptyFields);
    return itc;
  };

  return convert(inputTypeComposer);
};

const getFilterInput = ({
  schemaComposer,
  typeComposer
}) => {
  const typeName = typeComposer.getTypeName();
  const filterInputComposer = schemaComposer.getOrCreateITC(`${typeName}FilterInput`);
  const inputTypeComposer = typeComposer.getInputTypeComposer(); // TODO: In Gatsby v2, the NodeInput.id field is of type String, not ID.
  // Remove this workaround for v3.

  if (inputTypeComposer.hasField(`id`) && getNamedType(inputTypeComposer.getFieldType(`id`)).name === `ID`) {
    inputTypeComposer.extendField(`id`, {
      type: `String`
    });
  }

  const filterInputTC = convert({
    schemaComposer,
    inputTypeComposer,
    filterInputComposer
  });
  return removeEmptyFields({
    schemaComposer,
    inputTypeComposer: filterInputTC
  });
};

module.exports = {
  getFilterInput
};
const EQ = `eq`;
const NE = `ne`;
const GT = `gt`;
const GTE = `gte`;
const LT = `lt`;
const LTE = `lte`;
const IN = `in`;
const NIN = `nin`;
const REGEX = `regex`;
const GLOB = `glob`;
const ALLOWED_OPERATORS = {
  Boolean: [EQ, NE, IN, NIN],
  Date: [EQ, NE, GT, GTE, LT, LTE, IN, NIN],
  Float: [EQ, NE, GT, GTE, LT, LTE, IN, NIN],
  ID: [EQ, NE, IN, NIN],
  Int: [EQ, NE, GT, GTE, LT, LTE, IN, NIN],
  JSON: [EQ, NE, IN, NIN, REGEX, GLOB],
  String: [EQ, NE, IN, NIN, REGEX, GLOB],
  Enum: [EQ, NE, IN, NIN],
  CustomScalar: [EQ, NE, IN, NIN]
};
const ARRAY_OPERATORS = [IN, NIN];

const getOperatorFields = (fieldType, operators) => {
  const result = {};
  operators.forEach(op => {
    if (ARRAY_OPERATORS.includes(op)) {
      result[op] = [fieldType];
    } else {
      result[op] = fieldType;
    }
  });
  return result;
};

const getQueryOperatorInput = ({
  schemaComposer,
  type
}) => {
  let typeName;

  if (type instanceof GraphQLEnumType) {
    typeName = `Enum`;
  } else if (isBuiltInScalarType(type)) {
    typeName = type.name;
  } else {
    typeName = `CustomScalar`;
  }

  const operators = ALLOWED_OPERATORS[typeName];
  return schemaComposer.getOrCreateITC(type.name + `QueryOperatorInput`, itc => itc.addFields(getOperatorFields(type, operators)));
};

const getQueryOperatorListInput = ({
  schemaComposer,
  inputTypeComposer
}) => {
  const typeName = inputTypeComposer.getTypeName().replace(/Input/, `ListInput`);
  return schemaComposer.getOrCreateITC(typeName, itc => {
    itc.addFields({
      elemMatch: inputTypeComposer
    });
  });
};

const isBuiltInScalarType = type => isSpecifiedScalarType(type) || type === GraphQLDate || type === GraphQLJSON;
//# sourceMappingURL=filter.js.map