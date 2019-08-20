!function(root) {
  function contains(str, needle) {
    return !!~str.indexOf(needle);
  }

  var common = typeof module != 'undefined' && !!module.exports
  var aok = common ? require('aok') : root.aok
  var eol = common ? require('./') : root.eol
  var isWindows = typeof process != 'undefined' && 'win32' === process.platform
  var meths = ['lf', 'cr', 'crlf', 'auto']
  var chars = ['\n', '\r', '\r\n', isWindows ? '\r\n' : '\n']
  var sample = ' ' + chars.join() + 'text' + chars.join()

  aok.prototype.fail = function() {
    throw new Error('FAILED TEST: ' + this.id)
  }

  aok('contains sees contained text', contains('ab', 'a') === true)
  aok('sample contains newlines', contains(sample, '\n') && contains(sample, '\r'))
  aok('returns other strings as is', eol.auto('random') === 'random')
  aok('returns empty strings as is', eol.auto('') === '')
  aok('whitespace intact', eol.lf(' \t ') === ' \t ')
  aok('lf repeat newlines intact', eol.lf('\n\n\r\r') === '\n\n\n\n')
  aok('cr repeat newlines intact', eol.cr('\n\n\r\r') === '\r\r\r\r')
  aok('crlf repeat newlines intact', eol.crlf('\r\n\r\n') === '\r\n\r\n')
  aok('split return type', eol.split('0\n1\n2') instanceof Array)
  aok('split lf', eol.split('0\n1\n2').join('') === '012')
  aok('split cr', eol.split('0\r1\r2').join('') === '012')
  aok('split crlf', eol.split('0\r\n1\r\n2').join('') === '012')
  aok('split mixed', eol.split('0\r\n1\n2\r3\r\n4').join('') === '01234')

  aok.pass(meths, function(method, i) {
    var normalized = eol[method](sample)
    aok(method + ' retains', contains(normalized, chars[i]))
    aok(method + ' normalizes', !aok.fail(chars, function(c) {
      return contains(chars[i], c) === contains(normalized, c)
    }))

    return eol.auto(sample) === normalized
  })

  aok('auto is aware', eol[isWindows ? 'crlf' : 'lf'](sample) === eol.auto(sample))
  aok('auto matches only 1 and self', aok.pass(meths, function(method) {
    return eol.auto(sample) === eol[method](sample);
  }) === 2)

  aok('before', eol.lf(eol.before('text')) === '\ntext')
  aok('before2', eol.lf(eol.before('\ntext\n')) === '\n\ntext\n')
  aok('after', eol.lf(eol.after('text')) === 'text\n')
  aok('after2', eol.lf(eol.after('\ntext\n')) === '\ntext\n\n')

  aok.log('All tests passed =)')
}(this);
