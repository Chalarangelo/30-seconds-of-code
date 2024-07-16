class InitializeDatabase < ActiveRecord::Migration[7.1]
  def change
    # Language table
    create_table :languages do |t|
      t.string :cid
      t.string :long
      t.string :short
      t.string :name
    end

    add_index :languages, :cid, unique: true

    # Snippets table
    create_table :snippets do |t|
      t.string :cid
      t.string :title
      t.string :short_title
      t.text :description
      t.text :short_description
      t.boolean :listed
      t.string :cover
      t.text :_tokens
      t.float :ranking
      t.string :_tags
      t.date :date_modified
      t.text :table_of_contents
      t.string :language_cid
    end

    add_index :snippets, :cid, unique: true
    add_index :snippets, :language_cid
    add_index :snippets, :date_modified
    add_index :snippets, :ranking, order: { ranking: :desc }

    # Collections table
    create_table :collections do |t|
      t.string :cid
      t.string :title
      t.string :short_title
      t.string :mini_title
      t.text :description
      t.text :short_description
      t.boolean :listed
      t.string :cover
      t.text :_tokens
      t.float :ranking
      t.integer :featured_index
      t.boolean :top_level
      t.string :parent_cid
    end

    add_index :collections, :cid, unique: true
    add_index :collections, :parent_cid

    # Collection snippets table
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
