const {serializeForm} = require('./_30s.js');

test('serializeForm is a Function', () => {
  expect(serializeForm).toBeInstanceOf(Function);
});

test('serializeForm correctly converts to query string', () => {
  document.body.innerHTML = `
    <form id="form">
      <input name="name" value="Test Name" />
      <input name="email" value="test@mail.com" />
    </form>
  `;

  const form = document.querySelector('#form');
  expect(serializeForm(form)).toBe('name=Test%20Name&email=test%40mail.com');
});
