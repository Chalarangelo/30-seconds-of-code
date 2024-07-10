namespace :sitemap do
  desc "Generate the sitemap"
  task generate: :environment do
    SitemapController.new.generate_sitemap
  end
end
