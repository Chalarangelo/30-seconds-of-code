#!/usr/bin/env node

var errno = require('./')
  , arg   = process.argv[2]
  , data, code

if (arg === undefined) {
  console.log(JSON.stringify(errno.code, null, 2))
  process.exit(0)
}

if ((code = +arg) == arg)
  data = errno.errno[code]
else
  data = errno.code[arg] || errno.code[arg.toUpperCase()]

if (data)
  console.log(JSON.stringify(data, null, 2))
else {
  console.error('No such errno/code: "' + arg + '"')
  process.exit(1)
}
