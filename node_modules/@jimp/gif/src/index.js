import GIF from 'omggif';

const MIME_TYPE = 'image/gif';

export default () => ({
  mime: { [MIME_TYPE]: ['gif'] },

  constants: {
    MIME_GIF: MIME_TYPE
  },

  decoders: {
    [MIME_TYPE]: data => {
      const gifObj = new GIF.GifReader(data);
      const gifData = Buffer.alloc(gifObj.width * gifObj.height * 4);

      gifObj.decodeAndBlitFrameRGBA(0, gifData);

      return {
        data: gifData,
        width: gifObj.width,
        height: gifObj.height
      };
    }
  }
});
