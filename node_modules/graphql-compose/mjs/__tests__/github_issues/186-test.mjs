import { find, filter } from 'lodash'; // eslint-disable-line

import { SchemaComposer } from '../..';
describe('github issue #186: error when merging existing schema', () => {
  it('test graphql query', async () => {
    const composer = new SchemaComposer();
    composer.Query.addFields({
      test: {
        type: 'String!',
        resolve: () => 'test field value!'
      },
      test3: {
        type: 'Int',
        args: {
          a: `input Filter { min: Int }`
        }
      }
    });
    const composer2 = new SchemaComposer(composer.buildSchema());
    composer2.Query.addFields({
      test2: {
        type: 'String!',
        resolve: () => 'test2 field value!'
      }
    });
    expect(() => {
      composer2.buildSchema();
    }).not.toThrowError('Query.test should provide "deprecationReason" instead of "isDeprecated".');
  });
});