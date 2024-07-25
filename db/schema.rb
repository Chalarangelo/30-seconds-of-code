# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_06_12_153832) do
  create_table "collection_snippets", force: :cascade do |t|
    t.string "collection_cid"
    t.string "snippet_cid"
    t.integer "position"
    t.date "date_modified"
    t.index ["collection_cid"], name: "index_collection_snippets_on_collection_cid"
    t.index ["snippet_cid"], name: "index_collection_snippets_on_snippet_cid"
  end

  create_table "collections", force: :cascade do |t|
    t.string "cid"
    t.string "title"
    t.string "short_title"
    t.string "mini_title"
    t.text "description"
    t.text "short_description"
    t.boolean "listed", default: true, null: false
    t.string "cover"
    t.text "_tokens"
    t.float "ranking"
    t.integer "featured_index"
    t.boolean "top_level", default: false, null: false
    t.string "parent_cid"
    t.index ["cid"], name: "index_collections_on_cid", unique: true
    t.index ["parent_cid"], name: "index_collections_on_parent_cid"
  end

  create_table "languages", force: :cascade do |t|
    t.string "cid"
    t.string "long"
    t.string "short"
    t.string "name"
    t.index ["cid"], name: "index_languages_on_cid", unique: true
  end

  create_table "snippets", force: :cascade do |t|
    t.string "cid"
    t.string "title"
    t.string "short_title"
    t.text "description"
    t.text "short_description"
    t.boolean "listed", default: true, null: false
    t.string "cover"
    t.text "_tokens"
    t.float "ranking"
    t.string "_tags"
    t.date "date_modified"
    t.text "table_of_contents"
    t.string "language_cid"
    t.index ["cid"], name: "index_snippets_on_cid", unique: true
    t.index ["date_modified"], name: "index_snippets_on_date_modified"
    t.index ["language_cid"], name: "index_snippets_on_language_cid"
    t.index ["ranking"], name: "index_snippets_on_ranking", order: :desc
  end

end
