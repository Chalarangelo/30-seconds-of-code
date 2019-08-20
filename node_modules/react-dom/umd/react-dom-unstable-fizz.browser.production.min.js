/** @license React v16.9.0
 * react-dom-unstable-fizz.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';(function(g,e){"object"===typeof exports&&"undefined"!==typeof module?module.exports=e():"function"===typeof define&&define.amd?define(e):g.ReactDOMFizzServer=e()})(this,function(){function g(b,c){var a="<"+b+">";"string"===typeof c.children&&(a+=c.children);return k.encode(a+("</"+b+">"))}function e(b){var c=b.destination,a=b.completedChunks;b.completedChunks=[];for(b=0;b<a.length;b++)c.enqueue(a[b]);c.close()}var k=new TextEncoder,l="function"===typeof Symbol&&Symbol.for?Symbol.for("react.element"):
60103,d={renderToReadableStream:function(b){var c=void 0;return new ReadableStream({start:function(a){a=c={destination:a,children:b,completedChunks:[],flowing:!1};a.flowing=!0;var f=a.children;a.children=null;if(!f||f.$$typeof===l){var d=f.type;f=f.props;"string"===typeof d&&(a.completedChunks.push(g(d,f)),a.flowing&&e(a))}},pull:function(a){a=c;a.flowing=!1;e(a)},cancel:function(a){}})}},h={default:d};d=h&&d||h;return d.default||d});
