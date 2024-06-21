class Snippet < ApplicationRecord
  # TODO: Might want to index the ranking column
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
    :description_html,
    :full_description_html,
    :full_text,
    :table_of_contents_html
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

  scope :with_language, ->(language) { where(language_cid: language) }
  scope :with_tag, ->(tag) do
    where(
      '_tags like ? or _tags like ? or _tags like ? or _tags like ?',
      "#{tag};%",
      "%;#{tag};%",
      "%;#{tag}",
      "#{tag}"
    )
  end

  # memo :tags, :seo_description, :seo_title, :primary_tag, :formatted_primary_tag,
  #       :formatted_mini_preview_tag, :formatted_tags, :formatted_preview_tags,
  #       :formatted_description, :slug, :is_scheduled?, :is_published?, :is_listed?,
  #       :date_formatted, :date_machine_formatted, :search_tokens_array,
  #       :search_tokens, :has_collection? #, :preview


  def tags
    _tags.split(';')
  end

  def has_language?
    language.present?
  end

  def seo_title
    reutrn title unless has_language?

    title_language =
      if language_cid == 'javascript' && primary_tag === 'node'
        formatted_primary_tag
      else
        language.name
      end

    title.include?(title_language) ? title : "#{title_language} - #{title}"
  end

  def primary_tag
    tags.first
  end

  def formatted_primary_tag
    TagFormatter.format(primary_tag)
  end

  # Used for snippet previews in search autocomplete
  def formatted_mini_preview_tag
    language.name if has_language?

    ARTICLE_MINI_PREVIEW_TAG
  end

  def formatted_tags
    tags.map { |tag| TagFormatter.format(tag) }
    tags.prepend(language.name) if has_language?
    tags.join(', ')
  end

  def formatted_preview_tags
    language.name if has_language?

    formatted_primary_tag
  end

  def formatted_description
    description_html.strip_html_paragraphs_and_links
  end

  def github_url
    "#{GITHUB_URL_PREFIX}/#{file_name}"
  end

  def is_scheduled?
    date_modified > Date.today
  end

  def is_published?
    !is_scheduled?
  end

  def is_listed?
    listed && is_published?
  end

  def date_formatted
    date_modified.strftime('%B %d, %Y')
  end

  def date_machine_formatted
    date_modified.strftime('%Y-%m-%d')
  end

  def search_tokens_array
    tokenizable_elements = [
      file_name.slice(0..-4),
      *tags,
      *_tokens.split(';'),
      *title.normalized_tokens,
      language&.short&.downcase,
      language&.long&.downcase,
    ].compact.uniq
  end

  def has_collection?
    collections.present?
  end

  def breadcrumbs
    breadcrumbs_presenter.breadcrumbs
  end

  def recommended_collection
    breadcrumbs_presenter.recommended_collection
  end

  # recommended_snippets

  # preview

  private

  # TODO: This will most likely cause N+1, needs a preload on a higher level.
  def breadcrumbs_presenter
    @breadcrumbs_presenter ||= BreadcrumbPresenter.new(self)
  end
end
