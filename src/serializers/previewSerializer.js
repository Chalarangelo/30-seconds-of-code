import Serializer from '#src/core/serializer.js';
import settings from '#src/config/settings.js';

export default class PreviewSerializer extends Serializer {
  static {
    Serializer.prepare(this, [
      ['title', 'previewTitle'],
      ['description', 'formattedDescription'],
      'url',
      ['cover', 'coverUrl'],
      'coverSrcset',
      [
        'tags',
        object => {
          return object.isSnippet
            ? object.formattedPreviewTags
            : settings.presentation.collectionPreviewTag;
        },
      ],
      [
        'extraContext',
        object => {
          return object.isSnippet
            ? object.dateFormatted
            : object.formattedSnippetCount;
        },
      ],
      [
        'dateTime',
        object => {
          return object.isSnippet ? object.dateMachineFormatted : null;
        },
      ],
    ]);
  }
}
