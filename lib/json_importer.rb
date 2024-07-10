class JsonImporter
  # bin/parsley; rake db:migrate:reset; rake import:content
  def self.import
    data = JSON.load_file(Orbit::settings[:content_import_path]).deep_symbolize_keys
    data.each do |key, value|
      model = key.to_s.singularize.camelize.constantize
      model.upsert_all(value)
    end
  end
end
