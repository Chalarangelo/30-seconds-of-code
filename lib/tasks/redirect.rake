namespace :redirect do
  desc "Generate the _redirects file"
  task process: :environment do
    Redirects.generate_public_file
  end
end
