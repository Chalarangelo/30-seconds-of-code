import Serializer from '#src/core/serializer.js';

export default class CollectionContextSerializer extends Serializer {
  static {
    Serializer.prepare(this, [
      'title',
      'content',
      ['cover', 'coverUrl'],
      'coverSrcset',
      'sublinks',
    ]);
  }
}
