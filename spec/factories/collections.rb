FactoryBot.define do
  factory :collection do
    cid { 'collection' }
    title { 'My Collection' }
    short_title { 'My Collection' }
    mini_title { 'My Collection' }
    description { '<p>My collection <code>description</code>.</p>' }
    short_description { 'My collection short description.' }
    listed { true }
    featured_index { 1 }
    top_level { true }
    parent_cid { nil }
    cover { 'cover' }
    _tokens { 'my;collection;short;description' }
    ranking { 0.65 }

    trait :listed do
      listed { true }
    end

    trait :unlisted do
      listed { false }
    end

    trait :featured do
      featured_index { 1 }
    end

    trait :not_featured do
      featured_index { nil }
    end

    trait :top_level do
      top_level { true }
    end

    trait :not_top_level do
      top_level { false }
    end

    trait :with_snippet do
      after(:create) do |collection|
        create(:snippet, cid: 'my-snippet')
        create(:collection_snippet, snippet_cid: 'my-snippet', collection_cid: collection.cid)
      end
    end
  end
end
