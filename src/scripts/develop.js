import { Env } from 'blocks/utilities/env';
import { Logger } from 'blocks/utilities/logger';
import { IconSerializer } from 'blocks/serializers/icon';
import { FileParser } from 'blocks/parsers/file';
import { JSONParser } from 'blocks/parsers/json';
import { AssetSerializer } from 'blocks/serializers/asset';
import { Extractor } from 'blocks/utilities/extractor';
import pathSettings from 'settings/paths';
import iconSettings from 'settings/icons';

export const build = async () => {
  Logger.log('Build process is starting up...', 'info');
  Logger.logProcessInfo();
  Logger.breakLine();

  await Env.init();

  await Promise.all([
    Extractor.extract(),
    AssetSerializer.serialize(),
    IconSerializer.serialize(
      FileParser.fromGlob(pathSettings.rawIconPath),
      JSONParser.fromFile(iconSettings.iconConfigPath).icons
    ),
  ]);
};

build();
