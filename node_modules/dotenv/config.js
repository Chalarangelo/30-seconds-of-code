(function () {
  var options = {}
  process.argv.forEach(function (val, idx, arr) {
    var matches = val.match(/^dotenv_config_(.+)=(.+)/)
    if (matches) {
      options[matches[1]] = matches[2]
    }
  })

  require('./lib/main').config(options)
})()
