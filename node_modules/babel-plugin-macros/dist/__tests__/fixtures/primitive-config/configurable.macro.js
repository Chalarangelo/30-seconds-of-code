const {createMacro} = require('../../../../')

const configName = 'configurableMacro'
const realMacro = jest.fn()
module.exports = createMacro(realMacro, {configName})
// for testing purposes only
Object.assign(module.exports, {
  realMacro,
  configName,
})
