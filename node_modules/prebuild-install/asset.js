var get = require('simple-get')
var util = require('./util')
var proxy = require('./proxy')
var noop = Object.assign({
  http: function () {},
  silly: function () {}
}, require('noop-logger'))

function findAssetId (opts, cb) {
  var downloadUrl = util.getDownloadUrl(opts)
  var apiUrl = util.getApiUrl(opts)
  var log = opts.log || noop

  log.http('request', 'GET ' + apiUrl)
  var reqOpts = proxy({
    url: apiUrl,
    json: true,
    headers: {
      'User-Agent': 'simple-get',
      Authorization: 'token ' + opts.token
    }
  }, opts)

  var req = get.concat(reqOpts, function (err, res, data) {
    if (err) return cb(err)
    log.http(res.statusCode, apiUrl)
    if (res.statusCode !== 200) return cb(err)

    // Find asset id in release
    for (var release of data) {
      if (release.tag_name === opts['tag-prefix'] + opts.pkg.version) {
        for (var asset of release.assets) {
          if (asset.browser_download_url === downloadUrl) {
            return cb(null, asset.id)
          }
        }
      }
    }

    cb(new Error('Could not find GitHub release for version'))
  })

  req.setTimeout(30 * 1000, function () {
    req.abort()
  })
}

module.exports = findAssetId
