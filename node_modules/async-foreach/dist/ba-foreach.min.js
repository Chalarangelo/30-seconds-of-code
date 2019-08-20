/* JavaScript Sync/Async forEach - v0.1.2 - 1/10/2012
 * http://github.com/cowboy/javascript-sync-async-foreach
 * Copyright (c) 2012 "Cowboy" Ben Alman; Licensed MIT */
(function(a){a.forEach=function(a,b,c){var d=-1,e=a.length>>>0;(function f(g){var h,j=g===!1;do++d;while(!(d in a)&&d!==e);if(j||d===e){c&&c(!j,a);return}g=b.call({async:function(){return h=!0,f}},a[d],d,a),h||f(g)})()}})(typeof exports=="object"&&exports||this)