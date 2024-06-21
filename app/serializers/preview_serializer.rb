class PreviewSerializer < BaseSerializer
  attributes :title, :url, :cover, :cover_srcset, :tags,
             :extra_context, :date_time, :cover_srcset

  attribute :formatted_description, as: :description
  attribute :cover_url, as: :cover

  COLLECTION_TAG_LITERAL = 'Collection'.freeze

  def title
    object.is_snippet? ? object.title : object.name
  end

  def tags
    object.is_snippet? ? object.formatted_preview_tags : COLLECTION_TAG_LITERAL
  end

  def extra_context
    object.is_snippet? ? object.date_formatted : object.formatted_snippet_count
  end

  def include_date_time?
    object.is_snippet?
  end

  def date_time
    object.date_machine_formatted
  end
end
