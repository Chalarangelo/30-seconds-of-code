const {createMacro} = require('../../')

export default createMacro(evalMacro)

function evalMacro() {
  // we're lazy right now
  // we don't want to eval
}
