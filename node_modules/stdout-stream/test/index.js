var tape = require('tape');
var proc = require('child_process');
var path = require('path');

tape('print to stdout', function(t) {
	proc.exec('"'+process.execPath+'" '+path.join(__dirname,'fixtures','hello-world.js'), function(err, stdout) {
		t.ok(!err);
		t.same(stdout,'hello\nworld\n');
		t.end();
	});
});

tape('end stdout', function(t) {
	var ch = proc.exec('"'+process.execPath+'" '+path.join(__dirname,'fixtures','end.js'));
	var buf = [];
	var processOnExit = false;
	var stdoutOnEnd = false;

	ch.stdout.on('data', function(data) {
		buf.push(data);
	});
	ch.stdout.on('end', function() {
		t.same(Buffer.concat(buf).toString(), 'stdout');
		t.ok(!processOnExit);
		stdoutOnEnd = true;
	});
	ch.on('exit', function(code) {
		processOnExit = true;
		t.ok(stdoutOnEnd);
		t.same(code, 0);
		t.end();
	});
});