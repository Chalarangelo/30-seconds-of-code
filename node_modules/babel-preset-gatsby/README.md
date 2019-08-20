# babel-preset-gatsby

Gatsby uses the phenomenal project [Babel](https://babeljs.io/) to enable support for writing modern JavaScript — while still supporting older browsers. This package contains the default Babel setup for all Gatsby projects.

For more information on how to customize the Babel configuration of your Gatsby site, check out [our documentation](https://www.gatsbyjs.org/docs/babel/).

## Packages

- [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env)
- [`@babel/preset-react`](https://babeljs.io/docs/en/babel-preset-react)
- [`@babel/plugin-proposal-class-properties`](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)
- [`@babel/plugin-syntax-dynamic-import`](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import)
- [`@babel/plugin-transform-runtime`](https://babeljs.io/docs/en/babel-plugin-transform-runtime#docsNav)
- [`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros)
- [`babel-plugin-transform-react-remove-prop-types`](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types)

## Usage

Install `babel-preset-gatsby` and add a `.babelrc` file with the following content to the root of your project:

```bash
npm install --dev babel-preset-gatsby
```

```json
{
  "presets": ["babel-preset-gatsby"]
}
```

## Options

### `targets`

`{ [string]: number | string }`, defaults to `{ "browsers": ["last 4 versions", "safari >= 7", "ie >= 9"] }` in production and `{ "browsers": ["last 2 versions", "not ie <= 11", "not android 4.4.3"] }` in development when targeting the browser and `{ "node": 6 }` in production and `{ "node": "current" }` in development when targeting Node.js.

Use this option to configure [custom target browsers](https://www.gatsbyjs.org/docs/babel/).
