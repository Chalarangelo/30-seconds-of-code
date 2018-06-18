const expect = require('expect');
const untildify = require('./untildify.js');


  test('untildify is a Function', () => {
  expect(untildify).toBeInstanceOf(Function);
});
  test('Contains no tildes', () => {
  expect(untildify('~/test/dir/file.f').indexOf('~') === -1).toBeTruthy();
});
  t.equal(untildify('~/test/dir/file.f').slice(-16), '/test/dir/file.f', 'Does not alter the rest of the path');
  t.equal(untildify('test/dir/file.f'), 'test/dir/file.f', 'Does not alter paths without tildes');
  

