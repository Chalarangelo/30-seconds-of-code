copyfiles [![Build Status](https://travis-ci.org/calvinmetcalf/copyfiles.png)](https://travis-ci.org/calvinmetcalf/copyfiles)
===

copy files easily

### Install

```bash
npm install copyfiles -g
```
### Command Line

copy some files, give it a bunch of arguments, (which can include globs), the last one
is the out directory (which it will create if necessary).

```bash
copyfiles foo foobar foo/bar/*.js out
```

you now have a directory called out, with the files foo and foobar in it, it also has a directory named foo with a directory named
bar in it that has all the files from foo/bar that match the glob.

If all the files are in a folder that you don't want in the path out path, ex:

```bash
copyfiles something/*.js out
```

which would put all the js files in `out/something`, you can use the `--up` (or `-u`) option

```bash
copyfiles -u 1 something/*.js out
```

which would put all the js files in `out`

you can also just do -f which will flatten all the output into one directory, so with files ./foo/a.txt and ./foo/bar/b.txt

```bash
copyfiles -f ./foo/*.txt ./foo/bar/*.txt out
```

will put a.txt and b.txt into out

if your terminal doesn't support globstars then you can quote them

```bash
copyfiles -f ./foo/**/*.txt out
```

does not work by default on a mac

but

```bash
copyfiles -f './foo/**/*.txt' out
```

does.

You could quote globstars as a part of input:
```bash
copyfiles some.json './some_folder/*.json' ./dist/ && echo 'JSON files copied.'
```

You can use the -e option to exclude some files from the pattern, so to exclude all all files ending in .test.js you could do

```bash
copyfiles -e "**/*.test.js" -f ./foo/**/*.js out
```

Other options include

- `-a` or `--all` which includes files that start with a dot.
- `-s` or `--soft` to soft copy, which will not overwrite existing files.

## copyup

also creates a `copyup` command which is identical to `copyfiles` but `-up` defaults to 1

### Programic API

```js
var copyfiles = require('copyfiles');

copyfiles([paths], opt, callback);
```
takes an array of paths, last one is the destination path, also takes an optional argument which the -u option if a number, otherwise if it's `true` it's the flat option.
