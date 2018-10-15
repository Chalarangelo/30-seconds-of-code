const copyToClipboardAsync = (text) => {
  return navigator.permissions.query({name:'clipboard-write'}).then(function(result) {
    if (result.state == 'granted' || result.state == 'prompt') {
      return navigator.clipboard.writeText(text);
    } else if (result.state == 'denied') {
      return Promise.reject("Permission denied.");
    }
    
    result.onchange = function() {// when the user's permissions change
      console.log('Permission ' + result.state);
    }
  });
};
module.exports = copyToClipboardAsync;
