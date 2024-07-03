class CollectionContextSerializer < BaseSerializer
  attributes :name, :description, :cover_srcset, :sublinks, :cover

  delegate :name, :description, :cover_srcset, :sublinks, to: :object

  def cover
    object.cover_url
  end
end
