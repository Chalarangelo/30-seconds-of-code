const test = require('tape');
const arrayToHtmlList = require('./arrayToHtmlList.js');

test('Testing arrayToHtmlList', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof arrayToHtmlList === 'function', 'arrayToHtmlList is a Function');
  t.pass('Tested by @chalarangelo on 16/02/2018');
  //t.deepEqual(arrayToHtmlList(args..), 'Expected');
  //t.equal(arrayToHtmlList(args..), 'Expected');
  //t.false(arrayToHtmlList(args..), 'Expected');
  //t.throws(arrayToHtmlList(args..), 'Expected');
  t.end();
});
