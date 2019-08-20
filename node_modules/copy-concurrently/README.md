# copy-concurrently

Copy files, directories and symlinks

```
const copy = require('copy-concurrently')
copy('/path/to/thing', '/new/path/thing').then(() => {
  // this is now copied
}).catch(err => {
  // oh noooo
})
```

Copies files, directories and symlinks.  Ownership is maintained when
running as root, permissions are always maintained.  On Windows, if symlinks
are unavailable then junctions will be used.

## PUBLIC INTERFACE

### copy(from, to, [options]) → Promise

Recursively copies `from` to `to` and resolves its promise when finished. 
If `to` already exists then the promise will be rejected with an `EEXIST`
error.

Options are:

* maxConcurrency – (Default: `1`) The maximum number of concurrent copies to do at once.
* recurseWith - (Default: `copy.item`) The function to call on each file after recursing into a directory.
* isWindows - (Default: `process.platform === 'win32'`) If true enables Windows symlink semantics. This requires
  an extra `stat` to determine if the destination of a symlink is a file or directory. If symlinking a directory
  fails then we'll try making a junction instead.

Options can also include dependency injection:

* Promise - (Default: `global.Promise`) The promise implementation to use, defaults to Node's.
* fs - (Default: `require('fs')`) The filesystem module to use.  Can be used
  to use `graceful-fs` or to inject a mock.
* writeStreamAtomic - (Default: `require('fs-write-stream-atomic')`) The
  implementation of `writeStreamAtomic` to use.  Used to inject a mock.
* getuid - (Default: `process.getuid`) A function that returns the current UID. Used to inject a mock.

## EXTENSION INTERFACE

Ordinarily you'd only call `copy` above.  But it's possible to use it's
component functions directly.  This is useful if, say, you're writing
[move-concurently](https://npmjs.com/package/move-concurrently).

### copy.file(from, to, options) → Promise

Copies an ordinary file `from` to destination `to`.  Uses
`fs-write-stream-atomic` to ensure that the file is either entirely copied
or not at all.

Options are:

* uid, gid - (Optional) If `getuid()` is `0` then this and gid will be used to
  set the user and group of `to`.  If uid is present then gid must be too.
* mode - (Optional) If set then `to` will have its perms set to `mode`.
* fs - (Default: `require('fs')`) The filesystem module to use.  Can be used
  to use `graceful-fs` or to inject a mock.
* Promise - (Default: `global.Promise`) The promise implementation to use, defaults to Node's.
* writeStreamAtomic - (Default `require('fs-write-stream-atomic')`) The
  implementation of `writeStreamAtomic` to use.  Used to inject a mock.

### copy.symlink(from, to, options) → Promise

Copies a symlink `from` to destination `to`.  If you're using Windows and
symlinking fails and what you're linking is a directory then junctions will
be tried instead.

Options are:

* top - The top level the copy is being run from.  This is used to determine
  if the symlink destination is within the set of files we're copying or
  outside it.
* fs - (Default: `require('fs')`) The filesystem module to use.  Can be used
  to use `graceful-fs` or to inject a mock.
* Promise - (Default: `global.Promise`) The promise implementation to use, defaults to Node's.
* isWindows - (Default: `process.platform === 'win32'`) If true enables Windows symlink semantics. This requires
  an extra `stat` to determine if the destination of a symlink is a file or directory. If symlinking a directory
  fails then we'll try making a junction instead.

### copy.recurse(from, to, options) → Promise

Reads all of the files in directory `from` and adds them to the `queue`
using `recurseWith` (by default `copy.item`).

Options are:

* queue - A [`run-queue`](https://npmjs.com/package/run-queue) object to add files found inside `from` to.
* recurseWith - (Default: `copy.item`) The function to call on each file after recursing into a directory.
* uid, gid - (Optional) If `getuid()` is `0` then this and gid will be used to
  set the user and group of `to`.  If uid is present then gid must be too.
* mode - (Optional) If set then `to` will have its perms set to `mode`.
* fs - (Default: `require('fs')`) The filesystem module to use.  Can be used
  to use `graceful-fs` or to inject a mock.
* getuid - (Default: `process.getuid`) A function that returns the current UID. Used to inject a mock.

### copy.item(from, to, options) → Promise

Copies some kind of `from` to destination `to`.  This looks at the filetype
and calls `copy.file`, `copy.symlink` or `copy.recurse` as appropriate.

Symlink copies are queued with a priority such that they happen after all
file and directory copies as you can't create a junction on windows to a
file that doesn't exist yet.

Options are:

* top - The top level the copy is being run from.  This is used to determine
  if the symlink destination is within the set of files we're copying or
  outside it.
* queue - The [`run-queue`](https://npmjs.com/package/run-queue) object to
  pass to `copy.recurse` if `from` is a directory.
* recurseWith - (Default: `copy.item`) The function to call on each file after recursing into a directory.
* uid, gid - (Optional) If `getuid()` is `0` then this and gid will be used to
  set the user and group of `to`.  If uid is present then gid must be too.
* mode - (Optional) If set then `to` will have its perms set to `mode`.
* fs - (Default: `require('fs')`) The filesystem module to use.  Can be used
  to use `graceful-fs` or to inject a mock.
* getuid - (Default: `process.getuid`) A function that returns the current UID. Used to inject a mock.
* isWindows - (Default: `process.platform === 'win32'`) If true enables Windows symlink semantics. This requires
  an extra `stat` to determine if the destination of a symlink is a file or directory. If symlinking a directory
  fails then we'll try making a junction instead.
* Promise - (Default: `global.Promise`) The promise implementation to use, defaults to Node's.
* writeStreamAtomic - (Default `require('fs-write-stream-atomic')`) The
  implementation of `writeStreamAtomic` to use.  Used to inject a mock.
