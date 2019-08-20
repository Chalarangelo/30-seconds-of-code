#include "sass.hpp"
#include <cctype>
#include <iostream>
#include <iomanip>
#include "lexer.hpp"
#include "constants.hpp"


namespace Sass {
  using namespace Constants;

  namespace Prelexer {

    //####################################
    // BASIC CHARACTER MATCHERS
    //####################################

    // Match standard control chars
    const char* kwd_at(const char* src) { return exactly<'@'>(src); }
    const char* kwd_dot(const char* src) { return exactly<'.'>(src); }
    const char* kwd_comma(const char* src) { return exactly<','>(src); };
    const char* kwd_colon(const char* src) { return exactly<':'>(src); };
    const char* kwd_star(const char* src) { return exactly<'*'>(src); };
    const char* kwd_plus(const char* src) { return exactly<'+'>(src); };
    const char* kwd_minus(const char* src) { return exactly<'-'>(src); };
    const char* kwd_slash(const char* src) { return exactly<'/'>(src); };

    //####################################
    // implement some function that do exist in the standard
    // but those are locale aware which brought some trouble
    // this even seems to improve performance by quite a bit
    //####################################

    bool is_alpha(const char& chr)
    {
      return unsigned(chr - 'A') <= 'Z' - 'A' ||
             unsigned(chr - 'a') <= 'z' - 'a';
    }

    bool is_space(const char& chr)
    {
      // adapted the technique from is_alpha
      return chr == ' ' || unsigned(chr - '\t') <= '\r' - '\t';
    }

    bool is_digit(const char& chr)
    {
      // adapted the technique from is_alpha
      return unsigned(chr - '0') <= '9' - '0';
    }

    bool is_number(const char& chr)
    {
      // adapted the technique from is_alpha
      return is_digit(chr) || chr == '-' || chr == '+';
    }

    bool is_xdigit(const char& chr)
    {
      // adapted the technique from is_alpha
      return unsigned(chr - '0') <= '9' - '0' ||
             unsigned(chr - 'a') <= 'f' - 'a' ||
             unsigned(chr - 'A') <= 'F' - 'A';
    }

    bool is_punct(const char& chr)
    {
      // locale independent
      return chr == '.';
    }

    bool is_alnum(const char& chr)
    {
      return is_alpha(chr) || is_digit(chr);
    }

    // check if char is outside ascii range
    bool is_unicode(const char& chr)
    {
      // check for unicode range
      return unsigned(chr) > 127;
    }

    // check if char is outside ascii range
    // but with specific ranges (copied from Ruby Sass)
    bool is_nonascii(const char& chr)
    {
      unsigned int cmp = unsigned(chr);
      return (
        (cmp >= 128 && cmp <= 15572911) ||
        (cmp >= 15630464 && cmp <= 15712189) ||
        (cmp >= 4036001920)
      );
    }

    // check if char is within a reduced ascii range
    // valid in a uri (copied from Ruby Sass)
    bool is_uri_character(const char& chr)
    {
      unsigned int cmp = unsigned(chr);
      return (cmp > 41 && cmp < 127) ||
             cmp == ':' || cmp == '/';
    }

    // check if char is within a reduced ascii range
    // valid for escaping (copied from Ruby Sass)
    bool is_escapable_character(const char& chr)
    {
      unsigned int cmp = unsigned(chr);
      return cmp > 31 && cmp < 127;
    }

    // Match word character (look ahead)
    bool is_character(const char& chr)
    {
      // valid alpha, numeric or unicode char (plus hyphen)
      return is_alnum(chr) || is_unicode(chr) || chr == '-';
    }

    //####################################
    // BASIC CLASS MATCHERS
    //####################################

    // create matchers that advance the position
    const char* space(const char* src) { return is_space(*src) ? src + 1 : 0; }
    const char* alpha(const char* src) { return is_alpha(*src) ? src + 1 : 0; }
    const char* unicode(const char* src) { return is_unicode(*src) ? src + 1 : 0; }
    const char* nonascii(const char* src) { return is_nonascii(*src) ? src + 1 : 0; }
    const char* digit(const char* src) { return is_digit(*src) ? src + 1 : 0; }
    const char* xdigit(const char* src) { return is_xdigit(*src) ? src + 1 : 0; }
    const char* alnum(const char* src) { return is_alnum(*src) ? src + 1 : 0; }
    const char* punct(const char* src) { return is_punct(*src) ? src + 1 : 0; }
    const char* hyphen(const char* src) { return *src && *src == '-' ? src + 1 : 0; }
    const char* character(const char* src) { return is_character(*src) ? src + 1 : 0; }
    const char* uri_character(const char* src) { return is_uri_character(*src) ? src + 1 : 0; }
    const char* escapable_character(const char* src) { return is_escapable_character(*src) ? src + 1 : 0; }

    // Match multiple ctype characters.
    const char* spaces(const char* src) { return one_plus<space>(src); }
    const char* digits(const char* src) { return one_plus<digit>(src); }
    const char* hyphens(const char* src) { return one_plus<hyphen>(src); }

    // Whitespace handling.
    const char* no_spaces(const char* src) { return negate< space >(src); }
    const char* optional_spaces(const char* src) { return zero_plus< space >(src); }

    // Match any single character.
    const char* any_char(const char* src) { return *src ? src + 1 : src; }

    // Match word boundary (zero-width lookahead).
    const char* word_boundary(const char* src) { return is_character(*src) || *src == '#' ? 0 : src; }

    // Match linefeed /(?:\n|\r\n?)/
    const char* re_linebreak(const char* src)
    {
      // end of file or unix linefeed return here
      if (*src == 0 || *src == '\n') return src + 1;
      // a carriage return may optionally be followed by a linefeed
      if (*src == '\r') return *(src + 1) == '\n' ? src + 2 : src + 1;
      // no linefeed
      return 0;
    }

    // Assert string boundaries (/\Z|\z|\A/)
    // This is a zero-width positive lookahead
    const char* end_of_line(const char* src)
    {
      // end of file or unix linefeed return here
      return *src == 0 || *src == '\n' || *src == '\r' ? src : 0;
    }

    // Assert end_of_file boundary (/\z/)
    // This is a zero-width positive lookahead
    const char* end_of_file(const char* src)
    {
      // end of file or unix linefeed return here
      return *src == 0 ? src : 0;
    }

  }
}
