module.exports = {
  'foo($a)': function(size) {
    size.setUnit('rem');
    return size;
  },
  'bar($a)': function(size) {
    size.setValue(size.getValue() * 2);
    return size;
  }
};
