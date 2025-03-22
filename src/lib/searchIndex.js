import fs from 'fs-extra/esm';
import Collection from '#src/models/collection.js';
import Snippet from '#src/models/snippet.js';
import SearchResultSerializer from '#src/serializers/searchResultSerializer.js';

export default class SearchIndex {
  static generate() {
    const snippets = Snippet.scope('published', 'listed', 'byId');
    const collections = Collection.scope('listed', 'byId');

    const searchIndex = {
      searchIndex: SearchResultSerializer.serializeArray(
        snippets.concat(collections)
      ),
    };

    // Write to file
    fs.writeJson(
      'public/search-data.json',
      searchIndex,
      { spaces: 0 },
      () => {}
    );
  }
}
