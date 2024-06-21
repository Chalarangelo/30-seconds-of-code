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
  end
end
