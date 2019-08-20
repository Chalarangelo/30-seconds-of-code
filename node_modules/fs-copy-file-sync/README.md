fs-copy-file-sync [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]
=========
Node.js v8.5.0 [fs.copyFileSync](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_copyfilesync_src_dest_flags) [ponyfill](https://ponyfill.com).

Synchronously copies src to dest. By default, dest is overwritten if it already exists. Returns undefined. Node.js makes no guarantees about the atomicity of the copy operation. If an error occurs after the destination file has been opened for writing, Node.js will attempt to remove the destination.

## Install

```
npm i fs-copy-file-sync-sync
```

## API

`flags` is an optional integer that specifies the behavior of the copy operation. It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. `fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE`).

- `fs.constants.COPYFILE_EXCL` - The copy operation will fail if dest already exists.
- `fs.constants.COPYFILE_FICLONE` - The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then a fallback copy mechanism is used.
- `fs.constants.COPYFILE_FICLONE_FORCE` - The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then the operation will fail.


Example:

```js
const copyFileSync = require('fs-copy-file-sync');

// destination.txt will be created or overwritten by default.
copyFileSync('source.txt', 'destination.txt');
console.log('source.txt was copied to destination.txt');
```


If the third argument is a number, then it specifies flags, as shown in the following example.

```js
const copyFileSync = require('fs-copy-file-sync');
const { COPYFILE_EXCL } = copyFileSync.constants;

// By using COPYFILE_EXCL, the operation will fail if destination.txt exists.
fs.copyFileSync('source.txt', 'destination.txt', COPYFILE_EXCL);
```

## Related

- [fs-copy-file](https://github.com/coderaiser/fs-copy-file "fs-copy-file") - Asynchronously copies src to dest.

## License
MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/fs-copy-file-sync.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/fs-copy-file-sync/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/gemnasium/coderaiser/fs-copy-file-sync.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/fs-copy-file-sync/badge.svg?branch=master&service=github
[NPMURL]:                   https://npmjs.org/package/fs-copy-file-sync "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/fs-copy-file-sync  "Build Status"
[DependencyStatusURL]:      https://gemnasium.com/coderaiser/fs-copy-file-sync "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"
[CoverageURL]:              https://coveralls.io/github/coderaiser/fs-copy-file-sync?branch=master

