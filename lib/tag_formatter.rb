class TagFormatter
  TAG_DICTIONARY = {
    css: 'CSS',
    javascript: 'JavaScript',
    node: 'Node.js',
    php: 'PHP',
    seo: 'SEO',
    vscode: 'Visual Studio Code',
    html: 'HTML',
    webdev: 'Web development',
    http: 'HTTP',
  }.freeze

  @formatted_tags = {}

  def self.format(tag)
    return '' if tag.blank?
    return @formatted_tags[tag] if @formatted_tags.key?(tag)

    @formatted_tags[tag] = TAG_DICTIONARY[tag.to_sym] || tag.capitalize
  end
end
