## Unreleased

## v1.2.0
- [New] support comments (#37)
- [Refactor] Use template and types from the babel object (#32)
- [Tests] on `node` `v9`; pin included builds to LTS
- [Dev Deps] update `eslint`, `eslint-config-airbnb-base`, `mocha`, `rimraf`

## v1.1.0
- Visit Import nodes instead of CallExpressions (#30)
- [Deps] update `babel-template`, `babel-types`
- [Dev Deps] update `airbnb-js-shims`, `babel-cli`, `babel-core`, `babel-preset-airbnb`, `babel-register`, `chai`, `eslint`, `eslint-config-airbnb-base`, `eslint-plugin-import`, `mocha`
- [Tests] on `node` `v8`
- [Tests] use `nvm install-latest-npm` so newer npm doesn’t break older node

## v1.0.2
- [Fix] Ensure it works with the ES2015 preset too (#12, #16)
- [Deps] update `babel-template`, `babel-types`
- [Dev Deps] update `babel-cli`, `babel-core`, `babel-eslint`, `babel-register`, `eslint`, `eslint-config-airbnb-base`, `mocha`

## v1.0.1
- [Fix] Move `in-publish` to devDeps (#11)
- [Fix] ensure dynamic `import()` input is properly stringified (#2)
- [Fix] async timing of dynamic import to match spec (#3)
- [Fix] Remove spaces in template strings and update Babel (#10)
- [Deps] update `babel-template`, `babel-types`
- [Deps] update `babel-types` (#4, #5, #6)
- [Dev Deps] update `babel-cli`, `babel-core`, `babel-eslint`, `babel-register`, `eslint`, `eslint-config-airbnb-base`, `eslint-plugin-import`, `mocha`, `rimraf`

## v1.0.0
- Initial full release.
