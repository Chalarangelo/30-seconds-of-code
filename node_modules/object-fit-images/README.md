# object-fit-images [![gzipped size][badge-gzip]](#no-link) [![build status][badge-travis]][link-travis] [![npm][badge-version]][link-npm] [![CDNJS][badge-cdnjs]][link-cdnjs] [![jsDelivr][badge-jsdelivr]][link-jsdelivr]

  [badge-gzip]: https://badges.herokuapp.com/size/github/bfred-it/object-fit-images/master/dist/ofi.min.js?gzip=true&label=gzipped%20size
  [badge-travis]: https://api.travis-ci.org/bfred-it/object-fit-images.svg
  [badge-version]: https://img.shields.io/npm/v/object-fit-images.svg
  [badge-cdnjs]: https://img.shields.io/cdnjs/v/object-fit-images.svg
  [badge-jsdelivr]: https://data.jsdelivr.com/v1/package/npm/object-fit-images/badge?style=rounded 
  [link-travis]: https://travis-ci.org/bfred-it/object-fit-images
  [link-npm]: https://www.npmjs.com/package/object-fit-images
  [link-cdnjs]: https://cdnjs.com/libraries/object-fit-images
  [link-jsdelivr]: https://www.jsdelivr.com/package/npm/object-fit-images

> 🗻 Polyfill object-fit/object-position on `<img>`: IE9, IE10, IE11, Edge, Safari, ...

- Fast and lightweight ([demo](http://bfred-it.github.io/object-fit-images/demo/))
- No additional elements are created
- Setup is done via CSS
- Scaling is taken care by the browser (it uses `background-size`)
- `srcset` support
- `src` and `srcset` properties and attributes keep working: `img.src = 'other-image.jpg'`

## Alternative solutions


Comparison           | bfred-it<br>/object-fit-images🌟                                                                                         | [constancecchen<br>/object-fit-polyfill](https://github.com/constancecchen/object-fit-polyfill) | [tonipinel<br>/object-fit-polyfill](https://github.com/tonipinel/object-fit-polyfill)
---              | ---                                                                                                      | ---                                                                                            | ---
Browsers          | <sub>IEdge 9-14, Android<5, Safari<10</sub>                                                                          | <- Same                                                                                         | "All browsers"
Tags              | `img`                                                                                                     | `image` `video` `picture`                                                                     | `img`
`cover/contain`   | 💚                                                                                                         | 💚                                                                                               | 💚
`fill`            | 💚                                                                                                         | 💚                                                                                               | 💚
`none`            | 💚                                                                                                         | 💚                                                                                               | 💚
`scale-down`      | 💚 <sub>using [`{watchMQ:true}`](#apply-on-resize)</sub>                                                             | 💚                                                                                               | 💔
`object-position` | 💚                                                                                                         | 💚                                                                                               | 💔
`srcset` support  | 💚 Native or [picturefill](https://github.com/scottjehl/picturefill) <sub>[notes](detailed-support-tables.md)</sub> | 💚                                                                                               | 💔
Extra elements    | 💚 No                                                                                                      | 💔 Yes                                                                                           | 💔 Yes
Settings    | 💚 via CSS                                                                                                      | 💔 via HTML                                                                                           | 💔 via HTML


## Usage

You will need 3 things

1. one or more `<img>` elements with `src` or `srcset`  

	```html
	<img class='your-favorite-image' src='image.jpg'>
	```
	
2. CSS defining `object-fit` and a special `font-family` property to allow IE to read the correct value

	```css
	.your-favorite-image {
		object-fit: contain;
		font-family: 'object-fit: contain;';
	}
	```
	
	or, if you also need `object-position`
	
	```css
	.your-favorite-image {
		object-fit: cover;
		object-position: bottom;
		font-family: 'object-fit: cover; object-position: bottom;';
	}
	```
	
	To generate the `font-family` automatically, you can use the [PostCSS plugin](https://github.com/ronik-design/postcss-object-fit-images) or the [SCSS/SASS/Less mixins.](/preprocessors)
	
	If you set the `font-family` via JavaScript (which must be followed by calling `objectFitImages()`), make sure to include the quotes [**in** the property.](https://github.com/bfred-it/object-fit-images/issues/29#issuecomment-227491892)

3. <a name="activation"></a> the activation call before `</body>`, or _on DOM ready_

	```js
	objectFitImages();
	// if you use jQuery, the code is: $(function () { objectFitImages() });
	```
	
	This will fix all the images on the page **and** also all the images added later (auto mode).
	
	Alternatively, only fix the images you want, once:
	
	```js
	// pass a selector
	objectFitImages('img.some-image');
	```
	
	```js
	// an array/NodeList
	var someImages = document.querySelectorAll('img.some-image');
	objectFitImages(someImages);
	```
	
	```js
	// a single element
	var oneImage = document.querySelector('img.some-image');
	objectFitImages(oneImage);
	```
	
	```js
	// or with jQuery
	var $someImages = $('img.some-image');
	objectFitImages($someImages);
	```
	
	You can call `objectFitImages()` on the same elements more than once without issues, for example to manually request an update of the `object-fit` value.

## Apply on `resize`

You don't need to re-apply it on `resize`, unless:

* You're using `scale-down`, or
* <a id="media-query-affects-object-fit-value">your media queries change the value of `object-fit`,</a> like this

	```css
	                            img { object-fit: cover; }
	@media (max-width: 500px) { img { object-fit: contain; } }
	```

In one of those cases, use the `watchMQ` option:

```js
objectFitImages('img.some-image', {watchMQ: true});
// or objectFitImages(null, {watchMQ: true}); // for the auto mode
```

## Install

Pick your favorite:

```html
<script src="dist/ofi.min.js"></script>
<!-- CDN is also available, but I suggest you concatenate JS files instead -->
<!-- Visit https://cdnjs.com/libraries/object-fit-images -->
```

```sh
npm install --save object-fit-images
```

```js
var objectFitImages = require('object-fit-images');
```

```js
import objectFitImages from 'object-fit-images';
```

## API

### `objectFitImages(images, options)`

Both parameters are optional.

<table>
    <tr>
        <th>parameter</th>
        <th>description</th>
    </tr>
    <tr>
        <th><code>images</code></th>
        <td>
            Type: <code>string</code>, <code>element</code>, <code>array</code>, <code>NodeList</code>, <code>null</code><br>
            Default: <code>null</code><br><br>
            The images to fix. More info in the <a href="#usage">Usage</a> section 
        </td>
    </tr>
    <tr>
        <th><code>options</code></th>
        <td>
            Type: <code>object</code><br>
            Default: <code>{}</code><br>
            Example: <code>{watchMQ:true}</code><br><br>
            <table>
                <tr>
                    <th><code>watchMQ</code></th>
                    <td>
                        Type: <code>boolean</code><br>
                        Default: <code>false</code><br><br>
                        This enables the automatic re-fix of the selected images when the window resizes. You only need it <a href="#apply-on-resize">in some cases</a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

## License

MIT © [Federico Brigante](http://twitter.com/bfred_it)
