const expect = require('expect');
const untildify = require('./untildify.js');

test('untildify is a Function', () => {
  expect(untildify).toBeInstanceOf(Function);
});
test('Contains no tildes', () => {
  expect(untildify('~/test/dir/file.f').indexOf('~') === -1).toBeTruthy();
});
test('Does not alter the rest of the path', () => {
  expect(untildify('~/test/dir/file.f').slice(-16)).toBe('/test/dir/file.f');
});
test('Does not alter paths without tildes', () => {
  expect(untildify('test/dir/file.f')).toBe('test/dir/file.f');
});
