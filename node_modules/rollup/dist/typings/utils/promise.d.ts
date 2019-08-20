export declare function mapSequence<T, U>(array: T[], fn: (member: T) => Promise<U> | U): Promise<U[]>;
export declare function runSequence<T>(array: T[]): Promise<T[]>;
