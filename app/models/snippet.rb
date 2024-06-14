class Snippet < ApplicationRecord
  # Change primary key to `cid` to make `find` available
  self.primary_key = :cid

  # Relationships
  has_one :language, primary_key: 'language_cid', foreign_key: 'cid'
  has_and_belongs_to_many :collections,
    association_foreign_key: 'collection_cid',
    foreign_key: 'snippet_cid'

  # Prevent certain attributes from getting printed in the console
  self.filter_attributes += [
    :description_html,
    :full_description_html,
    :full_text
  ]

  # TODO: Rails 7.2 will introduce this, check later
  # self.attributes_for_inspect = [:id, :cid]

  scope :all_by_new, -> { order('date_modified desc') }

  def self.[](cid)
    where(cid: cid).first
  end

  def tags
    @tags ||= _tags.split(';')
  end
end
