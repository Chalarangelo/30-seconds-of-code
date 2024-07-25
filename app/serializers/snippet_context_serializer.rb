class SnippetContextSerializer < BaseSerializer
  attributes :title, :description, :slug, :date, :date_time, :tags,
             :cover, :cover_srcset, :github_url, :table_of_contents

  alias_attribute :date, :date_formatted
  alias_attribute :date_time, :date_machine_formatted
  alias_attribute :tags, :formatted_tags

  delegate :title, :description, :slug, :cover_srcset, :github_url,
           :table_of_contents, :date_formatted, :date_machine_formatted,
           :formatted_tags,
           to: :object

  def cover_srcset
    object.cover_srcset(full: true)
  end

  def cover
    object.cover_url(full: true)
  end
end
