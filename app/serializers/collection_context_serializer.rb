class CollectionContextSerializer < BaseSerializer
  attributes :title, :description, :cover, :cover_srcset, :sublinks

  alias_attribute :cover, :cover_url

  delegate :title, :description, :cover_srcset, :sublinks, :cover_url,
           to: :object
end
