import { GraphQLScalarType, GraphQLSchema, GraphQLObjectType, GraphQLString, graphql } from '../../graphql';
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
    const CustomType = new GraphQLScalarType(typeConfig);
    schema = new GraphQLSchema({
      query: new GraphQLObjectType({
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
            type: GraphQLString,
            resolve: (_, args) => args.input
          }
        }
      })
    });
  });
  it('should use only `serialize` for data output', async () => {
    const res = await graphql({
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
  });
  it('should use only `parseValue` for arg defined as variable', async () => {
    const res = await graphql({
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
  });
  it('should use only `parseLiteral` for arg defined in query body', async () => {
    const res = await graphql({
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
  });
});