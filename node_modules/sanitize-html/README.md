# sanitize-html

[![CircleCI](https://circleci.com/gh/punkave/sanitize-html/tree/master.svg?style=svg)](https://circleci.com/gh/punkave/sanitize-html/tree/master)

<a href="https://apostrophecms.org/"><img src="https://raw.github.com/punkave/sanitize-html/master/logos/logo-box-madefor.png" align="right" /></a>

`sanitize-html` provides a simple HTML sanitizer with a clear API.

`sanitize-html` is tolerant. It is well suited for cleaning up HTML fragments such as those created by ckeditor and other rich text editors. It is especially handy for removing unwanted CSS when copying and pasting from Word.

`sanitize-html` allows you to specify the tags you want to permit, and the permitted attributes for each of those tags.

If a tag is not permitted, the contents of the tag are still kept, except for `script`, `style` and `textarea` tags.

The syntax of poorly closed `p` and `img` elements is cleaned up.

`href` attributes are validated to ensure they only contain `http`, `https`, `ftp` and `mailto` URLs. Relative URLs are also allowed. Ditto for `src` attributes.

Allowing particular urls as a `src` to an iframe tag by filtering hostnames is also supported.

HTML comments are not preserved.

## Requirements

`sanitize-html` is intended for use with Node. That's pretty much it. All of its npm dependencies are pure JavaScript. `sanitize-html` is built on the excellent `htmlparser2` module.

## How to use

### Browser

*Think first: why do you want to use it in the browser?* Remember, *servers must never trust browsers.* You can't sanitize HTML for saving on the server anywhere else but on the server.

But, perhaps you'd like to display sanitized HTML immediately in the browser for preview. Or ask the browser to do the sanitization work on every page load. You can if you want to!

* Clone repository
* Run npm install and build / minify:

```bash
npm install
npm run minify
```

You'll find the minified and unminified versions of sanitize-html (with all its dependencies included) in the dist/ directory.

Use it in the browser:

```html
<html>
    <body>
        <script type="text/javascript"  src="dist/sanitize-html.js"></script>
        <script type="text/javascript" src="demo.js"></script>
    </body>
</html>
```

```javascript
var html = "<strong>hello world</strong>";
console.log(sanitizeHtml(html));
console.log(sanitizeHtml("<img src=x onerror=alert('img') />"));
console.log(sanitizeHtml("console.log('hello world')"));
console.log(sanitizeHtml("<script>alert('hello world')</script>"));
```

### Node (Recommended)

Install module from console:

```bash
npm install sanitize-html
```

Use it in your node app:

```js
var sanitizeHtml = require('sanitize-html');

var dirty = 'some really tacky HTML';
var clean = sanitizeHtml(dirty);
```

That will allow our default list of allowed tags and attributes through. It's a nice set, but probably not quite what you want. So:

```js
// Allow only a super restricted set of tags and attributes
clean = sanitizeHtml(dirty, {
  allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
  allowedAttributes: {
    'a': [ 'href' ]
  },
  allowedIframeHostnames: ['www.youtube.com']
});
```

Boom!

#### "I like your set but I want to add one more tag. Is there a convenient way?" Sure:

```js
clean = sanitizeHtml(dirty, {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
});
```

If you do not specify `allowedTags` or `allowedAttributes` our default list is applied. So if you really want an empty list, specify one.

#### "What are the default options?"

```js
allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
  'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
  'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe' ],
allowedAttributes: {
  a: [ 'href', 'name', 'target' ],
  // We don't currently allow img itself by default, but this
  // would make sense if we did. You could add srcset here,
  // and if you do the URL is checked for safety
  img: [ 'src' ]
},
// Lots of these won't come up by default because we don't allow them
selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
// URL schemes we permit
allowedSchemes: [ 'http', 'https', 'ftp', 'mailto' ],
allowedSchemesByTag: {},
allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
allowProtocolRelative: true
```

#### "What if I want to allow all tags or all attributes?"

Simple! instead of leaving `allowedTags` or `allowedAttributes` out of the options, set either
one or both to `false`:

```js
allowedTags: false,
allowedAttributes: false
```

#### "What if I don't want to allow *any* tags?"

Also simple!  Set `allowedTags` to `[]` and `allowedAttributes` to `{}`.

```js
allowedTags: [],
allowedAttributes: {}
```

### "What if I want to allow only specific values on some attributes?"

When configuring the attribute in `allowedAttributes` simply use an object with attribute `name` and an allowed `values` array. In the following example `sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-scripts"` would become `sandbox="allow-popups allow-scripts"`:

```js
        allowedAttributes: {
          iframe: [
            {
              name: 'sandbox',
              multiple: true,
              values: ['allow-popups', 'allow-same-origin', 'allow-scripts']
            }
          ]
```

With `multiple: true`, several allowed values may appear in the same attribute, separated by spaces. Otherwise the attribute must exactly match one and only one of the allowed values.

### Wildcards for attributes

You can use the `*` wildcard to allow all attributes with a certain prefix:

```javascript
allowedAttributes: {
  a: [ 'href', 'data-*' ]
}
```

Also you can use the `*` as name for a tag, to allow listed attributes to be valid for any tag:

```javascript
allowedAttributes: {
  '*': [ 'href', 'align', 'alt', 'center', 'bgcolor' ]
}
```

### htmlparser2 Options

`santizeHtml` is built on `htmlparser2`. By default the only option passed down is `decodeEntities: true` You can set the options to pass by using the parser option.

```javascript
clean = sanitizeHtml(dirty, {
  allowedTags: ['a'],
  parser: {
    lowerCaseTags: true
  }
});
```
See the [htmlparser2 wiki] (https://github.com/fb55/htmlparser2/wiki/Parser-options) for the full list of possible options.

### Transformations

What if you want to add or change an attribute? What if you want to transform one tag to another? No problem, it's simple!

The easiest way (will change all `ol` tags to `ul` tags):

```js
clean = sanitizeHtml(dirty, {
  transformTags: {
    'ol': 'ul',
  }
});
```

The most advanced usage:

```js
clean = sanitizeHtml(dirty, {
  transformTags: {
    'ol': function(tagName, attribs) {
        // My own custom magic goes here

        return {
            tagName: 'ul',
            attribs: {
                class: 'foo'
            }
        };
    }
  }
});
```

You can specify the `*` wildcard instead of a tag name to transform all tags.

There is also a helper method which should be enough for simple cases in which you want to change the tag and/or add some attributes:

```js
clean = sanitizeHtml(dirty, {
  transformTags: {
    'ol': sanitizeHtml.simpleTransform('ul', {class: 'foo'}),
  }
});
```

The `simpleTransform` helper method has 3 parameters:

```js
simpleTransform(newTag, newAttributes, shouldMerge)
```

The last parameter (`shouldMerge`) is set to `true` by default. When `true`, `simpleTransform` will merge the current attributes with the new ones (`newAttributes`). When `false`, all existing attributes are discarded.

You can also add or modify the text contents of a tag:

```js
clean = sanitizeHtml(dirty, {
  transformTags: {
    'a': function(tagName, attribs) {
        return {
            tagName: 'a',
            text: 'Some text'
        };
    }
  }
});
```
For example, you could transform a link element with missing anchor text:
```js
<a href="http://somelink.com"></a>
```
To a link with anchor text:
```js
<a href="http://somelink.com">Some text</a>
```

### Filters

You can provide a filter function to remove unwanted tags. Let's suppose we need to remove empty `a` tags like:

```html
<a href="page.html"></a>
```

We can do that with the following filter:

```javascript
sanitizeHtml(
  '<p>This is <a href="http://www.linux.org"></a><br/>Linux</p>',
  {
    exclusiveFilter: function(frame) {
        return frame.tag === 'a' && !frame.text.trim();
    }
  }
);
```

The `frame` object supplied to the callback provides the following attributes:

 - `tag`: The tag name, i.e. `'img'`.
 - `attribs`: The tag's attributes, i.e. `{ src: "/path/to/tux.png" }`.
 - `text`: The text content of the tag.
 - `tagPosition`: The index of the tag's position in the result string.

You can also process all text content with a provided filter function. Let's say we want an ellipsis instead of three dots.

```html
<p>some text...</p>
```

We can do that with the following filter:

```javascript
sanitizeHtml(
  '<p>some text...</p>',
  {
    textFilter: function(text) {
      return text.replace(/\.\.\./, '&hellip;');
    }
  }
);
```

Note that the text passed to the `textFilter` method is already escaped for safe display as HTML. You may add markup and use entity escape sequences in your `textFilter`.

### Iframe Filters

If you would like to allow iframe tags but want to control the domains that are allowed through you can provide an array of hostnames that you would like to allow as iframe sources. This hostname is a property in the options object passed as an argument to the `sanitize-html` function.

This array will be checked against the html that is passed to the function and return only `src` urls that include the allowed hostnames in the object. The url in the html that is passed must be formatted correctly (valid hostname) as an embedded iframe otherwise the module will strip out the src from the iframe.

Make sure to pass a valid hostname along with the domain you wish to allow, i.e.:

```javascript
  allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
```

You may also specify whether or not to allow relative URLs as iframe sources.

```javascript
  allowIframeRelativeUrls: true
```

Note that if unspecified, relative URLs will be allowed by default if no hostname filter is provided but removed by default if a hostname filter is provided.

**Remember that the `iframe` tag must be allowed as well as the `src` attribute.**

For example:

```javascript
clean = sanitizeHtml('<p><iframe src="https://www.youtube.com/embed/nykIhs12345"></iframe><p>', {
  allowedTags: [ 'p', 'em', 'strong', 'iframe' ],
  allowedClasses: {
    'p': [ 'fancy', 'simple' ],
  },
  allowedAttributes: {
    'iframe': ['src']
  },
  allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
});
```

will pass through as safe whereas:

```javascript
clean = sanitizeHtml('<p><iframe src="https://www.youtube.net/embed/nykIhs12345"></iframe><p>', {
  allowedTags: [ 'p', 'em', 'strong', 'iframe' ],
  allowedClasses: {
    'p': [ 'fancy', 'simple' ],
  },
  allowedAttributes: {
    'iframe': ['src']
  },
  allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
});
```

or

```javascript
clean = sanitizeHtml('<p><iframe src="https://www.vimeo/video/12345"></iframe><p>', {
  allowedTags: [ 'p', 'em', 'strong', 'iframe' ],
  allowedClasses: {
    'p': [ 'fancy', 'simple' ],
  },
  allowedAttributes: {
    'iframe': ['src']
  },
  allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
});
```

will return an empty iframe tag.

### Allowed CSS Classes

If you wish to allow specific CSS classes on a particular element, you can do so with the `allowedClasses` option. Any other CSS classes are discarded.

This implies that the `class` attribute is allowed on that element.

```javascript
// Allow only a restricted set of CSS classes and only on the p tag
clean = sanitizeHtml(dirty, {
  allowedTags: [ 'p', 'em', 'strong' ],
  allowedClasses: {
    'p': [ 'fancy', 'simple' ]
  }
});
```

### Allowed CSS Styles

If you wish to allow specific CSS _styles_ on a particular element, you can do that with the `allowedStyles` option. Simply declare your desired attributes as regular expression options within an array for the given attribute. Specific elements will inherit whitelisted attributes from the global (\*) attribute. Any other CSS classes are discarded.

**You must also use `allowedAttributes`** to activate the `style` attribute for the relevant elements. Otherwise this feature will never come into play.

**When constructing regular expressions, don't forget `^` and `$`.** It's not enough to say "the string should contain this." It must also say "and only this."

**URLs in inline styles are NOT filtered by any mechanism other than your regular expression.**

```javascript
clean = sanitizeHtml(dirty, {
        allowedTags: ['p'],
        allowedAttributes: {
          'p': ["style"],
        },
        allowedStyles: {
          '*': {
            // Match HEX and RGB
            'color': [/^\#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
            'text-align': [/^left$/, /^right$/, /^center$/],
            // Match any number with px, em, or %
            'font-size': [/^\d+(?:px|em|%)$/]
          },
          'p': {
            'font-size': [/^\d+rem$/]
          }
        }
      });
```

### Allowed URL schemes

By default we allow the following URL schemes in cases where `href`, `src`, etc. are allowed:

```js
[ 'http', 'https', 'ftp', 'mailto' ]
```

You can override this if you want to:

```javascript
sanitizeHtml(
  // teeny-tiny valid transparent GIF in a data URL
  '<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />',
  {
    allowedTags: [ 'img', 'p' ],
    allowedSchemes: [ 'data', 'http' ]
  }
);
```

You can also allow a scheme for a particular tag only:

```javascript
allowedSchemes: [ 'http', 'https' ],
allowedSchemesByTag: {
  img: [ 'data' ]
}
```

And you can forbid the use of protocol-relative URLs (starting with `//`) to access another site using the current protocol, which is allowed by default:

```javascript
allowProtocolRelative: false
```

### Discarding the entire contents of a disallowed tag

Normally, with a few exceptions, if a tag is not allowed, all of the text within it is preserved, and so are any allowed tags within it.

The exceptions are:

`style`, `script`, `textarea`

If you wish to expand this list, for instance to discard whatever is found inside a `noscript` tag, use the `nonTextTags` option:

```javascript
nonTextTags: [ 'style', 'script', 'textarea', 'noscript' ]
```

Note that if you use this option you are responsible for stating the entire list. This gives you the power to retain the content of `textarea`, if you want to.

The content still gets escaped properly, with the exception of the `script` and `style` tags. *Allowing either `script` or `style` leaves you open to XSS attacks. Don't do that* unless you have good reason to trust their origin.

## About P'unk Avenue and Apostrophe

`sanitize-html` was created at [P'unk Avenue](http://punkave.com) for use in ApostropheCMS, an open-source content management system built on node.js. If you like `sanitize-html` you should definitely [check out apostrophecms.org](http://apostrophecms.org).

## Changelog

[The changelog is now in a separate file for readability.](https://github.com/punkave/sanitize-html/blob/master/CHANGELOG.md)

## Support

Feel free to open issues on [github](http://github.com/punkave/sanitize-html).

<a href="http://punkave.com/"><img src="https://raw.github.com/punkave/sanitize-html/master/logos/logo-box-builtby.png" /></a>
