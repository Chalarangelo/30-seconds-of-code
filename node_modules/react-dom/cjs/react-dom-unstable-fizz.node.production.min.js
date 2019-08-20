/** @license React v16.9.0
 * react-dom-unstable-fizz.node.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';function d(a,b){var c="<"+a+">";"string"===typeof b.children&&(c+=b.children);return Buffer.from(c+("</"+a+">"),"utf8")}var e="function"===typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function f(a){var b=a.destination,c=a.completedChunks;a.completedChunks=[];b.cork();try{for(a=0;a<c.length;a++)b.write(c[a])}finally{b.uncork()}b.end()}
function g(a){a.flowing=!0;setImmediate(function(){var b=a.children;a.children=null;if(!b||b.$$typeof===e){var c=b.type;b=b.props;"string"===typeof c&&(a.completedChunks.push(d(c,b)),a.flowing&&f(a),c=a.destination,"function"===typeof c.flush&&c.flush())}})}function h(a,b){return function(){b.flowing=!1;f(b)}}var k={pipeToNodeWritable:function(a,b){a={destination:b,children:a,completedChunks:[],flowing:!1};b.on("drain",h(b,a));g(a)}},l={default:k},m=l&&k||l;module.exports=m.default||m;
