/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Make sure to run node with --expose-gc option!

// The times are reliable if about 1% relative mean error if you run it:

// * immediately after restart
// * with 100% battery charge
// * not connected to network

/* eslint import/no-extraneous-dependencies: "off" */

const Benchmark = require('benchmark');

const diffBaseline = require('diff').diffLines;
const diffImproved = require('../build/index.js').default;

const testBaseline = (a, b) => {
  const benchmark = new Benchmark({
    fn() {
      diffBaseline(a, b);
    },
    name: 'baseline',
    onCycle() {
      global.gc(); // after run cycle
    },
    onStart() {
      global.gc(); // when benchmark starts
    },
  });

  benchmark.run({async: false});

  return benchmark.stats;
};

const testImproved = function(a, b) {
  const benchmark = new Benchmark({
    fn() {
      // Split string arguments to make fair comparison with baseline.
      const aItems = a.split('\n');
      const bItems = b.split('\n');

      const isCommon = (aIndex, bIndex) => aItems[aIndex] === bItems[bIndex];

      // This callback obviously does less than baseline `diff` package,
      // but avoiding double work and memory churn is the goal.
      // For example, `jest-diff` has had to split strings that `diff` joins.
      const foundSubsequence = () => {};

      diffImproved(aItems.length, bItems.length, isCommon, foundSubsequence);
    },
    name: 'improved',
    onCycle() {
      global.gc(); // after run cycle
    },
    onStart() {
      global.gc(); // when benchmark starts
    },
  });

  benchmark.run({async: false});

  return benchmark.stats;
};

const writeHeading2 = () => {
  console.log('## Benchmark time for `diff-sequences` versus `diff`\n');
  console.log('A ratio less than 1.0 means `diff-sequences` is faster.');
};

const writeHeading3 = n => {
  console.log(`\n### n = ${n}\n`);
  console.log('| name | % | ratio | improved | rme | baseline | rme |');
  console.log('| :--- | ---: | :--- | :--- | ---: | :--- | ---: |');
};

const writeRow = (name, percent, statsImproved, statsBaseline) => {
  const {mean: meanImproved, rme: rmeImproved} = statsImproved;
  const {mean: meanBaseline, rme: rmeBaseline} = statsBaseline;
  const ratio = meanImproved / meanBaseline;

  console.log(
    `| ${name} | ${percent}% | ${ratio.toFixed(
      4,
    )} | ${meanImproved.toExponential(4)} | ${rmeImproved.toFixed(
      2,
    )}% | ${meanBaseline.toExponential(4)} | ${rmeBaseline.toFixed(2)}% |`,
  );
};

const testDeleteInsert = (tenths, more, less) => {
  // For improved `diff-sequences` package, delete is often slower than insert.
  const statsDeleteImproved = testImproved(more, less);
  const statsDeleteBaseline = testBaseline(more, less);
  writeRow('delete', tenths * 10, statsDeleteImproved, statsDeleteBaseline);

  // For baseline `diff` package, many insertions is serious perf problem.
  // However, the benchmark package cannot accurately measure for large n.
  const statsInsertBaseline = testBaseline(less, more);
  const statsInsertImproved = testImproved(less, more);
  writeRow('insert', tenths * 10, statsInsertImproved, statsInsertBaseline);
};

const testChange = (tenths, expected, received) => {
  const statsImproved = testImproved(expected, received);
  const statsBaseline = testBaseline(expected, received);
  writeRow('change', tenths * 10, statsImproved, statsBaseline);
};

const getItems = (n, callback) => {
  const items = [];

  for (let i = 0; i !== n; i += 1) {
    const item = callback(i);
    if (typeof item === 'string') {
      items.push(item);
    }
  }

  return items.join('\n');
};

// Simulate change of property name which is usually not same line.
// Expected: 0 1 2 3 4 5 6 7 8 9 and so on
// Received: 1 2 3 4 x0 5 6 7 8 9 and so on
const change2 = i => {
  const j = i % 10;
  return j === 4 ? `x${i - 4}` : j < 4 ? `${i + 1}` : `${i}`;
};

const testLength = n => {
  const all = getItems(n, i => `${i}`);

  writeHeading3(n);

  [2, 4, 8].forEach(tenth => {
    testDeleteInsert(tenth, all, getItems(n, i => i % 10 >= tenth && `${i}`));
  });
  testChange(1, all, getItems(n, i => (i % 10 === 0 ? `x${i}` : `${i}`)));
  testChange(2, all, getItems(n, change2));
  testChange(5, all, getItems(n, i => (i % 2 === 0 ? `x${i}` : `${i}`)));
  testChange(10, all, getItems(n, i => `x${i}`)); // simulate TDD
};

writeHeading2();

testLength(20);
testLength(200);
testLength(2000);
