class CoverPresenter
  attr_reader :object, :options

  COVER_EXTENSION = '.webp'.freeze
  COVER_PREFIXES = {
    snippet: '/assets/cover/',
    collection: '/assets/splash/'
  }.freeze

  COVER_SUFFIX = {
    home: '-400',
    snippet: '-400',
    snippet_full: '-800',
    collection: '-600'
  }.freeze

  COVER_SIZES = {
    snippet: %w(400w 800w),
    snippet_full: %w(800w 400w 1200w),
    collection: %w(600w 400w)
  }.freeze

  def initialize(object, options: {})
    @object = object
    @options = options
  end

  def cover_url(full: false)
    "#{cover_prefix}#{cover_name}#{cover_suffix(full: full)}#{COVER_EXTENSION}"
  end

  def cover_full_url
    "#{Orbit::settings[:website][:url]}#{cover_url}"
  end

  def cover_srcset(full: false)
    cover_sizes(full: full).map do |size|
      suffix = size.delete('w')
      "#{cover_prefix}#{cover_name}-#{suffix}#{COVER_EXTENSION} #{size}"
    end
  end

  @@all_snippet_covers = []

  def self.all_snippet_covers
    return @@all_snippet_covers if @@all_snippet_covers.any?

    @@all_snippet_covers =
      Dir.entries('content/assets/cover/').slice(2..).map do |cover|
        File.basename(cover, '.*')
      end
  end

  private

  def is_snippet?
    object.is_a?(Snippet)
  end

  def cover_name
    # Use a symbol to support hashes, too (for home)
    @cover_name ||= object[:cover]
  end

  def cover_prefix
    @cover_prefix ||=
      is_snippet? ? COVER_PREFIXES[:snippet] : COVER_PREFIXES[:collection]
  end

  def cover_sizes(full: false)
    return COVER_SIZES[:collection] unless is_snippet?

    if full
      COVER_SIZES[:snippet_full]
    else
      COVER_SIZES[:snippet]
    end
  end

  def cover_suffix(full: false)
    # Special case for home (expects a hash)
    return COVER_SUFFIX[:home] if object.is_a?(Hash)

    return COVER_SUFFIX[:collection] unless is_snippet?

    full ? COVER_SUFFIX[:snippet_full] : COVER_SUFFIX[:snippet]
  end
end
