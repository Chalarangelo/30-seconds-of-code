import { Path, Location, LocationDescriptorObject } from './index';

export function addLeadingSlash(path: Path): Path;
export function stripLeadingSlash(path: Path): Path;
export function hasBasename(path: Path): boolean;
export function stripBasename(path: Path, prefix: string): Path;
export function stripTrailingSlash(path: Path): Path;
export function parsePath(path: Path): Location;
export function createPath(location: LocationDescriptorObject): Path;
