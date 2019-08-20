export default function callIfFunction<T>(thing: T | (() => T)): T;
