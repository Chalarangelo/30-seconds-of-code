import { mergeDeep } from 'timm';
import jpeg from '@jimp/jpeg';
import png from '@jimp/png';
import bmp from '@jimp/bmp';
import tiff from '@jimp/tiff';
import gif from '@jimp/gif';
export default (function () {
  return mergeDeep(jpeg(), png(), bmp(), tiff(), gif());
});
//# sourceMappingURL=index.js.map