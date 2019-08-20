# parallel-transform

[Transform stream](http://nodejs.org/api/stream.html#stream_class_stream_transform_1) for Node.js that allows you to run your transforms
in parallel without changing the order of the output.

	npm install parallel-transform

It is easy to use

``` js
var transform = require('parallel-transform');

var stream = transform(10, function(data, callback) { // 10 is the parallism level
	setTimeout(function() {
		callback(null, data);
	}, Math.random() * 1000);
});

for (var i = 0; i < 10; i++) {
	stream.write(''+i);
}
stream.end();

stream.on('data', function(data) {
	console.log(data); // prints 0,1,2,...
});
stream.on('end', function() {
	console.log('stream has ended');
});
```

If you run the above example you'll notice that it runs in parallel
(does not take ~1 second between each print) and that the order is preserved

## Stream options

All transforms are Node 0.10 streams. Per default they are created with the options `{objectMode:true}`.
If you want to use your own stream options pass them as the second parameter

``` js
var stream = transform(10, {objectMode:false}, function(data, callback) {
	// data is now a buffer
	callback(null, data);
});

fs.createReadStream('filename').pipe(stream).pipe(process.stdout);
```

### Unordered
Passing the option `{ordered:false}` will output the data as soon as it's processed by a transform, without waiting to respect the order.

## License

MIT