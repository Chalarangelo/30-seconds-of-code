namespace :import do
  desc "Import content from the tmp/content.json file"
  task content: :environment do
    JsonImporter.import
  end
end
