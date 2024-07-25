module Previewable
  extend ActiveSupport::Concern

  included do
    # Define a default previewable scope.
    scope :previewable, -> { all }

    # Define a class method to store previews.
    instance_variable_set(:@previews, {})

    # Define a class method to prepare previews.
    def self.prepare_previews
      instance_variable_set(:@previews, previewable.map do |record|
        [record.cid, record.serialize_as(:preview)]
      end.to_h)
    end

    # Define a class method to get a preview by cid.
    def self.get_preview(cid)
      instance_variable_get(:@previews)[cid]
    end

    # Define an instance method to get a preview.
    def preview
      return @preview if defined?(@preview)

      @preview ||= self.class.get_preview(cid) || serialize_as(:preview)
    end

    # Define an instance method to retrieve the preview title.
    def preview_title
      @preview_title ||= is_snippet? ? title : short_title
    end
  end
end
