const {createMacro} = require('../')

test('throws error if it is not transpiled', () => {
  const untranspiledMacro = createMacro(() => {})
  expect(() =>
    untranspiledMacro({source: 'untranspiled.macro'}),
  ).toThrowErrorMatchingSnapshot()
})

test('attempting to create a macros with the configName of options throws an error', () => {
  expect(() =>
    createMacro(() => {}, {configName: 'options'}),
  ).toThrowErrorMatchingSnapshot()
})
