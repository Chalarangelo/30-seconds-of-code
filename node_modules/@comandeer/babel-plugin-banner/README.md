# babel-plugin-banner [![Build Status](https://travis-ci.org/Comandeer/babel-plugin-banner.svg?branch=master)](https://travis-ci.org/Comandeer/babel-plugin-banner) [![Dependency Status](https://david-dm.org/Comandeer/babel-plugin-banner.svg)](https://david-dm.org/Comandeer/babel-plugin-banner) [![devDependency Status](https://david-dm.org/Comandeer/babel-plugin-banner/dev-status.svg)](https://david-dm.org/Comandeer/babel-plugin-banner#info=devDependencies)

Prepends given comment to the beginning of babelified code.

## Installation

```bash
npm install @comandeer/babel-plugin-banner [--save-dev]
```

## Usage

```javascript
{
  "presets": ["es2015"],
  "plugins": [
    ["@comandeer/babel-plugin-banner", {
      "banner": "/*! Some nice comment */"
    }]
  ]
}
```

## License

See [LICENSE](./LICENSE) file for details.
