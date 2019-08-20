var sys = require("util")
  , assert = require("assert")
  , XMLHttpRequest = require("../lib/XMLHttpRequest").XMLHttpRequest
  , xhr;

xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (this.readyState == 4) {
    assert.equal("Hello World", this.responseText);
    runSync();
  }
};

// Async
var url = "file://" + __dirname + "/testdata.txt";
xhr.open("GET", url);
xhr.send();

// Sync
var runSync = function() {
  xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      assert.equal("Hello World", this.responseText);
      sys.puts("done");
    }
  };
  xhr.open("GET", url, false);
  xhr.send();
}
