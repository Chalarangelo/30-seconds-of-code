
# batch

  Simple async batch with concurrency control and progress reporting.

## Installation

```
$ npm install batch
```

## API

```js
var Batch = require('batch')
  , batch = new Batch;

batch.concurrency(4);

ids.forEach(function(id){
  batch.push(function(done){
    User.get(id, done);
  });
});

batch.on('progress', function(e){

});

batch.end(function(err, users){

});
```

### Progress events

  Contain the "job" index, response value, duration information, and completion data.

```
{ index: 1,
  value: 'bar',
  pending: 2,
  total: 3,
  complete: 2,
  percent: 66,
  start: Thu Oct 04 2012 12:25:53 GMT-0700 (PDT),
  end: Thu Oct 04 2012 12:25:53 GMT-0700 (PDT),
  duration: 0 }
```

## License

[MIT](LICENSE)
