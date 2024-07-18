require 'rails_helper'

describe RecommendationPresenter do
  let!(:snippet) do
    FactoryBot.create(
      :snippet,
      language_cid: 'javascript',
      cid: 'js/s/my-snippet',
      short_title: 'My snippet',
      _tags: 'array;object'
    )
  end

  let!(:same_snippet_other_language) do
    FactoryBot.create(
      :snippet,
      language_cid: 'python',
      cid: 'py/s/my-snippet',
      short_title: 'My snippet',
      _tags: 'array;object'
    )
  end

  let!(:unlisted_snippet) do
    FactoryBot.create(
      :snippet,
      :unlisted,
      language_cid: 'javascript',
      cid: 'js/s/unrecommendable-snippet',
      short_title: 'Unrecommendable snippet',
      _tags: 'array;object'
    )
  end

  let!(:highly_recommendable_snippet) do
    FactoryBot.create(
      :snippet,
      language_cid: 'javascript',
      cid: 'js/s/highly-recommendable-snippet',
      short_title: 'Highly recommendable snippet',
      _tags: 'array;object'
    )
  end

  let!(:somewhat_recommendable_snippet) do
    FactoryBot.create(
      :snippet,
      language_cid: 'javascript',
      cid: 'js/s/somewhat-recommendable-snippet',
      short_title: 'Somewhat recommendable snippet',
      _tags: 'browser'
    )
  end

  let(:presenter) { RecommendationPresenter.new(snippet) }

  describe '#recommend_snippets' do
    subject { presenter.recommend_snippets }

    it 'returns snippets that are not the current snippet' do
      expect(subject).not_to include(snippet)
    end

    it 'does not return the same snippet in another language' do
      expect(subject).not_to include(same_snippet_other_language)
    end

    it 'does not return unlisted snippets' do
      expect(subject).not_to include(unlisted_snippet)
    end

    it 'returns snippets in the same language with the same tags' do
      expect(subject).to include(highly_recommendable_snippet)
    end

    it 'returns snippets in the same language with similar tags' do
      expect(subject).to include(somewhat_recommendable_snippet)
    end
  end
end
