declare namespace findVersions {
	interface Options {
		/**
		Also match non-semver versions like `1.88`. They're coerced into semver compliant versions.

		@default false
		*/
		readonly loose?: boolean;
	}
}

/**
Find semver versions in a string: `unicorn v1.2.3` → `1.2.3`.

@example
```
import findVersions = require('find-versions');

findVersions('unicorn v1.2.3 rainbow 2.3.4+build.1');
//=> ['1.2.3', '2.3.4+build.1']

findVersions('cp (GNU coreutils) 8.22', {loose: true});
//=> ['8.22.0']
```
*/
declare function findVersions(
	stringWithVersions: string,
	options?: findVersions.Options
): string[];

export = findVersions;
