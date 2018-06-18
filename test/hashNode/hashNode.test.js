const expect = require('expect');
const hashNode = require('./hashNode.js');


  test('hashNode is a Function', () => {
  expect(hashNode).toBeInstanceOf(Function);
});
  hashNode(JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } })).then(v => t.equal(v, '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393', 'Produces the appropriate hash'));
  

