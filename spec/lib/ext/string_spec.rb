require 'active_support/inflector'
require 'ext/string'

describe String do
  context '#strip_markdown' do
    it 'strips markdown' do
      expect('`*Hello*`'.strip_markdown).to eq 'Hello'
    end
  end

  context '#strip_html_paragraphs_and_links' do
    it 'strips HTML paragraphs and links' do
      expect('<p><a href="http://example.com">Hello</a></p>'.strip_html_paragraphs_and_links).to eq 'Hello'
    end
  end

  context '#to_seo_slug' do
    it 'converts to SEO slug' do
      expect('Hello_World'.to_seo_slug).to eq '/hello-world'
    end
  end

  context '#normalized_tokens' do
    it 'normalizes tokens' do
      expect('Hello, World!'.normalized_tokens).to eq %w[hello world]
    end
  end

  context '#escape_html' do
    it 'escapes HTML' do
      expect('<p>Hello</p>'.escape_html).to eq '&lt;p&gt;Hello&lt;/p&gt;'
    end
  end
end
