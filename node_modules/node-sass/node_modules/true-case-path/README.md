# true-case-path

## Usage

`trueCasePathSync(<fileSystemPath>)`

## Description

Given a possibly case-variant version of an existing filesystem path, returns
the case-exact, normalized version as stored in the filesystem.

If the input path is a globbing *pattern* as defined by the 'glob' npm
package, only the 1st match, if any, is returned.
Only a literal input path guarantees an unambiguous result.

If no matching path exists, undefined is returned.
On case-SENSITIVE filesystems, a match will also be found, but if case
variations of a given path exist, it is undefined which match is returned.

## Platforms

Windows, OSX, and Linux (though note the limitations with case-insensitive filesystems).

## Limitations

- Paths starting with `'./'` are acceptable, but paths starting with `'../'`
  are not - when in doubt, resolve with `fs.realPathSync()` first.
  An initial `'.'` and *interior* `'..'` instances are normalized, but a relative
  input path still results in a relative output path. If you want to ensure
  an absolute output path, apply `fs.realPathSync()` to the result.
- On Windows, no attempt is made to case-correct the drive letter or UNC-share
  component of the path.
- Unicode support:
  - Be sure to use UTF8 source-code files (with a BOM on Windows)
  - On OSX, the input path is automatically converted to NFD Unicode form
    to match how the filesystem stores names, but note that the result will
    invariably be NFD too (which makes no difference for ASCII-characters-only
    names).

## Examples

```
const trueCasePathSync = require('true-case-path')

trueCasePathSync('/users/guest') // OSX: -> '/Users/Guest'

trueCasePathSync('c:\\users\\all users') // Windows: -> 'c:\Users\All Users'
```

## Attribution

The code for this project was sourced from [http://stackoverflow.com/a/33139702/45375](http://stackoverflow.com/a/33139702/45375)
