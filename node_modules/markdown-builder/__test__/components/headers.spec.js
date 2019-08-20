const components = require('../../lib');

const headers = components.headers;
test('Header builders', () => {
  expect(headers.hX(1, 'H1 header')).toBe('\n# H1 header\n'); // hX
  expect(headers.h1('H1 header')).toBe('\n# H1 header\n');
  expect(headers.h2('H2 header')).toBe('\n## H2 header\n');
  expect(headers.h3('H3 header')).toBe('\n### H3 header\n');
  expect(headers.h4('H4 header')).toBe('\n#### H4 header\n');
  expect(headers.h5('H5 header')).toBe('\n##### H5 header\n');
  expect(headers.h6('H6 header')).toBe('\n###### H6 header\n');
});
