var EventSource = require('./lib/eventsource');

var es = new EventSource('http://demo-eventsource.rhcloud.com/');
es.onmessage = function(e) {
  console.log(e.data);
};
es.onerror = function() {
  console.log('ERROR!');
};
