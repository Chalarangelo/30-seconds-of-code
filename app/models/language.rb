class Language < ApplicationRecord
  # Change primary key to `cid` to make `find` available
  self.primary_key = :cid

  has_many :snippets, primary_key: 'cid', foreign_key: 'language_cid'
end
