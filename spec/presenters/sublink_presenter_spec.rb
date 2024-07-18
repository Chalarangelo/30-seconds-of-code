require 'rails_helper'

describe SublinkPresenter do
  let!(:main_collection) { FactoryBot.create(:collection, :main) }

  let!(:primary_collection) do
    FactoryBot.create(
      :collection,
      :primary,
      cid: 'js',
      mini_title: 'JavaScript',
    )
  end

  let!(:secondary_collection) do
    FactoryBot.create(
      :collection,
      cid: 'js/c/array',
      parent_cid: primary_collection.cid,
      mini_title: 'Array',
    )
  end

  let!(:other_secondary_collection) do
    FactoryBot.create(
      :collection,
      cid: 'js/c/object',
      parent_cid: primary_collection.cid,
      mini_title: 'Object',
    )
  end

  let!(:orphaned_secondary_collection) do
    FactoryBot.create(
      :collection,
      cid: 'js/c/number',
      mini_title: 'Number',
    )
  end

  let(:main_presenter) { SublinkPresenter.new(main_collection) }
  let(:collections_presenter) { SublinkPresenter.new(collections_collection) }
  let(:primary_presenter) { SublinkPresenter.new(primary_collection) }
  let(:secondary_presenter) { SublinkPresenter.new(secondary_collection) }
  let(:other_secondary_presenter) { SublinkPresenter.new(other_secondary_collection) }
  let(:orphaned_secondary_presenter) { SublinkPresenter.new(orphaned_secondary_collection) }

  context '#sublinks' do
    it 'returns all primary collections for the main collection' do
      expect(main_presenter.sublinks).to eq(
        [
          { title: 'JavaScript', url: '/js/p/1', selected: false },
          SublinkPresenter::MORE_COLLECTIONS_SUBLINK
        ]
      )
    end

    it 'returns all children for the primary collection' do
      expect(primary_presenter.sublinks).to eq(
        [
          { title: 'All', url: '/js/p/1', selected: true },
          { title: 'Array', url: '/js/c/array/p/1', selected: false },
          { title: 'Object', url: '/js/c/object/p/1', selected: false }
        ]
      )
    end

    it 'returns the parent collection sublink for the secondary collection' do
      expect(secondary_presenter.sublinks).to eq(
        [
          { title: 'All', url: '/js/p/1', selected: false },
          { title: 'Array', url: '/js/c/array/p/1', selected: true },
          { title: 'Object', url: '/js/c/object/p/1', selected: false }
        ]
      )
    end

    it 'returns the parent collection sublink for orphaned secondary collections' do
      expect(orphaned_secondary_presenter.sublinks).to eq([])
    end
  end
end
