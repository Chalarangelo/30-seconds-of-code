const {createMacro} = require('../../')

module.exports = createMacro(keepImportMacro)

function keepImportMacro() {
  return {keepImports: true}
}
