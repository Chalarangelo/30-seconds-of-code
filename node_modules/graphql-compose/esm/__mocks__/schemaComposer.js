import { GraphQLInt, GraphQLString } from '../graphql';
import { schemaComposer } from '..';
schemaComposer.getOrCreateOTC('User', tc => tc.addFields({
  name: {
    type: GraphQLString
  },
  nickname: {
    type: GraphQLString
  },
  age: {
    type: GraphQLInt
  }
}));
export default schemaComposer;