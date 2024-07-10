class RedirectGenerator
  def self.generate
    redirects_string =
      YAML.load_file(Orbit::settings[:redirects_import_path]).map do |redirect|
        "#{redirect['from']} #{redirect['to']} #{redirect['status']}"
      end.join("\n")

    File.write(Orbit::settings[:redirects_export_path], redirects_string)
  end
end
