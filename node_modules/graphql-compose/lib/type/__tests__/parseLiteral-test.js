"use strict";

var _graphql = require("../../graphql");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('check how works parse methods in GraphQLScalarType', () => {
  let typeConfig;
  let schema;
  beforeEach(() => {
    typeConfig = {
      name: 'Custom',
      serialize: jest.fn(value => value),
      parseValue: jest.fn(value => value),
      parseLiteral: jest.fn(ast => ast.value)
    };
    const CustomType = new _graphql.GraphQLScalarType(typeConfig);
    schema = new _graphql.GraphQLSchema({
      query: new _graphql.GraphQLObjectType({
        name: 'Query',
        fields: {
          get: {
            type: CustomType,
            resolve: () => 'ok'
          },
          set: {
            args: {
              input: {
                type: CustomType
              }
            },
            type: _graphql.GraphQLString,
            resolve: (_, args) => args.input
          }
        }
      })
    });
  });
  it('should use only `serialize` for data output',
  /*#__PURE__*/
  _asyncToGenerator(function* () {
    const res = yield (0, _graphql.graphql)({
      schema,
      source: `
        query {
          get
        }
      `
    });
    expect(res).toEqual({
      data: {
        get: 'ok'
      }
    });
    expect(typeConfig.serialize).toHaveBeenCalledWith('ok');
    expect(typeConfig.parseValue).not.toHaveBeenCalled();
    expect(typeConfig.parseLiteral).not.toHaveBeenCalled();
  }));
  it('should use only `parseValue` for arg defined as variable',
  /*#__PURE__*/
  _asyncToGenerator(function* () {
    const res = yield (0, _graphql.graphql)({
      schema,
      source: `
        query($input: Custom) {
          set(input: $input)
        }
      `,
      variableValues: {
        input: 123
      }
    });
    expect(res).toEqual({
      data: {
        set: '123'
      }
    });
    expect(typeConfig.serialize).not.toHaveBeenCalled();
    expect(typeConfig.parseValue).toHaveBeenCalledWith(123);
    expect(typeConfig.parseLiteral).not.toHaveBeenCalled();
  }));
  it('should use only `parseLiteral` for arg defined in query body',
  /*#__PURE__*/
  _asyncToGenerator(function* () {
    const res = yield (0, _graphql.graphql)({
      schema,
      source: `
        query {
          set(input: 456)
        }
      `
    });
    expect(res).toEqual({
      data: {
        set: '456'
      }
    });
    expect(typeConfig.serialize).not.toHaveBeenCalled();
    expect(typeConfig.parseValue).not.toHaveBeenCalled();
    expect(typeConfig.parseLiteral).toHaveBeenCalledWith({
      kind: 'IntValue',
      loc: expect.anything(),
      value: '456'
    }, {});
  }));
});