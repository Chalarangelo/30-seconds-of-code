class SnippetContextSerializer < BaseSerializer
  attributes :title, :description, :slug, :date, :date_time, :tags,
              :cover, :cover_srcset, :github_url, :table_of_contents

  delegate :title, :description, :slug, :cover_srcset, :github_url,
           :table_of_contents,
           to: :object

  def cover_srcset
    object.cover_srcset(full: true)
  end

  def date
    object.date_formatted
  end

  def date_time
    object.date_machine_formatted
  end

  def tags
    object.formatted_tags
  end

  def cover
    object.cover_url(full: true)
  end
end
