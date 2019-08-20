# UAParser.js

<img align="right" src="https://raw.githubusercontent.com/faisalman/ua-parser-js/gh-pages/images/logo.png"> A JavaScript-based User-Agent string parser. Can be used either in browser (client-side) or in node.js (server-side) environment. Also available as jQuery/Zepto plugin, Bower/Meteor package, & RequireJS/AMD module. This library aims to identify detailed type of web browser, layout engine, operating system, cpu architecture, and device type/model, entirely from user-agent string with a relatively small footprint (~17KB when minified / ~6KB gzipped). Written in vanilla JavaScript, which means it doesn't require any other library and can be used independently. However, it's not recommended to use this library as browser detection since the result may not be more accurate than using feature detection.

[![Build Status](https://travis-ci.org/faisalman/ua-parser-js.svg?branch=master)](https://travis-ci.org/faisalman/ua-parser-js)
[![NPM downloads](https://img.shields.io/npm/dw/ua-parser-js.svg)](https://www.npmjs.com/package/ua-parser-js)
[![NPM](https://img.shields.io/npm/v/ua-parser-js.svg)](https://www.npmjs.com/package/ua-parser-js)
[![Bower](https://img.shields.io/bower/v/ua-parser-js.svg)](https://bower.io/)
[![CDNJS](https://img.shields.io/cdnjs/v/UAParser.js.svg)](https://cdnjs.com/libraries/UAParser.js)

* Author    : Faisal Salman <<f@faisalman.com>>
* Demo      : http://faisalman.github.io/ua-parser-js
* Source    : https://github.com/faisalman/ua-parser-js

# Constructor

* `new UAParser([uastring][,extensions])`
    * returns new instance

* `UAParser([uastring][,extensions])`
    * returns result object `{ ua: '', browser: {}, cpu: {}, device: {}, engine: {}, os: {} }`

# Methods

* `getBrowser()`
    * returns `{ name: '', version: '' }`

```sh
# Possible 'browser.name':
2345Explorer, Amaya, Android Browser, Arora, Avant, BIDUBrowser, Baidu,
Basilisk, Blazer, Bolt, Bowser, Camino, Chimera, Chrome Headless,
Chrome WebView, Chrome, Chromium, Comodo Dragon, Dillo, Dolphin, Doris, Edge,
Epiphany, Facebook, Falkon, Fennec, Firebird, Firefox, Flock, GSA, GoBrowser,
ICE Browser, IE, IEMobile, IceApe, IceCat, IceDragon, Iceape, Iceweasel,
Iridium, Iron, Jasmine, K-Meleon, Kindle, Konqueror, LBBROWSER Line, Links,
Lunascape, Lynx, MIUI Browser, Maemo Browser, Maemo, Maxthon, MetaSr Midori,
Minimo, Mobile Safari, Mosaic, Mozilla, NetFront, NetSurf, Netfront, Netscape,
NokiaBrowser, Oculus Browser, OmniWeb, Opera Coast, Opera Mini, Opera Mobi,
Opera Tablet, Opera, PaleMoon, PhantomJS, Phoenix, Polaris, Puffin, QQ,
QQBrowser, QQBrowserLite, Quark, QupZilla, RockMelt, Safari, Samsung Browser, 
SeaMonkey, Silk, Skyfire, Sleipnir, Slim, SlimBrowser, Swiftfox, Tizen Browser,
UCBrowser, Vivaldi, Waterfox, WeChat, Yandex, baidu, iCab, w3m, ...

# 'browser.version' determined dynamically
```

* `getDevice()`
    * returns `{ model: '', type: '', vendor: '' }` 

```sh
# Possible 'device.type':
console, mobile, tablet, smarttv, wearable, embedded

# Possible 'device.vendor':
Acer, Alcatel, Amazon, Apple, Archos, Asus, BenQ, BlackBerry, Dell, Essential,
GeeksPhone, Google, HP, HTC, Huawei, Jolla, Lenovo, LG, Meizu, Microsoft, Motorola,
Nexian, Nintendo, Nokia, Nvidia, OnePlus, Ouya, Palm, Panasonic, Pebble, Polytron,
RIM, Samsung, Sharp, Siemens, Sony[Ericsson], Sprint, Xbox, Xiaomi, ZTE, ...

# 'device.model' determined dynamically
```

* `getEngine()`
    * returns `{ name: '', version: '' }`

```sh
# Possible 'engine.name'
Amaya, Blink, EdgeHTML, Gecko, Goanna, iCab, KHTML, Links, Lynx, NetFront, NetSurf,
Presto, Tasman, Trident, w3m, WebKit

# 'engine.version' determined dynamically
```

* `getOS()`
    * returns `{ name: '', version: '' }`

```sh
# Possible 'os.name'
AIX, Amiga OS, Android, Arch, Bada, BeOS, BlackBerry, CentOS, Chromium OS, Contiki,
Fedora, Firefox OS, FreeBSD, Debian, DragonFly, Fuchsia, Gentoo, GNU, Haiku, Hurd, iOS, 
Joli, Linpus, Linux, Mac OS, Mageia, Mandriva, MeeGo, Minix, Mint, Morph OS, NetBSD, 
Nintendo, OpenBSD, OpenVMS, OS/2, Palm, PC-BSD, PCLinuxOS, Plan9, Playstation, QNX, RedHat, 
RIM Tablet OS, RISC OS, Sailfish, Series40, Slackware, Solaris, SUSE, Symbian, Tizen, 
Ubuntu, Unix, VectorLinux, WebOS, Windows [Phone/Mobile], Zenwalk, ...

# 'os.version' determined dynamically
```

* `getCPU()`
    * returns `{ architecture: '' }`

```sh
# Possible 'cpu.architecture'
68k, amd64, arm[64], avr, ia[32/64], irix[64], mips[64], pa-risc, ppc, sparc[64]
```

* `getResult()`
    * returns `{ ua: '', browser: {}, cpu: {}, device: {}, engine: {}, os: {} }`

* `getUA()`
    * returns UA string of current instance

* `setUA(uastring)`
    * set UA string to parse
    * returns current instance


# Example

```html
<!doctype html>
<html>
<head>
<script type="text/javascript" src="ua-parser.min.js"></script>
<script type="text/javascript">

	var parser = new UAParser();

    // by default it takes ua string from current browser's window.navigator.userAgent
    console.log(parser.getResult());
    /*
        /// this will print an object structured like this:
        {
            ua: "",
            browser: {
                name: "",
                version: ""
            },
            engine: {
                name: "",
                version: ""
            },
            os: {
                name: "",
                version: ""
            },
            device: {
                model: "",
                type: "",
                vendor: ""
            },
            cpu: {
                architecture: ""
            }
        }
    */

    // let's test a custom user-agent string as an example
    var uastring = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko) Ubuntu/11.10 Chromium/15.0.874.106 Chrome/15.0.874.106 Safari/535.2";
    parser.setUA(uastring);

    var result = parser.getResult();
    // this will also produce the same result (without instantiation):
    // var result = UAParser(uastring);

    console.log(result.browser);        // {name: "Chromium", version: "15.0.874.106"}
    console.log(result.device);         // {model: undefined, type: undefined, vendor: undefined}
    console.log(result.os);             // {name: "Ubuntu", version: "11.10"}
    console.log(result.os.version);     // "11.10"
    console.log(result.engine.name);    // "WebKit"
    console.log(result.cpu.architecture);   // "amd64"

    // do some other tests
    var uastring2 = "Mozilla/5.0 (compatible; Konqueror/4.1; OpenBSD) KHTML/4.1.4 (like Gecko)";
    console.log(parser.setUA(uastring2).getBrowser().name); // "Konqueror"
    console.log(parser.getOS());                            // {name: "OpenBSD", version: undefined}
    console.log(parser.getEngine());                        // {name: "KHTML", version: "4.1.4"}

    var uastring3 = 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.11 (KHTML, like Gecko) Version/7.1.0.7 Safari/534.11';
    console.log(parser.setUA(uastring3).getDevice().model); // "PlayBook"
    console.log(parser.getOS())                             // {name: "RIM Tablet OS", version: "1.0.0"}
    console.log(parser.getBrowser().name);                  // "Safari"

</script>
</head>
<body>
</body>
</html>
```

## Using node.js

```sh
$ npm install ua-parser-js
```

```js
var http = require('http');
var parser = require('ua-parser-js');

http.createServer(function (req, res) {
    // get user-agent header
    var ua = parser(req.headers['user-agent']);
    // write the result as response
    res.end(JSON.stringify(ua, null, '  '));
})
.listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
```

## Using requirejs

```js
requirejs.config({
    baseUrl : 'js/lib', // path to your script directory
    paths   : {
        'ua-parser-js' : 'ua-parser.min'
    }
});

requirejs(['ua-parser-js'], function(UAParser) {
    var parser = new UAParser();
    console.log(parser.getResult());
});
```

## Using CDN

```html
<script src="https://cdn.jsdelivr.net/npm/ua-parser-js@0/dist/ua-parser.min.js"></script>
```

## Using bower

```sh
$ bower install ua-parser-js
```

## Using meteor

```sh
$ meteor add faisalman:ua-parser-js
```

## Using TypeScript

```sh
$ npm install --save @types/ua-parser-js
# Download TS type definition from DefinitelyTyped repository:
# https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/ua-parser-js
```

## Using jQuery/Zepto ($.ua)

Although written in vanilla js (which means it doesn't depends on jQuery), this library will automatically detect if jQuery/Zepto is present and create `$.ua` object based on browser's user-agent (although in case you need, `window.UAParser` constructor is still present). To get/set user-agent you can use: `$.ua.get()` / `$.ua.set(uastring)`. 

```js
// In browser with default user-agent: 'Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Sprint APA7373KT Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0':

// Do some tests
console.log($.ua.device);           // {vendor: "HTC", model: "Evo Shift 4G", type: "mobile"}
console.log($.ua.os);               // {name: "Android", version: "2.3.4"}
console.log($.ua.os.name);          // "Android"
console.log($.ua.get());            // "Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Sprint APA7373KT Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0"

// reset to custom user-agent
$.ua.set('Mozilla/5.0 (Linux; U; Android 3.0.1; en-us; Xoom Build/HWI69) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13');

// Test again
console.log($.ua.browser.name);     // "Safari"
console.log($.ua.engine.name);      // "Webkit"
console.log($.ua.device);           // {vendor: "Motorola", model: "Xoom", type: "tablet"}
console.log(parseInt($.ua.browser.version.split('.')[0], 10));  // 4

// Add class to <body> tag
// <body class="ua-browser-safari ua-devicetype-tablet">
$('body').addClass('ua-browser-' + $.ua.browser.name + ' ua-devicetype-' + $.ua.device.type);
```

## Extending regex patterns

* `UAParser([uastring,] extensions)`

Pass your own regexes to extend the limited matching rules.

```js
// Example:
var myOwnRegex = [[/(myownbrowser)\/([\w\.]+)/i], [UAParser.BROWSER.NAME, UAParser.BROWSER.VERSION]];
var myParser = new UAParser({ browser: myOwnRegex });
var uaString = 'Mozilla/5.0 MyOwnBrowser/1.3';
console.log(myParser.setUA(uaString).getBrowser());   // {name: "MyOwnBrowser", version: "1.3"}
```


# Development

## Contribute

* Fork and clone this repository
* Make some changes as required
* Write a unit test to showcase your feature
* Run the test suites to make sure the changes you made didn't break anything `$ npm run test`
* Commit and push to your own repository
* Submit a pull request to this repository under `develop` branch
* Profit? $$$

## Build

Build a minified & packed script

```sh
$ npm run build
```


# Donate

Do you use & like UAParser.js but you don’t find a way to show some love? If yes, please consider donating to support this project. Otherwise, no worries, regardless of whether there is support or not, I will keep maintaining this project. Still, if you buy me a cup of coffee I would be more than happy though :)

[![Support via PayPal](https://cdn.rawgit.com/twolfson/paypal-github-button/1.0.0/dist/button.svg)](https://www.paypal.me/faisalman/)


# License

MIT License

Copyright (c) 2012-2019 Faisal Salman <<f@faisalman.com>>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
