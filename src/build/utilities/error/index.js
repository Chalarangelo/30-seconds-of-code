export class GlobError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GlobError';
  }
}

export class ArgsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ArgsError';
  }
}
