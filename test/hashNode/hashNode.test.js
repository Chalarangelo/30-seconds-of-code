const test = require('tape');
const hashNode = require('./hashNode.js');

test('Testing hashNode', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof hashNode === 'function', 'hashNode is a Function');
  hashNode(JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } })).then(v => t.equal(v, '04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393', 'Produces the appropriate hash'));
  //t.deepEqual(hashNode(args..), 'Expected');
  //t.equal(hashNode(args..), 'Expected');
  //t.false(hashNode(args..), 'Expected');
  //t.throws(hashNode(args..), 'Expected');
  t.end();
});
