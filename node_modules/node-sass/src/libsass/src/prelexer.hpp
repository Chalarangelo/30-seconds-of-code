#ifndef SASS_PRELEXER_H
#define SASS_PRELEXER_H

#include <cstring>
#include "lexer.hpp"

namespace Sass {
  // using namespace Lexer;
  namespace Prelexer {

    //####################################
    // KEYWORD "REGEX" MATCHERS
    //####################################

    // Match Sass boolean keywords.
    const char* kwd_true(const char* src);
    const char* kwd_false(const char* src);
    const char* kwd_only(const char* src);
    const char* kwd_and(const char* src);
    const char* kwd_or(const char* src);
    const char* kwd_not(const char* src);
    const char* kwd_eq(const char* src);
    const char* kwd_neq(const char* src);
    const char* kwd_gt(const char* src);
    const char* kwd_gte(const char* src);
    const char* kwd_lt(const char* src);
    const char* kwd_lte(const char* src);

    // Match standard control chars
    const char* kwd_at(const char* src);
    const char* kwd_dot(const char* src);
    const char* kwd_comma(const char* src);
    const char* kwd_colon(const char* src);
    const char* kwd_slash(const char* src);
    const char* kwd_star(const char* src);
    const char* kwd_plus(const char* src);
    const char* kwd_minus(const char* src);

    //####################################
    // SPECIAL "REGEX" CONSTRUCTS
    //####################################

    // Match a sequence of characters delimited by the supplied chars.
    template <char beg, char end, bool esc>
    const char* delimited_by(const char* src) {
      src = exactly<beg>(src);
      if (!src) return 0;
      const char* stop;
      while (true) {
        if (!*src) return 0;
        stop = exactly<end>(src);
        if (stop && (!esc || *(src - 1) != '\\')) return stop;
        src = stop ? stop : src + 1;
      }
    }

    // skip to delimiter (mx) inside given range
    // this will savely skip over all quoted strings
    // recursive skip stuff delimited by start/stop
    // first start/opener must be consumed already!
    template<prelexer start, prelexer stop>
    const char* skip_over_scopes(const char* src, const char* end) {

      size_t level = 0;
      bool in_squote = false;
      bool in_dquote = false;
      // bool in_braces = false;

      while (*src) {

        // check for abort condition
        if (end && src >= end) break;

        // has escaped sequence?
        if (*src == '\\') {
          ++ src; // skip this (and next)
        }
        else if (*src == '"') {
          in_dquote = ! in_dquote;
        }
        else if (*src == '\'') {
          in_squote = ! in_squote;
        }
        else if (in_dquote || in_squote) {
          // take everything literally
        }

        // find another opener inside?
        else if (const char* pos = start(src)) {
          ++ level; // increase counter
          src = pos - 1; // advance position
        }

        // look for the closer (maybe final, maybe not)
        else if (const char* final = stop(src)) {
          // only close one level?
          if (level > 0) -- level;
          // return position at end of stop
          // delimiter may be multiple chars
          else return final;
          // advance position
          src = final - 1;
        }

        // next
        ++ src;
      }

      return 0;
    }

    // skip to a skip delimited by parentheses
    // uses smart `skip_over_scopes` internally
    const char* parenthese_scope(const char* src);

    // skip to delimiter (mx) inside given range
    // this will savely skip over all quoted strings
    // recursive skip stuff delimited by start/stop
    // first start/opener must be consumed already!
    template<prelexer start, prelexer stop>
    const char* skip_over_scopes(const char* src) {
      return skip_over_scopes<start, stop>(src, 0);
    }

    // Match a sequence of characters delimited by the supplied chars.
    template <prelexer start, prelexer stop>
    const char* recursive_scopes(const char* src) {
      // parse opener
      src = start(src);
      // abort if not found
      if (!src) return 0;
      // parse the rest until final closer
      return skip_over_scopes<start, stop>(src);
    }

    // Match a sequence of characters delimited by the supplied strings.
    template <const char* beg, const char* end, bool esc>
    const char* delimited_by(const char* src) {
      src = exactly<beg>(src);
      if (!src) return 0;
      const char* stop;
      while (true) {
        if (!*src) return 0;
        stop = exactly<end>(src);
        if (stop && (!esc || *(src - 1) != '\\')) return stop;
        src = stop ? stop : src + 1;
      }
    }

    // Tries to match a certain number of times (between the supplied interval).
    template<prelexer mx, size_t lo, size_t hi>
    const char* between(const char* src) {
      for (size_t i = 0; i < lo; ++i) {
        src = mx(src);
        if (!src) return 0;
      }
      for (size_t i = lo; i <= hi; ++i) {
        const char* new_src = mx(src);
        if (!new_src) return src;
        src = new_src;
      }
      return src;
    }

    // equivalent of STRING_REGULAR_EXPRESSIONS
    const char* re_string_double_open(const char* src);
    const char* re_string_double_close(const char* src);
    const char* re_string_single_open(const char* src);
    const char* re_string_single_close(const char* src);
    const char* re_string_uri_open(const char* src);
    const char* re_string_uri_close(const char* src);

