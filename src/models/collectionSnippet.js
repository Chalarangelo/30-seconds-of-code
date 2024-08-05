import Model from '#src/core/model.js';
import Snippet from '#src/models/snippet.js';
import Collection from '#src/models/collection.js';

export default class CollectionSnippet extends Model {
  static {
    Model.prepare(this, []);
  }

  constructor(data) {
    super(data);
    this.collectionId = data.collectionId;
    this.snippetId = data.snippetId;
    this.position = data.position;
    this.dateModified = new Date(data.dateModified);
  }

  static byPosition(records) {
    return records.sort((a, b) => a.position - b.position);
  }

  static listed(records) {
    return records.where({ position: p => p !== -1 });
  }

  static published(records) {
    const now = new Date();
    return records.where({ dateModified: d => d < now });
  }

  get snippet() {
    return Snippet.find(this.snippetId);
  }

  get collection() {
    return Collection.find(this.collectionId);
  }
}
