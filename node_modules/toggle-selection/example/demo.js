var selection = document.getSelection();

document.addEventListener('DOMContentLoaded', function(event) {
  setTimeout(function() {
    if (!selection.rangeCount) { // for demo purposes only
      return;
    }
    reselect = module.exports();
    setTimeout(function() {
      reselect();
      console.log('reselected');
    }, 1000);

    console.log('deselected');
  }, 2000);
});