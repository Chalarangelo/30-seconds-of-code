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
  t.equal(view.click(), 'clicked docs', 'Binds to an object context');
  

