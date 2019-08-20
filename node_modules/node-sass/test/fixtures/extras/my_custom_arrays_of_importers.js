var sass = require('../../..');

module.exports = [
  function() {
    return sass.NULL;
  },
  function() {
    return {
      contents: 'div {color: yellow;}'
    };
  }
];
