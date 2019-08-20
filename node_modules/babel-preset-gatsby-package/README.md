# babel-preset-gatsby-package

This [Babel](https://babeljs.io/) preset is used for our internal packages. If you're looking for the preset a **Gatsby Site** can use, please refer to [babel-preset-gatsby](https://github.com/gatsbyjs/gatsby/blob/master/packages/babel-preset-gatsby/README.md) instead.

## Packages

- [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env)
- [`@babel/preset-react`](https://babeljs.io/docs/en/babel-preset-react)
- [`@babel/preset-flow`](https://babeljs.io/docs/en/babel-preset-flow)
- [`@babel/plugin-proposal-class-properties`](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)
- [`@babel/plugin-proposal-optional-chaining`](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)
- [`@babel/plugin-transform-runtime`](https://babeljs.io/docs/en/babel-plugin-transform-runtime#docsNav)

## Usage

Install `babel-preset-gatsby-package` and add a `.babelrc` file with the following content to the root of your project:

```bash
npm install --dev babel-preset-gatsby-package
```

```json
{
  "presets": ["babel-preset-gatsby-package"]
}
```

## Options

### `browser`

`boolean`, defaults to `false`.

Defines if [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) is configured to target browsers or Node.js environments.

### `debug`

`boolean`, defaults to `false`.

Outputs the targets/plugins used and the version specified in [plugin data version](https://github.com/babel/babel/blob/master/packages/babel-preset-env/data/plugins.json) to `console.log`.
