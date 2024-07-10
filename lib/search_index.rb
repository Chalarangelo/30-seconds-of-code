class SearchIndex
  def self.generate
    snippets =
      Snippet.listed.preload(:language, :collections)
    collections =
      Collection.listed.preload(:collection_snippets, :parent, :children, snippets: [:language])

    search_index = SearchResultSerializer.serialize_array(snippets + collections)

    File.write(
      'public/search-data.json',
      JSON.pretty_generate(search_index)
    )
  end
end
