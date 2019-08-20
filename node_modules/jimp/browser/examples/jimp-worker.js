/* eslint-env worker */
/* global Jimp */

importScripts('../lib/jimp.min.js');

self.addEventListener('message', e => {
  Jimp.read(e.data).then(lenna => {
    lenna
      .resize(256, Jimp.AUTO) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .getBase64(Jimp.AUTO, (err, src) => {
        if (err) throw err;
        self.postMessage(src);
        self.close();
      });
  });
});
