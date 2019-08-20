import { SchemaComposer } from '..';
describe('Flowtype tests', () => {
  it('TContext validation tests', () => {
    const sc = new SchemaComposer();
    const UserTC = sc.createObjectTC('User');
    UserTC.addResolver({
      name: 'findOne',
      resolve: ({
        context
      }) => {
        context.a; // $FlowFixMe property `c2` not found in Context

        context.c2;
      }
    }); //
    //

    const sc2 = new SchemaComposer();
    const UserTC2 = sc2.createObjectTC('User');
    UserTC2.addResolver({
      name: 'findOne',
      resolve: ({
        context
      }) => {
        // $FlowFixMe property `a` not found in Context2
        context.a;
        context.c2;
      }
    });
  });
});