var fstream = require('../fstream.js')
var notOpen = false
process.chdir(__dirname)

fstream
  .Writer({
    path: 'path/to/symlink',
    linkpath: './file',
    isSymbolicLink: true,
    mode: '0755' // octal strings supported
  })
  .on('close', function () {
    notOpen = true
    var fs = require('fs')
    var s = fs.lstatSync('path/to/symlink')
    var isSym = s.isSymbolicLink()
    console.log((isSym ? '' : 'not ') + 'ok 1 should be symlink')
    var t = fs.readlinkSync('path/to/symlink')
    var isTarget = t === './file'
    console.log((isTarget ? '' : 'not ') + 'ok 2 should link to ./file')
  })
  .end()

process.on('exit', function () {
  console.log((notOpen ? '' : 'not ') + 'ok 3 should be closed')
  console.log('1..3')
})
