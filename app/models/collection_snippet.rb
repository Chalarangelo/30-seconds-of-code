class CollectionSnippet < ApplicationRecord
  belongs_to :snippet, primary_key: 'cid', foreign_key: 'snippet_cid'
  belongs_to :collection, primary_key: 'cid', foreign_key: 'collection_cid'

  scope :by_position, -> { order('position asc') }
  scope :listed, -> { where.not(position: -1) }

  # We explicitly name the model here to avoid conflicts with the
  # `Snippet` model having a column of the same name.
  scope :published, -> do
    where(collection_snippets: { date_modified: ..Date.today })
  end
end
