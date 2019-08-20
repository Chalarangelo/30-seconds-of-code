# @nodelib/fs.stat

> Get the status of a file with some features.

## :bulb: Highlights

Wrapper over standard methods ([`fs.lstat`](https://nodejs.org/dist/latest/docs/api/fs.html#fs_fs_lstat_path_callback), [`fs.stat`](https://nodejs.org/dist/latest/docs/api/fs.html#fs_fs_stat_path_callback)) with some features.

  * :beginner: Normally follows symlinks.
  * :gear: Can safely work with broken symlinks (returns information about symlink instead of generating an error).

## Install

```
$ npm install @nodelib/fs.stat
```

## Usage

```js
const fsStat = require('@nodelib/fs.stat');

fsStat.stat('path').then((stat) => {
    console.log(stat); // => fs.Stats
});
```

## API

### fsStat.stat(path, [options])

Returns a [`Promise<fs.Stats>`](https://nodejs.org/dist/latest/docs/api/fs.html#fs_class_fs_stats) for provided path.

### fsStat.statSync(path, [options])

Returns a [`fs.Stats`](https://nodejs.org/dist/latest/docs/api/fs.html#fs_class_fs_stats) for provided path.

### fsStat.statCallback(path, [options], callback)

Returns a [`fs.Stats`](https://nodejs.org/dist/latest/docs/api/fs.html#fs_class_fs_stats) for provided path with standard callback-style.

#### path

  * Type: `string | Buffer | URL`

The `path` argument for [`fs.lstat`](https://nodejs.org/dist/latest/docs/api/fs.html#fs_fs_lstat_path_callback) or [`fs.stat`](https://nodejs.org/dist/latest/docs/api/fs.html#fs_fs_stat_path_callback) method.

#### options

  * Type: `Object`

See [options](#options-1) section for more detailed information.

## Options

### throwErrorOnBrokenSymlinks

  * Type: `boolean`
  * Default: `true`

Throw an error or return information about symlink, when symlink is broken. When `false`, methods will be return lstat call for broken symlinks.

### followSymlinks

  * Type: `boolean`
  * Default: `true`

By default, the methods of this package follows symlinks. If you do not want it, set this option to `false` or use the standard method [`fs.lstat`](https://nodejs.org/dist/latest/docs/api/fs.html#fs_fs_lstat_path_callback).

### fs

  * Type: `FileSystemAdapter`
  * Default: `built-in FS methods`

By default, the built-in Node.js module (`fs`) is used to work with the file system. You can replace each method with your own.

```ts
interface FileSystemAdapter {
	lstat?: typeof fs.lstat;
	stat?: typeof fs.stat;
	lstatSync?: typeof fs.lstatSync;
	statSync?: typeof fs.statSync;
}
```

## Changelog

See the [Releases section of our GitHub project](https://github.com/nodelib/nodelib/releases) for changelogs for each release version.

## License

This software is released under the terms of the MIT license.
