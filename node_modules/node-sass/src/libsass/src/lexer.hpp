#ifndef SASS_LEXER_H
#define SASS_LEXER_H

#include <cstring>

namespace Sass {
  namespace Prelexer {

    //####################################
    // BASIC CHARACTER MATCHERS
    //####################################

    // Match standard control chars
    const char* kwd_at(const char* src);
    const char* kwd_dot(const char* src);
    const char* kwd_comma(const char* src);
    const char* kwd_colon(const char* src);
    const char* kwd_star(const char* src);
    const char* kwd_plus(const char* src);
    const char* kwd_minus(const char* src);
    const char* kwd_slash(const char* src);

    //####################################
    // BASIC CLASS MATCHERS
    //####################################

    // These are locale independant
    bool is_space(const char& src);
    bool is_alpha(const char& src);
    bool is_punct(const char& src);
    bool is_digit(const char& src);
    bool is_number(const char& src);
    bool is_alnum(const char& src);
    bool is_xdigit(const char& src);
    bool is_unicode(const char& src);
    bool is_nonascii(const char& src);
    bool is_character(const char& src);
    bool is_uri_character(const char& src);
    bool escapable_character(const char& src);

    // Match a single ctype predicate.
    const char* space(const char* src);
    const char* alpha(const char* src);
    const char* digit(const char* src);
    const char* xdigit(const char* src);
    const char* alnum(const char* src);
    const char* punct(const char* src);
    const char* hyphen(const char* src);
    const char* unicode(const char* src);
    const char* nonascii(const char* src);
    const char* character(const char* src);
    const char* uri_character(const char* src);
    const char* escapable_character(const char* src);

    // Match multiple ctype characters.
    const char* spaces(const char* src);
    const char* digits(const char* src);
    const char* hyphens(const char* src);

    // Whitespace handling.
    const char* no_spaces(const char* src);
    const char* optional_spaces(const char* src);

    // Match any single character (/./).
    const char* any_char(const char* src);

    // Assert word boundary (/\b/)
    // Is a zero-width positive lookaheads
    const char* word_boundary(const char* src);

    // Match a single linebreak (/(?:\n|\r\n?)/).
    const char* re_linebreak(const char* src);

    // Assert string boundaries (/\Z|\z|\A/)
    // There are zero-width positive lookaheads
    const char* end_of_line(const char* src);

    // Assert end_of_file boundary (/\z/)
    const char* end_of_file(const char* src);
    // const char* start_of_string(const char* src);

    // Type definition for prelexer functions
    typedef const char* (*prelexer)(const char*);

    //####################################
    // BASIC "REGEX" CONSTRUCTORS
    //####################################

    // Match a single character literal.
    // Regex equivalent: /(?:x)/
    template <char chr>
    const char* exactly(const char* src) {
      return *src == chr ? src + 1 : 0;
    }

    // Match the full string literal.
    // Regex equivalent: /(?:literal)/
    template <const char* str>
    const char* exactly(const char* src) {
      if (str == NULL) return 0;
      const char* pre = str;
      if (src == NULL) return 0;
      // there is a small chance that the search string
      // is longer than the rest of the string to look at
      while (*pre && *src == *pre) {
        ++src, ++pre;
      }
      // did the matcher finish?
      return *pre == 0 ? src : 0;
    }


    // Match a single character literal.
    // Regex equivalent: /(?:x)/i
    // only define lower case alpha chars
    template <char chr>
    const char* insensitive(const char* src) {
      return *src == chr || *src+32 == chr ? src + 1 : 0;
    }

    // Match the full string literal.
    // Regex equivalent: /(?:literal)/i
    // only define lower case alpha chars
    template <const char* str>
    const char* insensitive(const char* src) {
      if (str == NULL) return 0;
      const char* pre = str;
      if (src == NULL) return 0;
      // there is a small chance that the search string
      // is longer than the rest of the string to look at
      while (*pre && (*src == *pre || *src+32 == *pre)) {
        ++src, ++pre;
      }
      // did the matcher finish?
      return *pre == 0 ? src : 0;
    }

    // Match for members of char class.
    // Regex equivalent: /[axy]/
    template <const char* char_class>
    const char* class_char(const char* src) {
      const char* cc = char_class;
      while (*cc && *src != *cc) ++cc;
      return *cc ? src + 1 : 0;
    }

    // Match for members of char class.
    // Regex equivalent: /[axy]+/
    template <const char* char_class>
    const char* class_chars(const char* src) {
      const char* p = src;
      while (class_char<char_class>(p)) ++p;
      return p == src ? 0 : p;
    }

