import { graphql } from '../../graphql';
import { getProjectionFromAST, extendByFieldProjection } from '../projection';
import { schemaComposer } from '../..';
const Level2TC = schemaComposer.createObjectTC({
  name: 'Level2',
  fields: {
    field2a: 'String',
    field2b: 'Int',
    withProjection2: {
      type: 'Int',
      projection: {
        field2b: true
      }
    }
  }
});
const Level1TC = schemaComposer.createObjectTC({
  name: 'Level1',
  fields: {
    field1a: [Level2TC],
    field1b: 'Int',
    withProjection1: {
      type: 'Int',
      projection: {
        field1b: true,
        field1a: {
          field2a: true
        }
      }
    },
    withProjectionExtension: {
      type: 'Int',
      extensions: {
        projection: {
          field1b: true,
          field1a: {
            field2a: true
          }
        }
      }
    }
  }
});
const resolve = jest.fn(() => ({}));
schemaComposer.Query.addFields({
  field0: {
    type: Level1TC,
    resolve
  }
});
const schema = schemaComposer.buildSchema();

const getResolveInfo = async query => {
  resolve.mockClear();
  const res = await graphql(schema, query);

  if (res && res.errors) {
    throw new Error(res.errors[0]);
  }

  return resolve.mock.calls[0][3];
};

describe('projection', () => {
  describe('getProjectionFromAST()', () => {
    it('simple query', async () => {
      const info = await getResolveInfo(`
        query {
          field0 {
            field1a { field2a }
            field1b
          }
        }
      `);
      expect(getProjectionFromAST(info)).toEqual({
        field1a: {
          field2a: {}
        },
        field1b: {}
      });
    });
    it('inline fragments', async () => {
      const info = await getResolveInfo(`
        query {
          field0 {
            field1a { field2a }
            ... {
              field1a { field2b }
              field1b
            }
          }
        }
      `);
      expect(getProjectionFromAST(info)).toEqual({
        field1a: {
          field2a: {},
          field2b: {}
        },
        field1b: {}
      });
    });
    it('fragment spreads', async () => {
      const info = await getResolveInfo(`
        query {
          field0 {
            ...Frag
            field1b
          }
        }

        fragment Frag on Level1 {
          field1a {
            field2b
          }
        }
      `);
      expect(getProjectionFromAST(info)).toEqual({
        field1a: {
          field2b: {}
        },
        field1b: {}
      });
    });
    it('fragment spreads with deep merge', async () => {
      const info = await getResolveInfo(`
        query {
          field0 {
            ...Frag
            field1a {
              field2a
            }
          }
        }

        fragment Frag on Level1 {
          field1a {
            field2b
          }
        }
      `);
      expect(getProjectionFromAST(info)).toEqual({
        field1a: {
          field2a: {},
          field2b: {}
        }
      });
    });
    it('extend by field.projection', async () => {
      const info = await getResolveInfo(`
        query {
          field0 {
            withProjection1
          }
        }
      `);
      expect(getProjectionFromAST(info)).toEqual({
        withProjection1: {},
        field1b: true,
        field1a: {
          field2a: true
        }
      });
    });
    it('extend by field.projection deep', async () => {
      const info = await getResolveInfo(`
        query {
          field0 {
            field1a {
              withProjection2
            }
          }
        }
      `); // console.dir(info, { colors: true, depth: 3 });

      expect(getProjectionFromAST(info)).toEqual({
        field1a: {
          withProjection2: {},
          field2b: true
        }
      });
    });
  });
  it('extend by projection extension', async () => {
    const info = await getResolveInfo(`
        query {
          field0 {
            withProjectionExtension
          }
        }
      `);
    expect(getProjectionFromAST(info)).toEqual({
      withProjectionExtension: {},
      field1b: true,
      field1a: {
        field2a: true
      }
    });
  });
  describe('extendByFieldProjection()', () => {
    it('first level', () => {
      const type = schema.getType('Level1');
      const projection = {
        withProjection1: true
      };
      expect(extendByFieldProjection(type, projection)).toEqual({
        field1a: {
          field2a: true
        },
        field1b: true,
        withProjection1: true
      });
    });
    it('second level', () => {
      const type = schema.getType('Level1');
      const projection = {
        field1a: {
          withProjection2: {}
        }
      };
      expect(extendByFieldProjection(type, projection)).toEqual({
        field1a: {
          field2b: true,
          withProjection2: {}
        }
      });
    });
  });
});