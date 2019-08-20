declare module eol {
  /**
   * Normalize line endings in text for the current operating system
   * @return string with line endings normalized to \r\n or \n
   */
  export function auto(text: string): string;

  /**
   * Normalize line endings in text to CRLF (Windows, DOS)
   * @return string with line endings normalized to \r\n
   */
  export function crlf(text: string): string;

  /**
   * Normalize line endings in text to LF (Unix, OS X)
   * @return string with line endings normalized to \n
   */
  export function lf(text: string): string;

  /**
   * Normalize line endings in text to CR (Mac OS)
   * @return string with line endings normalized to \r
   */
  export function cr(text: string): string;

  /**
   * Add linebreak before text
   * @return string with linebreak added before text
   */
  export function before(text: string): string;

  /**
   * Add linebreak after text
   * @return string with linebreak added after text
   */
  export function after(text: string): string;

  /**
   * Split text by newline
   * @return array of lines
   */
  export function split(text: string): Array<string>;
}

declare module "eol" {
  export = eol;
}
