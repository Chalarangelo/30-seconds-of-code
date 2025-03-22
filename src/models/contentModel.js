import Model from '#src/core/model.js';
import CoverPresenter from '#src/presenters/coverPresenter.js';
import serializers from '#src/serializers/serializers.js';
import StringUtils from '#src/lib/stringUtils.js';
import Redirects from '#src/lib/redirects.js';
import settings from '#src/config/settings.js';
import { deserializeTokens } from '#src/lib/search/utils.js';

export default class ContentModel extends Model {
  static {
    Model.prepare(this, []);
  }

  static listed(records) {
    return records.where({ listed: true });
  }

  static unlisted(records) {
    return records.where({ listed: false });
  }

  static byRanking(records) {
    return records.order((a, b) => b.ranking - a.ranking);
  }

  static byId(records) {
    return records.order((a, b) => a.id.localeCompare(b.id));
  }

  get slug() {
    return `/${this.id.toLowerCase()}`;
  }

  get slugId() {
    return this.slug.split('/').pop();
  }

  get allSlugs() {
    return Redirects.for(this.url).flat();
  }

  get url() {
    if (this.isSnippet) return this.slug;
    return this.firstPageSlug;
  }

  get fullUrl() {
    return `${settings.website.url}${this.url}`;
  }

  get formattedDescription() {
    return StringUtils.stripHtmlParagraphsAndLinks(this.description);
  }

  get seoDescription() {
    return StringUtils.stripHtml(this.description);
  }

  get docTokensMap() {
    return deserializeTokens(this.docTokens);
  }

  get isSnippet() {
    return this.constructor.name === 'Snippet';
  }

  get type() {
    return this.constructor.name.toLowerCase();
  }

  // Covers

  get coverPresenter() {
    return new CoverPresenter(this);
  }

  get coverUrl() {
    return this.coverPresenter.coverUrl();
  }

  get coverSrcset() {
    return this.coverPresenter.coverSrcset();
  }

  get coverFullUrl() {
    return this.coverPresenter.coverFullUrl();
  }

  get coverUrlFullSize() {
    return this.coverPresenter.coverUrl(true);
  }

  get coverSrcsetFullSize() {
    return this.coverPresenter.coverSrcset(true);
  }

  // Serializable

  serializeAs(name) {
    const serializerName = `${name}Serializer`;
    const serializer = new serializers[serializerName](this);

    if (!serializer) {
      throw new Error(`Serializer ${serializerName} not found`);
    }
    return serializer.serialize();
  }

  get context() {
    return this.isSnippet
      ? this.serializeAs('SnippetContext')
      : this.serializeAs('CollectionContext');
  }

  // Previewable

  get preview() {
    return this.serializeAs('Preview');
  }

  get previewTitle() {
    return this.isSnippet ? this.title : this.shortTitle;
  }
}
