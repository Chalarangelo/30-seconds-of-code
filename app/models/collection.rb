class Collection < ApplicationRecord
  include CommonApi

  MAIN_COLLECTION_CID = 'snippets'.freeze
  MORE_COLLECTIONS_SUBLINK = {
    title: 'More',
    url: '/collections/p/1',
    icon: 'arrow-right',
    selected: false
  }.freeze

  # https://guides.rubyonrails.org/v5.0/association_basics.html
  has_one :parent,
    class_name: 'Collection',
    foreign_key: 'cid',
    primary_key: 'parent_cid',
    inverse_of: :children
  has_many :children,
    class_name: 'Collection',
    foreign_key: 'parent_cid',
    primary_key: 'cid',
    inverse_of: :parent

  has_many :collection_snippets,
    foreign_key: 'collection_cid'

  has_many :snippets,
    through: :collection_snippets

  scope :with_parent, -> { where.not(parent_cid: nil) }
  scope :primary, -> { where(top_level: true) }
  scope :secondary, -> { with_parent }
  scope :listed, -> { where(featured: true) }
  scope :featured, -> { listed.order('featured_index asc') }

  # Cache the main collection on the class level to avoid repeated queries.
  @@main_collection = nil

  def self.main
    @@main_collection ||= find(MAIN_COLLECTION_CID)
  end

  def has_parent?
    parent_cid.present?
  end

  def is_main?
    cid == MAIN_COLLECTION_CID
  end

  def is_primary?
    top_level?
  end

  def is_secondary?
    has_parent?
  end

  def root_url
    # To avoid an extra query, we recreate the parent's slug here.
    has_parent? ? parent_cid.to_seo_slug : slug
  end

  def siblings
    has_parent? ? parent.children : []
  end

  def siblings_except_self
    siblings - [self]
  end

  def is_searchable
    featured?
  end

  def search_tokens_array
    _tokens.split(';')
  end

  def first_page_slug
    "#{slug}/p/1"
  end

  def page_count
    (listed_snippet_count / Orbit::settings[:cards_per_page]).ceil
  end

  def listed_snippets
    collection_snippets.
      published.
      listed.
      by_position.
      joins(:snippet).
      # merge(Snippet.published).
      # where.not(collection_snippets: { position: -1 }).
      # order('collection_snippets.position asc').
      preload(:snippet).
      map(&:snippet)
  end

  def listed_snippet_count
    @listed_snippet_count ||= collection_snippets.published.listed.count
  end

  def formatted_snippet_count
    "#{listed_snippet_count} snippets"
  end

  def formatted_description
    description.strip_html_paragraphs_and_links
  end

  # TODO: Extract into a presenter ideally
  def sublinks
    sublink_presenter.sublinks
  end

  # TODO: A little fiddly
  def matches_tag(tag)
    cid.end_with?("/#{tag}")
  end

  def pages
    @pages ||= (1..page_count).map do |page_number|
      Page.from(
        self,
        page_number: page_number,
        snippets: listed_snippets.slice(
          (page_number - 1) * Orbit::settings[:cards_per_page],
          Orbit::settings[:cards_per_page]
        )
      )
    end
  end

  private

  def sublink_presenter
    @sublink_presenter ||= SublinkPresenter.new(self)
  end
end
