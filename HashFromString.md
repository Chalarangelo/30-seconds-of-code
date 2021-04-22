---
title: Hash Generator
tags: string,hash
---

Generates a hash from a string and converts it to a 32bit int
This is a direct replacement from JavaScript's `String.hashCode()`

- Use `s` as an input or the string you would like to use to generate hash.
- `for ( i = 0; i < strlen; i++ ) {`
`c = s.charCodeAt( i );`
`hash = ((hash << 5) – hash) + c;`
are used to generate the hash from the string (`s`)
- `hash = hash & hash` will convert the hash into a 32 bit integer.

```js
utils.checksum = function(s) {
var hash = 0,
strlen = s.length,
i,
c;
if ( strlen === 0 ) {
return hash;
}
for ( i = 0; i < strlen; i++ ) {
c = s.charCodeAt( i );
hash = ((hash << 5) – hash) + c;
hash = hash & hash;
}
return hash;
};
```
