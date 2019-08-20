'use strict'

class SyntaxError extends Error {
  constructor (err) {
    super(err)

    this.name = 'Syntax Error'

    this.message = ''
    this.message += `${this.name} \n\n(${err.line}:${err.column}) ${err.reason}`
    this.message += `\n\n${err.showSourceCode()}\n`

    this.stack = false
  }
}

module.exports = SyntaxError
