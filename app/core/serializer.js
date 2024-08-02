export default class Serializer {
  static prepare(serializer, serializableAttributes) {
    serializer.serializableAttributes = [];

    serializableAttributes.forEach(attribute => {
      const isAlias = Array.isArray(attribute);
      const attributeName = isAlias ? attribute[0] : attribute;

      if (!attributeName) return;

      const alias = isAlias ? attribute[1] : null;

      serializer.serializableAttributes.push(attributeName);

      Object.defineProperty(serializer.prototype, attributeName, {
        get() {
          if (!isAlias) return this.object[attributeName];
          if (typeof alias === 'string') return this.object[alias];
          if (typeof alias === 'function') return alias(this.object);
          return undefined;
        },
      });
    });
  }

  constructor(object, options = {}) {
    this.object = object;
    this.options = options;
  }

  static serialize(object, options = {}) {
    return new this(object, options).serialize();
  }

  static serializeArray(objects, options = {}) {
    return objects.map(object => this.serialize(object, options));
  }

  serialize() {
    return this.constructor.serializableAttributes.reduce((acc, attribute) => {
      acc[attribute] = this[attribute];
      return acc;
    }, {});
  }
}
