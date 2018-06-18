const expect = require('expect');
const hashNode = require('./hashNode.js');

test('Testing hashNode', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof hashNode === 'function').toBeTruthy();
  hashNode(JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } })).then(v => expect(v).toBe('04aa106279f5977f59f9067fa9712afc4aedc6f5862a8defc34552d8c7206393'));
});
