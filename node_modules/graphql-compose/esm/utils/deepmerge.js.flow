/* @flow */
/* eslint-disable prefer-template, no-param-reassign, no-lonely-if */
// https://github.com/KyleAMathews/deepmerge/blob/master/index.js

export default function deepmerge<T: any>(target: any, src: T): T {
  const array = Array.isArray(src);
  let dst: T = ((array && []) || {}: any);

  if (array) {
    target = target || [];
    dst = dst.concat(target);
    src.forEach((e, i) => {
      if (typeof dst[i] === 'undefined') {
        dst[i] = e;
      } else if (typeof e === 'object') {
        dst[i] = deepmerge(target[i], e);
      } else {
        if (target.indexOf(e) === -1) {
          dst.push(e);
        }
      }
    });
  } else {
    if (target && typeof target === 'object') {
      Object.keys(target).forEach(key => {
        dst[key] = target[key];
      });
    }
    Object.keys(src).forEach(key => {
      if (typeof src[key] !== 'object' || !src[key]) {
        dst[key] = src[key];
      } else {
        if (!target[key]) {
          dst[key] = src[key];
        } else {
          dst[key] = deepmerge(target[key], src[key]);
        }
      }
    });
  }

  return dst;
}
