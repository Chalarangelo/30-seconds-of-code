// const printAST = require('ast-pretty-print')
const {createMacro, MacroError} = require('../../')

module.exports = createMacro(evalMacro)

function evalMacro() {
  throw new MacroError('very helpful')
}
