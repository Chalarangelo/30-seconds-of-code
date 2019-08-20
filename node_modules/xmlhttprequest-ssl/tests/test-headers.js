var sys = require("util")
  , assert = require("assert")
  , XMLHttpRequest = require("../lib/XMLHttpRequest").XMLHttpRequest
  , xhr = new XMLHttpRequest()
  , http = require("http");

// Test server
var server = http.createServer(function (req, res) {
  // Test setRequestHeader
  assert.equal("Foobar", req.headers["x-test"]);
  // Test non-conforming allowed header
  assert.equal("node-XMLHttpRequest-test", req.headers["user-agent"]);
  // Test header set with blacklist disabled
  assert.equal("http://github.com", req.headers["referer"]);

  var body = "Hello World";
  res.writeHead(200, {
    "Content-Type": "text/plain",
    "Content-Length": Buffer.byteLength(body),
    // Set cookie headers to see if they're correctly suppressed
    // Actual values don't matter
    "Set-Cookie": "foo=bar",
    "Set-Cookie2": "bar=baz",
    "Date": "Thu, 30 Aug 2012 18:17:53 GMT",
    "Connection": "close"
  });
  res.write("Hello World");
  res.end();

  this.close();
}).listen(8000);

xhr.onreadystatechange = function() {
  if (this.readyState == 4) {
    // Test getAllResponseHeaders()
    var headers = "content-type: text/plain\r\ncontent-length: 11\r\ndate: Thu, 30 Aug 2012 18:17:53 GMT\r\nconnection: close";
    assert.equal(headers, this.getAllResponseHeaders());

    // Test case insensitivity
    assert.equal('text/plain', this.getResponseHeader('Content-Type'));
    assert.equal('text/plain', this.getResponseHeader('Content-type'));
    assert.equal('text/plain', this.getResponseHeader('content-Type'));
    assert.equal('text/plain', this.getResponseHeader('content-type'));

    // Test aborted getAllResponseHeaders
    this.abort();
    assert.equal("", this.getAllResponseHeaders());
    assert.equal(null, this.getResponseHeader("Connection"));

    sys.puts("done");
  }
};

assert.equal(null, xhr.getResponseHeader("Content-Type"));
try {
  xhr.open("GET", "http://localhost:8000/");
  // Valid header
  xhr.setRequestHeader("X-Test", "Foobar");
  // Invalid header
  xhr.setRequestHeader("Content-Length", 0);
  // Allowed header outside of specs
  xhr.setRequestHeader("user-agent", "node-XMLHttpRequest-test");
  // Test getRequestHeader
  assert.equal("Foobar", xhr.getRequestHeader("X-Test"));
  // Test invalid header
  assert.equal("", xhr.getRequestHeader("Content-Length"));

  // Test allowing all headers
  xhr.setDisableHeaderCheck(true);
  xhr.setRequestHeader("Referer", "http://github.com");
  assert.equal("http://github.com", xhr.getRequestHeader("Referer"));

  xhr.send();
} catch(e) {
  console.log("ERROR: Exception raised", e);
}
