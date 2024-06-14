class Collection < ApplicationRecord
  # Change primary key to `cid` to make `find` available
  self.primary_key = :cid

  # https://guides.rubyonrails.org/v5.0/association_basics.html
  has_one :parent,
    class_name: 'Collection',
    foreign_key: 'cid',
    primary_key: 'parent_cid',
    inverse_of: :children
  has_many :children,
    class_name: 'Collection',
    foreign_key: 'parent_cid',
    primary_key: 'cid',
    inverse_of: :parent

  has_and_belongs_to_many :snippets,
    association_foreign_key: 'snippet_cid',
    foreign_key: 'collection_cid'
end
