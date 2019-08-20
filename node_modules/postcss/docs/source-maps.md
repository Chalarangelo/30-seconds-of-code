# PostCSS and Source Maps

PostCSS has great [source maps] support. It can read and interpret maps
from previous transformation steps, autodetect the format that you expect,
and output both external and inline maps.

To ensure that you generate an accurate source map, you must indicate the input
and output CSS file paths — using the options `from` and `to`, respectively.

To generate a new source map with the default options, simply set `map: true`.
This will generate an inline source map that contains the source content.
If you don’t want the map inlined, you can set `map.inline: false`.

```js
processor
  .process(css, {
    from: 'app.sass.css',
    to:   'app.css',
    map: { inline: false }
  })
  .then(result => {
      result.map //=> '{ "version":3,
                 //      "file":"app.css",
                 //      "sources":["app.sass"],
                 //       "mappings":"AAAA,KAAI" }'
  })
```

If PostCSS finds source maps from a previous transformation,
it will automatically update that source map with the same options.

## Options

If you want more control over source map generation, you can define the `map`
option as an object with the following parameters:

* `inline` boolean: indicates that the source map should be embedded
  in the output CSS as a Base64-encoded comment. By default, it is `true`.
  But if all previous maps are external, not inline, PostCSS will not embed
  the map even if you do not set this option.

  If you have an inline source map, the `result.map` property will be empty,
  as the source map will be contained within the text of `result.css`.

* `prev` string, object, boolean or function: source map content from
  a previous processing step (for example, Sass compilation).
  PostCSS will try to read the previous source map automatically
  (based on comments within the source CSS), but you can use this option
  to identify it manually. If desired, you can omit the previous map
  with `prev: false`.

* `sourcesContent` boolean: indicates that PostCSS should set the origin
  content (for example, Sass source) of the source map. By default,
  it is `true`. But if all previous maps do not contain sources content,
  PostCSS will also leave it out even if you do not set this option.

* `annotation` boolean or string: indicates that PostCSS should add annotation
  comments to the CSS. By default, PostCSS will always add a comment with a path
  to the source map. PostCSS will not add annotations to CSS files that
  do not contain any comments.

  By default, PostCSS presumes that you want to save the source map as
  `opts.to + '.map'` and will use this path in the annotation comment.
  A different path can be set by providing a string value for `annotation`.

  If you have set `inline: true`, annotation cannot be disabled.

* `from` string: by default, PostCSS will set the `sources` property of the map
  to the value of the `from` option. If you want to override this behaviour, you
  can use `map.from` to explicitly set the source map's `sources` property.
  Path should be absolute or relative from generated file
  (`to` option in `process()` method).

[source maps]: http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
