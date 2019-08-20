var fstream = require('../fstream.js')
var path = require('path')

var r = fstream.Reader({
  path: path.dirname(__dirname),
  filter: function () {
    return !this.basename.match(/^\./) &&
      !this.basename.match(/^node_modules$/) &&
      !this.basename.match(/^deep-copy$/) &&
      !this.basename.match(/^filter-copy$/)
  }
})

// this writer will only write directories
var w = fstream.Writer({
  path: path.resolve(__dirname, 'filter-copy'),
  type: 'Directory',
  filter: function () {
    return this.type === 'Directory'
  }
})

var indent = ''

r.on('entry', appears)
r.on('ready', function () {
  console.error('ready to begin!', r.path)
})

function appears (entry) {
  console.error(indent + 'a %s appears!', entry.type, entry.basename, typeof entry.basename)
  if (foggy) {
    console.error('FOGGY!')
    var p = entry
    do {
      console.error(p.depth, p.path, p._paused)
      p = p.parent
    } while (p)

    throw new Error('\u001b[mshould not have entries while foggy')
  }
  indent += '\t'
  entry.on('data', missile(entry))
  entry.on('end', runaway(entry))
  entry.on('entry', appears)
}

var foggy
function missile (entry) {
  function liftFog (who) {
    if (!foggy) return
    if (who) {
      console.error('%s breaks the spell!', who && who.path)
    } else {
      console.error('the spell expires!')
    }
    console.error('\u001b[mthe fog lifts!\n')
    clearTimeout(foggy)
    foggy = null
    if (entry._paused) entry.resume()
  }

  if (entry.type === 'Directory') {
    var ended = false
    entry.once('end', function () { ended = true })
    return function (c) {
      // throw in some pathological pause()/resume() behavior
      // just for extra fun.
      process.nextTick(function () {
        if (!foggy && !ended) { // && Math.random() < 0.3) {
          console.error(indent + '%s casts a spell', entry.basename)
          console.error('\na slowing fog comes over the battlefield...\n\u001b[32m')
          entry.pause()
          entry.once('resume', liftFog)
          foggy = setTimeout(liftFog, 1000)
        }
      })
    }
  }

  return function (c) {
    var e = Math.random() < 0.5
    console.error(indent + '%s %s for %d damage!',
      entry.basename,
      e ? 'is struck' : 'fires a chunk',
      c.length)
  }
}

function runaway (entry) {
  return function () {
    var e = Math.random() < 0.5
    console.error(indent + '%s %s',
      entry.basename,
      e ? 'turns to flee' : 'is vanquished!')
    indent = indent.slice(0, -1)
  }
}

w.on('entry', attacks)
// w.on('ready', function () { attacks(w) })
function attacks (entry) {
  console.error(indent + '%s %s!', entry.basename,
    entry.type === 'Directory' ? 'calls for backup' : 'attacks')
  entry.on('entry', attacks)
}

var ended = false
var i = 1
r.on('end', function () {
  if (foggy) clearTimeout(foggy)
  console.error("\u001b[mIT'S OVER!!")
  console.error('A WINNAR IS YOU!')

  console.log('ok ' + (i++) + ' A WINNAR IS YOU')
  ended = true
  // now go through and verify that everything in there is a dir.
  var p = path.resolve(__dirname, 'filter-copy')
  var checker = fstream.Reader({ path: p })
  checker.checker = true
  checker.on('child', function (e) {
    var ok = e.type === 'Directory'
    console.log((ok ? '' : 'not ') + 'ok ' + (i++) +
      ' should be a dir: ' +
      e.path.substr(checker.path.length + 1))
  })
})

process.on('exit', function () {
  console.log((ended ? '' : 'not ') + 'ok ' + (i) + ' ended')
  console.log('1..' + i)
})

r.pipe(w)
