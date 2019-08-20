# [postcss][postcss]-reduce-initial

> Reduce `initial` definitions to the *actual* initial value, where possible.


## Install

With [npm](https://npmjs.org/package/postcss-reduce-initial) do:

```
npm install postcss-reduce-initial --save
```


## Examples

See the [data](data) for more conversions. This data is courtesy
of Mozilla.

### Convert `initial` values

When the `initial` keyword is longer than the property value, it will
be converted:

#### Input

```css
h1 {
    min-width: initial;
}
```

#### Output

```css
h1 {
    min-width: 0;
}
```


### Convert values back to `initial`

When the `initial` value is smaller than the property value, it will
be converted:

#### Input

```css
h1 {
    transform-box: border-box;
}
```

#### Output

```css
h1 {
    transform-box: initial;
}
```

This conversion is only applied when you supply a browsers list that all support
the `initial` keyword; it's worth noting that Internet Explorer has no support.


## Usage

See the [PostCSS documentation](https://github.com/postcss/postcss#usage) for
examples for your environment.


## Contributors

See [CONTRIBUTORS.md](https://github.com/cssnano/cssnano/blob/master/CONTRIBUTORS.md).


## License

[Template:CSSData] by Mozilla Contributors is licensed under [CC-BY-SA 2.5].

[Template:CSSData]: https://developer.mozilla.org/en-US/docs/Template:CSSData
[CC-BY-SA 2.5]: http://creativecommons.org/licenses/by-sa/2.5/

MIT © [Ben Briggs](http://beneb.info)

[postcss]: https://github.com/postcss/postcss
