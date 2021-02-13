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
   *   - `featured` - > 0 if the content is listed, -1 if it's not.
   *   - `slug` - Base url for the content pages.
   * @throws Will throw an error if any of the necessary keys is not present.
   */
  constructor({
    name,
    slug,
    snippetIds,
    featured,
    description,
    iconName = null,
    ...rest
  }) {
    if (!name || !slug || !snippetIds || !snippetIds.length) {
      throw new ArgsError(
        "Missing required keys. One or more of the following keys were not specified: 'name', 'slug', 'featured', 'snippetIds'"
      );
    }

    this.name = name;
    this.description = description;
    this.slug = slug;
    this.featured = Boolean(featured);
    this.iconName = iconName;
    this.snippetIds = snippetIds;
    Object.keys(rest).forEach(key => {
      this[key] = rest[key];
    });

    CollectionConfig.instances.add(this.id, this);

    return this;
  }

  static instances = new InstanceCache();

  get id() {
    return `${this.slug}`;
  }

  get icon() {
    return this.iconName ? this.iconName : null;
  }
}
