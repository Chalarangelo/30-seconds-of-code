require 'rails_helper'

describe CommonApi do
  let!(:snippet) do
    FactoryBot.create(
      :snippet,
      cid: 'js/my-snippet',
      description: '<p>A <a href="https://example.com">description</a></p>.'
    )
  end

  let!(:collection) do
    FactoryBot.create(
      :collection,
      cid: 'js/array'
    )
  end

  describe '.[]' do
    it 'returns the first record matching the cid', :aggregate_failures do
      expect(Snippet['js/my-snippet']).to eq(snippet)
      expect(Collection['js/array']).to eq(collection)
    end

    it 'removes leading and trailing slashes from the key' do
      expect(Snippet['/js/my-snippet/']).to eq(snippet)
    end
  end

  describe '#slug' do
    it 'returns the slugified cid', :aggregate_failures do
      expect(snippet.slug).to eq("/#{snippet.cid}")
      expect(collection.slug).to eq("/#{collection.cid}")
    end
  end

  describe '#slug_id' do
    it 'returns the last part of the slug', :aggregate_failures do
      expect(snippet.slug_id).to eq('my-snippet')
      expect(collection.slug_id).to eq('array')
    end
  end

  describe '#all_slugs' do
    before do
      allow(Redirects).to receive(:for).with(snippet.url).and_return(
        [snippet.slug, '/js/old-slug']
      )
    end

    it 'returns the redirects for the url' do
      expect(snippet.all_slugs).to eq([snippet.slug, '/js/old-slug'])
    end
  end

  describe '#url' do
    it 'returns the slug for snippets' do
      expect(snippet.url).to eq("/#{snippet.cid}")
    end

    it 'returns the first page slug for collections' do
      expect(collection.url).to eq("/#{collection.cid}/p/1")
    end
  end

  describe '#full_url' do
    it 'returns the full url for the record', :aggregate_failures do
      expect(snippet.full_url).to eq("#{Orbit::settings[:website][:url]}#{snippet.url}")
      expect(collection.full_url).to eq("#{Orbit::settings[:website][:url]}#{collection.url}")
    end
  end

  describe '#formatted_description' do
    it 'strips html tags and paragraphs from the description' do
      expect(snippet.formatted_description).to eq('A description.')
    end
  end

  describe '#seo_description' do
    it 'strips html from the description' do
      expect(snippet.seo_description).to eq('A description.')
    end
  end

  describe '#search_tokens' do
    before do
      allow(snippet).to receive(:search_tokens_array).and_return(%w[a description])
    end

    it 'returns the search tokens as a string' do
      expect(snippet.search_tokens).to eq('a description')
    end
  end

  describe '#is_snippet?' do
    it 'returns true if the record is a snippet', :aggregate_failures do
      expect(snippet.is_snippet?).to eq(true)
      expect(collection.is_snippet?).to eq(false)
    end
  end

  describe '#type' do
    it 'returns the model name in lowercase' do
      expect(snippet.type).to eq('snippet')
      expect(collection.type).to eq('collection')
    end
  end
end
