var tar = require("../tar.js")
  , fstream = require("fstream")
  , fs = require("fs")

var dirDest = fs.createWriteStream('dir.tar')


function onError(err) {
  console.error('An error occurred:', err)
}

function onEnd() {
  console.log('Packed!')
}

var packer = tar.Pack({ noProprietary: true })
  .on('error', onError)
  .on('end', onEnd);

// This must be a "directory"
fstream.Reader({ path: __dirname, type: "Directory" })
  .on('error', onError)
  .pipe(packer)
  .pipe(dirDest)
