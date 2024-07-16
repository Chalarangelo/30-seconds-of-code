class CollectionContextSerializer < BaseSerializer
  attributes :title, :description, :cover, :cover_srcset, :sublinks

  delegate :title, :description, :cover_srcset, :sublinks, to: :object

  def cover
    object.cover_url
  end
end
