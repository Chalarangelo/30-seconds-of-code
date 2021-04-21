import { JSONSerializer } from 'blocks/serializers/json';
import { Logger } from 'blocks/utilities/logger';

/**
 * Serializes manifest.webmanifest files.
 */
export class ManifestSerializer {
  static serialize = async ({
    manifestFileName = global.settings.manifest.manifestFileName,
    manifestCacheKey = global.settings.manifestCacheKey,
    backgroundColor = global.settings.manifest.backgroundColor,
    themeColor = global.settings.manifest.themeColor,
    display = global.settings.manifest.display,
    dimensions = global.settings.manifest.iconDimensions,
    iconName = global.settings.manifest.iconPrefix,
    outPath = global.settings.paths.jsonPath,
  } = {}) => {
    const boundLog = Logger.bind('serializers.manifest.serialize');
    const cacheKey = manifestCacheKey;
    // Do not convert these to camelCase, as the manifest requires them to be snake_cased.
    /* eslint-disable camelcase */
    const manifestObject = {
      name: `${global.settings.websiteName}`,
      short_name: `${global.settings.shortName}`,
      start_url: `/`,
      background_color: backgroundColor,
      theme_color: themeColor,
      display,
      icons: dimensions.map(d => ({
        src: `assets/icons/${iconName}-${d}x${d}.png?v=${cacheKey}`,
        sizes: `${d}x${d}`,
        type: 'image/png',
      })),
    };
    /* eslint-enable camelcase */
    boundLog(`Generating ${manifestFileName}...`, 'info');

    await JSONSerializer.serializeToFile(
      `${outPath}/${manifestFileName}`,
      manifestObject
    );

    boundLog('Generating manifest complete', 'success');
  };
}
