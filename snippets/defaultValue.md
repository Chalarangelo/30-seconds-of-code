### defaultValue

Return a default value for null or undefined properties of an object.

```js
const defaultValue = function(value,obj) {
  for (var i = 2; i < arguments.length; ++i) {
    obj = obj[arguments[i]];
    if (obj === undefined || obj === null) return value
  }
  return obj;
};
```

```js
var user = {
    name: 'Davut',
    phone: '123456789',
    address: {
        country: 'Turkey'
    // ,country_code: '+90'
    }
}

defaultValue('+90', user, 'address', 'country_code'); // return +90 because country_code is undefined
```