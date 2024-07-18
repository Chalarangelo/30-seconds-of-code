FactoryBot.define do
  factory :snippet do
    cid { 'snippet' }
    title { 'My Snippet' }
    short_title { 'My Snippet' }
    description { '<p>My snippet <code>description</code>.</p>' }
    short_description { 'My snippet short description.' }
    listed { true }
    file_name { 'my-snippet.md' }
    _tags { 'array;object' }
    date_modified { Date.today }
    table_of_contents { nil }
    language_cid { 'javascript' }
    cover { 'cover' }
    _tokens { 'my;snippet;short;description' }
    ranking { 0.65 }

    trait :listed do
      listed { true }
    end

    trait :unlisted do
      listed { false }
    end

    trait :published do
      date_modified { Date.yesterday }
    end

    trait :scheduled do
      date_modified { Date.tomorrow }
    end

    trait :without_language do
      language_cid { nil }
    end

    trait :tagged_node_js do
      _tags { 'node;array' }
    end

    trait :with_collection do
      after(:create) do |snippet|
        create(:collection, cid: 'my-collection')
        create(:collection_snippet, snippet_cid: snippet.cid, collection_cid: 'my-collection')
      end
    end
  end
end
