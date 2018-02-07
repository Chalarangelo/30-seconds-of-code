const test = require('tape');
const stableSort = require('./stableSort.js');

test('Testing stableSort', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof stableSort === 'function', 'stableSort is a Function');
  //t.deepEqual(stableSort(args..), 'Expected');
  //t.equal(stableSort(args..), 'Expected');
  //t.false(stableSort(args..), 'Expected');
  //t.throws(stableSort(args..), 'Expected');
  
  // test if js engine's Array#sort implementation is stable
  // https://gist.github.com/leeoniya/5816476
  const str = 'abcdefghijklmnopqrstuvwxyz';
  const compare = (a, b) => ~~(str.indexOf(b) / 2.3) - ~~(str.indexOf(a) / 2.3);

  const input = str.split('');
  const output = stableSort(input, compare);

  t.equal(output.join(''), 'xyzvwtursopqmnklhijfgdeabc');
  t.notDeepEqual(input, output);

  t.end();
});