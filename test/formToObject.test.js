const expect = require('expect');
const {formToObject} = require('./_30s.js');

test('formToObject is a Function', () => {
  expect(formToObject).toBeInstanceOf(Function);
});

test('formToObject correctly converts to object', () => {
  document.body.innerHTML = `
    <form id="form">
      <input name="name" value="Test Name" />
      <input name="email" value="test@mail.com" />
    </form>
  `;

  const form = document.querySelector('#form');
  expect(formToObject(form)).toEqual({ name: 'Test Name', email: 'test@mail.com' });
});
