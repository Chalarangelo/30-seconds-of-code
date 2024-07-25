module PreparedQueries
  def snippet_performance(slug)
    snippet = Snippet[slug]

    PerformanceTracking.for(snippet.slug, include_redirects: true)
  end

  def collection_snippets_performance(slug)
    collection = Collection[slug]

    collection.snippets.map do |snippet|
      [snippet.slug, snippet_performance(snippet.slug)]
    end.
    sort_by { |_, performance| -performance[:clicks] }.
    to_h
  end

  def snippet_cover_usage
    CoverPresenter.
      all_snippet_covers.
      map do |cover|
        [cover, Snippet.where(cover: cover).count]
      end.
      sort_by { |_, count| -count }.
      to_h
  end

  def zero_impression_snippets
    Snippet.
      all.
      select { |snippet| snippet_performance(snippet.slug)[:impressions].zero? }.
      map(&:slug)
  end

  def snippet_has_formatting(slug)
    snippet = Snippet[slug]

    {
      bold: snippet.description.include?('<strong'),
      heading: snippet.description.include?('<h')
    }
  end

  def non_story_snippets
    @non_story_snippets ||=
      Dir.glob('content/snippets/**/*.md').
        map do |file|
          [
            file.gsub('content/snippets/', '').gsub('.md', ''),
            File.read(file)
          ]
        end.
        select { |name, content| content.include?('type: snippet') }.
        map(&:first)
  end

  def duplicate_referenes
    Dir.glob('content/languages/*.yaml').
      map { |file| YAML.load_file(file) }.
      select { |language| language['references'].present? }.
      each_with_object({}) do |language, acc|
        language['references'].each do |reference|
          acc[reference.first] ||= []
          acc[reference.first] << language['short']
        end
      end.select { |_, languages| languages.size > 1 }
  end

  def search_tokens_frequency(min_length: 3)
    Snippet.
      preload(:language).
      all.
      flat_map do |snippet|
        snippet.search_tokens_array.select { |token| token.size >= min_length }
      end.
      group_by(&:itself).
      transform_values(&:size).
      sort_by { |_, count| -count }.
      to_h
  end
end
