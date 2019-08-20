<p align="center">
  <a href="https://travis-ci.org/evcohen/eslint-plugin-jsx-a11y">
    <img src="https://api.travis-ci.org/evcohen/eslint-plugin-jsx-a11y.svg?branch=master"
         alt="build status">
  </a>
  <a href="https://npmjs.org/package/eslint-plugin-jsx-a11y">
    <img src="https://img.shields.io/npm/v/eslint-plugin-jsx-a11y.svg"
         alt="npm version">
  </a>
  <a href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/LICENSE.md">
    <img src="https://img.shields.io/npm/l/eslint-plugin-jsx-a11y.svg"
         alt="license">
  </a>
  <a href='https://coveralls.io/github/evcohen/eslint-plugin-jsx-a11y?branch=master'>
    <img src='https://coveralls.io/repos/github/evcohen/eslint-plugin-jsx-a11y/badge.svg?branch=master' alt='Coverage Status' />
  </a>
  <a href='https://npmjs.org/package/eslint-plugin-jsx-a11y'>
    <img src='https://img.shields.io/npm/dt/eslint-plugin-jsx-a11y.svg'
    alt='Total npm downloads' />
  </a>
</p>

# eslint-plugin-jsx-a11y

Static AST checker for accessibility rules on JSX elements.

