class SublinkPresenter
  attr_reader :object, :options

  PARENT_TITLE = 'All'.freeze
  MORE_COLLECTIONS_SUBLINK = {
    title: 'More',
    url: '/collections/p/1',
    icon: 'arrow-right',
    selected: false
  }.freeze

  delegate :cid, :is_main?, :is_primary?, :has_parent?, :siblings, :children,
           :root_url, to: :object

  def initialize(object, options: {})
    @object = object
    @options = options
  end

  def sublinks
    if is_main?
      return Collection.
              primary.
              ranked.
              map{ |collection| to_sublink(collection) }.
              flatten.
              append(MORE_COLLECTIONS_SUBLINK)
    end

    return [] if !is_primary? && !has_parent?
    return [] if is_primary? && children.empty?

    links = has_parent? ? siblings : children
    links.
      map { |link| to_sublink(link, link.cid === cid) }.
      sort_by { |link| link[:title] }.
      prepend({
        title: PARENT_TITLE,
        url: "#{root_url}/p/1",
        selected: is_primary?
      })
  end

  private

  def to_sublink(collection, selected = false)
    {
      title: collection.mini_title,
      url: collection.first_page_slug,
      selected: selected
    }
  end
end
