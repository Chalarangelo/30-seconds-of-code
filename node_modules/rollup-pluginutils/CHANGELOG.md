# rollup-pluginutils changelog

## 2.8.1
*2019-06-04*
* Support serialization of many edge cases ([#64](https://github.com/rollup/rollup-pluginutils/issues/64))

## 2.8.0
*2019-05-30*
* Bundle updated micromatch dependency ([#60](https://github.com/rollup/rollup-pluginutils/issues/60))

## 2.7.1
*2019-05-17*
* Do not ignore files with a leading "." in createFilter ([#62](https://github.com/rollup/rollup-pluginutils/issues/62))

## 2.7.0
*2019-05-15*
* Add `resolve` option to createFilter ([#59](https://github.com/rollup/rollup-pluginutils/issues/59))

## 2.6.0
*2019-04-04*
* Add `extractAssignedNames` ([#59](https://github.com/rollup/rollup-pluginutils/issues/59))
* Provide dedicated TypeScript typings file ([#58](https://github.com/rollup/rollup-pluginutils/issues/58))

## 2.5.0
*2019-03-18*
* Generalize dataToEsm type ([#55](https://github.com/rollup/rollup-pluginutils/issues/55))
* Handle empty keys in dataToEsm ([#56](https://github.com/rollup/rollup-pluginutils/issues/56))

## 2.4.1
*2019-02-16*
* Remove unnecessary dependency

## 2.4.0
*2019-02-16*
Update dependencies to solve micromatch vulnerability ([#53](https://github.com/rollup/rollup-pluginutils/issues/53))

## 2.3.3
*2018-09-19*
* Revert micromatch update ([#43](https://github.com/rollup/rollup-pluginutils/issues/43))

## 2.3.2
*2018-09-18*
* Bumb micromatch dependency ([#36](https://github.com/rollup/rollup-pluginutils/issues/36))
* Bumb dependencies ([#41](https://github.com/rollup/rollup-pluginutils/issues/41))
* Split up tests ([#40](https://github.com/rollup/rollup-pluginutils/issues/40))

## 2.3.1
*2018-08-06*
* Fixed ObjectPattern scope in attachScopes to recognise { ...rest } syntax ([#37](https://github.com/rollup/rollup-pluginutils/issues/37))

## 2.3.0
*2018-05-21*
* Add option to not generate named exports ([#32](https://github.com/rollup/rollup-pluginutils/issues/32))

## 2.2.1
*2018-05-21*
* Support `null` serialization ([#34](https://github.com/rollup/rollup-pluginutils/issues/34))

## 2.2.0
*2018-05-11*
* Improve white-space handling in `dataToEsm` and add `prepare` script ([#31](https://github.com/rollup/rollup-pluginutils/issues/31))

## 2.1.1
*2018-05-09*
* Update dependencies

## 2.1.0
*2018-05-08*
* Add `dataToEsm` helper to create named exports from objects ([#29](https://github.com/rollup/rollup-pluginutils/issues/29))
* Support literal keys in object patterns ([#27](https://github.com/rollup/rollup-pluginutils/issues/27))
* Support function declarations without id in `attachScopes` ([#28](https://github.com/rollup/rollup-pluginutils/issues/28))

## 2.0.1
*2017-01-03*
* Don't add extension to file with trailing dot ([#14](https://github.com/rollup/rollup-pluginutils/issues/14))

## 2.0.0
*2017-01-03*
* Use `micromatch` instead of `minimatch` ([#19](https://github.com/rollup/rollup-pluginutils/issues/19))
* Allow `createFilter` to take regexes ([#5](https://github.com/rollup/rollup-pluginutils/issues/5))

## 1.5.2
*2016-08-29*
* Treat `arguments` as a reserved word ([#10](https://github.com/rollup/rollup-pluginutils/issues/10))

## 1.5.1
*2016-06-24*
* Add all declarators in a var declaration to scope, not just the first

## 1.5.0
*2016-06-07*
* Exclude IDs with null character (`\0`)

## 1.4.0
*2016-06-07*
* Workaround minimatch issue ([#6](https://github.com/rollup/rollup-pluginutils/pull/6))
* Exclude non-string IDs in `createFilter`

## 1.3.1
*2015-12-16*
* Build with Rollup directly, rather than via Gobble

## 1.3.0
*2015-12-16*
* Use correct path separator on Windows

## 1.2.0
*2015-11-02*
* Add `attachScopes` and `makeLegalIdentifier`

## 1.1.0
2015-10-24*
* Add `addExtension` function

## 1.0.1
*2015-10-24*
* Include dist files in package

## 1.0.0
*2015-10-24*
* First release
