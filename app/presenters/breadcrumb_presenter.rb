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
    @recommended_collection ||= all_collections.reject do |collection|
      collections_for_breadcrumbs.include?(collection)
    end.max_by(&:ranking)
  end

  private

  def all_collections
    @all_collections ||= collections.to_a - [Collection.main, Collection.collections]
  end

  def ordered_collections
    return @ordered_collections if defined?(@ordered_collections)

    primary_collection = all_collections.find(&:is_primary?)
    all_secondary_collections = all_collections.select(&:is_secondary?)

    main_secondary_collection =
      if all_secondary_collections.present?
        all_secondary_collections.find do |collection|
          collection.matches_tag(primary_tag)
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
        name: collection.mini_title
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
