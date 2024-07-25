namespace :content do
  desc 'Export content to the .content directory'
  task export: :environment do
    AstroContentGenerator.generate
  end

  desc 'Import content from the .content/content.json file'
  task import: :environment do
    JsonImporter.import
  end

  desc 'Clear all content in the database'
  task clear: :environment do
    # Similar to db:migrate:reset, but faster
    Rake::Task['db:schema:load'].invoke
  end

  namespace :prepare do
    desc 'Full run of the content processing pipeline'
    task full: :environment do
      threads = []
      # A. Run the content generation process
      threads << Thread.new do
        # 1. Run parsley content to export content as JSON data
        `bin/parsley content`
        # 2. Reset the database
        Rake::Task['content:clear'].invoke
        # 3. Import the content
        Rake::Task['content:import'].invoke
        # 4. Export the content to the .content directory
        Rake::Task['content:export'].invoke
        # 5. Index the content for search
        Rake::Task['search:index'].invoke
        # 6. Process redirects
        Rake::Task['redirect:process'].invoke
        # 7. Generate the feed
        Rake::Task['feed:generate'].invoke
        # 8. Generate the sitemap
        Rake::Task['sitemap:generate'].invoke
      end

      # B. Run the asset generation process
      threads << Thread.new do
        # 1. Run parsley assets to generate assets
        `bin/parsley assets`
      end

      # Wait for all threads to finish
      threads.each(&:join)
    end

    desc 'Dev run of the content processing pipeline'
    task dev: :environment do
      # 1. Run parsley content to export content as JSON data
      `bin/parsley content`
      # 2. Reset the database
      Rake::Task['content:clear'].invoke
      # 3. Import the content
      Rake::Task['content:import'].invoke
      # 4. Export the content to the .content directory
      Rake::Task['content:export'].invoke
      # 5. Index the content for search
      Rake::Task['search:index'].invoke
    end
  end
end
