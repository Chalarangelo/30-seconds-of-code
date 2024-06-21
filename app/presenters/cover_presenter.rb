class CoverPresenter
  attr_reader :object, :options

  COVER_EXTENSION = '.webp'.freeze
  COVER_PREFIXES = {
    snippet: '/assets/cover/',
    collection: '/assets/splash/'
  }.freeze

  COVER_SUFFIX = {
    snippet: '-400',
    collection: '-600'
  }.freeze

  COVER_SIZES = {
    snippet: %w(400w 800w),
    collection: %w(400w 600w)
  }.freeze

  def initialize(object, options: {})
    @object = object
    @options = options
  end

  def cover_url
    "#{cover_prefix}#{cover_name}#{cover_suffix}#{COVER_EXTENSION}"
  end

  def cover_srcset
    cover_sizes.map do |size|
      suffix = size.delete('w')
      "#{cover_prefix}#{cover_name}-#{suffix}#{COVER_EXTENSION} #{size}"
    end
  end

  private

  def is_snippet?
    object.is_a?(Snippet)
  end

  def cover_name
    object.cover
  end

  def cover_prefix
    is_snippet? ? COVER_PREFIXES[:snippet] : COVER_PREFIXES[:collection]
  end

  def cover_sizes
    is_snippet? ? COVER_SIZES[:snippet] : COVER_SIZES[:collection]
  end

  def cover_suffix
    is_snippet? ? COVER_SUFFIX[:snippet] : COVER_SUFFIX[:collection]
  end
end
