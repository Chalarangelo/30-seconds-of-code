const test = require('tape');
const UUIDGeneratorNode = require('./UUIDGeneratorNode.js');

test('Testing UUIDGeneratorNode', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof UUIDGeneratorNode === 'function', 'UUIDGeneratorNode is a Function');
  //t.deepEqual(UUIDGeneratorNode(args..), 'Expected');
  //t.equal(UUIDGeneratorNode(args..), 'Expected');
  //t.false(UUIDGeneratorNode(args..), 'Expected');
  //t.throws(UUIDGeneratorNode(args..), 'Expected');
  t.end();
});