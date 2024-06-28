class AstroContentGenerator
  def self.generate
    starting = Process.clock_gettime(Process::CLOCK_MONOTONIC)

    prepare

    # threads = []

    # threads << Thread.new { generate_home_page }
    # threads << Thread.new { generate_collection_pages }
    # threads << Thread.new { generate_snippet_pages }

    # threads.each(&:join)

    generate_home_page
    generate_collection_pages
    generate_snippet_pages

    ending = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    elapsed = ending - starting
    puts "Total time: #{elapsed.round(2)}s"
  end

  def self.prepare
    Collection.prepare_counts
    Snippet.prepare_previews
    Collection.prepare_previews
  end

  def self.generate_home_page
    starting = Process.clock_gettime(Process::CLOCK_MONOTONIC)

    page = Page.home.serialize

    File.write(
      '.content/pages/index.json',
      JSON.pretty_generate(page)
    )

    ending = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    elapsed = ending - starting
    puts "Home generation: #{elapsed.round(2)}s"
  end

  def self.generate_collection_pages
    starting = Process.clock_gettime(Process::CLOCK_MONOTONIC)

    pages = Collection.
      preload(:collection_snippets, :parent, :children, snippets: [:language]).
      each_with_object({}) do |collection, hash|
        collection.pages.each do |page|
          hash[page.key] = page.serialize
        end
      end

    File.write(
      '.content/pages/[lang]/[...listing].json',
      JSON.pretty_generate(pages)
    )

    ending = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    elapsed = ending - starting
    puts "Collection generation: #{elapsed.round(2)}s"
  end

  def self.generate_snippet_pages
    starting = Process.clock_gettime(Process::CLOCK_MONOTONIC)

    pages = Snippet.
      preload(:language, :collection_snippets, :collections).
      published.
      each_with_object({}) do |snippet, hash|
        page = snippet.page
        hash[page.key] = page.serialize
      end

    File.write(
      '.content/pages/[lang]/s/[snippet].json',
      JSON.pretty_generate(pages)
    )

    ending = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    elapsed = ending - starting
    puts "Snippet generation: #{elapsed.round(2)}s"
  end
end
