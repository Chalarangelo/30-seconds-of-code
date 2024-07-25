class CollectionContextSerializer < BaseSerializer
  attributes :title, :content, :cover, :cover_srcset, :sublinks

  alias_attribute :cover, :cover_url

  delegate :title, :content, :cover_srcset, :sublinks, :cover_url,
           to: :object
end