    // Match a line comment.
    const char* line_comment(const char* src);

    // Match a block comment.
    const char* block_comment(const char* src);
    // Match either.
    const char* comment(const char* src);
    // Match double- and single-quoted strings.
    const char* double_quoted_string(const char* src);
    const char* single_quoted_string(const char* src);
    const char* quoted_string(const char* src);
    // Match interpolants.
    const char* interpolant(const char* src);
    // Match number prefix ([\+\-]+)
    const char* number_prefix(const char* src);

    // Match zero plus white-space or line_comments
    const char* optional_css_whitespace(const char* src);
    const char* css_whitespace(const char* src);
    // Match optional_css_whitepace plus block_comments
    const char* optional_css_comments(const char* src);
    const char* css_comments(const char* src);

    // Match one backslash escaped char
    const char* escape_seq(const char* src);

    // Match CSS css variables.
    const char* custom_property_name(const char* src);
    // Match a CSS identifier.
    const char* identifier(const char* src);
    const char* identifier_alpha(const char* src);
    const char* identifier_alnum(const char* src);
    const char* strict_identifier(const char* src);
    const char* strict_identifier_alpha(const char* src);
    const char* strict_identifier_alnum(const char* src);
    // Match a CSS unit identifier.
    const char* one_unit(const char* src);
    const char* multiple_units(const char* src);
    const char* unit_identifier(const char* src);
    // const char* strict_identifier_alnums(const char* src);
    // Match reference selector.
    const char* re_reference_combinator(const char* src);
    const char* static_reference_combinator(const char* src);
    const char* schema_reference_combinator(const char* src);

    // Match interpolant schemas
    const char* identifier_schema(const char* src);
    const char* value_schema(const char* src);
    const char* sass_value(const char* src);
    // const char* filename(const char* src);
    // const char* filename_schema(const char* src);
    // const char* url_schema(const char* src);
    // const char* url_value(const char* src);
    const char* vendor_prefix(const char* src);

    const char* re_special_directive(const char* src);
    const char* re_prefixed_directive(const char* src);
    const char* re_almost_any_value_token(const char* src);

    // Match CSS '@' keywords.
    const char* at_keyword(const char* src);
    const char* kwd_import(const char* src);
    const char* kwd_at_root(const char* src);
    const char* kwd_with_directive(const char* src);
    const char* kwd_without_directive(const char* src);
    const char* kwd_media(const char* src);
    const char* kwd_supports_directive(const char* src);
    // const char* keyframes(const char* src);
    // const char* keyf(const char* src);
    const char* kwd_mixin(const char* src);
    const char* kwd_function(const char* src);
    const char* kwd_return_directive(const char* src);
    const char* kwd_include_directive(const char* src);
    const char* kwd_content_directive(const char* src);
    const char* kwd_charset_directive(const char* src);
    const char* kwd_extend(const char* src);

    const char* unicode_seq(const char* src);

    const char* kwd_if_directive(const char* src);
    const char* kwd_else_directive(const char* src);
    const char* elseif_directive(const char* src);

    const char* kwd_for_directive(const char* src);
    const char* kwd_from(const char* src);
    const char* kwd_to(const char* src);
    const char* kwd_through(const char* src);

    const char* kwd_each_directive(const char* src);
    const char* kwd_in(const char* src);

    const char* kwd_while_directive(const char* src);

    const char* re_nothing(const char* src);

    const char* re_special_fun(const char* src);

    const char* kwd_warn(const char* src);
    const char* kwd_err(const char* src);
    const char* kwd_dbg(const char* src);

    const char* kwd_null(const char* src);

    const char* re_selector_list(const char* src);
    const char* re_type_selector(const char* src);
    const char* re_static_expression(const char* src);

    // identifier that can start with hyphens
    const char* css_identifier(const char* src);
    const char* css_ip_identifier(const char* src);

