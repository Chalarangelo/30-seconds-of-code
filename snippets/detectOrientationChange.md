---
title: detectOrientationChange
tags: browser,easy
---

Returns the orientation of the device.

- Mobile devices are used to access most of the sites these days. You can use the below snippet to detect the orientation of the device and manipulate the webpage based on the orientation.

- The JavaScript snippet listens for the `orientationchange` event and detects the orientation depending on the angle. `90` or `-90` indicates `landscape` else `portrait`

```js
const detectOrientationChange = () => {
  switch (window.orientation) {
    case -90:
    case 90:
      console.log("landscape");
      // do something specific to landscape mode
      break;

    default:
      console.log("portrait");
      // do something specific to portrait mode
      break;
  }
};
```

```js
// Call the event listener. Try it out on a mobile device. Use `alert` instead of `console.log` in the function.

window.addEventListener("orientationchange", detectOrientationChange);
```
