var fs = require('graceful-fs')
var test = require('tap').test
var path = require('path')
var writeStream = require('../index.js')

var rename = fs.rename
fs.rename = function (from, to, cb) {
  setTimeout(function () {
    rename(from, to, cb)
  }, 100)
}

test('basic', function (t) {
  // open 10 write streams to the same file.
  // then write to each of them, and to the target
  // and verify at the end that each of them does their thing
  var target = path.resolve(__dirname, 'test.txt')
  var n = 10

  // We run all of our assertions twice:
  //   once for finish, once for close
  // There are 6 assertions, two fixed, plus 4 lines in the file.
  t.plan(n * 2 * 6)

  var streams = []
  for (var i = 0; i < n; i++) {
    var s = writeStream(target)
    s.on('finish', verifier('finish', i))
    s.on('close', verifier('close', i))
    streams.push(s)
  }

  function verifier (ev, num) {
    return function () {
      if (ev === 'close') {
        t.equal(this.__emittedFinish, true, num + '. closed only after finish')
      } else {
        this.__emittedFinish = true
        t.equal(ev, 'finish', num + '. finished')
      }

      // make sure that one of the atomic streams won.
      var res = fs.readFileSync(target, 'utf8')
      var lines = res.trim().split(/\n/)
      lines.forEach(function (line, lineno) {
        var first = lines[0].match(/\d+$/)[0]
        var cur = line.match(/\d+$/)[0]
        t.equal(cur, first, num + '. line ' + lineno + ' matches')
      })

      var resExpr = /^first write \d+\nsecond write \d+\nthird write \d+\nfinal write \d+\n$/
      t.similar(res, resExpr, num + '. content matches')
    }
  }

  // now write something to each stream.
  streams.forEach(function (stream, i) {
    stream.write('first write ' + i + '\n')
  })

  // wait a sec for those writes to go out.
  setTimeout(function () {
    // write something else to the target.
    fs.writeFileSync(target, 'brutality!\n')

    // write some more stuff.
    streams.forEach(function (stream, i) {
      stream.write('second write ' + i + '\n')
    })

    setTimeout(function () {
      // Oops!  Deleted the file!
      fs.unlinkSync(target)

      // write some more stuff.
      streams.forEach(function (stream, i) {
        stream.write('third write ' + i + '\n')
      })

      setTimeout(function () {
        fs.writeFileSync(target, 'brutality TWO!\n')
        streams.forEach(function (stream, i) {
          stream.end('final write ' + i + '\n')
        })
      }, 50)
    }, 50)
  }, 50)
})

test('cleanup', function (t) {
  fs.readdirSync(__dirname).filter(function (f) {
    return f.match(/^test.txt/)
  }).forEach(function (file) {
    fs.unlinkSync(path.resolve(__dirname, file))
  })
  t.end()
})
