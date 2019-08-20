/**
Check if a path is in the [current working directory](https://en.wikipedia.org/wiki/Working_directory).

@example
```
import isPathInCwd = require('is-path-in-cwd');

isPathInCwd('unicorn');
//=> true

isPathInCwd('../rainbow');
//=> false

isPathInCwd('.');
//=> false
```
*/
declare function isPathInCwd(path: string): boolean;

export = isPathInCwd;
