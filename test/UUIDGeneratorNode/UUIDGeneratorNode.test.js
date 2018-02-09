const test = require('tape');
const UUIDGeneratorNode = require('./UUIDGeneratorNode.js');

test('Testing UUIDGeneratorNode', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof UUIDGeneratorNode === 'function', 'UUIDGeneratorNode is a Function');
  const uuid = UUIDGeneratorNode();
  t.deepEqual([uuid[8], uuid[13], uuid[18], uuid[23]], ['-', '-', '-', '-'], 'Contains dashes in the proper places');
  t.true(/^[0-9A-Fa-f-]+$/.test(uuid), 'Only contains hexadecimal digits');
  //t.deepEqual(UUIDGeneratorNode(args..), 'Expected');
  //t.equal(UUIDGeneratorNode(args..), 'Expected');
  //t.false(UUIDGeneratorNode(args..), 'Expected');
  //t.throws(UUIDGeneratorNode(args..), 'Expected');
  t.end();
});
