import Serializer from '#src/core/serializer.js';

export default class PageSerializer extends Serializer {
  static {
    Serializer.prepare(this, [
      [
        'props',
        object => ({
          ...object.props,
          structuredData: object.schemaData,
        }),
      ],
      'params',
    ]);
  }
}
