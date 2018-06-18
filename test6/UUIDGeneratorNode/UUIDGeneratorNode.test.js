const expect = require('expect');
const UUIDGeneratorNode = require('./UUIDGeneratorNode.js');

test('Testing UUIDGeneratorNode', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof UUIDGeneratorNode === 'function').toBeTruthy();
  const uuid = UUIDGeneratorNode();
  expect([uuid[8], uuid[13], uuid[18], uuid[23]]).toEqual(['-', '-', '-', '-']);
  expect(/^[0-9A-Fa-f-]+$/.test(uuid)).toBeTruthy();
});
