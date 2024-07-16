class PreviewSerializer < BaseSerializer
  attributes :title, :description, :url, :cover, :cover_srcset, :tags,
             :extra_context, :date_time

  alias_attribute :title, :preview_title
  alias_attribute :description, :formatted_description
  alias_attribute :cover, :cover_url

  delegate :url, :cover_srcset, :preview_title, :formatted_description,
           to: :object

  COLLECTION_TAG_LITERAL = 'Collection'.freeze

  def tags
    object.is_snippet? ? object.formatted_preview_tags : COLLECTION_TAG_LITERAL
  end

  def extra_context
    object.is_snippet? ? object.date_formatted : object.formatted_snippet_count
  end

  def date_time
    object.is_snippet? ? object.date_machine_formatted : nil
  end
end
