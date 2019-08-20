# move-concurrently

Move files and directories.

```
const move = require('move-concurrently')
move('/path/to/thing', '/new/path/thing'), err => {
  if (err) throw err
  // thing is now moved!
})
```

Uses `rename` to move things as fast as possible.

If you `move` across devices or on filesystems that don't support renaming
large directories.  That is, situations that result in `rename` returning
the `EXDEV` error, then `move` will fallback to copy + delete.

When recursively copying directories it will first try to rename the
contents before falling back to copying.  While this will be slightly slower
in true cross-device scenarios, it is MUCH faster in cases where the
filesystem can't handle directory renames.

When copying ownership is maintained when running as root.  Permissions are
always maintained.  On Windows, if symlinks are unavailable then junctions
will be used.

## INTERFACE

### move(from, to, options) → Promise

Recursively moves `from` to `to` and resolves its promise when finished.
If `to` already exists then the promise will be rejected with an `EEXIST`
error.

Starts by trying to rename `from` to `to`.

Options are:

* maxConcurrency – (Default: `1`) The maximum number of concurrent copies to do at once.
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
