class SnippetContextSerializer < BaseSerializer
  attributes :title, :full_description, :slug, :date, :date_time, :tags,
              :cover, :cover_srcset, :github_url, :table_of_contents

  delegate :title, :slug, :cover_srcset, :github_url, to: :object

  def cover_srcset
    object.cover_srcset(full: true)
  end

  def full_description
    object.full_description_html
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

  def table_of_contents
    object.table_of_contents_html
  end
end
