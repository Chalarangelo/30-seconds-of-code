# require 'core_extensions/string'
# Require all Ruby files in the core_extensions directory
Dir[Rails.root.join('lib', 'core_extensions', '*.rb')].each { |f| require f }

# Apply the monkey patches
String.include CoreExtensions::String
