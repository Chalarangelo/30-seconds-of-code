export class ArgsError extends Error {
  /**
   * Creates an error with the given message.
   * Appropriate for cases where the arguments are invalid, insufficient etc.
   * @param {string} message An error message.
   */
  constructor(message) {
    super(message);
    this.name = 'ArgsError';
  }
}
