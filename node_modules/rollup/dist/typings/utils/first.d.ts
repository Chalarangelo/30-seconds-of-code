export default function first<T>(candidates: ((...args: any[]) => Promise<T | void> | T | void)[]): (...args: any[]) => Promise<T | void>;
