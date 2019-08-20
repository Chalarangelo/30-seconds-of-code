## Changelog

1.20.1: Fix failing tests, add CircleCI config

1.20.0: reduced size of npm package via the `files` key; we only need to publish what's in `dist`. Thanks to Steven. There should be zero impact on behavior, minor version bump is precautionary.

1.19.3: reverted to `postcss` due to a [reported issue with `css-tree` that might or might not have XSS implications](https://github.com/punkave/sanitize-html/issues/269).

1.19.2:

* Switched out the heavy `postcss` dependency for the lightweight `css-tree` module. No API changes. Thanks to Justin Braithwaite.
* Various doc updates. Thanks to Pulkit Aggarwal and Cody Robertson.

1.19.1:

* `"` characters are now entity-escaped only when they appear in attribute values, reducing the verbosity of the resulting markup.

* Fixed a regression introduced in version 1.18.5 in the handling of markup that looks similar to a valid entity, but isn't. The bogus entity was passed through intact, i.e. `&0;` did not become `&amp;0;` as it should have. This fix has been made for the default parser settings only. There is no fix yet for those who wish to enable `decodeEntities: false`. That will require improving the alternative encoder in the `escapeHtml` function to only pass 100% valid entities.

**For those using the default `parser` settings this bug is fixed.** Read on if you are using alternative `parser` settings.

When `decodeEntities: true` is in effect (the default), this is not a problem because we only have to encode `& < > "` and we always encode those things.

There is currently a commented-out test which verifies one example of the problem when `decodeEntities` is false. However a correct implementation would need to not only pass that simple example but correctly escape all invalid entities, and not escape those that are valid.

1.19.0:

* New `allowIframeRelativeUrls` option. It defaults to `true` unless `allowedIframeHostnames` is present, in which case it defaults to false, for backwards compatibility with existing behavior in both cases; however you can now set the option explicitly to allow both certain hostnames and relative URLs. Thanks to Rick Martin.

1.18.5:

* Stop double encoding ampersands on HTML entities. Thanks to Will Gibson.

1.18.4:

* Removed incorrect `browser` key, restoring frontend build. Thanks to Felix Becker.

1.18.3:

* `iframe` is an allowed tag by default, to better facilitate typical use cases and the use of the `allowedIframeHostnames` option.
* Documentation improvements.
* More browser packaging improvements.
* Protocol-relative URLs are properly supported for iframe tags.

1.18.2:

* Travis tests passing.
* Fixed another case issue — and instituted Travis CI testing so this doesn't happen again. Sorry for the hassle.

1.18.1:

* A file was required with incorrect case, breaking the library on case sensitive filesystems such as Linux. Fixed.

1.18.0:

* The new `allowedSchemesAppliedToAttributes` option. This determines which attributes are validated as URLs, replacing the old hardcoded list of `src` and `href` only. The default list now includes `cite`. Thanks to ml-dublin for this contribution.

* It is now easy to configure a specific list of allowed values for an attribute. When configuring `allowedAttributes`, rather than listing an attribute name, simply list an object with an attribute `name` property and an allowed `values` array property. You can also add `multiple: true` to allow multiple space-separated allowed values in the attribute, otherwise the attribute must match one and only one of the allowed values. Thanks again to ml-dublin for this contribution.

* Fixed a bug in the npm test procedure.

1.17.0: the new `allowedIframeHostnames` option. If present, this must be an array, and only iframe `src` URLs hostnames (complete hostnames; domain name matches are not enough) that appear on this list are allowed. You must also configure `hostname` as an allowed attribute for `iframe`. Thanks to Ryan Verys for this contribution.

1.16.3: don't throw away the browserified versions before publishing them. `prepare` is not a good place to `make clean`, it runs after `prepublish`.

1.16.2: `sanitize-html` is now compiled with `babel`. An npm `prepublish` script takes care of this at `npm publish` time, so the latest code should always be compiled to operate all the way back to ES5 browsers and earlier versions of Node. Thanks to Ayushya Jaiswal.

Please note that running `sanitize-html` in the browser is usually a security hole. Are you trusting the browser? Anyone could bypass that using the network panel. Sanitization is almost always best done on servers and that is the primary use case for this module.

1.16.1: changelog formatting only.

1.16.0: support for sanitizing inline CSS styles, by specifying the allowed attributes and a regular expression for each. Thanks to Cameron Will and Michael Loschiavo.

1.15.0: if configured as an allowed attribute (not the default), check for naughty URLs in `srcset` attributes. Thanks to Mike Samuel for the nudge to do this and to Sindre Sorhus for the `srcset` module.

1.14.3: inadvertent removal of lodash regexp quote dependency in 1.14.2 has been corrected.

1.14.2: protocol-relative URL detection must spot URLs starting with `\\` rather than `//` due to ages-old tolerance features of web browsers, intended for sleepy Windows developers. Thanks to Martin Bajanik.

1.14.1: documented `allowProtocolRelative` option. No code changes from 1.14.0, released a few moments ago.  

1.14.0: the new `allowProtocolRelative` option, which is set to `true` by default, allows you to decline to accept URLs that start with `//` and thus point to a different host using the current protocol. If you do **not** want to permit this, set this option to `false`. This is fully backwards compatible because the default behavior is to allow them. Thanks to Luke Bernard.

1.13.0: `transformTags` can now add text to an element that initially had none. Thanks to Dushyant Singh.

1.12.0: option to build for browser-side use. Thanks to Michael Blum.

1.11.4: fixed crash when `__proto__` is a tag name. Now using a safe check for the existence of properties in all cases. Thanks to Andrew Krasichkov.

Fixed XSS attack vector via `textarea` tags (when explicitly allowed). Decided that `script` (obviously) and `style` (due to its own XSS vectors) cannot realistically be afforded any XSS protection if allowed, unless we add a full CSS parser. Thanks again to Andrew Krasichkov.

1.11.3: bumped `htmlparser2` version to address crashing bug in older version. Thanks to e-jigsaw.

1.11.2: fixed README typo that interfered with readability due to markdown issues. No code changes. Thanks to Mikael Korpela. Also improved code block highlighting in README. Thanks to Alex Siman.

1.11.1: fixed a regression introduced in 1.11.0 which caused the closing tag of the parent of a `textarea` tag to be lost. Thanks to Stefano Sala, who contributed the missing test.

1.11.0: added the `nonTextTags` option, with tests.

1.10.1: documentation cleanup. No code changes. Thanks to Rex Schrader.

1.10.0: `allowedAttributes` now allows you to allow attributes for all tags by specifying `*` as the tag name. Thanks to Zdravko Georgiev.

1.9.0: `parser` option allows options to be passed directly to `htmlparser`. Thanks to Danny Scott.

1.8.0:

* `transformTags` now accepts the `*` wildcard to transform all tags. Thanks to Jamy Timmermans.

* Text that has been modified by `transformTags` is then passed through `textFilter`. Thanks to Pavlo Yurichuk.

* Content inside `textarea` is discarded if `textarea` is not allowed. I don't know why it took me this long to see that this is just common sense. Thanks to David Frank.

1.7.2: removed `array-includes` dependency in favor of `indexOf`, which is a little more verbose but slightly faster and doesn't require a shim. Thanks again to Joseph Dykstra.

1.7.1: removed lodash dependency, adding lighter dependencies and polyfills in its place. Thanks to Joseph Dykstra.

1.7.0: introduced `allowedSchemesByTag` option. Thanks to Cameron Will.

1.6.1: the string `'undefined'` (as opposed to `undefined`) is perfectly valid text and shouldn't be expressly converted to the empty string.

1.6.0: added `textFilter` option. Thanks to Csaba Palfi.

1.5.3: do not escape special characters inside a script or style element, if they are allowed. This is consistent with the way browsers parse them; nothing closes them except the appropriate closing tag for the entire element. Of course, this only comes into play if you actually choose to allow those tags. Thanks to aletorrado.

1.5.2: guard checks for allowed attributes correctly to avoid an undefined property error. Thanks to Zeke.

1.5.1: updated to htmlparser2 1.8.x. Started using the `decodeEntities` option, which allows us to pass our filter evasion tests without the need to recursively invoke the filter.

1.5.0: support for `*` wildcards in allowedAttributes. With tests. Thanks to Calvin Montgomery.

1.4.3: invokes itself recursively until the markup stops changing to guard against [this issue](https://github.com/fb55/htmlparser2/issues/105). Bump to htmlparser2 version 3.7.x.

1.4.1, 1.4.2: more tests.

1.4.0: ability to  allow all attributes or tags through by setting `allowedAttributes` and/or `allowedTags` to false. Thanks to Anand Thakker.

1.3.0: `attribs` now available on frames passed to exclusive filter.

1.2.3: fixed another possible XSS attack vector; no definitive exploit was found but it looks possible. [See this issue.](https://github.com/punkave/sanitize-html/pull/20) Thanks to Jim O'Brien.

1.2.2: reject `javascript:` URLs when disguised with an internal comment. This is probably not respected by browsers anyway except when inside an XML data island element, which you almost certainly are not allowing in your `allowedTags`, but we aim to be thorough. Thanks to Jim O'Brien.

1.2.1: fixed crashing bug when presented with bad markup. The bug was in the `exclusiveFilter` mechanism. Unit test added. Thanks to Ilya Kantor for catching it.

1.2.0:

* The `allowedClasses` option now allows you to permit CSS classes in a fine-grained way.

* Text passed to your `exclusiveFilter` function now includes the text of child elements, making it more useful for identifying elements that truly lack any inner text.

1.1.7: use `he` for entity decoding, because it is more actively maintained.

1.1.6: `allowedSchemes` option for those who want to permit `data` URLs and such.

1.1.5: just a packaging thing.

1.1.4: custom exclusion filter.

1.1.3: moved to lodash. 1.1.2 pointed to the wrong version of lodash.

1.1.0: the `transformTags` option was added. Thanks to [kl3ryk](https://github.com/kl3ryk).

1.0.3: fixed several more javascript URL attack vectors after [studying the XSS filter evasion cheat sheet](https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet) to better understand my enemy. Whitespace characters (codes from 0 to 32), which browsers ignore in URLs in certain cases allowing the "javascript" scheme to be snuck in, are now stripped out when checking for naughty URLs. Thanks again to [pinpickle](https://github.com/pinpickle).

1.0.2: fixed a javascript URL attack vector. naughtyHref must entity-decode URLs and also check for mixed-case scheme names. Thanks to [pinpickle](https://github.com/pinpickle).

1.0.1: Doc tweaks.

1.0.0: If the style tag is disallowed, then its content should be dumped, so that it doesn't appear as text. We were already doing this for script tags, however in both cases the content is now preserved if the tag is explicitly allowed.

We're rocking our tests and have been working great in production for months, so: declared 1.0.0 stable.

0.1.3: do not double-escape entities in attributes or text. Turns out the "text" provided by htmlparser2 is already escaped.

0.1.2: packaging error meant it wouldn't install properly.

0.1.1: discard the text of script tags.

0.1.0: initial release.
