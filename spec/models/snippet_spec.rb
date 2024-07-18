require 'rails_helper'

describe Snippet do
  let(:published_snippet) { FactoryBot.create(:snippet, :published) }
  let(:scheduled_snippet) { FactoryBot.create(:snippet, :scheduled) }
  let(:snippet_with_date) { FactoryBot.create(:snippet, date_modified: '2024-06-12') }
  let(:listed_snippet) { FactoryBot.create(:snippet, :listed) }
  let(:unlisted_snippet) { FactoryBot.create(:snippet, :unlisted) }
  let(:snippet_with_collection) { FactoryBot.create(:snippet, :with_collection) }

  let(:js_snippet) do
    FactoryBot.create(
      :snippet,
      language_cid: 'javascript',
      cid: 'js/s/my-snippet',
      _tags: 'array;object',
      _tokens: 'lorem;ipsum'
    )
  end

  let(:node_js_snippet) do
    FactoryBot.create(
      :snippet,
      :tagged_node_js,
      language_cid: 'javascript'
    )
  end

  let(:snippet_without_language) do
    FactoryBot.create(
      :snippet,
      :without_language,
      title: 'My Article',
      _tags: 'array;object;html'
    )
  end

  context '#tags' do
    it 'returns tags' do
      expect(snippet_without_language.tags).to eq %w[array object html]
    end
  end

  context '#has_language?' do
    it 'returns false if no language' do
      expect(snippet_without_language.has_language?).to eq false
    end

    it 'returns true if language exists' do
      expect(js_snippet.has_language?).to eq true
    end
  end

  context '#seo_title' do
    it 'returns title if no language' do
      expect(snippet_without_language.seo_title).to eq snippet_without_language.title
    end

    it 'returns title with language, if exists' do
      expect(js_snippet.seo_title).to eq 'JavaScript - My Snippet'
    end

    it 'returns title with formatted primary tag if language is JavaScript and primary tag is Node' do
      expect(node_js_snippet.seo_title).to eq 'Node.js - My Snippet'
    end
  end

  context '#primary_tag' do
    it 'returns primary tag' do
      expect(js_snippet.primary_tag).to eq 'array'
    end
  end

  context '#formatted_primary_tag' do
    it 'returns formatted primary tag' do
      expect(js_snippet.formatted_primary_tag).to eq 'Array'
    end

    it 'returns formatted primary tag if special tag' do
      expect(node_js_snippet.formatted_primary_tag).to eq 'Node.js'
    end
  end

  context '#formatted_mini_preview_tag' do
    it 'returns article mini preview tag if no language' do
      expect(snippet_without_language.formatted_mini_preview_tag).to eq 'Article'
    end

    it 'returns language name if language exists' do
      expect(js_snippet.formatted_mini_preview_tag).to eq 'JavaScript'
    end
  end

  context '#formatted_tags' do
    it 'returns formatted tags' do
      expect(snippet_without_language.formatted_tags).to eq 'Array, Object, HTML'
    end

    it 'prepends language name if language exists' do
      expect(js_snippet.formatted_tags).to eq 'JavaScript, Array, Object'
    end
  end

  context '#formatted_preview_tags' do
    it 'returns formatted primary tag if no language' do
      expect(snippet_without_language.formatted_preview_tags).to eq 'Array'
    end

    it 'returns language name if language exists' do
      expect(js_snippet.formatted_preview_tags).to eq 'JavaScript'
    end
  end

  context '#github_url' do
    it 'returns GitHub URL' do
      expect(js_snippet.github_url).to eq "https://github.com/Chalarangelo/30-seconds-of-code/blob/master/content/snippets/#{js_snippet.cid}.md"
    end
  end

  context '#is_scheduled?' do
    it 'returns false if not scheduled' do
      expect(published_snippet.is_scheduled?).to eq false
    end

    it 'returns true if scheduled' do
      expect(scheduled_snippet.is_scheduled?).to eq true
    end
  end

  context '#is_published?' do
    it 'returns true if published' do
      expect(published_snippet.is_published?).to eq true
    end

    it 'returns false if not published' do
      expect(scheduled_snippet.is_published?).to eq false
    end
  end

  context '#is_listed?' do
    it 'returns true if listed' do
      expect(listed_snippet.is_listed?).to eq true
    end

    it 'returns false if not listed' do
      expect(unlisted_snippet.is_listed?).to eq false
    end
  end

  context '#date_formatted' do
    it 'returns formatted date' do
      expect(snippet_with_date.date_formatted).to eq 'June 12, 2024'
    end
  end

  context '#date_machine_formatted' do
    it 'returns machine formatted date' do
      expect(snippet_with_date.date_machine_formatted).to eq '2024-06-12'
    end
  end

  context '#search_tokens_array' do
    it 'returns search tokens array with language' do
      expect(js_snippet.search_tokens_array).to eq %w[my-snippet array object lorem ipsum my snippet js javascript]
    end
  end

  context '#has_collection?' do
    it 'returns false if snippet has no collection' do
      expect(snippet_without_language.has_collection?).to eq false
    end

    it 'returns true if snippet has collection' do
      expect(snippet_with_collection.has_collection?).to eq true
    end
  end

  context '#page' do
    it 'returns a page object' do
      expect(js_snippet.page).to be_a(Page::Snippet)
    end

    it 'returns a page object with the correct snippet' do
      expect(js_snippet.page.key).to eq 'js/s/my-snippet'
    end
  end
end
