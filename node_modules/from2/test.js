var test = require('tape')
var path = require('path')
var from = require('./')
var fs   = require('fs')

var tmp = path.resolve(
  __dirname, 'tmp.txt'
)

function fromString(string) {
  return from(function(size, next) {
    if (string.length <= 0) return next(null, null)
    var chunk = string.slice(0, size)
    string = string.slice(size)
    next(null, chunk)
  })
}

test('from2', function(t) {
  var contents = fs.readFileSync(__filename, 'utf8')
  var stream = fromString(contents)

  stream
    .pipe(fs.createWriteStream(tmp))
    .on('close', function() {
      t.equal(fs.readFileSync(tmp, 'utf8'), contents)
      fs.unlinkSync(tmp)
      t.end()
    })
})

test('old mode', function(t) {
  var contents = fs.readFileSync(__filename, 'utf8')
  var stream = fromString(contents)
  var buffer = ''

  stream.on('data', function(data) {
    buffer += data
  }).on('end', function() {
    t.equal(buffer, contents)
    t.end()
  })
})

test('destroy', function(t) {
  var stream = from(function(size, next) {
    process.nextTick(function() {
      next(null, 'no')
    })
  })

  stream.on('data', function(data) {
    t.ok(false)
  }).on('close', function() {
    t.ok(true)
    t.end()
  })

  stream.destroy()
})

test('arrays', function (t) {
  var input = ['a', 'b', 'c']
  var stream = from(input)
  var output = []
  stream.on('data', function (letter) {
    output.push(letter.toString())
  })
  stream.on('end', function () {
    t.deepEqual(input, output)
    t.end()
  })
})

test('obj arrays', function (t) {
  var input = [{foo:'a'}, {foo:'b'}, {foo:'c'}]
  var stream = from.obj(input)
  var output = []
  stream.on('data', function (letter) {
    output.push(letter)
  })
  stream.on('end', function () {
    t.deepEqual(input, output)
    t.end()
  })
})


test('arrays can emit errors', function (t) {
  var input = ['a', 'b', new Error('ooops'), 'c']
  var stream = from(input)
  var output = []
  stream.on('data', function (letter) {
    output.push(letter.toString())
  })
  stream.on('error', function(e){
    t.deepEqual(['a', 'b'], output)
    t.equal('ooops', e.message)
    t.end()
  })  
  stream.on('end', function () {
    t.fail('the stream should have errored')
  })
})

test('obj arrays can emit errors', function (t) {
  var input = [{foo:'a'}, {foo:'b'}, new Error('ooops'), {foo:'c'}]
  var stream = from.obj(input)
  var output = []
  stream.on('data', function (letter) {
    output.push(letter)
  })
  stream.on('error', function(e){
    t.deepEqual([{foo:'a'}, {foo:'b'}], output)
    t.equal('ooops', e.message)
    t.end()
  })
  stream.on('end', function () {
    t.fail('the stream should have errored')
  })
})


