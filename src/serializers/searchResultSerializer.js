import Serializer from '#src/core/serializer.js';

export default class SearchResultSerializer extends Serializer {
  static {
    Serializer.prepare(this, [
      ['title', 'shortTitle'],
      'url',
      [
        'tag',
        object => {
          return object.isSnippet
            ? object.formattedMiniPreviewTag
            : object.formattedSnippetCount;
        },
      ],
      ['searchTokens', 'docTokens'],
      'type',
    ]);
  }
}
