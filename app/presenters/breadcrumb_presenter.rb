class BreadcrumbPresenter
  attr_reader :object, :options

  delegate :collections, :primary_tag, :has_collection?, to: :object

  HOME_BREADCRUMB = {
    url: '/',
    name: 'Home'
  }.freeze

  def initialize(object, options: {})
    @object = object
    @options = options
  end

  def breadcrumbs
    return @breadcrumbs if defined?(@breadcrumbs)

    @breadcrumbs = []
    @breadcrumbs << HOME_BREADCRUMB
    @breadcrumbs += collection_breadcrumbs
    @breadcrumbs << snippet_crumb
    @breadcrumbs.compact!
    @breadcrumbs
  end

  def recommended_collection
    collections.
      where.not(id: collections_for_breadcrumbs.pluck(:id)).
      ranked.
      first
  end

  private

  def ordered_collections
    return @ordered_collections if defined?(@ordered_collections)

    primary_collection = collections.primary.first
    all_secondary_collections = collections.secondary

    main_secondary_collection =
      if all_secondary_collections.present?
        all_secondary_collections.find do |c|
          c.matches_tag(primary_tag)
        end
      end

    secondary_collections =
      all_secondary_collections - [main_secondary_collection]

    other_collections = collections - [
      Collection.main,
      primary_collection,
      *all_secondary_collections
    ]

    @ordered_collections = [
      primary_collection,
      main_secondary_collection,
      *secondary_collections,
      *other_collections
    ].compact
  end

  # TODO: There's some fiddly logic with this here, second pass please!
  def collections_for_breadcrumbs
    return @collections_for_breadcrumbs if defined?(@collections_for_breadcrumbs)
    @collections_for_breadcrumbs = []

    return @collections_for_breadcrumbs unless has_collection?

    if ordered_collections.first.is_primary?
      @collections_for_breadcrumbs << ordered_collections.first
    end

    if ordered_collections.second.present?
      @collections_for_breadcrumbs << ordered_collections.second
    end

    @collections_for_breadcrumbs
  end

  def collection_breadcrumbs
    @collection_breadcrumbs ||= collections_for_breadcrumbs.map do |collection|
      {
        url: collection.first_page_slug,
        name: collection.mini_name
      }
    end
  end

  def snippet_crumb
    {
      url: object.slug,
      name: object.short_title
    }
  end
end
