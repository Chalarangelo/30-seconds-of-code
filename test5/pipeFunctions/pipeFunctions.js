const pipeFunctions = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));
module.exports = pipeFunctions;