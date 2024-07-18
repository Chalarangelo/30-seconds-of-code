FactoryBot.define do
  factory :collection_snippet do
    collection_cid { 'collection' }
    snippet_cid { 'snippet' }
    position { 1 }
    date_modified { Date.today }
  end
end
