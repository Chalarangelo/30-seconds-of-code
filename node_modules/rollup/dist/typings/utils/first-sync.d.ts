export default function firstSync<T>(candidates: ((...args: any[]) => T | void)[]): (...args: any[]) => T | void;
