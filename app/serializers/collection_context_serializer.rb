class CollectionContextSerializer < BaseSerializer
  attributes :name, :description, :cover_srcset, :sublinks

  attribute :cover_url, as: :cover
end
