class SearchIndex
  def self.generate
    snippets = Snippet.listed.preload(:language, :collections)
    # FIXME: There's a N+1 here!
    collections = Collection.listed

    search_index = SearchResultSerializer.serialize_array(snippets + collections)
  end
end
