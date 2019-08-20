import { schemaComposer } from '../..';
export const resolver = schemaComposer.createResolver({
  name: 'findMany',
  kind: 'query',
  type: 'String',
  args: {
    filter: 'JSON',
    limit: 'Int',
    skip: 'Int'
  },
  resolve: () => Promise.resolve(123)
});
export const UserTC = schemaComposer.createObjectTC(`
  type User {
    id: Int
    name: String
    age: Int
    gender: String
  }
`);