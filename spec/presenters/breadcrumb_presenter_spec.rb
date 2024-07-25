require 'rails_helper'

describe BreadcrumbPresenter do
  let!(:main_collection) { FactoryBot.create(:collection, :main) }
  let!(:collections_collection) { FactoryBot.create(:collection, :collections) }

  let!(:primary_collection) do
    FactoryBot.create(
      :collection,
      :primary,
      mini_title: 'JavaScript',
      cid: 'js'
    )
  end

  let!(:secondary_collection) do
    FactoryBot.create(
      :collection,
      cid: 'js/c/array',
      mini_title: 'Array',
      parent_cid: primary_collection.cid
    )
  end

  let!(:other_secondary_collection) do
    FactoryBot.create(
      :collection,
      cid: 'js/c/object',
      mini_title: 'Object',
      parent_cid: primary_collection.cid
    )
  end

  let!(:snippet) do
    FactoryBot.create(
      :snippet,
      cid: 'js/s/my-snippet',
      short_title: 'My snippet',
      _tags: 'array;object'
    )
  end

  let!(:collection_snippet_primary) do
    FactoryBot.create(
      :collection_snippet,
      collection_cid: primary_collection.cid,
      snippet_cid: snippet.cid
    )
  end

  let!(:collection_snippet_secondary) do
    FactoryBot.create(
      :collection_snippet,
      collection_cid: secondary_collection.cid,
      snippet_cid: snippet.cid
    )
  end

  let!(:collection_snippet_other_secondary) do
    FactoryBot.create(
      :collection_snippet,
      collection_cid: other_secondary_collection.cid,
      snippet_cid: snippet.cid
    )
  end

  let(:snippet_presenter) { BreadcrumbPresenter.new(snippet) }

  context '#breadcrumbs' do
    it 'returns the breadcrumbs for a snippet' do
      expect(snippet_presenter.breadcrumbs).to eq(
        [
          BreadcrumbPresenter::HOME_BREADCRUMB,
          { url: '/js/p/1', name: 'JavaScript' },
          { url: '/js/c/array/p/1', name: 'Array' },
          { url: '/js/s/my-snippet', name: 'My snippet' }
        ]
      )
    end
  end

  context '#recommended_collection' do
    it 'returns the recommended collection for a snippet' do
      expect(snippet_presenter.recommended_collection).to eq(other_secondary_collection)
    end
  end
end
