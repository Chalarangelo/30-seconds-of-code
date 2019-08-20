import UTIF from 'utif';

const MIME_TYPE = 'image/tiff';

export default () => ({
  mime: { [MIME_TYPE]: ['tiff', 'tif'] },

  constants: {
    MIME_TIFF: MIME_TYPE
  },

  decoders: {
    [MIME_TYPE]: data => {
      const ifds = UTIF.decode(data);
      const page = ifds[0];
      UTIF.decodeImages(data, ifds);
      const rgba = UTIF.toRGBA8(page);

      return {
        data: Buffer.from(rgba),
        width: page.t256[0],
        height: page.t257[0]
      };
    }
  },

  encoders: {
    [MIME_TYPE]: image => {
      const tiff = UTIF.encodeImage(
        image.bitmap.data,
        image.bitmap.width,
        image.bitmap.height
      );

      return Buffer.from(tiff);
    }
  }
});
