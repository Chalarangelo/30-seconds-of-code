namespace :prepare do
  desc "Full run of the content processing pipeline"
  task content: :environment do
    `bin/parsley`
    Rake::Task['db:migrate:reset'].invoke
    Rake::Task['import:content'].invoke
    Rake::Task['export:content'].invoke
    # TODO: Export search.json
    # TODO: Run the assets pipeline
    # TODO: Generate the sitemap
    # TODO: Generate the feed
    # TODO: Generate the redirects
  end
end
