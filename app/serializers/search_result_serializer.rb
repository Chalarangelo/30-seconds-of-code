class SearchResultSerializer < BaseSerializer
  attributes :title, :url, :tag, :search_tokens, :type

  delegate :url, :search_tokens, :type, to: :object

  def title
    object.short_title
  end

  def tag
    object.is_snippet? ? object.formatted_mini_preview_tag : object.formatted_snippet_count
  end
end
