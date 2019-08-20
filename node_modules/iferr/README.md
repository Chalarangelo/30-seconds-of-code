# iferr

Higher-order functions for easier error handling.

`if (err) return cb(err);` be gone!

## Install
```bash
npm install iferr
```

## Use

### JavaScript example
```js
var iferr = require('iferr');

function get_friends_count(id, cb) {
  User.load_user(id, iferr(cb, function(user) {
    user.load_friends(iferr(cb, function(friends) {
      cb(null, friends.length);
    }));
  }));
}
```

### CoffeeScript example
```coffee
iferr = require 'iferr'

get_friends_count = (id, cb) ->
  User.load_user id, iferr cb, (user) ->
    user.load_friends iferr cb, (friends) ->
      cb null, friends.length
```

(TODO: document tiferr, throwerr and printerr)

## License
MIT
