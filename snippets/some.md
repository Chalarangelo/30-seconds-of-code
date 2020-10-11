// ES5
const age = [20,50,65];
age.some(function(person) {
  return person >= 18;
  });
// Output: true
 
// ES6
const age = [20,50,65];
age.some((person) => person >= 18);
// Output: true
