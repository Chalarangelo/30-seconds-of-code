namespace :search do
  desc "Generate the search index"
  task index: :environment do
    SearchIndex.generate
  end
end
