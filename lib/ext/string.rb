class String
  def strip_markdown
    self.
      gsub(/[`*]/, '').
      gsub(/\n/, '').
      gsub(/\[(.*)\]\(.*\)/, '\1').
      gsub(/_(.*?)_/, '\1')
  end

  def strip_html_paragraphs_and_links
    self.
      gsub(/<p>/, '').
      gsub(/<\/p>/, '').
      gsub(/<a.*?>(.*?)<\/a>/, '\1')
  end

  def to_seo_slug
    "/#{self.dasherize.downcase}"
  end

  def normalized_tokens
    self.
      downcase.
      strip.
      split(/[^a-z0-9\-']+/i).
      select { |token| token.length >= 2 }
  end
end
