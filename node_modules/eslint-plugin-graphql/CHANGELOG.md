# Change log

### vNEXT

### v3.0.3

- chore: Update dependency `graphql-tools` to `v4.0.4`. [PR #210](https://github.com/apollographql/eslint-plugin-graphql/pull/210)
- chore: Update dependency `eslint` to `v5.12.1`. [PR #206](https://github.com/apollographql/eslint-plugin-graphql/pull/206)
- chore: Update dependency `graphql` to `v14.1.1`. [PR #208](https://github.com/apollographql/eslint-plugin-graphql/pull/208)

### v3.0.2

- Fix regression which caused `graphql/required-fields` to throw on non-existent field references. [PR #203](https://github.com/apollographql/eslint-plugin-graphql/pull/203) by [Matt Bretl](https://github.com/mattbretl)

### v3.0.1

- Fix support for multi-schema workspaces [PR #179](https://github.com/apollographql/eslint-plugin-graphql/pull/179) by [Pat Sissons](https://github.com/patsissons)

### v3.0.0

- BREAKING: The `required-fields` rule has been significantly changed to make it a completely reliable method of ensuring an `id` field (or any other field name) is always requested when available. [PR #199](https://github.com/apollographql/eslint-plugin-graphql/pull/199) Here is the behavior, let's say we are requiring field `id`:
    - On any field whose return type defines a field called `id`, the selection set must directly contain `id`.
    - In any named fragment declaration whose type defines a field called `id`, the selection set must directly contain `id`.
    - An inline fragment whose type defines a field called `id` must contain `id` in its selection set unless its parent is also an inline fragment that contains the field `id`.
    - Here's a specific case which is _no longer valid_:
        - `query { greetings { hello ... on Greetings { id } } }`
        - This must now be written as `query { greetings { id hello ... on Greetings { id } } }`
    - This is a more conservative approach than before, driven by the fact that it's quite hard to ensure that a combination of inline fragments actually covers all of the possible types of a selection set.
- Fix breaking change in `graphql@^14.0.0` that renamed `ProvidedNonNullArguments` to `ProvidedRequiredArguments` [#192](https://github.com/apollographql/eslint-plugin-graphql/pull/192)
- Update dependencies to graphql-tools 4 and eslint 5.9 [#193](https://github.com/apollographql/eslint-plugin-graphql/pull/193)

### v2.1.1
- Fix support for InlineFragments with the `required-fields` rule in [#140](https://github.com/apollographql/eslint-plugin-graphql/pull/140/files) by [Steve Hollaar](https://github.com/stevehollaar)
- Fix error location information for literal .graphql files and strings with leading newlines in [#122](https://github.com/apollographql/eslint-plugin-graphql/pull/122) by [Dan Freeman](https://github.com/dfreeman)
- Add [`fraql`](https://github.com/smooth-code/fraql) environment

### v2.1.0
- Retrieves `.graphqlconfig` relative to the file being linted, which re-enables support for `vscode-eslint` using `.graphqlconfig` in [#108](https://github.com/apollographql/eslint-plugin-graphql/pull/108) by [Jon Wong][https://github.com/jnwng/]
- Cache schema reading/parsing results each time a rule is created in [#137](https://github.com/apollographql/eslint-plugin-graphql/pull/137) by [Kristján Oddsson](https://github.com/koddsson)

### v2.0.0
- Add support for `graphql-js@^0.12.0` and `graphql-js@^0.13.0` in [Jon Wong](https://github.com/jnwng/)[#119] (https://github.com/apollographql/eslint-plugin-graphql/pull/93)
- Update list of available validators in [#121]((https://github.com/apollographql/eslint-plugin-graphql/pull/121) by [Pleun Vanderbauwhede](https://github.com/pleunv)
- Update supported Node `engines` to >= 6.0 in [#133](https://github.com/apollographql/eslint-plugin-graphql/pull/133) by [Jon Wong](https://github.com/jnwng/)

### v1.5.0
- Add new rule `no-deprecated-fields` in [Kristján Oddsson](https://github.com/koddsson/)[#92](https://github.com/apollographql/eslint-plugin-graphql/pull/93)
- Add support for deprecated fields on enums in [#100](https://github.com/apollographql/eslint-plugin-graphql/pull/100) by [Daniel Rinehart](https://github.com/NeoPhi)
- Bumped `babel-eslint` and pinned `graphql-config` in [#101](https://github.com/apollographql/eslint-plugin-graphql/pull/101) by [Jon Wong](https://github.com/jnwng)

### v1.4.1
Skipped v1.4.0 because of incorrect version tag in `package.json`
- Move `graphql-js` to `peerDependencies`, support `graphql@^0.11.0` in [Jon Wong](https://github.com/jnwng/)[#91](https://github.com/apollographql/eslint-plugin-graphql/pull/91)
- Fix escaping of literal .graphql files [Simon Lydell](https://github.com/lydell/) in [#88](https://github.com/apollographql/eslint-plugin-graphql/pull/88)
- Fix ESLint config validation [Simon Lydell](https://github.com/lydell/) in [#86](https://github.com/apollographql/eslint-plugin-graphql/pull/86)

### v1.3.0
- add support for [.graphqlconfig](https://github.com/graphcool/graphql-config) [Roman Hotsiy](https://github.com/RomanGotsiy) in [#80](https://github.com/apollographql/eslint-plugin-graphql/pull/80)
- add `graphql/capitalized-type-name` rule to warn on uncapitalized type names [DianaSuvorova](https://github.com/DianaSuvorova) in [#81](https://github.com/apollographql/eslint-plugin-graphql/pull/81)

### v1.2.0
- Add env config option for required-fields rule [Justin Schulz](https://github.com/PepperTeasdale) in [#75](https://github.com/apollographql/eslint-plugin-graphql/pull/75)

### v1.1.0
- Add option to pass schema as string [Christopher Cliff](https://github.com/christophercliff) in [#78](https://github.com/apollographql/eslint-plugin-graphql/pull/78)

### v1.0.0
- Fix template env for older runtimes (eg. node 5 and earlier) [Justin Schulz](https://github.com/PepperTeasdale) in [#73](https://github.com/apollographql/eslint-plugin-graphql/pull/73)
- Updated `graphql-js` to `v0.10.1` in [#67](https://github.com/apollographql/eslint-plugin-graphql/pull/67) [Sashko Stubailo](https://github.com/stubailo)

### v0.8.2
- Remove `KnownFragmentNames` and `UnusedFragment` from default rules in `literal` env. [Justin Schulz](https://github.com/PepperTeasdale) in [#70](https://github.com/apollographql/eslint-plugin-graphql/pull/70)

### v0.8.1
- Fix `graphql/required-fields` throwing on non-existent field reference [Benjie](https://github.com/benjie) in [#65](https://github.com/apollographql/eslint-plugin-graphql/pull/65)

### v0.8.0

- Updated `graphql` dependency to resolve test failures ([wording change](https://github.com/graphql/graphql-js/commit/ba401e154461bca5323ca9121c6dacaee10ebe88), no API change) [jnwng](https://github.com/jnwng)
- Add lint rule to enforce that required fields are specified. [rgoldfinger](https://github.com/rgoldfinger) in [#47](https://github.com/apollographql/eslint-plugin-graphql/pull/50)

### v0.7.0
- Add lint rule to enforce that operations have names [gauravmk](https://github.com/gauravmk) in [#47](https://github.com/apollographql/eslint-plugin-graphql/pull/47)

### v0.6.1

- Remove `babel-polyfill` from runtime dependencies, since it was only being used in test code. [joelgriffith](https://github.com/joelgriffith) in [#44](https://github.com/apollographql/eslint-plugin-graphql/pull/44)

### v0.6.0
- Update graphql-js dependency to 0.9.0 [jonbretman](https://github.com/jonbretman) in [#41](https://github.com/apollostack/eslint-plugin-graphql/pull/41)

### v0.5.0
- Take into account Apollo fragment interpolation rules [jnwng](https://github.com/jnwng) in [#33](https://github.com/apollostack/eslint-plugin-graphql/pull/33)
- Update graphql-js dependency to 0.8.2 [jonbretman](https://github.com/jonbretman) in [#40](https://github.com/apollostack/eslint-plugin-graphql/pull/40)


### v0.4.3

- Add `'literal'` option to options schema, so that it can actually be used. [stefanorg](https://github.com/stefanorg) in [#39](https://github.com/apollostack/eslint-plugin-graphql/pull/39)

### v0.4.2

- Added `'literal'` option to `env` for when working with `.graphql` and `.gql` files, by [jtmthf in #36](https://github.com/apollostack/eslint-plugin-graphql/pull/36)

### v0.4.1

- Support for selecting validation rules one by one, by [erydo in
#34](https://github.com/apollostack/eslint-plugin-graphql/pull/34)

### v0.4.0

- Support for multiple schemas, by [erydo in
#31](https://github.com/apollostack/eslint-plugin-graphql/pull/31)

### v0.3.1

- We didn't keep track of changes before this version. Consult the commit log.
