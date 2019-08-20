import BMP from 'bmp-js';
import { scan } from '@jimp/utils';

const MIME_TYPE = 'image/bmp';
const MIME_TYPE_SECOND = 'image/x-ms-bmp';

function toAGBR(image) {
  return scan(image, 0, 0, image.bitmap.width, image.bitmap.height, function(
    x,
    y,
    index
  ) {
    const red = this.bitmap.data[index + 0];
    const green = this.bitmap.data[index + 1];
    const blue = this.bitmap.data[index + 2];
    const alpha = this.bitmap.data[index + 3];

    this.bitmap.data[index + 0] = alpha;
    this.bitmap.data[index + 1] = blue;
    this.bitmap.data[index + 2] = green;
    this.bitmap.data[index + 3] = red;
  }).bitmap;
}

function fromAGBR(bitmap) {
  return scan({ bitmap }, 0, 0, bitmap.width, bitmap.height, function(
    x,
    y,
    index
  ) {
    const alpha = this.bitmap.data[index + 0];
    const blue = this.bitmap.data[index + 1];
    const green = this.bitmap.data[index + 2];
    const red = this.bitmap.data[index + 3];

    this.bitmap.data[index + 0] = red;
    this.bitmap.data[index + 1] = green;
    this.bitmap.data[index + 2] = blue;
    this.bitmap.data[index + 3] = bitmap.is_with_alpha ? alpha : 0xff;
  }).bitmap;
}

const decode = data => fromAGBR(BMP.decode(data));
const encode = image => BMP.encode(toAGBR(image)).data;

export default () => ({
  mime: { [MIME_TYPE]: ['bmp'] },

  constants: {
    MIME_BMP: MIME_TYPE,
    MIME_X_MS_BMP: MIME_TYPE_SECOND
  },

  decoders: {
    [MIME_TYPE]: decode,
    [MIME_TYPE_SECOND]: decode
  },

  encoders: {
    [MIME_TYPE]: encode,
    [MIME_TYPE_SECOND]: encode
  }
});
