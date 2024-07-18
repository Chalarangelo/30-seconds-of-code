require 'rails_helper'

describe CoverPresenter do
  let(:snippet) do
    FactoryBot.create(
      :snippet,
      cover: 'snippet-cover',
    )
  end

  let(:collection) do
    FactoryBot.create(
      :collection,
      cover: 'collection-cover',
    )
  end

  let(:snippet_presenter) { CoverPresenter.new(snippet) }
  let(:collection_presenter) { CoverPresenter.new(collection) }

  context '#cover_url' do
    it 'returns the cover url for a snippet' do
      expect(snippet_presenter.cover_url).to eq('/assets/cover/snippet-cover-400.webp')
    end

    it 'returns the cover url for a snippet with full size' do
      expect(snippet_presenter.cover_url(full: true)).to eq('/assets/cover/snippet-cover-800.webp')
    end

    it 'returns the cover url for a collection' do
      expect(collection_presenter.cover_url).to eq('/assets/splash/collection-cover-600.webp')
    end
  end

  context '#cover_srcset' do
    it 'returns the cover srcset for a snippet' do
      expect(snippet_presenter.cover_srcset).to eq(
        [
          '/assets/cover/snippet-cover-400.webp 400w',
          '/assets/cover/snippet-cover-800.webp 800w',
        ],
      )
    end

    it 'returns the cover srcset for a snippet with full size' do
      expect(snippet_presenter.cover_srcset(full: true)).to eq(
        [
          '/assets/cover/snippet-cover-800.webp 800w',
          '/assets/cover/snippet-cover-400.webp 400w',
          '/assets/cover/snippet-cover-1200.webp 1200w',
        ],
      )
    end

    it 'returns the cover srcset for a collection' do
      expect(collection_presenter.cover_srcset).to eq(
        [
          '/assets/splash/collection-cover-600.webp 600w',
          '/assets/splash/collection-cover-400.webp 400w',
        ],
      )
    end
  end
end
