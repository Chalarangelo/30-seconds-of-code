declare namespace binVersion {
	interface Options {
		/**
		The arguments to pass to `binary` so that it will print its version.

		@default ['--version']
		*/
		args?: string[];
	}
}

/**
Get the version of a binary in [semver](https://github.com/npm/node-semver) format.

@param binary - The name of or path to the binary to get the version from.
@returns The version of the `binary`.

@example
```
import binVersion = require('bin-version');

(async () => {
	// $ curl --version
	// curl 7.30.0 (x86_64-apple-darwin13.0)

	console.log(await binVersion('curl'));
	//=> '7.30.0'


	// $ openssl version
	// OpenSSL 1.0.2d 9 Jul 2015

	console.log(await binVersion('openssl', {args: ['version']}));
	//=> '1.0.2'
})();
```
*/
declare function binVersion(
	binary: string,
	options?: binVersion.Options
): Promise<string>;

export = binVersion;
