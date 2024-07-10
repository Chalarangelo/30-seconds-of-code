namespace :redirect do
  desc "Generate the _redirects file"
  task process: :environment do
    RedirectGenerator.generate
  end
end
