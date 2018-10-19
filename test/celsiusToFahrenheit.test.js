const expect = require('expect');
const {celsiusToFahrenheit} = require('./_30s.js');

test('celsiusToFahrenheit is a Function', () => {
  expect(celsiusToFahrenheit).toBeInstanceOf(Function);
});

test('0 Celsius is 32 Fahrenheit', () => {
  expect(celsiusToFahrenheit(0)).toBe(32)
})

test('100 Celsius is 212 Fahrenheit', () => {
	expect(celsiusToFahrenheit(100)).toBe(212)
})

test('-50 Celsius is -58 Fahrenheit', () => {
	expect(celsiusToFahrenheit(-50)).toBe(-58)
})

test('1000 Celsius is 1832 Fahrenheit', () => {
	expect(celsiusToFahrenheit(1000)).toBe(1832)
})

test('Not a number value is NaN', () => {
	expect(celsiusToFahrenheit("Durr")).toBe(NaN)
})