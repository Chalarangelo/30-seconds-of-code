const expect = require('expect');
const untildify = require('./untildify.js');

test('Testing untildify', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof untildify === 'function').toBeTruthy();
  expect(untildify('~/test/dir/file.f').indexOf('~') === -1).toBeTruthy();
  expect(untildify('~/test/dir/file.f').slice(-16)).toBe('/test/dir/file.f');
  expect(untildify('test/dir/file.f')).toBe('test/dir/file.f');
});
