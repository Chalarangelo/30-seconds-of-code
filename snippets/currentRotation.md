---
title: currentRotation
tags: browser,css,intermediate
---

<!--
Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
-->

Find the current rotate or rotateY value of an element in degrees.

- Uses `window.getComputedStyle()` and `CSSStyleDeclaration.getPropertyValue()` to get transform matrix.
- Calculates the current degree with `Math.atan2()` based off of the returned matrix.
- Returns a number from 0-360.
- Due to precision you may want to round the result.
- Does ***NOT*** work for rotateX (see comments for details).
- Licened under 0BSD.

```js
/**
 * Find the current rotate or rotateY value of an element in degrees.
 * @function currentRotation
 * @param {Element} element - The element to check the rotation of.
 * @returns {number} Returns the current rotation in degrees (from 0-360).
 */
const currentRotation = element => {
  const allStyles = window.getComputedStyle(element, null);
  const transformMatrix = allStyles.getPropertyValue('transform');
  // If the property is empty or set to none, then there is no rotation.
  if (transformMatrix === '' || transformMatrix === 'none') return 0;
  const flattenedMatrix = transformMatrix.split(/[(,]/);
  /*
   * Both rotate and rotateY have values that line up.
   * Unfortunetly, rotateX does not have any spots that line up.
   * Since it requires special detection rotateX is ***not*** supported.
   * For Reference:
   * rotate (Adeg) = matrix  ( cos(A), sin(A), -sin(A), cos(A), 0, 0       );
   * rotateY(Ydeg) = matrix3d( cos(Y), 0,      -sin(Y), 0,      0, 1,      ...
   * rotateX(Xdeg) = matrix3d( 1,      0,      0,       0,      0, cos(Y), ...
   */
  const arctan2 = Math.atan2(-flattenedMatrix[3], flattenedMatrix[1]);
  const arctan2Deg = arctan2 * 180 / Math.PI;
  /*
   * By default arctan2Deg will be between -180 to 180.
   * This is due to how arctan2 works (uses all 4 quadrants).
   * However, most likely 0-360 deg is expected.
   * Add 360 deg if arctan2Deg < 0
   */
  return arctan2Deg < 0 ? arctan2Deg + 360 : arctan2Deg;
};

```

```js
currentRotation(document.querySelector('p')); // 180

```
