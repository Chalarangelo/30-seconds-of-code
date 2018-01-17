const promisify = func => (...args) =>
new Promise((resolve, reject) =>
func(...args, (err, result) => (err ? reject(err) : resolve(result)))
);
 module.exports = promisify