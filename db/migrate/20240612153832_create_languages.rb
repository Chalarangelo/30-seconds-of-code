class CreateLanguages < ActiveRecord::Migration[7.1]
  def change
    create_table :languages do |t|
      t.string :cid
      t.string :long
      t.string :short
      t.string :name
    end
    add_index :languages, :cid, unique: true
  end
end
