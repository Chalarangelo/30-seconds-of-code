const expect = require('expect');
const bindAll = require('./bindAll.js');

test('Testing bindAll', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof bindAll === 'function').toBeTruthy();
  var view = {
    label: 'docs',
    'click': function() {
      return 'clicked ' + this.label;
    }
  };
  bindAll(view, 'click');
  expect(view.click()).toBe('clicked docs');
});
