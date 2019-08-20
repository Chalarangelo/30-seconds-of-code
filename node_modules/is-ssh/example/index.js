"use strict";

// Dependencies
var isSsh = require("../lib");

// Secure Shell Transport Protocol (SSH)
console.log(isSsh("ssh://user@host.xz:port/path/to/repo.git/"));
// true

console.log(isSsh("ssh://user@host.xz/path/to/repo.git/"));
// true

console.log(isSsh("ssh://host.xz:port/path/to/repo.git/"));
// true

console.log(isSsh("ssh://host.xz/path/to/repo.git/"));
// true

console.log(isSsh("ssh://user@host.xz/path/to/repo.git/"));
// true

console.log(isSsh("ssh://host.xz/path/to/repo.git/"));
// true

console.log(isSsh("ssh://user@host.xz/~user/path/to/repo.git/"));
// true

console.log(isSsh("ssh://host.xz/~user/path/to/repo.git/"));
// true

console.log(isSsh("ssh://user@host.xz/~/path/to/repo.git"));
// true

console.log(isSsh("ssh://host.xz/~/path/to/repo.git"));
// true


console.log(isSsh("user@host.xz:/path/to/repo.git/"));
// true

console.log(isSsh("user@host.xz:~user/path/to/repo.git/"));
// true

console.log(isSsh("user@host.xz:path/to/repo.git"));
// true


console.log(isSsh("host.xz:/path/to/repo.git/"));
// true

console.log(isSsh("host.xz:path/to/repo.git"));
// true

console.log(isSsh("host.xz:~user/path/to/repo.git/"));
// true


console.log(isSsh("rsync://host.xz/path/to/repo.git/"));
// true


// Git Transport Protocol
console.log(isSsh("git://host.xz/path/to/repo.git/"));
// false

console.log(isSsh("git://host.xz/~user/path/to/repo.git/"));
// false

// HTTP/S Transport Protocol
console.log(isSsh("http://host.xz/path/to/repo.git/"));
// false

console.log(isSsh("https://host.xz/path/to/repo.git/"));
// false

// Local (Filesystem) Transport Protocol
console.log(isSsh("/path/to/repo.git/"));
// false

console.log(isSsh("path/to/repo.git/"));
// false

console.log(isSsh("~/path/to/repo.git"));
// false

console.log(isSsh("file:///path/to/repo.git/"));
// false

console.log(isSsh("file://~/path/to/repo.git/"));
// false