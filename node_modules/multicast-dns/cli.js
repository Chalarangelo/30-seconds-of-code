#!/usr/bin/env node

var mdns = require('./')()
var path = require('path')
var os = require('os')

var announcing = process.argv.indexOf('--announce') > -1

if (process.argv.length < 3) {
  console.error('Usage: %s <hostname>', path.basename(process.argv[1]))
  process.exit(1)
}
var hostname = process.argv[2]

if (announcing) {
  var ip = getIp()
  mdns.on('query', function (query) {
    query.questions.forEach(function (q) {
      if (q.name === hostname) {
        console.log('Responding %s -> %s', q.name, ip)
        mdns.respond({
          answers: [{
            type: 'A',
            name: q.name,
            data: ip
          }]
        })
      }
    })
  })
} else {
  mdns.on('response', function (response) {
    response.answers.forEach(function (answer) {
      if (answer.name === hostname) {
        console.log(answer.data)
        process.exit()
      }
    })
  })

  mdns.query(hostname, 'A')

  // Give responses 3 seconds to respond
  setTimeout(function () {
    console.error('Hostname not found')
    process.exit(1)
  }, 3000)
}

function getIp () {
  var networks = os.networkInterfaces()
  var found = '127.0.0.1'

  Object.keys(networks).forEach(function (k) {
    var n = networks[k]
    n.forEach(function (addr) {
      if (addr.family === 'IPv4' && !addr.internal) {
        found = addr.address
      }
    })
  })

  return found
}
