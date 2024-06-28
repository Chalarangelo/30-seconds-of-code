class SnippetContextSerializer < BaseSerializer
  attributes :title, :slug, :cover_srcset, :github_url

  attribute :full_description_html, as: :full_description
  attribute :date_formatted, as: :date
  attribute :date_machine_formatted, as: :date_time
  attribute :formatted_tags, as: :tags
  attribute :cover_url, as: :cover
  attribute :table_of_contents_html, as: :table_of_contents

  def cover_srcset
    object.cover_srcset(full: true)
  end
end

# reload!;AstroContentGenerator.prepare;nil
# Snippet.preload(:language, :collection_snippets, :collections).last(10).map {|s| s.breadcrumbs }
