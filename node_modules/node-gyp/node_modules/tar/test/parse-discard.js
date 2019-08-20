var tap = require("tap")
  , tar = require("../tar.js")
  , fs = require("fs")
  , path = require("path")
  , file = path.resolve(__dirname, "fixtures/c.tar")

tap.test("parser test", function (t) {
  var parser = tar.Parse()
  var total = 0
  var dataTotal = 0

  parser.on("end", function () {

    t.equals(total-513,dataTotal,'should have discarded only c.txt')

    t.end()
  })

  fs.createReadStream(file)
    .pipe(parser)
    .on('entry',function(entry){
      if(entry.path === 'c.txt') entry.abort()
      
      total += entry.size;
      entry.on('data',function(data){
        dataTotal += data.length        
      })
    })
})
