import path from 'path';
import glob from 'glob';

/**
 * Dynamically imports schema-related definitions from the
 * appropriate directories. Can be used to reload the definitions
 * for the schema on demand.
 */
export class Importer {
  static models = [];
  static serializers = [];
  static schemaObject = {};

  static loadSchema() {
    Importer.schemaObject = {
      ...Object.values(require(path.resolve('src/blocks/schema.js')))[0],
      models: Importer.models,
      serializers: Importer.serializers,
    };
  }

  static get schema() {
    if (!Object.keys(Importer.schemaObject).length) Importer.loadSchema();
    console.log(Importer.schemaObject);
    return Importer.schemaObject;
  }

  static loadModels() {
    Importer.models = glob
      .sync(`src/blocks/models/*.js`)
      .map(file => require(path.resolve(file)))
      .reduce((modules, module) => {
        // Note this only supports one export and will cause trouble otherwise
        // Supporting default exports could be an interesting option, too.
        modules.push(Object.values(module)[0]);
        return modules;
      }, []);
  }

  static get modelsArray() {
    if (Importer.models.length === 0) Importer.loadModels();
    return Importer.models;
  }

  static get modelsObject() {
    return Importer.modelsArray.reduce((m, model) => {
      m[model.name] = model;
      return m;
    }, {});
  }

  static get modelNames() {
    return Importer.modelsArray.map(model => model.name);
  }

  static loadSerializers() {
    Importer.serializers = glob
      .sync(`src/blocks/serializers/*.js`)
      .map(file => require(path.resolve(file)))
      .reduce((modules, module) => {
        // Note this only supports one export and will cause trouble otherwise
        // Supporting default exports could be an interesting option, too.
        modules.push(Object.values(module)[0]);
        return modules;
      }, []);
  }

  static get serializersArray() {
    if (Importer.serializers.length === 0) Importer.loadSerializers();
    return Importer.serializers;
  }

  static get serializersObject() {
    return Importer.serializersArray.reduce((m, serializer) => {
      m[serializer.name] = serializer;
      return m;
    }, {});
  }

  static get serializerNames() {
    return Importer.serializersArray.map(serializer => serializer.name);
  }
}
