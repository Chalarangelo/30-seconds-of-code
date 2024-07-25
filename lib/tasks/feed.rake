namespace :feed do
  desc 'Generate the RSS feed'
  task generate: :environment do
    FeedController.new.generate_feed
  end
end
