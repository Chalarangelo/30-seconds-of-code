module.exports = function(file, prev, done) {
  done({
    file: '/some/random/path/file.scss',
    contents: 'div {color: yellow;}'
  });
};
