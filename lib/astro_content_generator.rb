class AstroContentGenerator
  def self.generate
    prepare

    generate_home_page
    generate_collection_pages
    generate_snippet_pages
  end

  def self.prepare
    Collection.prepare_counts
    Snippet.prepare_previews
    Collection.prepare_previews
  end

  def self.generate_home_page
    page = Page.home.serialize

    File.write(
      Orbit::settings[:home_page_output_path],
      JSON.pretty_generate(page)
    )
  end

  def self.generate_collection_pages
    pages = Collection.
      preload(:collection_snippets, :parent, :children, snippets: [:language]).
      each_with_object({}) do |collection, hash|
        collection.pages.each do |page|
          hash[page.key] = page.serialize
        end
      end

    File.write(
      Orbit::settings[:collection_pages_output_path],
      JSON.pretty_generate(pages)
    )
  end

  def self.generate_snippet_pages
    pages = Snippet.
      preload(:language, :collection_snippets, :collections).
      published.
      each_with_object({}) do |snippet, hash|
        page = snippet.page
        hash[page.key] = page.serialize
      end

    File.write(
      Orbit::settings[:snippet_pages_output_path],
      JSON.pretty_generate(pages)
    )
  end
end
