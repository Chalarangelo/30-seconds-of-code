const expect = require('expect');
const bindAll = require('./bindAll.js');

test('bindAll is a Function', () => {
  expect(bindAll).toBeInstanceOf(Function);
});
var view = {
  label: 'docs',
  'click': function() {
    return 'clicked ' + this.label;
  }
};
bindAll(view, 'click');
test('Binds to an object context', () => {
  expect(view.click()).toBe('clicked docs')
});
