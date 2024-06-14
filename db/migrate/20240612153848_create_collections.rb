class CreateCollections < ActiveRecord::Migration[7.1]
  def change
    create_table :collections do |t|
      t.string :cid
      t.string :name
      t.string :short_name
      t.string :mini_name
      t.boolean :featured
      t.integer :featured_index
      t.string :cover
      t.text :description
      t.text :short_description
      t.boolean :top_level
      t.string :parent_cid
      t.text :_tokens
      t.float :ranking
    end
    add_index :collections, :cid, unique: true
    add_index :collections, :parent_cid
  end
end
