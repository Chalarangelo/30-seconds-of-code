/** @license React v16.9.0
 * react-dom-unstable-fizz.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';var e=new TextEncoder;function g(b,c){var a="<"+b+">";"string"===typeof c.children&&(a+=c.children);return e.encode(a+("</"+b+">"))}var h="function"===typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function k(b){var c=b.destination,a=b.completedChunks;b.completedChunks=[];for(b=0;b<a.length;b++)c.enqueue(a[b]);c.close()}
var l={renderToReadableStream:function(b){var c=void 0;return new ReadableStream({start:function(a){a=c={destination:a,children:b,completedChunks:[],flowing:!1};a.flowing=!0;var d=a.children;a.children=null;if(!d||d.$$typeof===h){var f=d.type;d=d.props;"string"===typeof f&&(a.completedChunks.push(g(f,d)),a.flowing&&k(a))}},pull:function(){var a=c;a.flowing=!1;k(a)},cancel:function(){}})}},m={default:l},n=m&&l||m;module.exports=n.default||n;
