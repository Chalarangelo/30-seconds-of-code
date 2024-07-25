class Page::Home < Page::Base
  def params
    nil
  end

  def props
    return @context if defined?(@context)

    @context = {
      featured_collections: featured_collections,
      featured_snippets: featured_snippets,
      splash_image: cover_url,
      splash_image_srcset: cover_srcset,
      snippet_list_url: main_listing_url,
      page_description: seo_description
    }
  end

  def schema_data
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: Orbit::settings[:website][:url]
    }
  end

  private

  def featured_collections
    Collection.
      preload(:collection_snippets).
      featured.
      first(Orbit::settings[:top_collection_chips]).
      map(&:preview).
      concat([explore_collections_hash])
  end

  def featured_snippets
    new_snippets =
      Snippet.
        preload(:language, :collection_snippets, :collections).
        listed.
        by_new.
        first(Orbit::settings[:new_snippet_cards])

    top_snippets =
      Snippet.
        preload(:language, :collection_snippets, :collections).
        listed.
        ranked.
        first(Orbit::settings[:top_snippet_cards] * 5).
        to_a.
        shuffle

    [new_snippets, top_snippets].
      flatten.
      uniq.
      first(
        Orbit::settings[:new_snippet_cards] + Orbit::settings[:top_snippet_cards]
      ).map(&:preview)
  end

  def seo_description
    Orbit::settings[:website][:seo_description] % {
      snippet_count: Snippet.published.count,
      website_name: Orbit::settings[:website][:name]
    }
  end

  def main_listing_url
    Collection.main.first_page_slug
  end

  def explore_collections_hash
    {
      title: 'Explore collections',
      url: Collection.collections.first_page_slug,
      icon: 'arrow-right',
      selected: false
    }
  end

  def cover_presenter
    @cover_presenter ||= CoverPresenter.new({
      cover: Orbit::settings[:home_cover]
    })
  end

  def cover_url
    cover_presenter.cover_url
  end

  def cover_srcset
    cover_presenter.cover_srcset
  end
end
