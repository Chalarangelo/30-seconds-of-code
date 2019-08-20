
var http = require("http");
var url = require("url");

http.createServer(function (request, response) {
  var parsedURL = url.parse(request.url, true);
  var query = parsedURL.query;

  var contentType = query.contentType;
  var count = parseInt(query.count, 10);
  var delay = parseInt(query.delay, 10);  
  response.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*"
  });
  var start = Date.now();
  response.write("");
  var i = 0;
  var next = function () {
    if (i < count) {
      setTimeout(next, delay);
      response.write("TEST_TRICKLE:" + (Date.now() - start) + "\n");
      i += 1;
    } else {
      response.write("!");
      setTimeout(function () {
        response.end("");
      }, 40);
    }
  };
  next();
}).listen(801);
