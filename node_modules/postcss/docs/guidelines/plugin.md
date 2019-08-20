# PostCSS Plugin Guidelines

A PostCSS plugin is a function that receives and, usually,
transforms a CSS AST from the PostCSS parser.

The rules below are *mandatory* for all PostCSS plugins.

See also [ClojureWerkz’s recommendations] for open source projects.

[ClojureWerkz’s recommendations]:  http://blog.clojurewerkz.org/blog/2013/04/20/how-to-make-your-open-source-project-really-awesome/

## 1. API

### 1.1 Clear name with `postcss-` prefix

The plugin’s purpose should be clear just by reading its name.
If you wrote a transpiler for CSS 4 Custom Media, `postcss-custom-media`
would be a good name. If you wrote a plugin to support mixins,
`postcss-mixins` would be a good name.

The prefix `postcss-` shows that the plugin is part of the PostCSS ecosystem.

This rule is not mandatory for plugins that can run as independent tools,
without the user necessarily knowing that it is powered by
PostCSS — for example, [RTLCSS] and [Autoprefixer].

[Autoprefixer]: https://github.com/postcss/autoprefixer
[RTLCSS]:       https://rtlcss.com/

### 1.2. Do one thing, and do it well

Do not create multitool plugins. Several small, one-purpose plugins bundled into
a plugin pack is usually a better solution.

For example, [`postcss-preset-env`] contains many small plugins,
one for each W3C specification. And [`cssnano`] contains a separate plugin
for each of its optimization.

[`postcss-preset-env`]: https://preset-env.cssdb.org/
[`cssnano`]:            https://github.com/ben-eb/cssnano

### 1.3. Do not use mixins

Preprocessors libraries like Compass provide an API with mixins.

PostCSS plugins are different.
A plugin cannot be just a set of mixins for [`postcss-mixins`].

To achieve your goal, consider transforming valid CSS
or using custom at-rules and custom properties.

[`postcss-mixins`]: https://github.com/postcss/postcss-mixins

### 1.4. Create plugin by `postcss.plugin`

By wrapping your function in this method,
you are hooking into a common plugin API:

```js
module.exports = postcss.plugin('plugin-name', opts => {
  return (root, result) => {
    // Plugin code
  }
})
```

## 2. Processing

### 2.1. Plugin must be tested

A CI service like [Travis] is also recommended for testing code in
different environments. You should test in (at least) Node.js [active LTS](https://github.com/nodejs/LTS) and current stable version.

[Travis]: https://travis-ci.org/

### 2.2. Use asynchronous methods whenever possible

For example, use `fs.writeFile` instead of `fs.writeFileSync`:

```js
postcss.plugin('plugin-sprite', opts => {
  return (root, result) => {

    return new Promise((resolve, reject) => {
      const sprite = makeSprite()
      fs.writeFile(opts.file, sprite, err => {
        if (err) return reject(err)
        resolve()
      })
    })

  }
})
```

### 2.3. Set `node.source` for new nodes

Every node must have a relevant `source` so PostCSS can generate
an accurate source map.

So if you add a new declaration based on some existing declaration, you should
clone the existing declaration in order to save that original `source`.

```js
if (needPrefix(decl.prop)) {
  decl.cloneBefore({ prop: '-webkit-' + decl.prop })
}
```

You can also set `source` directly, copying from some existing node:

```js
if (decl.prop === 'animation') {
  const keyframe = createAnimationByName(decl.value)
  keyframes.source = decl.source
  decl.root().append(keyframes)
}
```

### 2.4. Use only the public PostCSS API

PostCSS plugins must not rely on undocumented properties or methods,
which may be subject to change in any minor release. The public API
is described in [API docs].

[API docs]: http://api.postcss.org/

## 3. Errors

### 3.1. Use `node.error` on CSS relevant errors

If you have an error because of input CSS (like an unknown name
in a mixin plugin) you should use `node.error` to create an error
that includes source position:

```js
if (typeof mixins[name] === 'undefined') {
  throw decl.error('Unknown mixin ' + name, { plugin: 'postcss-mixins' })
}
```

### 3.2. Use `result.warn` for warnings

Do not print warnings with `console.log` or `console.warn`,
because some PostCSS runner may not allow console output.

```js
if (outdated(decl.prop)) {
  result.warn(decl.prop + ' is outdated', { node: decl })
}
```

If CSS input is a source of the warning, the plugin must set the `node` option.

## 4. Documentation

### 4.1. Document your plugin in English

PostCSS plugins must have their `README.md` wrote in English. Do not be afraid
of your English skills, as the open source community will fix your errors.

Of course, you are welcome to write documentation in other languages;
just name them appropriately (e.g. `README.ja.md`).

### 4.2. Include input and output examples

The plugin's `README.md` must contain example input and output CSS.
A clear example is the best way to describe how your plugin works.

The first section of the `README.md` is a good place to put examples.
See [postcss-opacity](https://github.com/iamvdo/postcss-opacity) for an example.

Of course, this guideline does not apply if your plugin does not
transform the CSS.

### 4.3. Maintain a changelog

PostCSS plugins must describe the changes of all their releases
in a separate file, such as `CHANGELOG.md`, `History.md`, or [GitHub Releases].
Visit [Keep A Changelog] for more information about how to write one of these.

Of course, you should be using [SemVer].

[Keep A Changelog]: http://keepachangelog.com/
[GitHub Releases]:  https://help.github.com/articles/creating-releases/
[SemVer]:           http://semver.org/

### 4.4. Include `postcss-plugin` keyword in `package.json`

PostCSS plugins written for npm must have the `postcss-plugin` keyword
in their `package.json`. This special keyword will be useful for feedback about
the PostCSS ecosystem.

For packages not published to npm, this is not mandatory, but is recommended
if the package format can contain keywords.
