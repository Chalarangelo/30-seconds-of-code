# Jimp ... in a browser

Browser support for Jimp was added by Phil Seaton. This enabled Jimp to be used in [Electron](http://electron.atom.io/) applications as well as web browsers.

Example usage:

```html
<script src="jimp.min.js"></script>
<script>
Jimp.read("lenna.png").then(function (lenna) {
    lenna.resize(256, 256)            // resize
         .quality(60)                 // set JPEG quality
         .greyscale()                 // set greyscale
         .getBase64(Jimp.MIME_JPEG, function (err, src) {
              var img = document.createElement("img");
              img.setAttribute("src", src);
              document.body.appendChild(img);
         });
}).catch(function (err) {
    console.error(err);
});
</script>
```

See the [main documentation](https://github.com/oliver-moran/jimp) for the full API documenatinon.

## WebWorkers

For better performance, it recommended that Jimp methods are run on a separate thread using [`WebWorkers`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). The following shows how using two files (`index.html` and `jimp-worker.js`):

```js
// index.html

var worker = new Worker('jimp-worker.js');
worker.onmessage = function(e) {
  // append a new img element using the base 64 image
  var img = document.createElement('img');
  img.setAttribute('src', e.data);
  document.body.appendChild(img);
};
worker.postMessage('lenna.png'); // message the worker thread
```

```js
// jimp-worker.js

importScripts('jimp.min.js');

self.addEventListener('message', function(e) {
  Jimp.read(e.data).then(function(lenna) {
    lenna
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .getBase64(Jimp.MIME_JPEG, function(err, src) {
        self.postMessage(src); // message the main thread
      });
  });
});
```

## License

Jimp is licensed under the MIT license.
