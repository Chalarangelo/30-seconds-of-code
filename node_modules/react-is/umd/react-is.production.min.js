/** @license React v16.9.0
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';(function(b,c){"object"===typeof exports&&"undefined"!==typeof module?c(exports):"function"===typeof define&&define.amd?define(["exports"],c):c(b.ReactIs={})})(this,function(b){function c(a){if("object"===typeof a&&null!==a){var b=a.$$typeof;switch(b){case r:switch(a=a.type,a){case t:case e:case f:case g:case h:case k:return a;default:switch(a=a&&a.$$typeof,a){case l:case m:case n:return a;default:return b}}case p:case q:case u:return b}}}function v(a){return c(a)===e}var d="function"===
typeof Symbol&&Symbol.for,r=d?Symbol.for("react.element"):60103,u=d?Symbol.for("react.portal"):60106,f=d?Symbol.for("react.fragment"):60107,h=d?Symbol.for("react.strict_mode"):60108,g=d?Symbol.for("react.profiler"):60114,n=d?Symbol.for("react.provider"):60109,l=d?Symbol.for("react.context"):60110,t=d?Symbol.for("react.async_mode"):60111,e=d?Symbol.for("react.concurrent_mode"):60111,m=d?Symbol.for("react.forward_ref"):60112,k=d?Symbol.for("react.suspense"):60113,w=d?Symbol.for("react.suspense_list"):
60120,q=d?Symbol.for("react.memo"):60115,p=d?Symbol.for("react.lazy"):60116,x=d?Symbol.for("react.fundamental"):60117,y=d?Symbol.for("react.responder"):60118;b.typeOf=c;b.AsyncMode=t;b.ConcurrentMode=e;b.ContextConsumer=l;b.ContextProvider=n;b.Element=r;b.ForwardRef=m;b.Fragment=f;b.Lazy=p;b.Memo=q;b.Portal=u;b.Profiler=g;b.StrictMode=h;b.Suspense=k;b.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===f||a===e||a===g||a===h||a===k||a===w||"object"===typeof a&&null!==
a&&(a.$$typeof===p||a.$$typeof===q||a.$$typeof===n||a.$$typeof===l||a.$$typeof===m||a.$$typeof===x||a.$$typeof===y)};b.isAsyncMode=function(a){return v(a)||c(a)===t};b.isConcurrentMode=v;b.isContextConsumer=function(a){return c(a)===l};b.isContextProvider=function(a){return c(a)===n};b.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===r};b.isForwardRef=function(a){return c(a)===m};b.isFragment=function(a){return c(a)===f};b.isLazy=function(a){return c(a)===p};b.isMemo=function(a){return c(a)===
q};b.isPortal=function(a){return c(a)===u};b.isProfiler=function(a){return c(a)===g};b.isStrictMode=function(a){return c(a)===h};b.isSuspense=function(a){return c(a)===k};Object.defineProperty(b,"__esModule",{value:!0})});
