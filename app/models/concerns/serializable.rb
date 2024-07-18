module Serializable
  extend ActiveSupport::Concern

  included do
    def serialize_as(serializer_class, options = {})
      serializer =
        "#{serializer_class}_serializer".camelize.constantize.new(
          self, options.except(:hash)
        )
      if options[:hash] == true
        serializer.to_h
      else
        serializer.as_json
      end
    end

    def context
      @context ||=
        if is_a?(Snippet)
          serialize_as(:snippet_context)
        else
          serialize_as(:collection_context)
        end
    end
  end
end
