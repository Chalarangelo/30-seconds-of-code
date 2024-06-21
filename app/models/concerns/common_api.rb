module CommonApi
  extend ActiveSupport::Concern

  include Serializable
  include WithCover

  included do
    # Change primary key to `cid` to make `find` available
    self.primary_key = :cid

    # Search by cid or slug and return the first result.
    def self.[](key)
      where(cid: key.sub(/^\//,'')).first
    end

    scope :ranked, -> { order(ranking: :desc) }

    def slug
      @slug ||= cid.to_seo_slug
    end

    # Used for serialization purposes.
    def url
      @url ||= is_snippet? ? slug : first_page_slug
    end

    def seo_description
      @seo_description ||= short_description.strip_markdown
    end

    # The model needs to define a `search_tokens_array` method.
    def search_tokens
      @search_tokens ||= search_tokens_array.join(' ')
    end

    def is_snippet?
      is_a?(Snippet)
    end

    def type
      self.class.name.downcase
    end
  end
end
