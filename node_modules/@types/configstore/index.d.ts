// Type definitions for configstore 2.1
// Project: https://github.com/yeoman/configstore
// Definitions by: ArcticLight <https://github.com/ArcticLight>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export = Configstore;

declare class Configstore {
    constructor(packageName: string, defaults?: any, options?: Configstore.ConfigstoreOptions);

    /**
     * Get the path to the config file. Can be used to show the user
     * where it is, or better, open it for them.
     */
    path: string;

    /**
     * Get all items as an object or replace the current config with an object.
     */
    all: any;

    /**
     * Get the item count
     */
    size: number;

    /**
     * Get an item
     * @param key The string key to get
     * @return The contents of the config from key $key
     */
    get(key: string): any;

    /**
     * Set an item
     * @param key The string key
     * @param val The value to set
     */
    set(key: string, val: any): void;

    /**
     * Set all key/value pairs declared in $values
     * @param values The values object.
     */
    set(values: any): void;

    /**
     * Determines if a key is present in the config
     * @param key The string key to test for
     * @return True if the key is present
     */
    has(key: string): boolean;

    /**
     * Delete an item.
     * @param key The key to delete
     */
    delete(key: string): void;

    /**
     * Clear the config.
     * Equivalent to <code>Configstore.all = {};</code>
     */
    clear(): void;
  }

declare namespace Configstore {
    interface ConfigstoreOptions {
        globalConfigPath?: boolean;
    }
}
