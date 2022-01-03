import globalSettings from 'settings/global';
import pathSettings from 'settings/paths';
import { JSONHandler } from 'blocks/utilities/jsonHandler';
import { Logger } from 'blocks/utilities/logger';

/**
 * Writes the manifest.webmanifest file.
 */
export class ManifestWriter {
  static manifestSettings = {
    manifestFileName: 'manifest.webmanifest',
    backgroundColor: '#0b0a12',
    themeColor: '#0b0a12',
    display: 'standalone',
    iconDimensions: [48, 72, 96, 144, 192, 256, 384, 512],
    iconPrefix: 'icon',
  };

  static write = async () => {
    const { manifestCacheKey } = globalSettings;
    const { publicPath } = pathSettings;
    const {
      manifestFileName,
      backgroundColor,
      themeColor,
      display,
      iconDimensions,
      iconPrefix,
    } = ManifestWriter.manifestSettings;
    const boundLog = Logger.bind('writers.manifest.write');
    // Do not convert these to camelCase, as the manifest requires them to be snake_cased.
    /* eslint-disable camelcase */
    const manifestObject = {
      name: `${globalSettings.websiteName}`,
      short_name: `${globalSettings.shortName}`,
      start_url: `/`,
      background_color: backgroundColor,
      theme_color: themeColor,
      display,
      icons: iconDimensions.map(d => ({
        src: `assets/icons/${iconPrefix}-${d}x${d}.png?v=${manifestCacheKey}`,
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
