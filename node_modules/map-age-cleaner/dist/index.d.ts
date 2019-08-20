interface Entry {
    [key: string]: any;
}
interface MaxAgeEntry extends Entry {
    maxAge: number;
}
/**
 * Automatically cleanup the items in the provided `map`. The property of the expiration timestamp should be named `maxAge`.
 *
 * @param map - Map instance which should be cleaned up.
 */
export default function mapAgeCleaner<K = any, V extends MaxAgeEntry = MaxAgeEntry>(map: Map<K, V>): any;
/**
 * Automatically cleanup the items in the provided `map`.
 *
 * @param map - Map instance which should be cleaned up.
 * @param property - Name of the property which olds the expiry timestamp.
 */
export default function mapAgeCleaner<K = any, V = Entry>(map: Map<K, V>, property: string): any;
export {};
