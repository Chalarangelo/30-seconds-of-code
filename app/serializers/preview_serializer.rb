class PreviewSerializer < BaseSerializer
  attributes :title, :description, :url, :cover, :cover_srcset, :tags,
             :extra_context, :date_time

  delegate :url, :cover_srcset, to: :object

  COLLECTION_TAG_LITERAL = 'Collection'.freeze

  def title
    object.is_snippet? ? object.title : object.short_name
  end

  def description
    object.formatted_description
  end

  def cover
    object.cover_url
  end

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
