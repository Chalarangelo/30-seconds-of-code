import globalSettings from 'settings/global';
import pathSettings from 'settings/paths';
import manifestSettings from 'settings/manifest';
import { JSONHandler } from 'blocks/utilities/jsonHandler';
import { Logger } from 'blocks/utilities/logger';

/**
 * Writes the manifest.webmanifest file.
 */
export class ManifestWriter {
  static write = async ({
    manifestFileName = manifestSettings.manifestFileName,
    manifestCacheKey = globalSettings.manifestCacheKey,
    backgroundColor = manifestSettings.backgroundColor,
    themeColor = manifestSettings.themeColor,
    display = manifestSettings.display,
    dimensions = manifestSettings.iconDimensions,
    iconName = manifestSettings.iconPrefix,
    publicPath = pathSettings.publicPath,
  } = {}) => {
    const boundLog = Logger.bind('writers.manifest.write');
    const cacheKey = manifestCacheKey;
    // Do not convert these to camelCase, as the manifest requires them to be snake_cased.
    /* eslint-disable camelcase */
    const manifestObject = {
      name: `${globalSettings.websiteName}`,
      short_name: `${globalSettings.shortName}`,
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

    await JSONHandler.toFile(
      `${publicPath}/${manifestFileName}`,
      manifestObject
    );

    boundLog('Generating manifest complete', 'success');
  };
}
