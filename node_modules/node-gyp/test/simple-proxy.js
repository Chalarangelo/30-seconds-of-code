var http = require('http')
  , https = require('https')
  , server = http.createServer(handler)
  , port = +process.argv[2]
  , prefix = process.argv[3]
  , upstream = process.argv[4]
  , calls = 0

server.listen(port)

function handler (req, res) {
  if (req.url.indexOf(prefix) != 0)
    throw new Error('request url [' + req.url + '] does not start with [' + prefix + ']')

  var upstreamUrl = upstream + req.url.substring(prefix.length)
  console.log(req.url + ' -> ' + upstreamUrl)
  https.get(upstreamUrl, function (ures) {
    ures.on('end', function () {
      if (++calls == 2)
        server.close()
    })
    ures.pipe(res)
  })
}
