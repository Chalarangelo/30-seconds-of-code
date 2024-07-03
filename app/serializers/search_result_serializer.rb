class SearchResultSerializer < BaseSerializer
  attributes :title, :url, :tag, :search_tokens, :type

  delegate :url, :search_tokens, :type, to: :object

  def title
    object.is_snippet? ? object.short_title : object.short_name
  end

  def tag
    object.is_snippet? ? object.formatted_mini_preview_tag : object.formatted_snippet_count
  end
end
