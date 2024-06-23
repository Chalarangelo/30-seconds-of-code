# Due to the way Rails loads initializers, this file must be named with a
# number at the beginning to ensure it is loaded first.

# Load settings defaults
require_relative '../settings/defaults.rb'

# Load settings depending on the environment
require_relative "../settings/#{Rails.env}.rb"
