class SearchIndex
  def self.generate
    snippets =
      Snippet.
        listed.
        preload(:language, :collections).
        sort_by(&:cid)
    collections =
      Collection.
        listed.
        preload(:collection_snippets, :parent, :children, snippets: [:language]).
        sort_by(&:cid)

    search_index =
      { search_index: SearchResultSerializer.serialize_array(snippets + collections) }.
        transform_keys! do |key|
          key.to_s.camelize(:lower)
        end

    File.write(
      'public/search-data.json',
      JSON.pretty_generate(search_index)
    )
  end
end
