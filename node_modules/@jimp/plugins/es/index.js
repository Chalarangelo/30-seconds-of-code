function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import { mergeDeep } from 'timm';
import dither from '@jimp/plugin-dither';
import resize from '@jimp/plugin-resize';
import blit from '@jimp/plugin-blit';
import rotate from '@jimp/plugin-rotate';
import color from '@jimp/plugin-color';
import print from '@jimp/plugin-print';
import blur from '@jimp/plugin-blur';
import crop from '@jimp/plugin-crop';
import normalize from '@jimp/plugin-normalize';
import invert from '@jimp/plugin-invert';
import gaussian from '@jimp/plugin-gaussian';
import flip from '@jimp/plugin-flip';
import mask from '@jimp/plugin-mask';
import scale from '@jimp/plugin-scale';
import displace from '@jimp/plugin-displace';
import contain from '@jimp/plugin-contain';
import cover from '@jimp/plugin-cover';
var plugins = [dither, resize, blit, rotate, color, print, blur, crop, normalize, invert, gaussian, flip, mask, scale, displace, contain, cover];
export default (function (jimpEvChange) {
  var initializedPlugins = plugins.map(function (pluginModule) {
    var plugin = pluginModule(jimpEvChange) || {};

    if (!plugin.class && !plugin.constants) {
      // Default to class function
      plugin = {
        class: plugin
      };
    }

    return plugin;
  });
  return mergeDeep.apply(void 0, _toConsumableArray(initializedPlugins));
});
//# sourceMappingURL=index.js.map