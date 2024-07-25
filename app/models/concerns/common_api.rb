module CommonApi
  extend ActiveSupport::Concern

  include Serializable
  include Previewable
  include WithCover

  included do
    # Change primary key to `cid` to make `find` available
    self.primary_key = :cid

    # Search by cid or slug and return the first result.
    def self.[](key)
      where(cid: key.sub(/^\//, '').sub(/\/$/, '')).first
    end

    scope :ranked, -> { order(ranking: :desc) }

    def slug
      @slug ||= cid.to_seo_slug
    end

    def slug_id
      @slug_id ||= slug.split('/').last
    end

    def all_slugs
      @all_slugs ||= Redirects.for(url).flatten
    end

    # Used for serialization purposes.
    def url
      @url ||= is_snippet? ? slug : first_page_slug
    end

    def full_url
      @full_url ||= "#{Orbit::settings[:website][:url]}#{url}"
    end

    def formatted_description
      @formatted_description ||= description.strip_html_paragraphs_and_links
    end

    def seo_description
      @seo_description ||= description.strip_html
    end

    # The model needs to define a `search_tokens_array` method.
    def search_tokens
      @search_tokens ||= search_tokens_array.join(' ')
    end

    def is_snippet?
      @is_snippet ||= is_a?(Snippet)
    end

    def type
      @type ||= self.class.name.downcase
    end
  end
end
