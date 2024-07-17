class Redirects
  @@redirects = []

  def self.generate_public_file
    redirects_string =
      redirects.map do |redirect|
        "#{redirect[:from]} #{redirect[:to]} #{redirect[:status]}"
      end.join("\n")

    File.write(Orbit::settings[:redirects_export_path], redirects_string)
  end

  def self.redirects
    return @@redirects if @@redirects.any?

    @@redirects =
      YAML.load_file(Orbit::settings[:redirects_import_path]).map(&:deep_symbolize_keys)
  end

  def self.for(slug)
    lookup_paths = [slug]
    redirected_paths = Set.new

    while lookup_paths.present?
      redirected_paths.add(lookup_paths.first)

      from_paths =
        redirects.select do |redirect|
          redirect[:to] == lookup_paths.first
        end

      from_paths.each do |from_path|
        if redirected_paths.exclude?(from_path[:from])
          lookup_paths << from_path[:from]
          redirected_paths.add(from_path[:from])
        end
      end

      lookup_paths.shift
    end

    redirected_paths.to_a
  end
end