    // Match CSS type selectors
    const char* namespace_schema(const char* src);
    const char* namespace_prefix(const char* src);
    const char* type_selector(const char* src);
    const char* hyphens_and_identifier(const char* src);
    const char* hyphens_and_name(const char* src);
    const char* universal(const char* src);
    // Match CSS id names.
    const char* id_name(const char* src);
    // Match CSS class names.
    const char* class_name(const char* src);
    // Attribute name in an attribute selector
    const char* attribute_name(const char* src);
    // Match placeholder selectors.
    const char* placeholder(const char* src);
    // Match CSS numeric constants.
    const char* op(const char* src);
    const char* sign(const char* src);
    const char* unsigned_number(const char* src);
    const char* number(const char* src);
    const char* coefficient(const char* src);
    const char* binomial(const char* src);
    const char* percentage(const char* src);
    const char* ampersand(const char* src);
    const char* dimension(const char* src);
    const char* hex(const char* src);
    const char* hexa(const char* src);
    const char* hex0(const char* src);
    // const char* rgb_prefix(const char* src);
    // Match CSS uri specifiers.
    const char* uri_prefix(const char* src);
    // Match CSS "!important" keyword.
    const char* kwd_important(const char* src);
    // Match CSS "!optional" keyword.
    const char* kwd_optional(const char* src);
    // Match Sass "!default" keyword.
    const char* default_flag(const char* src);
    const char* global_flag(const char* src);
    // Match CSS pseudo-class/element prefixes
    const char* pseudo_prefix(const char* src);
    // Match CSS function call openers.
    const char* re_functional(const char* src);
    const char* re_pseudo_selector(const char* src);
    const char* functional_schema(const char* src);
    const char* pseudo_not(const char* src);
    // Match CSS 'odd' and 'even' keywords for functional pseudo-classes.
    const char* even(const char* src);
    const char* odd(const char* src);
    // Match CSS attribute-matching operators.
    const char* exact_match(const char* src);
    const char* class_match(const char* src);
    const char* dash_match(const char* src);
    const char* prefix_match(const char* src);
    const char* suffix_match(const char* src);
    const char* substring_match(const char* src);
    // Match CSS combinators.
    // const char* adjacent_to(const char* src);
    // const char* precedes(const char* src);
    // const char* parent_of(const char* src);
    // const char* ancestor_of(const char* src);

    // Match SCSS variable names.
    const char* variable(const char* src);
    const char* calc_fn_call(const char* src);

    // IE stuff
    const char* ie_progid(const char* src);
    const char* ie_expression(const char* src);
    const char* ie_property(const char* src);
    const char* ie_keyword_arg(const char* src);
    const char* ie_keyword_arg_value(const char* src);
    const char* ie_keyword_arg_property(const char* src);

    // characters that terminate parsing of a list
    const char* list_terminator(const char* src);
    const char* space_list_terminator(const char* src);

    // match url()
    const char* H(const char* src);
    const char* W(const char* src);
    // `UNICODE` makes VS sad
    const char* UUNICODE(const char* src);
    const char* NONASCII(const char* src);
    const char* ESCAPE(const char* src);
    const char* real_uri(const char* src);
    const char* real_uri_suffix(const char* src);
    // const char* real_uri_prefix(const char* src);
    const char* real_uri_value(const char* src);

    // Path matching functions.
    // const char* folder(const char* src);
    // const char* folders(const char* src);


    const char* static_string(const char* src);
    const char* static_component(const char* src);
    const char* static_property(const char* src);
    const char* static_value(const char* src);

    const char* css_variable_value(const char* src);
    const char* css_variable_top_level_value(const char* src);

    // Utility functions for finding and counting characters in a string.
    template<char c>
    const char* find_first(const char* src) {
      while (*src && *src != c) ++src;
      return *src ? src : 0;
    }
    template<prelexer mx>
    const char* find_first(const char* src) {
      while (*src && !mx(src)) ++src;
      return *src ? src : 0;
    }
    template<prelexer mx>
    const char* find_first_in_interval(const char* beg, const char* end) {
      bool esc = false;
      while ((beg < end) && *beg) {
        if (esc) esc = false;
        else if (*beg == '\\') esc = true;
        else if (mx(beg)) return beg;
        ++beg;
      }
      return 0;
    }
    template<prelexer mx, prelexer skip>
    const char* find_first_in_interval(const char* beg, const char* end) {
      bool esc = false;
      while ((beg < end) && *beg) {
        if (esc) esc = false;
        else if (*beg == '\\') esc = true;
        else if (const char* pos = skip(beg)) beg = pos;
        else if (mx(beg)) return beg;
        ++beg;
      }
      return 0;
    }
    template <prelexer mx>
    unsigned int count_interval(const char* beg, const char* end) {
      unsigned int counter = 0;
      bool esc = false;
      while (beg < end && *beg) {
        const char* p;
        if (esc) {
          esc = false;
          ++beg;
        } else if (*beg == '\\') {
          esc = true;
          ++beg;
        } else if ((p = mx(beg))) {
          ++counter;
          beg = p;
        }
        else {
          ++beg;
        }
      }
      return counter;
    }

    template <size_t size, prelexer mx, prelexer pad>
    const char* padded_token(const char* src)
    {
      size_t got = 0;
      const char* pos = src;
      while (got < size) {
        if (!mx(pos)) break;
        ++ pos; ++ got;
      }
      while (got < size) {
        if (!pad(pos)) break;
        ++ pos; ++ got;
      }
      return got ? pos : 0;
    }

    template <size_t min, size_t max, prelexer mx>
    const char* minmax_range(const char* src)
    {
      size_t got = 0;
      const char* pos = src;
      while (got < max) {
        if (!mx(pos)) break;
        ++ pos; ++ got;
      }
      if (got < min) return 0;
      if (got > max) return 0;
      return pos;
    }

    template <char min, char max>
    const char* char_range(const char* src)
    {
      if (*src < min) return 0;
      if (*src > max) return 0;
      return src + 1;
    }

  }
}

#endif
