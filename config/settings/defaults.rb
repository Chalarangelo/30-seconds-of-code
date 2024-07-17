Orbit::settings website: {
  name: '30 seconds of code',
  short_name: '30s',
  url: 'https://www.30secondsofcode.org',
  description: 'Short code snippets for all your development needs',
  seo_description: "Browse %{snippet_count} short code snippets for all your development needs on %{website_name}."
}

Orbit::settings owner: {
  name: 'Angelos Chalaris',
  url: 'https://github.com/Chalarangelo'
}

Orbit::settings repository_url: 'https://github.com/Chalarangelo/30-seconds-of-code'

Orbit::settings license_url: 'https://creativecommons.org/licenses/by/4.0/'

Orbit::settings manifest_cache_key: '30swp20231218115417'

Orbit::settings cards_per_page: 24.0
Orbit::settings collection_cards_per_page: 12.0
Orbit::settings new_snippet_cards: 6.0
Orbit::settings top_snippet_cards: 6.0
Orbit::settings top_collection_chips: 8.0

Orbit::settings home_cover: 'work-sunrise'

Orbit::settings content_import_path: './.content/content.json'
Orbit::settings redirects_import_path: 'content/redirects.yaml'
Orbit::settings redirects_export_path: 'public/_redirects'

Orbit::settings page_performance_data_path: 'imported/Pages.csv'

# This has to be the deepest nested path (snippet), so all other paths are included
Orbit::settings page_output_path: '.content/pages/[lang]/s'
Orbit::settings home_page_output_path: '.content/pages/index.json'
Orbit::settings collection_pages_output_path: '.content/pages/[lang]/[...listing].json'
Orbit::settings snippet_pages_output_path: '.content/pages/[lang]/s/[snippet].json'
