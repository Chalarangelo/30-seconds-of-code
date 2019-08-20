var test             = require('tape')
  , inherits         = require('inherits')
  , ErrorStackParser = require('error-stack-parser')
  , errno            = require('./')

test('sanity checks', function (t) {
  t.ok(errno.all, 'errno.all not found')
  t.ok(errno.errno, 'errno.errno not found')
  t.ok(errno.code, 'errno.code not found')

  t.equal(errno.all.length, 60, 'found ' + errno.all.length + ', expected 60')
  t.equal(errno.errno['-1'], errno.all[1], 'errno -1 not second element')

  t.equal(errno.code['UNKNOWN'], errno.all[1], 'code UNKNOWN not second element')

  t.equal(errno.errno[1], errno.all[3], 'errno 1 not fourth element')

  t.equal(errno.code['EOF'], errno.all[3], 'code EOF not fourth element')
  t.end()
})

test('custom errors', function (t) {
  const Cust = errno.create('FooNotBarError')
  const cust = new Cust('foo is not bar')

  t.equal(cust.name, 'FooNotBarError', 'correct custom name')
  t.equal(cust.type, 'FooNotBarError', 'correct custom type')
  t.equal(cust.message, 'foo is not bar', 'correct custom message')
  t.notOk(cust.cause, 'no cause')
  t.end()
})

test('callstack', function (t) {
  const MyError = errno.create('MyError')

  function lastFunction (ErrorType, cb) {
    process.nextTick(cb, new ErrorType('oh noes!'))
  }

  function secondLastFunction (ErrorType, cb) {
    lastFunction(ErrorType, cb)
  }

  function testFrames (t) {
    return function (err) {
      const stack = ErrorStackParser.parse(err)
      t.same(stack[0].functionName, 'lastFunction', 'last stack frame ok')
      t.same(stack[1].functionName, 'secondLastFunction', 'second last stack frame ok')
      t.end()
    }
  }

  t.test('custom error, default prototype', function (t) {
    secondLastFunction(MyError, testFrames(t))
  })

  t.test('custom error, custom prototype', function (t) {
    const MyError2 = errno.create('MyError2', MyError)
    secondLastFunction(MyError2, testFrames(t))
  })

  t.test('custom error, using inheritance', function (t) {
    const CustomError = errno.custom.CustomError

    function MyError3 (message, cause) {
      CustomError.call(this, message, cause)
    }

    inherits(MyError3, CustomError)

    secondLastFunction(MyError3, testFrames(t))
  })
})

test('error without message', function (t) {
  const Cust = errno.create('WriteError')
  const cust = new Cust({
    code: 22,
    message: '',
    name: 'QuotaExceededError'
  })

  t.equal(cust.name, 'WriteError', 'correct custom name')
  t.equal(cust.type, 'WriteError', 'correct custom type')
  t.equal(cust.message, 'QuotaExceededError', 'message is the name')
  t.notOk(cust.cause, 'no cause')
  t.end()
})
