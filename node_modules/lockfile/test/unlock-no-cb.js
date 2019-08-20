var t = require('tap')
if (/0\.(10|8)/.test(process.version)) {
  t.pass('just a dummy test, no beforeExit in this node version')
} else {
  process.on('beforeExit', function (code) {
    t.equal(code, 0, 'did not throw')
  })
}
var lf = require('lockfile')
lf.unlock('no-file-no-cb')
