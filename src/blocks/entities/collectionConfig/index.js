import { InstanceCache } from 'blocks/utilities/instanceCache';
import { ArgsError } from 'blocks/utilities/error';

/**
 * A collection configuration (i.e. the data and metadata from a content/configs JSON file).
 */
export class CollectionConfig {
  /**
   * Create a collection configuration from the JSON data given.
   * @param {object} config - Collection configuration data. Must contain:
   *   - `name` - The name of the configuration.
   *   - `snippetIds` - Ids of the snippets that make up the collection.
   *   - `typeMatcher` - Type matcher for the snippets that make up the collection.
   *   - `featured` - > 0 if the content is listed, -1 if it's not.
   *   - `slug` - Base url for the content pages.
   * @throws Will throw an error if any of the necessary keys is not present.
   */
  constructor({
    name,
    slug,
    snippetIds,
    typeMatcher,
    featured,
    description,
    iconName = null,
    ...rest
  }) {
    if (
      !name ||
      !slug ||
      ((!snippetIds || !snippetIds.length) && !typeMatcher)
    ) {
      throw new ArgsError(
        "Missing required keys. One or more of the following keys were not specified: 'name', 'slug', 'featured', 'snippetIds', 'typeMatcher'"
      );
    }

    this.name = name;
    this.description = description;
    this.slug = slug;
    this.featured = Boolean(featured);
    this.iconName = iconName;
    this.snippetIds = snippetIds;
    this.typeMatcher = typeMatcher;
    Object.keys(rest).forEach(key => {
      this[key] = rest[key];
    });

    CollectionConfig.instances.add(this.id, this);

    return this;
  }

  static instances = new InstanceCache();

  static findCollectionIdsFromSnippet = (id, type) =>
    this.instances.findAll(cfg =>
      cfg.snippetIds ? cfg.snippetIds.includes(id) : type === cfg.typeMatcher
    );

  get id() {
    return `${this.slug}`;
  }

  get icon() {
    return this.iconName ? this.iconName : null;
  }
}
