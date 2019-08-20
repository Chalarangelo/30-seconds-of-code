var stdout = require('../../');

stdout.write('stdout');
stdout.end(function() {
	setTimeout(function() {
		process.exit(0);
	}, 10);
});