    // Match for members of char class.
    // Regex equivalent: /[^axy]/
    template <const char* neg_char_class>
    const char* neg_class_char(const char* src) {
      if (*src == 0) return 0;
      const char* cc = neg_char_class;
      while (*cc && *src != *cc) ++cc;
      return *cc ? 0 : src + 1;
    }

    // Match for members of char class.
    // Regex equivalent: /[^axy]+/
    template <const char* neg_char_class>
    const char* neg_class_chars(const char* src) {
      const char* p = src;
      while (neg_class_char<neg_char_class>(p)) ++p;
      return p == src ? 0 : p;
    }

    // Match all except the supplied one.
    // Regex equivalent: /[^x]/
    template <const char chr>
    const char* any_char_but(const char* src) {
      return (*src && *src != chr) ? src + 1 : 0;
    }

    // Succeeds if the matcher fails.
    // Aka. zero-width negative lookahead.
    // Regex equivalent: /(?!literal)/
    template <prelexer mx>
    const char* negate(const char* src) {
      return mx(src) ? 0 : src;
    }

    // Succeeds if the matcher succeeds.
    // Aka. zero-width positive lookahead.
    // Regex equivalent: /(?=literal)/
    // just hangs around until we need it
    template <prelexer mx>
    const char* lookahead(const char* src) {
      return mx(src) ? src : 0;
    }

    // Tries supplied matchers in order.
    // Succeeds if one of them succeeds.
    // Regex equivalent: /(?:FOO|BAR)/
    template <const prelexer mx>
    const char* alternatives(const char* src) {
      const char* rslt;
      if ((rslt = mx(src))) return rslt;
      return 0;
    }
    template <const prelexer mx1, const prelexer mx2, const prelexer... mxs>
    const char* alternatives(const char* src) {
      const char* rslt;
      if ((rslt = mx1(src))) return rslt;
      return alternatives<mx2, mxs...>(src);
    }

    // Tries supplied matchers in order.
    // Succeeds if all of them succeeds.
    // Regex equivalent: /(?:FOO)(?:BAR)/
    template <const prelexer mx1>
    const char* sequence(const char* src) {
      const char* rslt = src;
      if (!(rslt = mx1(rslt))) return 0;
      return rslt;
    }
    template <const prelexer mx1, const prelexer mx2, const prelexer... mxs>
    const char* sequence(const char* src) {
      const char* rslt = src;
      if (!(rslt = mx1(rslt))) return 0;
      return sequence<mx2, mxs...>(rslt);
    }


    // Match a pattern or not. Always succeeds.
    // Regex equivalent: /(?:literal)?/
    template <prelexer mx>
    const char* optional(const char* src) {
      const char* p = mx(src);
      return p ? p : src;
    }

    // Match zero or more of the patterns.
    // Regex equivalent: /(?:literal)*/
    template <prelexer mx>
    const char* zero_plus(const char* src) {
      const char* p = mx(src);
      while (p) src = p, p = mx(src);
      return src;
    }

    // Match one or more of the patterns.
    // Regex equivalent: /(?:literal)+/
    template <prelexer mx>
    const char* one_plus(const char* src) {
      const char* p = mx(src);
      if (!p) return 0;
      while (p) src = p, p = mx(src);
      return src;
    }

    // Match mx non-greedy until delimiter.
    // Other prelexers are greedy by default.
    // Regex equivalent: /(?:$mx)*?(?=$delim)\b/
    template <prelexer mx, prelexer delim>
    const char* non_greedy(const char* src) {
      while (!delim(src)) {
        const char* p = mx(src);
        if (p == src) return 0;
        if (p == 0) return 0;
        src = p;
      }
      return src;
    }

    //####################################
    // ADVANCED "REGEX" CONSTRUCTORS
    //####################################

    // Match with word boundary rule.
    // Regex equivalent: /(?:$mx)\b/i
    template <const char* str>
    const char* keyword(const char* src) {
      return sequence <
               insensitive < str >,
               word_boundary
             >(src);
    }

    // Match with word boundary rule.
    // Regex equivalent: /(?:$mx)\b/
    template <const char* str>
    const char* word(const char* src) {
      return sequence <
               exactly < str >,
               word_boundary
             >(src);
    }

    template <char chr>
    const char* loosely(const char* src) {
      return sequence <
               optional_spaces,
               exactly < chr >
             >(src);
    }
    template <const char* str>
    const char* loosely(const char* src) {
      return sequence <
               optional_spaces,
               exactly < str >
             >(src);
    }

  }
}

#endif
