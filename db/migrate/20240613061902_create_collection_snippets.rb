class CreateCollectionSnippets < ActiveRecord::Migration[7.1]
  def change
    create_table :collection_snippets do |t|
      t.string :collection_cid
      t.string :snippet_cid
      t.integer :position
      t.date :date_modified
    end
    add_index :collection_snippets, :snippet_cid
    add_index :collection_snippets, :collection_cid
  end
end
