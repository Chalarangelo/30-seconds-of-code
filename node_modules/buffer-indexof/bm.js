//boyer-moore?
module.exports = function bm(buf,search,offset){
  var m  = 0, j = 0
  var table = []

  var ret = -1;
  for(var i=offset||0;i<buf.length;++i){
    console.log('i',i)

    table[i] = [[i,0]]
    if(buf[i] === search[0]) {
      for(j = search.length-1;j>0;--j){
        table[i].push([i+j,j])
        console.log('j',j)
        if(buf[i+j] !== search[j]) {

          //i += j
          j = -1
          break
        }
      }
      if(j === 0) {
        ret = i
        break
      }
    }
  }

  console.log(table)
  renderTable(table,buf,search)
  return ret
}


var chalk = require('chalk')
function renderTable(table,buf,search){
  var s = ''

  console.log('-----')
  console.log('search:',search)
  console.log('-----')
  console.log(buf+'')

  table.forEach(function(a){
    if(!a) return;// console.log('')
    a.forEach(function(v){
      if(!v) return;
      var pad = ''
      while(pad.length < v[0]){
        pad += ' '
      }
      if(search[v[1]] === buf[v[0]]) console.log(pad+chalk.green(search[v[1]]))
      else console.log(pad+chalk.red(search[v[1]]))

    })
  })
  console.log('-----')
}
