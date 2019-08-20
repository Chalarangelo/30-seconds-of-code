import { Path, LocationState, LocationKey, Location, LocationDescriptor } from './index';

export function locationsAreEqual(lv: LocationDescriptor, rv: LocationDescriptor): boolean;
export function createLocation(path: LocationDescriptor, state?: LocationState, key?: LocationKey, currentLocation?: Location): Location;
