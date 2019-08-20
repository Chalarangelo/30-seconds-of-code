var tar = require("../tar.js")
  , fs = require("fs")


function onError(err) {
  console.error('An error occurred:', err)
}

function onEnd() {
  console.log('Extracted!')
}

var extractor = tar.Extract({path: __dirname + "/extract"})
  .on('error', onError)
  .on('end', onEnd);

fs.createReadStream(__dirname + "/../test/fixtures/c.tar")
  .on('error', onError)
  .pipe(extractor);
