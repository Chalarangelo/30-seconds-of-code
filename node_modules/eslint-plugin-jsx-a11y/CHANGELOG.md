6.2.3 / 2019-06-30
=================
- [617] Add @babel/runtime to the dependencies

6.2.2 / 2019-06-29
=================
- Update jsx-ast-utils to v2.2.1
- Add @babel/cli to the dev dependencies
- Update ESLint to v6
- Update jsx-ast-utils to 2.2.0
- Update flow-bin to version 0.102.0
- [589] Allow expression statements for attribute values in no-noninteractive-tabindexlow-bin-0.101.0
- [583] Allow expression values in attributes by configurationrror
- [596] Adding a test case for no-static-element-interactionseper/flow-bin-0.101.0) Merge branch 'master' into greenkeeper/flow-bin-0.101.0
- Only run branch test coverage on the master branch
- chore(package): update flow-bin to version 0.100.0
- Allow select as a valid child of label.
- Allow Node 4 / ESLint 3 failure to unblock ESLint upgrade in PR #568
- chore(package): update flow-bin to version 0.99.0
- Remove rootDir from Jest path configs
- (fix) Template literals with undefined evaluate to the string undefined.
- adds more tests to “anchor-is-valid”
- Fixes “anchor-is-valid” false positive for hrefs starting with the word “javascript”
- chore(package): update eslint-plugin-flowtype to version 3.5.0
- Modified no-static-element-interactions to pass on non-literal roles.
- Added isNonLiteralProperty util method
- [#399] Account for spread in parser options
- [552] control-has-associated-label should allow generic links
- [issue 392] ul role='list' test case
- chore(package): update eslint to version 5.15.2
- chore(package): update flow-bin to version 0.95.0
- chore(package): update expect to version 24.3.1
- Fix typo: defintions > definitions
- docs: add proper title to links to axe website for media-has-caption
- docs: removes deprecated rule label-has-for
- docs: fix typo and couple grammatical errors in Readme
- Ignore null/undefined values in role-supports-aria-props rule
- Ignore undefined values in aria-proptypes rule
- Ignore null values in aria-proptypes rule
- set target for node 4

6.2.1 / 2019-02-03
=================
- 9980e45 [fix] Prevent Error when JSXSpreadAttribute is passed to isSemanticRoleElement

6.2.0 / 2019-01-25
=================
- 5650674 [new rule] control-has-associated-label checks interactives for a label
- f234698 [docs] add How to manage IDs
- 9924d03 [docs] document jsx-a11y/label-has-associated-control assert option
- 77b9870 [docs] Add newlines below headings
- 8244e43 [docs] Add syntax highlighting to example
- 26f41c8 [docs] Change explanation for role="presentation" escape hatch
- 33a1f94 [fix] - Purely decorative emojis do not need descriptions.
- 29d20f7 [fix] (package): update emoji-regex to version 7.0.2
- 0b63f73 [chore] (package): update flow-bin to version 0.88.0
- baa1344 [fix] Disable jsx-a11y/label-has-for in recommended
- 2c5fb06 [chore] (package): update jscodeshift to version 0.6.0
- 87debc0 [fix] corrected no-noninteractive-element-to-interactive-role.md file
- d56265b [chore] (package): update flow-bin to version 0.87.0
- 477966f [fix] Update test for implicit role of `img`
- f484ce3 [fix] No implicit role for `<img>` with `alt=""`
- 6c33bcb [fix] Add select to the list of default control elements in label-has-associated-control
- 011f8d9 [fix] Dialog and Alert roles can host keyboard listeners
- 0f6a8af [fix] More easier `plugin:jsx-a11y/{recommended,strict}` configs
- 3844248 [fix] Mark the replacement for label-has-for
- 93265cb [fix] normalizedValues to values
- 651366c [fix] Make aria-role case sensitive
- 56d3b9a [fix] [484] Fix role-has-required-aria-props for semantic elements like input[checkbox]
- 46e9abd [fix] Handle the type={truthy} case in jsx

6.1.2 / 2018-10-05
=================
- [fix] Add link-type styling recommendation to anchor-is-valid #486
- [fix] `label-has-for`: `textarea`s are inputs too #470

6.1.1 / 2018-07-03
==================
- [fix] aria-proptypes support for idlist, #454
- [fix] Image with expanded props throws 'The prop must be a JSXAttribute collected by the AST parser.', #459
- [fix] label-has-for: broken in v6.1.0, #455

6.1.0 / 2018-06-26
==================
- [new] Support for eslint v5, #451
- [new] aria-query updated to latest version
- [new] eslint-config-airbnb-base updated to the latest version
- [deprecate] The rule label-has-for is deprecated and replaced with label-has-associated-control
- [fix] heading-has-content updated to work with custom components, #431
- [fix] aria-errormessage prop is now a valid ARIA property, #424

6.0.2 / 2017-06-28
==================
- [fix] Prefix directories in `.npmignore` with `/` so it only matches the top-level directory


6.0.1 / 2017-06-28
==================
- [temporary] Remove `src` and `flow` from package to resolve flow issues for consuming packages.


6.0.0 / 2017-06-05
=================
- [new] Add rule `anchor-is-valid`. See documentation for configuration options. Thanks @AlmeroSteyn.
- [breaking] `href-no-hash` replaced with `anchor-is-valid` in the recommended and strict configs. Use the `invalidHref` aspect (active by default) in `anchor-is-valid` to continue to apply the behavior provided by `href-no-hash`.
- [breaking] Removed support for ESLint peer dependency at version ^2.10.2.
- [update] The rule `label-has-for` now allows inputs nested in label tags. Previously it was strict about requiring a `for` attribute. Thanks @ignatiusreza and @mjaltamirano.
- [update] New configuration for `interactive-supports-focus`. Recommended and strict configs for now contain a trimmed-down whitelist of roles that will be checked.
- [fix] Incompatibility between node version 4 and 5. Thanks @evilebottnawi.
- [fix] Missing README entry for `media-has-caption`. Thanks @ismail-syed.
- [fix] README updates explaining recommended and strict configs. Thanks @Donaldini.
- [fix] Updated to aria-query@0.7.0, which includes new ARIA 1.1 properties. Previously, the `aria-props` rule incorrectly threw errors for these new properties.

5.1.1 / 2017-07-03
==================
 - [fix] revert v6 breaking changes unintentionally added in v5.1 (#283)

5.1.0 / 2017-06-26
==================
 - [new] Support eslint v4. (#267)
 - [new] `label-has-for`: add "required" option to allow customization (#240)
 - [new] add `anchor-is-valid` (#224)
 - [new] `interactive-supports-focus`: Split interactive supports focus into tabbable and focusable cases (#236)
 - [new] `anchor-is-valid`: add `aspects` option (#251)
 - [Deps] Bump aria-query to 0.7.0

5.0.3 / 2017-05-16
==================
- [fix] Remove `flow` directory from `.npmignore` to accommodate explicit imports from `v5.0.2`.


5.0.2 / 2017-05-16
==================
- [fix] Explicitly import flow types to resolve flow failures in consuming projects.


5.0.1 / 2017-05-07
==================
- [fix] Polyfill Array.includes for node < 6 support.


5.0.0 / 2017-05-05
==================
- [breaking] Refactor `img-has-alt` rule into `alt-text` rule
- [breaking] Rule `onclick-has-role` is removed. Replaced with `no-static-element-interactions` and `no-noninteractive-element-interactions`.
- [breaking] Rule `onclick-has-focus` is removed. Replaced with `interactive-supports-focus`.
- [new] - Add rule `media-has-caption` rule
- [new] - Add `ignoreNonDOM` option to `no-autofocus`.
- [new] - Add rule `no-interactive-element-to-noninteractive-role`
- [new] - Add rule `no-noninteractive-element-to-interactive-role`
- [new] - Add rule `no-noninteractive-tabindex`
- [new] - Configs split into "recommended" and "strict".
- [enhanced] - Configuration options added to `no-static-element-interactions` and `no-noninteractive-element-interactions`. Options allow for fine-tuning of elements and event handlers to check.


4.0.0 / 2017-02-04
==================
Add new rules:
- `jsx-a11y/accessible-emoji`
- `jsx-a11y/aria-activedescendant-has-tabindex`
- `jsx-a11y/iframe-has-title`
- `jsx-a11y/no-autofocus`
- `jsx-a11y/no-distracting-elements` *(breaking: consolidated no-marquee and no-blink into this rule.)*
- `jsx-a11y/no-redundant-roles`
- [fix] - redundant-alt to only check full words
- [docs] - Documentation upgrades across the board.
- [new] - Add `ignoreNonDom`
- [dev] - Add script to scaffold new rule creation.


3.0.2 / 2016-12-14
==================
- [fix] - make `aria-invalid` values true and false pass for rule `aria-proptypes`

3.0.1 / 2016-10-11
==================
- [breaking] - Update all rule schemas to accept objects. This allows a future schema expansion to not be a breaking change.
- [breaking] - All rules with schemas that accepted a string OR array, now only allows an array.
- [new] - `href-no-hash` accepts new schema property `specialLink` to check for custom `href` properties on elements. (fixes [#76](https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/76))
- [breaking][fix] - `img-has-alt` now prefers `alt=""` over `role="presentation"`. You can set both, but not just `role="presentation"` by itself to ensure a11y across all devices.

Note - see [rule documentation](https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules) for updated schemas.

2.2.3 / 2016-10-08
==================
- [fix] - Add `switch` aria role.
- [devDependencies] - Updgrade dev dependencies and fix linting issues.


2.2.2 / 2016-09-12
==================
- [fix] `x-has-content` rules now pass with children prop set.


2.2.1 / 2016-08-31
==================
- [fix] Update `tablist` role to include missing property `aria-multiselectable`.


2.2.0 / 2016-08-26
==================
- [new] Add `click-events-have-key-events` rule.
- [new] Add `no-static-element-interactions` rule.
- [devDependencies] Upgrade `eslint`, `eslint-config-airbnb`, `mocha` to latest.
- [lint] Fix all new linting errors with upgrade
- [nit] Use `error` syntax over `2` syntax in recommended config.


2.1.0 / 2016-08-10
==================
- [fix] Require `aria-checked` for roles that are subclasses of `checkbox`
- [new] Add `anchor-has-content` rule.
- [refactor] Use new eslint rule syntax
- [new] Add support for custom words in `img-redundant-alt` (mainly for i18n).


2.0.1 / 2016-07-13
==================
- [fix] JSXElement support in expression handlers for prop types.
- [fix] `heading-has-content`: dangerouslySetInnerHTML will pass.


2.0.0 / 2016-07-12
==================
- [breaking] Scope `no-onchange` rule to select menu elements only.


1.5.5 / 2016-07-05
==================
- [fix] Add `eslint` v3 as a `peerDependency`.


1.5.4 / 2016-07-05
==================
- [fix] Add `eslint` as a `peerDependency`.


1.5.3 / 2016-06-16
==================
- [fix] Fix crash when ``<ELEMENT role />`` for `role-supports-aria-props`.


1.5.2 / 2016-06-16
==================
- [fix] Fix `img-redundant-alt` rule to use `getLiteralPropValue` from `jsx-ast-utils`.


1.5.1 / 2016-06-16
==================
- [fix] Fix checking for undefined in `heading-has-content` for children content.


1.5.0 / 2016-06-16
==================
- [new] Add [heading-has-content](docs/rules/heading-has-content.md) rule.
- [new] Add [html-has-lang](docs/rules/html-has-lang.md) rule.
- [new] Add [lang](docs/rules/lang.md) rule.
- [new] Add [no-marquee](docs/rules/no-marquee.md) rule.
- [new] Add [scope](docs/rules/scope.md) rule.


1.4.2 / 2016-06-10
==================
- [new] Integrate with latest `jsx-ast-utils` to use `propName` function. More support for namespaced names on attributes and elements.


1.4.1 / 2016-06-10
==================
- [fix] Handle spread props in `aria-unsupported-elements` and `role-supports-aria-props` when reporting.


1.4.0 / 2016-06-10
==================
- [dependency] Integrate [jsx-ast-utils](https://github.com/evcohen/jsx-ast-utils)
- [fix] Better error reporting for aria-unsupported-elements indicating which prop to remove.


1.3.0 / 2016-06-05
==================
- [new] Spelling suggestions for incorrect `aria-*` props
- [fix] Ensure `role` value is a string before converting to lowercase in `img-has-alt` rule.


1.2.3 / 2016-06-02
==================
- [fix] Handle dynamic `tabIndex` expression values, but still retain validation logic for literal `tabIndex` values.


1.2.2 / 2016-05-20
==================
- [fix] Fix checks involving the tabIndex attribute that do not account for integer literals


1.2.1 / 2016-05-19
==================
- [fix] Avoid testing interactivity of wrapper components with same name but different casing
as DOM elements (such as `Button` vs `button`).


1.2.0 / 2016-05-06
==================
- [new] Import all roles from DPUB-ARIA.


1.1.0 / 2016-05-06
==================
- [new] Add expression value handler for `BinaryExpression` type.
- [new] Add expression value handler for `NewExpression` type.
- [new] Add expression value handler for `ObjectExpression` type.
- [fix] Throws error when getting an expression of type without a handler function.
	- This is for more graceful error handling and better issue reporting.


1.0.4 / 2016-04-28
==================
- [fix] Add expression value handler for `ConditionalExpression` type.


1.0.3 / 2016-04-25
==================
- [fix] Fix typo in recommended rules for `onclick-has-focus`.


1.0.2 / 2016-04-20
==================
- [fix] Add expression value handler for `ThisExpression` type.


1.0.1 / 2016-04-19
==================
- [fix] Fix build to copy source JSON files to build output.


1.0.0 / 2016-04-19
==================
- [breaking] Rename `img-uses-alt` to `img-has-alt`
- [breaking] Rename `onlick-uses-role` to `onclick-has-role`
- [breaking] Rename `mouse-events-map-to-key-events` to `mouse-events-have-key-events`
- [breaking] Rename `use-onblur-not-onchange` to `no-onchange`
- [breaking] Rename `label-uses-for` to `label-has-for`
- [breaking] Rename `redundant-alt` to `img-redundant-alt`
- [breaking] Rename `no-hash-href` to `href-no-hash`
- [breaking] Rename `valid-aria-role` to `aria-role`

- [new] Implement `aria-props` rule
- [new] Implement `aria-proptypes` rule
- [new] Implement `aria-unsupported-elements` rule
- [new] Implement `onclick-has-focus` rule
- [new] Implement `role-has-required-aria-props` rule
- [new] Implement `role-supports-aria-props` rule
- [new] Implement `tabindex-no-positive` rule


0.6.2 / 2016-04-08
==================
- [fix] Fix rule details for img-uses-alt: allow alt="" or role="presentation".


0.6.1 / 2016-04-07
==================
- [fix] Do not infer interactivity of components that are not low-level DOM elements.


0.6.0 / 2016-04-06
==================
- [breaking] Allow alt="" when role="presentation" on img-uses-alt rule.
- [new] More descriptive error messaging for img-uses-alt rule.


0.5.2 / 2016-04-05
==================
- [fix] Handle token lists for valid-aria-role.


0.5.1 / 2016-04-05
==================
- [fix] Handle null valued props for valid-aria-role.


0.5.0 / 2016-04-02
==================
- [new] Implement valid-aria-role rule. Based on [AX_ARIA_01](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_01)


0.4.3 / 2016-03-29
==================
- [fix] Handle LogicalExpression attribute types when extracting values. LogicalExpressions are of form `<Component prop={foo || "foobar"} />`


0.4.2 / 2016-03-24
==================
- [fix] Allow component names of form `Object.Property` i.e. `UX.Layout`


0.3.0 / 2016-03-02
==================
- [new] Implement [no-hash-href](docs/rules/no-hash-href.md) rule.
- [fix] Fixed TemplateLiteral AST value building to get more exact values from template strings.


0.2.0 / 2016-03-01
==================
- [new] Implement [redunant-alt](docs/rules/redundant-alt.md) rule.


0.1.2 / 2016-03-01
==================
- Initial pre-release.
