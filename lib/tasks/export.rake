namespace :export do
  desc "Export content to the .content directory"
  task content: :environment do
    AstroContentGenerator.generate
  end
end
