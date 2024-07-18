require 'rails_helper'

describe Collection do
  let!(:main_collection) { FactoryBot.create(:collection, :main) }
  let!(:collections_collection) { FactoryBot.create(:collection, :collections) }

  let!(:primary_collection) do
    FactoryBot.create(
      :collection,
      :primary,
      cid: 'js',
      _tokens: 'primary;collection;short;description'
    )
  end

  let!(:secondary_collection) do
    FactoryBot.create(
      :collection,
      cid: 'js/c/array',
      parent_cid: primary_collection.cid
    )
  end

  let!(:other_secondary_collection) do
    FactoryBot.create(
      :collection,
      cid: 'js/c/object',
      parent_cid: primary_collection.cid
    )
  end

  let!(:snippet) { FactoryBot.create(:snippet) }
  let!(:collection_snippet) do
    FactoryBot.create(
      :collection_snippet,
      snippet_cid: snippet.cid,
      collection_cid: primary_collection.cid
    )
  end

  context '.main' do
    it 'returns main collection' do
      expect(Collection.main).to eq main_collection
    end
  end

  context '.collections' do
    it 'returns collections collection' do
      expect(Collection.collections).to eq collections_collection
    end
  end

  context '#has_parent?' do
    it 'returns false if no parent' do
      expect(primary_collection.has_parent?).to eq false
    end

    it 'returns true if parent exists' do
      expect(secondary_collection.has_parent?).to eq true
    end
  end

  context '#is_main?' do
    it 'returns true if main collection' do
      expect(main_collection.is_main?).to eq true
    end

    it 'returns false if not main collection' do
      expect(primary_collection.is_main?).to eq false
    end
  end

  context '#is_collections?' do
    it 'returns true if collections collection' do
      expect(collections_collection.is_collections?).to eq true
    end

    it 'returns false if not collections collection' do
      expect(primary_collection.is_collections?).to eq false
    end
  end

  context '#is_primary?' do
    it 'returns true if primary collection' do
      expect(primary_collection.is_primary?).to eq true
    end

    it 'returns false if not primary collection' do
      expect(secondary_collection.is_primary?).to eq false
    end
  end

  context '#is_secondary?' do
    it 'returns false if primary collection' do
      expect(primary_collection.is_secondary?).to eq false
    end

    it 'returns true if secondary collection' do
      expect(secondary_collection.is_secondary?).to eq true
    end
  end

  context '#root_url' do
    it 'returns the slug if it is a parent' do
      expect(primary_collection.root_url).to eq primary_collection.slug
    end

    it 'returns the parent slug if it has a parent' do
      expect(secondary_collection.root_url).to eq secondary_collection.parent_cid.to_seo_slug
    end
  end

  context '#siblings' do
    it 'returns siblings if it has a parent' do
      expect(secondary_collection.siblings).to eq [secondary_collection, other_secondary_collection]
    end

    it 'returns an empty array if it has no parent' do
      expect(primary_collection.siblings).to eq []
    end
  end

  context '#siblings_except_self' do
    it 'returns siblings except self if it has a parent' do
      expect(secondary_collection.siblings_except_self).to eq [other_secondary_collection]
    end

    it 'returns an empty array if it has no parent' do
      expect(primary_collection.siblings_except_self).to eq []
    end
  end

  context '#search_tokens_array' do
    it 'returns tokens' do
      expect(primary_collection.search_tokens_array).to eq %w[primary collection short description]
    end
  end

  context '#first_page_slug' do
    it 'returns first page slug' do
      expect(primary_collection.first_page_slug).to eq "#{primary_collection.slug}/p/1"
    end
  end

  context '#all_page_slugs' do
    before do
      allow(primary_collection).to receive(:page_count).and_return(3)
    end

    it 'returns all page slugs' do
      expect(primary_collection.all_page_slugs).to eq [
        "#{primary_collection.slug}/p/1",
        "#{primary_collection.slug}/p/2",
        "#{primary_collection.slug}/p/3"
      ]
    end
  end

  context '#all_page_full_urls' do
    before do
      allow(primary_collection).to receive(:page_count).and_return(3)
    end

    it 'returns all page full urls' do
      expect(primary_collection.all_page_full_urls).to eq [
        "#{Orbit::settings[:website][:url]}#{primary_collection.slug}/p/1",
        "#{Orbit::settings[:website][:url]}#{primary_collection.slug}/p/2",
        "#{Orbit::settings[:website][:url]}#{primary_collection.slug}/p/3"
      ]
    end
  end

  context '#page_count' do
    before do
      allow(primary_collection).to receive(:listed_snippet_count).and_return(42)
    end

    it 'returns page count' do
      expect(primary_collection.page_count).to eq 2
    end
  end

  context '#listed_snippets' do
    it 'returns listed snippets' do
      expect(primary_collection.listed_snippets).to eq [snippet]
    end
  end

  context '#formatted_snippet_count' do
    before do
      allow(primary_collection).to receive(:listed_snippet_count).and_return(42)
    end

    it 'returns formatted snippet count' do
      expect(primary_collection.formatted_snippet_count).to eq '42 snippets'
    end
  end

  context '#matches_tag?' do
    it 'returns true if collection matches tag' do
      expect(secondary_collection.matches_tag('array')).to eq true
    end

    it 'returns false if collection does not match tag' do
      expect(secondary_collection.matches_tag('js')).to eq false
    end
  end

  context '#pages' do
    it 'returns an array of page objects' do
      expect(primary_collection.pages).to all(be_a(Page::Collection))
    end

    it 'returns page objects with the correct snippet' do
      expect(primary_collection.pages.first.key).to eq 'js/p/1'
    end
  end
end
