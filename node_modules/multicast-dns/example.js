var mdns = require('./')()

mdns.on('warning', function (err) {
  console.log(err.stack)
})

mdns.on('response', function (response) {
  console.log('got a response packet:', response)
})

mdns.on('query', function (query) {
  console.log('got a query packet:', query)

  // iterate over all questions to check if we should respond
  query.questions.forEach(function (q) {
    if (q.type === 'A' && q.name === 'example.local') {
      // send an A-record response for example.local
      mdns.respond({
        answers: [{
          name: 'example.local',
          type: 'A',
          ttl: 300,
          data: '192.168.1.5'
        }]
      })
    }
  })
})

// lets query for an A-record for example.local
mdns.query({
  questions: [{
    name: 'example.local',
    type: 'A'
  }]
})
