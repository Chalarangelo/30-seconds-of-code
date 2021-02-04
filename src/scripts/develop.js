import { Env } from 'blocks/utilities/env';
import { Logger } from 'blocks/utilities/logger';
import { IconSerializer } from 'blocks/serializers/icon';
import { FileParser } from 'blocks/parsers/file';
import { JSONParser } from 'blocks/parsers/json';
import { AssetSerializer } from 'blocks/serializers/asset';
import { Extractor } from 'blocks/utilities/extractor';

export const build = async () => {
  Logger.log('Build process is starting up...', 'info');
  Logger.logProcessInfo();
  Logger.breakLine();

  await Env.init('DEVELOPMENT');

  await Promise.all([
    Extractor.extract(),
    AssetSerializer.serialize(),
    IconSerializer.serialize(
      FileParser.fromGlob(global.settings.paths.rawIconPath),
      JSONParser.fromFile(global.settings.icons.iconConfigPath).icons
    ),
  ]);
};

build();
