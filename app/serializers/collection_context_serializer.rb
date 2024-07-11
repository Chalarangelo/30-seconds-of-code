class CollectionContextSerializer < BaseSerializer
  attributes :name, :description, :cover, :cover_srcset, :sublinks

  delegate :name, :description, :cover_srcset, :sublinks, to: :object

  def cover
    object.cover_url
  end
end
