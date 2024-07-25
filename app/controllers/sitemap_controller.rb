class SitemapController < ApplicationController
  HOME_PAGE_URL = "#{Orbit::settings[:website][:url]}/".freeze
  STATIC_PAGE_URLS = [
    "#{Orbit::settings[:website][:url]}/about",
    "#{Orbit::settings[:website][:url]}/faw"
  ].freeze

  def index
    @urls = urls
  end

  def generate_sitemap
    sitemap = render_to_string 'sitemap/index', layout: false, locals: { urls: urls }
    File.write('public/sitemap.xml', sitemap)
  end

  def urls
    [HOME_PAGE_URL] +
      Snippet.published.map(&:full_url) +
      Collection.all.map(&:all_page_full_urls).flatten +
      STATIC_PAGE_URLS
  end
end
