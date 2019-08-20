const isTruthy = require(`../is-truthy`)

describe(`isTruthy`, () => {
  it(`handles Booleans`, () => {
    expect(isTruthy(true)).toBe(true)
    expect(isTruthy(false)).toBe(false)
  })
  it(`handles true or false strings `, () => {
    expect(isTruthy(`true`)).toBe(true)
    expect(isTruthy(`false`)).toBe(false)
    expect(isTruthy(`TRUE`)).toBe(true)
    expect(isTruthy(`FALSE`)).toBe(false)
    expect(isTruthy(`TruE`)).toBe(true)
    expect(isTruthy(`FalsE`)).toBe(false)
  })
  it(`handles numbers`, () => {
    expect(isTruthy(`1`)).toBe(true)
    expect(isTruthy(`0`)).toBe(false)
    expect(isTruthy(`-1`)).toBe(false)
  })
  it(`defaults to false`, () => {
    expect(isTruthy(`blah`)).toBe(false)
  })
})
