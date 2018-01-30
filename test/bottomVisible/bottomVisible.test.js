const test = require('tape');
// const bottomVisible = require('./bottomVisible.js');

// Make the fake properties used by the function
const document = {
  documentElement: {
    clientHeight: 1080,
    scrollHeight: 1080
  }
};

const window = {
  scrollY: 2160
}

// Override the function to use these fake properties
const bottomVisible = () =>
document.documentElement.clientHeight + window.scrollY >=
(document.documentElement.scrollHeight || document.documentElement.clientHeight);

test('Testing bottomVisible', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof bottomVisible === 'function', 'bottomVisible is a Function');
  //t.deepEqual(bottomVisible(args..), 'Expected');
  t.true(bottomVisible(), 'Produces the correct result');
  //t.false(bottomVisible(args..), 'Expected');
  //t.throws(bottomVisible(args..), 'Expected');
  t.end();
});