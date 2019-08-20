1.2.0 / 2019-07-24
=================
  * [New] add `auto` entry point
  * [Deps] update `define-properties`, `es-abstract`, `function-bind`
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `@es-shims/api`, `covert`, `replace`, `semver`, `tape`; remove `jscs`
  * [Tests] fix tests for the mongolian vowel separator
  * [Tests] up to `node` `v12.6`, `v11.15`, `v10.16`, `v9.11`, `v8.16`, `v7.10`, `v6.17`, `v5.12`, `4.9`; use `nvm install-latest-npm`
  * [Tests] use `npx aud` instead of `nsp` or `npm audit` with hoops
  * [Tests] use `functions-have-names`
  * [Tests] use pretest/posttest for linting/security
  * [meta] Only apps should have lockfiles

1.1.2 / 2016-02-06
=================
  * Use the polyfill, not the implementation, as the default export.
  * package.json: use object form of "authors", add "contributors"
  * [Deps] update `define-properties`, `es-abstract`
  * [Dev Deps] update `tape`, `jscs`, `nsp`, `eslint`, `semver`, `@ljharb/eslint-config`
  * [Tests] fix npm upgrades for older nodes
  * [Tests] up to `node` `v5.5`, don’t allow `0.8` to fail

1.1.1 / 2015-08-16
=================
  * [Docs] remove "if" around `.shim` call in example

1.1.0 / 2015-08-16
=================
  * [New] Implement the [es-shim API](es-shims/api).
  * [Refactor] Move implementation to `implementation.js`
  * [Deps] update `es-abstract`
  * [Dev Deps] update `jscs`, `tape`
  * [Docs] Switch from vb.teelaun.ch to versionbadg.es for the npm version badge SVG

1.0.0 / 2015-08-08
=================
  * Initial release
