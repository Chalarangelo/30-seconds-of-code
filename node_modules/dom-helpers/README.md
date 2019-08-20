# dom-helpers

tiny modular DOM lib for ie8+

## Install

```sh
npm i -S dom-helpers
```


Mostly just naive wrappers around common DOM API inconsistencies, Cross browser work is minimal and mostly taken from jQuery. This library doesn't do a lot to normalize behavior across browsers, it mostly seeks to provide a common interface, and eliminate the need to write the same damn `if (ie8)` statements in every project.

For example `events.on` works in all browsers ie8+ but it uses the native event system so actual event oddities will continue to exist. If you need __robust__ cross-browser support, use jQuery. If you are just tired of rewriting:

```js
if (document.addEventListener)
  return (node, eventName, handler, capture) =>
    node.addEventListener(eventName, handler, capture || false);
else if (document.attachEvent)
  return (node, eventName, handler) =>
      node.attachEvent('on' + eventName, handler);
```

over and over again, or you need a ok `getComputedStyle` polyfill but don't want to include all of jQuery, use this.

dom-helpers does expect certain, polyfillable, es5 features to be present for which you can use `es5-shim` for ie8

The real advantage to this collection is that any method can be required individually, meaning tools like Browserify or webpack will only include the exact methods you use. This is great for environments where jQuery doesn't make sense, such as `React` where you only occasionally need to do direct DOM manipulation.

Each level of the module can be required as a whole or you can drill down for a specific method or section:

```js
    var helpers = require('dom-helpers')
    var query = require('dom-helpers/query')
    var offset = require('dom-helpers/query/offset')

    // style is a function
    require('dom-helpers/style')(node, { width: '40px' })

    //and a namespace
    var gcs = require('dom-helpers/style/getComputedStyle')
```

- dom-helpers
    - `ownerDocument(element)`: returns the element's document owner
    - `ownerWindow(element)`: returns the element's document window
    - `activeElement`: return focused element safely
    - query
        + `querySelectorAll(element, selector)`: optimized qsa, uses `getElementBy{Id|TagName|ClassName}` if it can.
        + `contains(container, element)`
        + `height(element, useClientHeight)`
        + `width(element, useClientWidth)`
        + `matches(element, selector)`: `matches()` polyfill that works in ie8
        + `offset(element)` -> `{ top: Number, left: Number, height: Number, width: Number}`
        + `offsetParent(element)`: return the parent node that the element is offset from
        + `position(element, [offsetParent]`: return "offset" of the node to its offsetParent, optionally you can specify the offset parent if different than the "real" one
        + `scrollTop(element, [value])`
        + `scrollLeft(element, [value])`
        + `scrollParent(element)`
    - class
        - `addClass(element, className)`
        - `removeClass(element, className)`
        - `hasClass(element, className)`
    - `style(element, propName, [value])` or `style(element, objectOfPropValues)`
        + `removeStyle(element, styleName)`
        + `getComputedStyle(element)` -> `getPropertyValue(name)`
    - transition
        + `animate(node, properties, duration, easing, callback)` programmatically start css transitions    
        + `end(node, handler, [duration])` listens for transition end, and ensures that the handler if called even if the transition fails to fire its end event. Will attempt to read duration from the element, otherwise one can be provided
        + `properties`: Object containing the various vendor specific transition and transform properties for your browser
        ```js
           {
            transform: // transform property: 'transform'
            end:       // transitionend
            property:  // transition-property
            timing:    // transition-timing
            delay:     // transition-delay  
            duration:  // transition-duration
           }
        ```
    - events
        + `on(node, eventName, handler, [capture])`:  capture is silently ignored in ie8
        + `off(node, eventName, handler, [capture])`: capture is silently ignored in ie8
        + `listen(node, eventName, handler, [capture])`: wraps `on` and returns a function that calls `off` for you
        + `filter(selector, fn)`: returns a function handler that only fires when the target matches or is contained in the selector ex: `events.on(list, 'click', events.filter('li > a', handler))`
    - util
        + `requestAnimationFrame(cb)` returns an ID for canceling
            * `requestAnimationFrame.cancel(id)`
        + `scrollbarSize([recalc])` returns the scrollbar's width size in pixels
        + `scrollTo(element, [scrollParent])`
