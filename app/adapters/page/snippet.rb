class Page::Snippet < Page::Base
  def key
    @key ||= "#{slug_segments.first}/s/#{slug_segments.last}"
  end

  def params
    return @params if defined?(@params)

    @params = {
      lang: slug_segments.first,
      snippet: slug_segments.last
    }
  end

  # Snippet.preload(:language, :collection_snippets, :collections).published.map(&:page)
  def props
    return @context if defined?(@context)

    @context = {
      breadcrumbs: object.breadcrumbs,
      page_description: object.seo_description,
      snippet: object.serialize_as(:snippet_context),
      recommendations: [
        object.recommended_collection,
        *object.recommended_snippets
      ].compact.first(4).map(&:preview)
    }
  end

  def additional_schema_data
    {
      name: object.seo_title,
      headline: object.seo_title,
      description: object.seo_description, # TODO: Was short_text, why?
      image: object.cover_full_url,
      date_published: object.date_modified,
      date_modified: object.date_modified,
      publisher: {
        '@type': 'Person',
        name: Orbit::settings[:owner_name],
        url: Orbit::settings[:owner_url],
      }
    }
  end
end
