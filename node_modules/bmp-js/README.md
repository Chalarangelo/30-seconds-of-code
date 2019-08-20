bmp-js
======

A pure javascript Bmp encoder and decoder for node.js

Supports all bits decoding(1,4,8,16,24,32) and encoding with 24bit.

##Install

	$ npm install bmp-js


How to use?
---
###Decode BMP
```js
var bmp = require("bmp-js");
var bmpBuffer = fs.readFileSync('bit24.bmp');
var bmpData = bmp.decode(bmpBuffer);

```

`bmpData` has all properties includes:

1. fileSize,reserved,offset

2. headerSize,width,height,planes,bitPP,compress,rawSize,hr,vr,colors,importantColors

3. palette

4. data-------byte array order by ABGR ABGR ABGR,4 bytes per pixel


###Encode RGB
```js
var bmp = require("bmp-js");
//bmpData={data:Buffer,width:Number,height:Height}
var rawData = bmp.encode(bmpData);//default no compression,write rawData to .bmp file

```

License
---
U can use on free with [MIT License](https://github.com/shaozilee/bmp-js/blob/master/LICENSE)