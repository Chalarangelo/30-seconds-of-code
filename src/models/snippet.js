import Model from '#src/core/model.js';
import ContentModel from '#src/models/contentModel.js';
import Language from '#src/models/language.js';
import CollectionSnippet from '#src/models/collectionSnippet.js';
import Collection from '#src/models/collection.js';
import BreadcrumbPresenter from '#src/presenters/breadcrumbPresenter.js';
import RecommendationPresenter from '#src/presenters/recommendationPresenter.js';
import Page from '#src/adapters/page.js';
import StringUtils from '#src/lib/stringUtils.js';
import settings from '#src/config/settings.js';

export default class Snippet extends ContentModel {
  static {
    Model.prepare(this, ['id']);
  }

  constructor(data) {
    super(data);
    this.id = data.id;
    this.title = data.title;
    this.shortTitle = data.shortTitle;
    this.content = data.content;
    this.description = data.description;
    this.listed = data.listed || false;
    this.cover = data.cover;
    this.tokens = data.tokens.split(';');
    this.ranking = data.ranking;
    this.tags = data.tags.split(';');
    this.dateModified = new Date(data.dateModified);
    this.tableOfContents = data.tableOfContents;
    this.languageId = data.languageId;
  }

  static byNew(records) {
    return records.order((a, b) => b.dateModified - a.dateModified);
  }

  static published(records) {
    const now = new Date();
    return records.where({ dateModified: d => d < now });
  }

  static scheduled(records) {
    const now = new Date();
    return records.where({ dateModified: d => d > now });
  }

  get language() {
    return Language.find(this.languageId);
  }

  get collectionSnippets() {
    return CollectionSnippet.where({ snippetId: this.id });
  }

  get collections() {
    return Collection.where({
      id: this.collectionSnippets.pluck('collectionId'),
    });
  }

  get hasLanguage() {
    return Boolean(this.language);
  }

  get seoTitle() {
    if (!this.hasLanguage) return this.title;

    const titleLanguage =
      this.languageId === 'javascript' && this.primaryTag === 'node'
        ? this.formattedPrimaryTag
        : this.language.name;

    return this.title.includes(titleLanguage)
      ? this.title
      : `${titleLanguage} - ${this.title}`;
  }

  get primaryTag() {
    return this.tags[0];
  }

  get formattedPrimaryTag() {
    return StringUtils.formatTag(this.primaryTag);
  }

  // Used for snippet previews in search autocomplete
  get formattedMiniPreviewTag() {
    if (this.hasLanguage) return this.language.name;
    return settings.presentation.articlePreviewTag;
  }

  get formattedTags() {
    const formattedTags = this.tags.map(tag => StringUtils.formatTag(tag));
    if (this.hasLanguage) formattedTags.unshift(this.language.name);
    return formattedTags.join(', ');
  }

  get formattedPreviewTags() {
    if (this.hasLanguage) return this.language.name;
    return this.formattedPrimaryTag;
  }

  get githubUrl() {
    return `${settings.repository.snippetPrefix}${this.slug}.md`;
  }

  get isScheduled() {
    return this.dateModified > new Date();
  }

  get isPublished() {
    return !this.isScheduled;
  }

  get isListed() {
    return this.listed && this.isPublished;
  }

  get dateFormatted() {
    return this.dateModified.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  get dateMachineFormatted() {
    return this.dateModified.toISOString().slice(0, 10);
  }

  get dateShortString() {
    return this.dateModified.toISOString().split('T')[0];
  }

  get searchTokensArray() {
    return [
      ...new Set(
        [
          this.slugId,
          ...this.tags,
          ...this.tokens,
          ...StringUtils.normalizedTokens(this.title),
          this.language?.short?.toLowerCase(),
          this.language?.long?.toLowerCase(),
        ].filter(Boolean)
      ),
    ];
  }

  get hasCollection() {
    return this.collectionSnippets.length > 0;
  }

  get breadcrumbs() {
    return this.breadcrumbsPresenter.breadcrumbs;
  }

  get recommendedCollection() {
    return this.breadcrumbsPresenter.recommendedCollection;
  }

  get recommendedSnippets() {
    return this.recommendationPresenter.recommendSnippets();
  }

  get page() {
    return Page.from(this);
  }

  get breadcrumbsPresenter() {
    return new BreadcrumbPresenter(this);
  }

  get recommendationPresenter() {
    return new RecommendationPresenter(this);
  }
}
