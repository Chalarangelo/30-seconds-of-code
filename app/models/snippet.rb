class Snippet < ApplicationRecord
  include CommonApi

  ARTICLE_MINI_PREVIEW_TAG = 'Article'
  GITHUB_URL_PREFIX = 'https://github.com/Chalarangelo/30-seconds-of-code/blob/master/content/snippets'

  # Relationships
  has_one :language, primary_key: 'language_cid', foreign_key: 'cid'

  has_many :collection_snippets,
    class_name: 'CollectionSnippet',
    foreign_key: 'snippet_cid'

  has_many :collections,
    through: :collection_snippets

  # Prevent certain attributes from getting printed in the console
  self.filter_attributes += [
    :short_description,
    :description,
    :table_of_contents
  ]

  # TODO: Rails 7.2 will introduce this, check later
  # self.attributes_for_inspect = [:id, :cid]

  scope :by_new, -> { order('date_modified desc') }

  scope :unlisted, -> { where(listed: false) }
  scope :listed, -> { where(listed: true) }

  # We explicitly name the model here to avoid conflicts with the
  # `CollectionSnippet` model having a column of the same name.
  scope :published, -> do
     where(snippets: { date_modified: ..Date.today })
  end
  scope :scheduled, -> do
    where.not(snippets: { date_modified: ..Date.today })
  end

  scope :previewable, -> { all.preload(:language) }

  def tags
    @tags ||= _tags.split(';')
  end

  def has_language?
    @has_language ||= language_cid.present?
  end

  def seo_title
    return title unless has_language?

    title_language =
      if language_cid == 'javascript' && primary_tag === 'node'
        formatted_primary_tag
      else
        language.name
      end

    title.include?(title_language) ? title : "#{title_language} - #{title}"
  end

  def primary_tag
    @primary_tag ||= tags.first
  end

  def formatted_primary_tag
    TagFormatter.format(primary_tag)
  end

  # Used for snippet previews in search autocomplete
  def formatted_mini_preview_tag
    @formatted_mini_preview_tag ||=
      if has_language?
        language.name
      else
        ARTICLE_MINI_PREVIEW_TAG
      end
  end

  def formatted_tags
    return @formatted_tags if defined?(@formatted_tags)

    @formatted_tags = tags.map { |tag| TagFormatter.format(tag) }
    @formatted_tags.prepend(language.name) if has_language?
    @formatted_tags = @formatted_tags.join(', ')
  end

  def formatted_preview_tags
    @formatted_preview_tags ||=
      if has_language?
        language.name
      else
        formatted_primary_tag
      end
  end

  def github_url
    @github_url ||= "#{GITHUB_URL_PREFIX}#{slug}.md"
  end

  def is_scheduled?
    @is_scheduled ||= date_modified > Date.today
  end

  def is_published?
    @is_published ||= !is_scheduled?
  end

  def is_listed?
    @is_listed ||= listed && is_published?
  end

  def date_formatted
    @date_formatted ||= date_modified.strftime('%B %-d, %Y')
  end

  def date_machine_formatted
    @date_machine_formatted ||= date_modified.strftime('%Y-%m-%d')
  end

  def slug_id
    @slug_id ||= slug.split('/').last
  end

  def search_tokens_array
    @search_tokens_array ||= [
      slug_id,
      *tags,
      *_tokens.split(';'),
      *title.normalized_tokens,
      language&.short&.downcase,
      language&.long&.downcase,
    ].compact.uniq
  end

  def has_collection?
    collection_snippets.present?
  end

  def breadcrumbs
    @breadcrumbs ||= breadcrumbs_presenter.breadcrumbs
  end

  def recommended_collection
    @recommended_collection ||= breadcrumbs_presenter.recommended_collection
  end

  def recommended_snippets
    @recommended_snippets ||= recommendation_presenter.recommend_snippets
  end

  def page
    @page ||= Page.from(self)
  end

  private

  def breadcrumbs_presenter
    @breadcrumbs_presenter ||= BreadcrumbPresenter.new(self)
  end

  def recommendation_presenter
    @recommendation_presenter ||= RecommendationPresenter.new(self)
  end
end
