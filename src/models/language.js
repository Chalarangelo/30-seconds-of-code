import Model from '#src/core/model.js';
import Snippet from '#src/models/snippet.js';

export default class Language extends Model {
  static {
    Model.prepare(this, ['id']);
  }

  constructor(data) {
    super(data);
    this.id = data.id;
    this.long = data.long;
    this.short = data.short;
    this.name = data.name;
  }

  get snippets() {
    return Snippet.where({ languageId: this.id });
  }
}
