class String
  def strip_markdown
    gsub(/[`*]/, '').
    gsub("\n", '').
    gsub(/\[(.*)\]\(.*\)/, '\1').
    gsub(/_(.*?)_/, '\1')
  end

  def strip_html
    gsub(/<.*?>/, '').
    gsub('&nbsp;', ' ').
    gsub('&amp;', '&').
    gsub('&gt;', '>').
    gsub('&lt;', '<')
  end

  def strip_html_paragraphs_and_links
    gsub('<p>', '').
    gsub('</p>', '').
    gsub(/<a.*?>(.*?)<\/a>/, '\1')
  end

  def to_seo_slug
    "/#{dasherize.downcase}"
  end

  def normalized_tokens
    downcase.
    strip.
    split(/[^a-z0-9\-']+/i).
    select { |token| token.length >= 2 }
  end

  def escape_html
    CGI.escapeHTML(self)
  end
end
