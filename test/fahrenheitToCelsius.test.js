const expect = require('expect');
const {fahrenheitToCelsius} = require('./_30s.js');

test('fahrenheitToCelsius is a Function', () => {
  expect(fahrenheitToCelsius).toBeInstanceOf(Function);
});

test('32 Fahrenheit is 0 Celsius', () => {
	expect(fahrenheitToCelsius(32)).toBe(0)
})

test('212 Fahrenheit is 100 Celsius', () => {
	expect(fahrenheitToCelsius(212)).toBe(100)
})

test('150 Fahrenheit is 65.55555555555556 Celsius', () => {
	expect(fahrenheitToCelsius(150)).toBe(65.55555555555556)
})

test('1000 Fahrenheit is 537.7777777777778', () => {
	expect(fahrenheitToCelsius(1000)).toBe(537.7777777777778)
})

test('Not a number value is NaN', () => {
	expect(fahrenheitToCelsius("Durr")).toBe(NaN)
})