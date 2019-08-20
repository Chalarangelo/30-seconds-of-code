3.0.3 / 2017-04-18
=================
  * [Fix] ensure that `shim.js` actually shims when the polyfill differs from native
  * [Tests] up to `node` `v7.9`, `v6.10`, `v4.8`; comment out OS X builds; improve test matrix
  * [Dev Deps] update `nsp`, `eslint`, `@ljharb/eslint-config`, `tape`, `jscs`, `semver`, `function-bind`, `@es-shims/api`
  * [Deps] update `es-abstract`
  * [Docs] update readme: add “getting started” and “usage” (#19)

3.0.2 / 2015-06-06
=================
  * Use the polyfill, not the implementation, as the default export
  * [Deps] update `es-abstract`
  * [Dev Deps] update `jscs`, `nsp`, `eslint`, `@ljharb/eslint-config`, `semver`
  * [Tests] up to `node` `v5.5`
  * [Tests] keep tests passing in `node` `v0.8`
  * [Tests] Only run `evalmd` as part of the full test suite, since it's more like a linter
  * [Tests] fix npm upgrades for older nodes

3.0.1 / 2015-05-23
=================
  * [Fix] in "shim", assign the polyfill, not the implementation

3.0.0 / 2015-05-23
=================
  * [Breaking] Implement the [es-shim API](es-shims/api)
  * [Deps] update `define-properties`, `es-abstract`
  * [Dev Deps] update `eslint`, `semver`, `nsp`, `semver`, `jscs`
  * [Docs] Switch from vb.teelaun.ch to versionbadg.es for the npm version badge SVG
  * [Tests] use my personal shared `eslint` config
  * [Tests] up to `io.js` `v3.0`

2.0.0 / 2015-05-23
=================
  * Fix to not skip holes, per https://github.com/tc39/Array.prototype.includes/issues/15

1.1.1 / 2015-05-23
=================
  * Test up to `io.js` `v2.0`
  * Update `es-abstract`, `tape`, `eslint`, `semver`, `jscs`, `semver`

1.1.0 / 2015-03-19
=================
  * Update `es-abstract`, `editorconfig-tools`, `nsp`, `eslint`, `semver`

1.0.6 / 2015-02-17
=================
  * All grade A-supported `node`/`iojs` versions now ship with an `npm` that understands `^`.
  * Run `travis-ci` tests on `iojs` and `node` v0.12; allow 0.8 failures.
  * Update `tape`, `jscs`, `es-abstract`, remove `is`.

1.0.5 / 2015-01-30
=================
  * Update `tape`, `jscs`, `nsp`, `eslint`, `es-abstract`

1.0.4 / 2015-01-10
=================
  * Use `es-abstract` for ECMAScript spec internal abstract operations

1.0.3 / 2015-01-06
=================
  * Speed optimization: use Array#indexOf when available
  * Fix ES3, IE 6-8, Opera 10.6, Opera 11.1 support
  * Run testling on both sets of tests

1.0.2 / 2015-01-05
=================
  * Ensure tests are includes in the module on `npm`

1.0.1 / 2015-01-04
=================
  * Remove mistaken auto-shim.

1.0.0 / 2015-01-04
=================
  * v1.0.0
