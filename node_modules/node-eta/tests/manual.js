var Eta = require('../');

var eta = new Eta(10);

var layout = '{{elapsed}} elapsed, {{rate}} rate, {{estimated}} estimated, {{progress}} progress, {{eta}} eta, {{etah}} etah, {{last}} last';

var counter = 0;

function iterate () {
	eta.iterate('message %d', counter++);
	console.log(eta.format(layout));
	setTimeout(iterate, 500 + Math.ceil(Math.random()*1000));
}

eta.start();
iterate();
