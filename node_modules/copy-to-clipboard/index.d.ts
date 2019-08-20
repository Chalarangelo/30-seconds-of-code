// Type definitions for copy-to-clipboard 3.0
// Project: https://github.com/sudodoki/copy-to-clipboard
// Definitions by: Denis Carriere <https://github.com/DenisCarriere>, MartynasZilinskas <https://github.com/MartynasZilinskas>

interface Options {
  debug?: boolean;
  message?: string;
  format?: string; // MIME type
}

declare function copy(text: string, options?: Options): boolean;
declare namespace copy { }
export = copy;
