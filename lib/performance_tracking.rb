require 'csv'

class PerformanceTracking
  @@data = []

  KEY_PROPERTY = 'Top pages'.freeze
  EXCLUDED_PROPERTIES = [KEY_PROPERTY, 'CTR', 'Position'].freeze
  DEFAULT_PAGE_DATA = { clicks: 0, impressions: 0 }.freeze

  def self.data
    return @@data if @@data.any?

    @@data =
      CSV.read(Orbit::settings[:page_performance_data_path], headers: true).
      map do |row|
        [
          row[KEY_PROPERTY].gsub(Orbit::settings[:website][:url], ''),
          row.
            to_h.
            except(*EXCLUDED_PROPERTIES).
            transform_values(&:to_i).
            transform_keys { |key| key.downcase.to_sym }
        ]
      end.to_h
  end

  def self.for(*slugs, include_redirects: false)
    if slugs.one?
      slug = slugs.first

      return DEFAULT_PAGE_DATA.dup unless data.key?(slug)
      return data[slug].dup unless include_redirects

      slugs = Redirects.for(slug)
      self.for(*slugs)
    else
      slugs.each_with_object(DEFAULT_PAGE_DATA.dup) do |slug, acc|
        next unless data.key?(slug)

        page_data = data[slug]

        acc[:clicks] += page_data[:clicks]
        acc[:impressions] += page_data[:impressions]
      end
    end
  end
end
