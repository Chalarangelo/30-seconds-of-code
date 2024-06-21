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

  def self.format(tag)
    return '' if tag.blank?

    TAG_DICTIONARY[tag.to_sym] || tag.capitalize
  end
end