## Why?
Ryan Florence built out this awesome runtime-analysis tool called [react-a11y](https://github.com/reactjs/react-a11y). It is super useful. However, since you're probably already using linting in your project, this plugin comes for free and closer to the actual development process. Pairing this plugin with an editor lint plugin, you can bake accessibility standards into your application in real-time.

**Note**: This project does not *replace* react-a11y, but can and should be used in conjunction with it. Static analysis tools cannot determine values of variables that are being placed in props before runtime, so linting will not fail if that value is undefined and/or does not pass the lint rule.

## Installation

**If you are installing this plugin via `eslint-config-airbnb`, please follow [these instructions](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb#eslint-config-airbnb-1).**

You'll first need to install [ESLint](http://eslint.org):

```sh
# npm
npm install eslint --save-dev

# yarn
yarn add eslint --dev
```

Next, install `eslint-plugin-jsx-a11y`:

```sh
# npm
npm install eslint-plugin-jsx-a11y --save-dev

# yarn
yarn add eslint-plugin-jsx-a11y --dev
```

**Note:** If you installed ESLint globally (using the `-g` flag in npm, or the `global` prefix in yarn) then you must also install `eslint-plugin-jsx-a11y` globally.

## Usage

Add `jsx-a11y` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "jsx-a11y"
  ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "jsx-a11y/rule-name": 2
  }
}
```


You can also enable all the recommended or strict rules at once.
Add `plugin:jsx-a11y/recommended` or `plugin:jsx-a11y/strict` in `extends`:

```json
{
  "extends": [
    "plugin:jsx-a11y/recommended"
  ]
}
```

## Supported Rules

- [accessible-emoji](docs/rules/accessible-emoji.md): Enforce emojis are wrapped in <span> and provide screenreader access.
- [alt-text](docs/rules/alt-text.md): Enforce all elements that require alternative text have meaningful information to relay back to end user.
- [anchor-has-content](docs/rules/anchor-has-content.md): Enforce all anchors to contain accessible content.
- [anchor-is-valid](docs/rules/anchor-is-valid.md): Enforce all anchors are valid, navigable elements.
- [aria-activedescendant-has-tabindex](docs/rules/aria-activedescendant-has-tabindex.md): Enforce elements with aria-activedescendant are tabbable.
- [aria-props](docs/rules/aria-props.md): Enforce all `aria-*` props are valid.
- [aria-proptypes](docs/rules/aria-proptypes.md): Enforce ARIA state and property values are valid.
- [aria-role](docs/rules/aria-role.md): Enforce that elements with ARIA roles must use a valid, non-abstract ARIA role.
- [aria-unsupported-elements](docs/rules/aria-unsupported-elements.md): Enforce that elements that do not support ARIA roles, states, and properties do not have those attributes.
- [click-events-have-key-events](docs/rules/click-events-have-key-events.md): Enforce a clickable non-interactive element has at least one keyboard event listener.
- [heading-has-content](docs/rules/heading-has-content.md): Enforce heading (`h1`, `h2`, etc) elements contain accessible content.
- [html-has-lang](docs/rules/html-has-lang.md): Enforce `<html>` element has `lang` prop.
- [iframe-has-title](docs/rules/iframe-has-title.md): Enforce iframe elements have a title attribute.
- [img-redundant-alt](docs/rules/img-redundant-alt.md): Enforce `<img>` alt prop does not contain the word "image", "picture", or "photo".
- [interactive-supports-focus](docs/rules/interactive-supports-focus.md): Enforce that elements with interactive handlers like `onClick` must be focusable.
- [label-has-associated-control](docs/rules/label-has-associated-control.md): Enforce that a `label` tag has a text label and an associated control.
- [lang](docs/rules/lang.md): Enforce lang attribute has a valid value.
- [media-has-caption](docs/rules/media-has-caption.md): Enforces that `<audio>` and `<video>` elements must have a `<track>` for captions.
- [mouse-events-have-key-events](docs/rules/mouse-events-have-key-events.md): Enforce that `onMouseOver`/`onMouseOut` are accompanied by `onFocus`/`onBlur` for keyboard-only users.
- [no-access-key](docs/rules/no-access-key.md): Enforce that the `accessKey` prop is not used on any element to avoid complications with keyboard commands used by a screenreader.
- [no-autofocus](docs/rules/no-autofocus.md): Enforce autoFocus prop is not used.
- [no-distracting-elements](docs/rules/no-distracting-elements.md): Enforce distracting elements are not used.
- [no-interactive-element-to-noninteractive-role](docs/rules/no-interactive-element-to-noninteractive-role.md): Interactive elements should not be assigned non-interactive roles.
- [no-noninteractive-element-interactions](docs/rules/no-noninteractive-element-interactions.md): Non-interactive elements should not be assigned mouse or keyboard event listeners.
- [no-noninteractive-element-to-interactive-role](docs/rules/no-noninteractive-element-to-interactive-role.md): Non-interactive elements should not be assigned interactive roles.
- [no-noninteractive-tabindex](docs/rules/no-noninteractive-tabindex.md): `tabIndex` should only be declared on interactive elements.
- [no-onchange](docs/rules/no-onchange.md): Enforce usage of `onBlur` over `onChange` on select menus for accessibility.
- [no-redundant-roles](docs/rules/no-redundant-roles.md): Enforce explicit role property is not the same as implicit/default role property on element.
- [no-static-element-interactions](docs/rules/no-static-element-interactions.md): Enforce that non-interactive, visible elements (such as `<div>`) that have click handlers use the role attribute.
- [role-has-required-aria-props](docs/rules/role-has-required-aria-props.md): Enforce that elements with ARIA roles must have all required attributes for that role.
- [role-supports-aria-props](docs/rules/role-supports-aria-props.md): Enforce that elements with explicit or implicit roles defined contain only `aria-*` properties supported by that `role`.
- [scope](docs/rules/scope.md): Enforce `scope` prop is only used on `<th>` elements.
- [tabindex-no-positive](docs/rules/tabindex-no-positive.md): Enforce `tabIndex` value is not greater than zero.

### Difference between 'recommended' and 'strict' mode

Rule | Recommended | Strict
------------ | ------------- | -------------
[accessible-emoji](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/accessible-emoji.md) | error | error
[alt-text](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md) | error | error
[anchor-has-content](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-has-content.md) | error | error
[anchor-is-valid](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md) | error | error
[aria-activedescendant-has-tabindex](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-activedescendant-has-tabindex.md) | error | error
[aria-props](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-props.md) | error | error
[aria-proptypes](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-proptypes.md) | error | error
[aria-role](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md) | error | error
[aria-unsupported-elements](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-unsupported-elements.md) | error | error
[click-events-have-key-events](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md) | error | error
[heading-has-content](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/heading-has-content.md) | error | error
[html-has-lang](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/html-has-lang.md) | error | error
[iframe-has-title](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/iframe-has-title.md) | error | error
[img-redundant-alt](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md) | error | error
[interactive-supports-focus](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/interactive-supports-focus.md) | error | error
[label-has-associated-control](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md) | error | error
[media-has-caption](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/media-has-caption.md) | error | error
[mouse-events-have-key-events](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md) | error | error
[no-access-key](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md) | error | error
[no-autofocus](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-autofocus.md) | error | error
[no-distracting-elements](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-distracting-elements.md) | error | error
[no-interactive-element-to-noninteractive-role](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-interactive-element-to-noninteractive-role.md) | error, with options | error
[no-noninteractive-element-interactions](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-interactions.md) | error, with options | error
[no-noninteractive-element-to-interactive-role](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-to-interactive-role.md) | error, with options | error
[no-noninteractive-tabindex](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-tabindex.md) | error, with options | error
[no-onchange](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-onchange.md) | error | error
[no-redundant-roles](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-redundant-roles.md) | error | error
[no-static-element-interactions](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md) | error, with options | error
[role-has-required-aria-props](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-has-required-aria-props.md) | error | error
[role-supports-aria-props](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-supports-aria-props.md) | error | error
[scope](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/scope.md) | error, with options | error
[tabindex-no-positive](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/tabindex-no-positive.md) | error | error


The following rules have extra options when in *recommended* mode:

#### no-interactive-element-to-noninteractive-role
```
'jsx-a11y/no-interactive-element-to-noninteractive-role': [
  'error',
  {
    tr: ['none', 'presentation'],
  },
]
```

#### no-noninteractive-element-interactions
```
'jsx-a11y/no-noninteractive-element-interactions': [
  'error',
  {
    handlers: [
      'onClick',
      'onMouseDown',
      'onMouseUp',
      'onKeyPress',
      'onKeyDown',
      'onKeyUp',
    ],
  },
]
```

#### no-noninteractive-element-to-interactive-role
```
'jsx-a11y/no-noninteractive-element-to-interactive-role': [
  'error',
  {
    ul: [
      'listbox',
      'menu',
      'menubar',
      'radiogroup',
      'tablist',
      'tree',
      'treegrid',
    ],
    ol: [
      'listbox',
      'menu',
      'menubar',
      'radiogroup',
      'tablist',
      'tree',
      'treegrid',
    ],
    li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
    table: ['grid'],
    td: ['gridcell'],
  },
]
```

#### no-noninteractive-tabindex
```
'jsx-a11y/no-noninteractive-tabindex': [
  'error',
  {
    tags: [],
    roles: ['tabpanel'],
  },
]
```

#### no-static-element-interactions
```
'jsx-a11y/no-noninteractive-element-interactions': [
  'error',
  {
    handlers: [
      'onClick',
      'onMouseDown',
      'onMouseUp',
      'onKeyPress',
      'onKeyDown',
      'onKeyUp',
    ],
  },
]
```

## Creating a new rule

If you are developing new rules for this project, you can use the `create-rule`
script to scaffold the new files.

```
$ ./scripts/create-rule.js my-new-rule
```

## Some background on WAI-ARIA, the AX Tree and Browsers

### Accessibility API
An operating system will provide an accessibility API that maps application state and content onto input/output controllers such as a screen reader, braille device, keyboard, etc.

These APIs were developed as computer interfaces shifted from buffers (which are text-based and inherently quite accessible) to graphical user interfaces (GUIs). The first attempts to make GUIs accessible involved raster image parsing to recognize characters, words, etc. This information was stored in a parallel buffer and made accessible to assistive technology (AT) devices.

As GUIs became more complex, the raster parsing approach became untenable. Accessibility APIs were developed to replace them. Check out [NSAccessibility (AXAPI)](https://developer.apple.com/library/mac/documentation/Cocoa/Reference/ApplicationKit/Protocols/NSAccessibility_Protocol/index.html) for an example. See [Core Accessibility API Mappings 1.1](https://www.w3.org/TR/core-aam-1.1/) for more details.

### Browsers
Browsers support an Accessibility API on a per operating system basis. For instance, Firefox implements the MSAA accessibility API on Windows, but does not implement the AXAPI on OSX.

### The Accessibility (AX) Tree & DOM
From the [W3 Core Accessibility API Mappings 1.1](https://www.w3.org/TR/core-aam-1.1/#intro_treetypes)

> The accessibility tree and the DOM tree are parallel structures. Roughly speaking the accessibility tree is a subset of the DOM tree. It includes the user interface objects of the user agent and the objects of the document. Accessible objects are created in the accessibility tree for every DOM element that should be exposed to assistive technology, either because it may fire an accessibility event or because it has a property, relationship or feature which needs to be exposed. Generally, if something can be trimmed out it will be, for reasons of performance and simplicity. For example, a <span> with just a style change and no semantics may not get its own accessible object, but the style change will be exposed by other means.

Browser vendors are beginning to expose the AX Tree through inspection tools. Chrome has an experiment available to enable their inspection tool.

You can also see a text-based version of the AX Tree in Chrome in the stable release version.

#### Viewing the AX Tree in Chrome
  1. Navigate to `chrome://accessibility/` in Chrome.
  1. Toggle the `accessibility off` link for any tab that you want to inspect.
  1. A link labeled `show accessibility tree` will appear; click this link.
  1. Balk at the wall of text that gets displayed, but then regain your conviction.
  1. Use the browser's find command to locate strings and values in the wall of text.

### Pulling it all together
A browser constructs an AX Tree as a subset of the DOM. ARIA heavily informs the properties of this AX Tree. This AX Tree is exposed to the system level Accessibility API which mediates assistive technology agents.

We model ARIA in the [aria-query](https://github.com/a11yance/aria-query) project. We model AXObjects (that comprise the AX Tree) in the [axobject-query](https://github.com/A11yance/axobject-query) project. The goal of the WAI-ARIA specification is to be a complete declarative interface to the AXObject model. The [in-draft 1.2 version](https://github.com/w3c/aria/issues?q=is%3Aissue+is%3Aopen+label%3A%22ARIA+1.2%22) is moving towards this goal. But until then, we must consider the semantics constructs afforded by ARIA as well as those afforded by the AXObject model (AXAPI) in order to determine how HTML can be used to express user interface affordances to assistive technology users.

## License

eslint-plugin-jsx-a11y is licensed under the [MIT License](LICENSE.md).