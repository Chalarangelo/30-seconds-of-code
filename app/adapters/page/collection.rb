class Page::Collection < Page::Base
  def key
    @key ||= "#{slug_segments.join('/')}/p/#{options[:page_number]}"
  end

  def params
    return @params if defined?(@params)

    @params = {
      lang: slug_segments.first,
      listing: [*slug_segments.drop(1), 'p', "#{options[:page_number]}"]
    }
  end

  # Collection.preload(:collection_snippets, :parent, :children, snippets: [:language]).map(&:pages).flatten
  def props
    return @context if defined?(@context)

    @context = {
      slug: page_slug,
      page_description: object.seo_description,
      collection: object.context,
      pagination: pagination,
      collection_items: options[:items].map(&:preview),
      large_images: options[:large_images]
    }
  end

  def additional_schema_data
    {
      name: object.name,
      number_of_items: options[:items].count,
      item_list_element: options[:items].each_with_index.map do |item, i|
        {
          '@type': 'ListItem',
          position: i + 1,
          url: item.full_url,
          name: item.is_snippet? ? item.title : item.short_name
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
    return @pagination = nil if options[:page_count] <= 1

    @pagination = {
      page_number: options[:page_number],
      total_pages: options[:page_count],
      base_url: object.slug,
      has_previous: options[:page_number] > 1,
      has_next: options[:page_number] < options[:page_count],
      total_items: options[:item_count],
      item_type: options[:item_type]
    }
  end
end
