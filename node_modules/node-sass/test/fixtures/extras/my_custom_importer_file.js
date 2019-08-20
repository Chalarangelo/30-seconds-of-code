var path = require('path');

module.exports = function(file) {
  return {
    file: path.resolve(path.join(process.cwd(), 'test/fixtures/include-files/', file + (path.extname(file) ? '' : '.scss')))
  };
};
