class Page::Collection < Page::Base
  def params
    { lang: slug_segments.first, listing: slug_segments.drop(1) }
  end

  # Collection.preload(:collection_snippets, :parent, :children, snippets: [:language]).map(&:pages).flatten
  def props
    {
      slug: page_slug,
      description: object.seo_description,
      collection: object.serialize_as(:collection_context),
      pagination: pagination,
      collection_items: options[:snippets].map(&:preview)
    }
  end

  def additional_schema_data
    {
      name: object.name,
      number_of_items: options[:snippets].count,
      item_list_element: options[:snippets].each_with_index.map do |snippet, i|
        binding.irb
        {
          '@type': 'ListItem',
          position: i + 1,
          url: snippet.full_url,
          name: snippet.title
        }
      end
    }
  end

  private

  def page_slug
    @page_slug ||= "#{object.slug}/p/#{options[:page_number]}"
  end

  def pagination
    return @pagination if defined?(@pagination)
    return @pagination = nil if object.page_count <= 1

    @pagination = {
      page_number: options[:page_number],
      total_pages: object.page_count,
      base_url: object.slug,
      has_previous: options[:page_number] > 1,
      has_next: options[:page_number] < object.page_count,
      total_items: object.listed_snippet_count,
      item_type: 'snippets'
    }
  end
end
