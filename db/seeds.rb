# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Language.where(
  cid: 'javascript', long: 'JavaScript', short: 'JS', name: 'JavaScript'
).first_or_create
Language.where(
  cid: 'css', long: 'CSS', short: 'CSS', name: 'CSS'
).first_or_create
Language.where(
  cid: 'html', long: 'HTML', short: 'HTML', name: 'HTML'
).first_or_create
Language.where(
  cid: 'react', long: 'React', short: 'JSX', name: 'React'
).first_or_create
Language.where(
  cid: 'python', long: 'Python', short: 'PY', name: 'Python'
).first_or_create
Language.where(
  cid: 'git', long: 'Git', short: 'Shell', name: 'Git'
).first_or_create
