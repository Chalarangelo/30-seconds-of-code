class Page
  def self.from(object, options = {})
    "Page::#{object.class.name}".constantize.new(object, options)
  end

  def self.home
    Page::Home.new(nil)
  end

  class Base
    attr_reader :object, :options

    def initialize(object, options = {})
      @object = object
      @options = options
    end

    def serialize
      @serialize ||= PageSerializer.serialize(self)
    end

    def key
      @key ||= params.values.flatten.join('/')
    end

    def params
      raise NotImplementedError
    end

    def props
      raise NotImplementedError
    end

    def schema_data
      return @schema_data if defined?(@schema_data)

      @schema_data = {
        '@context': 'https://schema.org',
        '@type': object.is_snippet? ? 'TechArticle' : 'ItemList',
        url: object.full_url,
        main_entity_of_page: {
          '@type': 'WebPage',
          '@id': object.full_url
        },
      }

      if defined?(additional_schema_data)
        @schema_data.merge!(additional_schema_data)
      end

      @schema_data.deep_transform_keys! do |key|
        key.to_s.camelize(:lower)
      end
    end

    protected

    def slug_segments
      @slug_segments ||= object.slug.slice(1..-1).split('/')
    end
  end
end
