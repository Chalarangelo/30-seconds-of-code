// Code shows a string is valid,
// but docs require string array or object.
type TLDList = string | string[] | { [topLevelDomain: string]: any };

type BaseOptions = {
  tldWhitelist?: TLDList;
  tldBlacklist?: TLDList;
  minDomainAtoms?: number;
  allowUnicode?: boolean;
};

type OptionsWithBool = BaseOptions & {
  errorLevel?: false;
};

type OptionsWithNumThreshold = BaseOptions & {
  errorLevel?: true | number;
};

interface Validator {
  /**
   * Check that an email address conforms to RFCs 5321, 5322, 6530 and others.
   *
   *  ```
   * import * as IsEmail from "isemail";
   *
   * IsEmail.validate("test@e.com");
   * // => true
   * ```
   */
  validate(email: string): boolean;

  /**
   * Check that an email address conforms to RFCs 5321, 5322, 6530 and others.
   *
   * ```
   * import * as IsEmail from "isemail";
   *
   * IsEmail.validate("test@iana.org", { errorLevel: false });
   * // => true
   * ```
   */
  validate(email: string, options: OptionsWithBool): boolean;

  /**
   * Check that an email address conforms to RFCs 5321, 5322, 6530 and others.
   *
   * ```
   * import * as IsEmail from "isemail";
   *
   * IsEmail.validate("test@iana.org", { errorLevel: true });
   * // => 0
   * IsEmail.validate("test @e.com", { errorLevel: 50 });
   * // => 0
   * IsEmail.validate('test @e.com', { errorLevel: true })
   * // => 49
   * ```
   */
  validate(email: string, options: OptionsWithNumThreshold): number;
}

declare const IsEmail: Validator;

export = IsEmail;
