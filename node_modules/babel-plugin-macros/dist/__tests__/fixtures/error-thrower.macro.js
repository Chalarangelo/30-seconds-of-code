// const printAST = require('ast-pretty-print')
const {createMacro} = require('../../')

module.exports = createMacro(evalMacro)

function evalMacro() {
  throw new Error('very unhelpful')
}
