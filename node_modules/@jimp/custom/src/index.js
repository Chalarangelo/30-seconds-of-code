import Jimp, {
  addType,
  addJimpMethods,
  addConstants,
  jimpEvChange
} from '@jimp/core';

export default function configure(configuration, jimpInstance = Jimp) {
  const jimpConfig = {
    hasAlpha: {},
    encoders: {},
    decoders: {},
    class: {},
    constants: {}
  };

  function addToConfig(newConfig) {
    Object.entries(newConfig).forEach(([key, value]) => {
      jimpConfig[key] = {
        ...jimpConfig[key],
        ...value
      };
    });
  }

  function addImageType(typeModule) {
    const type = typeModule();

    if (Array.isArray(type.mime)) {
      addType(...type.mime);
    } else {
      Object.entries(type.mime).forEach(mimeType => addType(...mimeType));
    }

    delete type.mime;
    addToConfig(type);
  }

  function addPlugin(pluginModule) {
    const plugin = pluginModule(jimpEvChange) || {};
    if (!plugin.class && !plugin.constants) {
      // Default to class function
      addToConfig({ class: plugin });
    } else {
      addToConfig(plugin);
    }
  }

  if (configuration.types) {
    configuration.types.forEach(addImageType);

    jimpInstance.decoders = {
      ...jimpInstance.decoders,
      ...jimpConfig.decoders
    };
    jimpInstance.encoders = {
      ...jimpInstance.encoders,
      ...jimpConfig.encoders
    };
    jimpInstance.hasAlpha = {
      ...jimpInstance.hasAlpha,
      ...jimpConfig.hasAlpha
    };
  }

  if (configuration.plugins) {
    configuration.plugins.forEach(addPlugin);
  }

  addJimpMethods(jimpConfig.class, jimpInstance);
  addConstants(jimpConfig.constants, jimpInstance);

  return Jimp;
}
