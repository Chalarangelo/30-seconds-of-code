#include "sass.hpp"
#include <cctype>
#include <iostream>
#include <iomanip>
#include "util.hpp"
#include "position.hpp"
#include "prelexer.hpp"
#include "constants.hpp"


namespace Sass {
  // using namespace Lexer;
  using namespace Constants;

  namespace Prelexer {


    /*

        def string_re(open, close)
          /#{open}((?:\\.|\#(?!\{)|[^#{close}\\#])*)(#{close}|#\{)/m
        end
      end

      # A hash of regular expressions that are used for tokenizing strings.
      #
      # The key is a `[Symbol, Boolean]` pair.
      # The symbol represents which style of quotation to use,
      # while the boolean represents whether or not the string
      # is following an interpolated segment.
      STRING_REGULAR_EXPRESSIONS = {
        :double => {
          /#{open}((?:\\.|\#(?!\{)|[^#{close}\\#])*)(#{close}|#\{)/m
          false => string_re('"', '"'),
          true => string_re('', '"')
        },
        :single => {
          false => string_re("'", "'"),
          true => string_re('', "'")
        },
        :uri => {
          false => /url\(#{W}(#{URLCHAR}*?)(#{W}\)|#\{)/,
          true => /(#{URLCHAR}*?)(#{W}\)|#\{)/
        },
        # Defined in https://developer.mozilla.org/en/CSS/@-moz-document as a
        # non-standard version of http://www.w3.org/TR/css3-conditional/
        :url_prefix => {
          false => /url-prefix\(#{W}(#{URLCHAR}*?)(#{W}\)|#\{)/,
          true => /(#{URLCHAR}*?)(#{W}\)|#\{)/
        },
        :domain => {
          false => /domain\(#{W}(#{URLCHAR}*?)(#{W}\)|#\{)/,
          true => /(#{URLCHAR}*?)(#{W}\)|#\{)/
        }
      }
    */

    /*
      /#{open}
        (
          \\.
          |
          \# (?!\{)
          |
          [^#{close}\\#]
        )*
        (#{close}|#\{)
      /m
      false => string_re('"', '"'),
      true => string_re('', '"')
    */
    extern const char string_double_negates[] = "\"\\#";
    const char* re_string_double_close(const char* src)
    {
      return sequence <
        // valid chars
        zero_plus <
          alternatives <
            // escaped char
            sequence <
              exactly <'\\'>,
              any_char
            >,
            // non interpolate hash
            sequence <
              exactly <'#'>,
              negate <
                exactly <'{'>
              >
            >,
            // other valid chars
            neg_class_char <
              string_double_negates
            >
          >
        >,
        // quoted string closer
        // or interpolate opening
        alternatives <
          exactly <'"'>,
          lookahead < exactly< hash_lbrace > >
        >
      >(src);
    }

    const char* re_string_double_open(const char* src)
    {
      return sequence <
        // quoted string opener
        exactly <'"'>,
        // valid chars
        zero_plus <
          alternatives <
            // escaped char
            sequence <
              exactly <'\\'>,
              any_char
            >,
            // non interpolate hash
            sequence <
              exactly <'#'>,
              negate <
                exactly <'{'>
              >
            >,
            // other valid chars
            neg_class_char <
              string_double_negates
            >
          >
        >,
        // quoted string closer
        // or interpolate opening
        alternatives <
          exactly <'"'>,
          lookahead < exactly< hash_lbrace > >
        >
      >(src);
    }

    extern const char string_single_negates[] = "'\\#";
    const char* re_string_single_close(const char* src)
    {
      return sequence <
        // valid chars
        zero_plus <
          alternatives <
            // escaped char
            sequence <
              exactly <'\\'>,
              any_char
            >,
            // non interpolate hash
            sequence <
              exactly <'#'>,
              negate <
                exactly <'{'>
              >
            >,
            // other valid chars
            neg_class_char <
              string_single_negates
            >
          >
        >,
        // quoted string closer
        // or interpolate opening
        alternatives <
          exactly <'\''>,
          lookahead < exactly< hash_lbrace > >
        >
      >(src);
    }

    const char* re_string_single_open(const char* src)
    {
      return sequence <
        // quoted string opener
        exactly <'\''>,
        // valid chars
        zero_plus <
          alternatives <
            // escaped char
            sequence <
              exactly <'\\'>,
              any_char
            >,
            // non interpolate hash
            sequence <
              exactly <'#'>,
              negate <
                exactly <'{'>
              >
            >,
            // other valid chars
            neg_class_char <
              string_single_negates
            >
          >
        >,
        // quoted string closer
        // or interpolate opening
        alternatives <
          exactly <'\''>,
          lookahead < exactly< hash_lbrace > >
        >
      >(src);
    }

    /*
      :uri => {
        false => /url\(#{W}(#{URLCHAR}*?)(#{W}\)|#\{)/,
        true => /(#{URLCHAR}*?)(#{W}\)|#\{)/
      },
    */
    const char* re_string_uri_close(const char* src)
    {
      return sequence <
        non_greedy<
          alternatives<
            class_char< real_uri_chars >,
            uri_character,
            NONASCII,
            ESCAPE
          >,
          alternatives<
            sequence < optional < W >, exactly <')'> >,
            lookahead < exactly< hash_lbrace > >
          >
        >,
        optional <
          sequence < optional < W >, exactly <')'> >
        >
      >(src);
    }

    const char* re_string_uri_open(const char* src)
    {
      return sequence <
        exactly <'u'>,
        exactly <'r'>,
        exactly <'l'>,
        exactly <'('>,
        W,
        alternatives<
          quoted_string,
          non_greedy<
            alternatives<
              class_char< real_uri_chars >,
              uri_character,
              NONASCII,
              ESCAPE
            >,
            alternatives<
              sequence < W, exactly <')'> >,
              exactly< hash_lbrace >
            >
          >
        >
      >(src);
    }

    // Match a line comment (/.*?(?=\n|\r\n?|\Z)/.
    const char* line_comment(const char* src)
    {
      return sequence<
               exactly <
                 slash_slash
               >,
               non_greedy<
                 any_char,
                 end_of_line
               >
             >(src);
    }

    // Match a block comment.
    const char* block_comment(const char* src)
    {
      return sequence<
               delimited_by<
                 slash_star,
                 star_slash,
                 false
               >
             >(src);
    }
    /* not use anymore - remove?
    const char* block_comment_prefix(const char* src) {
      return exactly<slash_star>(src);
    }
    // Match either comment.
    const char* comment(const char* src) {
      return line_comment(src);
    }
    */

    // Match zero plus white-space or line_comments
    const char* optional_css_whitespace(const char* src) {
      return zero_plus< alternatives<spaces, line_comment> >(src);
    }
    const char* css_whitespace(const char* src) {
      return one_plus< alternatives<spaces, line_comment> >(src);
    }
    // Match optional_css_whitepace plus block_comments
    const char* optional_css_comments(const char* src) {
      return zero_plus< alternatives<spaces, line_comment, block_comment> >(src);
    }
    const char* css_comments(const char* src) {
      return one_plus< alternatives<spaces, line_comment, block_comment> >(src);
    }

    // Match one backslash escaped char /\\./
    const char* escape_seq(const char* src)
    {
      return sequence<
        exactly<'\\'>,
        alternatives <
          minmax_range<
            1, 3, xdigit
          >,
          any_char
        >,
        optional <
          exactly <' '>
        >
      >(src);
    }

    // Match identifier start
    const char* identifier_alpha(const char* src)
    {
      return alternatives<
               unicode_seq,
               alpha,
               unicode,
               exactly<'-'>,
               exactly<'_'>,
               NONASCII,
               ESCAPE,
               escape_seq
             >(src);
    }

    // Match identifier after start
    const char* identifier_alnum(const char* src)
    {
      return alternatives<
               unicode_seq,
               alnum,
               unicode,
               exactly<'-'>,
               exactly<'_'>,
               NONASCII,
               ESCAPE,
               escape_seq
             >(src);
    }

    // Match CSS identifiers.
    const char* strict_identifier(const char* src)
    {
      return sequence<
               one_plus < strict_identifier_alpha >,
               zero_plus < strict_identifier_alnum >
               // word_boundary not needed
             >(src);
    }

    // Match CSS identifiers.
    const char* identifier(const char* src)
    {
      return sequence<
               zero_plus< exactly<'-'> >,
               one_plus < identifier_alpha >,
               zero_plus < identifier_alnum >
               // word_boundary not needed
             >(src);
    }

    const char* strict_identifier_alpha(const char* src)
    {
      return alternatives <
               alpha,
               unicode,
               escape_seq,
               exactly<'_'>
             >(src);
    }

    const char* strict_identifier_alnum(const char* src)
    {
      return alternatives <
               alnum,
               unicode,
               escape_seq,
               exactly<'_'>
             >(src);
    }

    // Match a single CSS unit
    const char* one_unit(const char* src)
    {
      return sequence <
               optional < exactly <'-'> >,
               strict_identifier_alpha,
               zero_plus < alternatives<
                 strict_identifier_alnum,
                 sequence <
                   one_plus < exactly<'-'> >,
                   strict_identifier_alpha
                 >
               > >
             >(src);
    }

    // Match numerator/denominator CSS units
    const char* multiple_units(const char* src)
    {
      return
        sequence <
          one_unit,
          zero_plus <
            sequence <
              exactly <'*'>,
              one_unit
            >
          >
        >(src);
    }

    // Match complex CSS unit identifiers
    const char* unit_identifier(const char* src)
    {
      return sequence <
        multiple_units,
        optional <
          sequence <
          exactly <'/'>,
          negate < sequence <
            exactly < calc_fn_kwd >,
            exactly < '(' >
          > >,
          multiple_units
        > >
      >(src);
    }

    const char* identifier_alnums(const char* src)
    {
      return one_plus< identifier_alnum >(src);
    }

    // Match number prefix ([\+\-]+)
    const char* number_prefix(const char* src) {
      return alternatives <
        exactly < '+' >,
        sequence <
          exactly < '-' >,
          optional_css_whitespace,
          exactly< '-' >
        >
      >(src);
    }

    // Match interpolant schemas
    const char* identifier_schema(const char* src) {

      return sequence <
               one_plus <
                 sequence <
                   zero_plus <
                     alternatives <
                       sequence <
                         optional <
                           exactly <'$'>
                         >,
                         identifier
                       >,
                       exactly <'-'>
                     >
                   >,
                   interpolant,
                   zero_plus <
                     alternatives <
                       digits,
                       sequence <
                         optional <
                           exactly <'$'>
                         >,
                         identifier
                       >,
                       quoted_string,
                       exactly<'-'>
                     >
                   >
                 >
               >,
               negate <
                 exactly<'%'>
               >
             > (src);
    }

    // interpolants can be recursive/nested
    const char* interpolant(const char* src) {
      return recursive_scopes< exactly<hash_lbrace>, exactly<rbrace> >(src);
    }

    // $re_squote = /'(?:$re_itplnt|\\.|[^'])*'/
    const char* single_quoted_string(const char* src) {
      // match a single quoted string, while skipping interpolants
      return sequence <
        exactly <'\''>,
        zero_plus <
          alternatives <
            // skip escapes
            sequence <
              exactly < '\\' >,
              re_linebreak
            >,
            escape_seq,
            unicode_seq,
            // skip interpolants
            interpolant,
            // skip non delimiters
            any_char_but < '\'' >
          >
        >,
        exactly <'\''>
      >(src);
    }

    // $re_dquote = /"(?:$re_itp|\\.|[^"])*"/
    const char* double_quoted_string(const char* src) {
      // match a single quoted string, while skipping interpolants
      return sequence <
        exactly <'"'>,
        zero_plus <
          alternatives <
            // skip escapes
            sequence <
              exactly < '\\' >,
              re_linebreak
            >,
            escape_seq,
            unicode_seq,
            // skip interpolants
            interpolant,
            // skip non delimiters
            any_char_but < '"' >
          >
        >,
        exactly <'"'>
      >(src);
    }

    // $re_quoted = /(?:$re_squote|$re_dquote)/
    const char* quoted_string(const char* src) {
      // match a quoted string, while skipping interpolants
      return alternatives<
        single_quoted_string,
        double_quoted_string
      >(src);
    }

    const char* sass_value(const char* src) {
      return alternatives <
        quoted_string,
        identifier,
        percentage,
        hex,
        dimension,
        number
      >(src);
    }

    // this is basically `one_plus < sass_value >`
    // takes care to not parse invalid combinations
    const char* value_combinations(const char* src) {
      // `2px-2px` is invalid combo
      bool was_number = false;
      const char* pos;
      while (src) {
        if ((pos = alternatives < quoted_string, identifier, percentage, hex >(src))) {
          was_number = false;
          src = pos;
        } else if (!was_number && !exactly<'+'>(src) && (pos = alternatives < dimension, number >(src))) {
          was_number = true;
          src = pos;
        } else {
          break;
        }
      }
      return src;
    }

    // must be at least one interpolant
    // can be surrounded by sass values
    // make sure to never parse (dim)(dim)
    // since this wrongly consumes `2px-1px`
    // `2px1px` is valid number (unit `px1px`)
    const char* value_schema(const char* src)
    {
      return sequence <
        one_plus <
          sequence <
            optional < value_combinations >,
            interpolant,
            optional < value_combinations >
          >
        >
      >(src);
    }

    // Match CSS '@' keywords.
    const char* at_keyword(const char* src) {
      return sequence<exactly<'@'>, identifier>(src);
    }

    /*
        tok(%r{
          (
            \\.
          |
            (?!url\()
            [^"'/\#!;\{\}] # "
          |
            /(?![\*\/])
          |
            \#(?!\{)
          |
            !(?![a-z]) # TODO: never consume "!" when issue 1126 is fixed.
          )+
        }xi) || tok(COMMENT) || tok(SINGLE_LINE_COMMENT) || interp_string || interp_uri ||
                interpolation(:warn_for_color)
    */
    const char* re_almost_any_value_token(const char* src) {

      return alternatives <
        one_plus <
          alternatives <
            sequence <
              exactly <'\\'>,
              any_char
            >,
            sequence <
              negate <
                uri_prefix
              >,
              neg_class_char <
                almost_any_value_class
              >
            >,
            sequence <
              exactly <'/'>,
              negate <
                alternatives <
                  exactly <'/'>,
                  exactly <'*'>
                >
              >
            >,
            sequence <
              exactly <'\\'>,
              exactly <'#'>,
              negate <
                exactly <'{'>
              >
            >,
            sequence <
              exactly <'!'>,
              negate <
                alpha
              >
            >
          >
        >,
        block_comment,
        line_comment,
        interpolant,
        space,
        sequence <
          exactly<'u'>,
          exactly<'r'>,
          exactly<'l'>,
          exactly<'('>,
          zero_plus <
            alternatives <
              class_char< real_uri_chars >,
              uri_character,
              NONASCII,
              ESCAPE
            >
          >,
          // false => /url\(#{W}(#{URLCHAR}*?)(#{W}\)|#\{)/,
          // true => /(#{URLCHAR}*?)(#{W}\)|#\{)/
          exactly<')'>
        >
      >(src);
    }

    /*
      DIRECTIVES = Set[:mixin, :include, :function, :return, :debug, :warn, :for,
        :each, :while, :if, :else, :extend, :import, :media, :charset, :content,
        :_moz_document, :at_root, :error]
    */
    const char* re_special_directive(const char* src) {
      return alternatives <
        word < mixin_kwd >,
        word < include_kwd >,
        word < function_kwd >,
        word < return_kwd >,
        word < debug_kwd >,
        word < warn_kwd >,
        word < for_kwd >,
        word < each_kwd >,
        word < while_kwd >,
        word < if_kwd >,
        word < else_kwd >,
        word < extend_kwd >,
        word < import_kwd >,
        word < media_kwd >,
        word < charset_kwd >,
        word < content_kwd >,
        // exactly < moz_document_kwd >,
        word < at_root_kwd >,
        word < error_kwd >
      >(src);
    }

    const char* re_prefixed_directive(const char* src) {
      return sequence <
        optional <
          sequence <
            exactly <'-'>,
            one_plus < alnum >,
            exactly <'-'>
          >
        >,
        exactly < supports_kwd >
      >(src);
    }

    const char* re_reference_combinator(const char* src) {
      return sequence <
        optional <
          sequence <
            zero_plus <
              exactly <'-'>
            >,
            identifier,
            exactly <'|'>
          >
        >,
        zero_plus <
          exactly <'-'>
        >,
        identifier
      >(src);
    }

    const char* static_reference_combinator(const char* src) {
      return sequence <
        exactly <'/'>,
        re_reference_combinator,
        exactly <'/'>
      >(src);
    }

    const char* schema_reference_combinator(const char* src) {
      return sequence <
        exactly <'/'>,
        optional <
          sequence <
            css_ip_identifier,
            exactly <'|'>
          >
        >,
        css_ip_identifier,
        exactly <'/'>
      > (src);
    }

    const char* kwd_import(const char* src) {
      return word<import_kwd>(src);
    }

    const char* kwd_at_root(const char* src) {
      return word<at_root_kwd>(src);
    }

    const char* kwd_with_directive(const char* src) {
      return word<with_kwd>(src);
    }

    const char* kwd_without_directive(const char* src) {
      return word<without_kwd>(src);
    }

    const char* kwd_media(const char* src) {
      return word<media_kwd>(src);
    }

    const char* kwd_supports_directive(const char* src) {
      return word<supports_kwd>(src);
    }

    const char* kwd_mixin(const char* src) {
      return word<mixin_kwd>(src);
    }

    const char* kwd_function(const char* src) {
      return word<function_kwd>(src);
    }

    const char* kwd_return_directive(const char* src) {
      return word<return_kwd>(src);
    }

    const char* kwd_include_directive(const char* src) {
      return word<include_kwd>(src);
    }

    const char* kwd_content_directive(const char* src) {
      return word<content_kwd>(src);
    }

    const char* kwd_charset_directive(const char* src) {
      return word<charset_kwd>(src);
    }

    const char* kwd_extend(const char* src) {
      return word<extend_kwd>(src);
    }


    const char* kwd_if_directive(const char* src) {
      return word<if_kwd>(src);
    }

    const char* kwd_else_directive(const char* src) {
      return word<else_kwd>(src);
    }
    const char* elseif_directive(const char* src) {
      return sequence< exactly< else_kwd >,
                                optional_css_comments,
                                word< if_after_else_kwd > >(src);
    }

    const char* kwd_for_directive(const char* src) {
      return word<for_kwd>(src);
    }

    const char* kwd_from(const char* src) {
      return word<from_kwd>(src);
    }

    const char* kwd_to(const char* src) {
      return word<to_kwd>(src);
    }

    const char* kwd_through(const char* src) {
      return word<through_kwd>(src);
    }

    const char* kwd_each_directive(const char* src) {
      return word<each_kwd>(src);
    }

    const char* kwd_in(const char* src) {
      return word<in_kwd>(src);
    }

    const char* kwd_while_directive(const char* src) {
      return word<while_kwd>(src);
    }

    const char* name(const char* src) {
      return one_plus< alternatives< alnum,
                                     exactly<'-'>,
                                     exactly<'_'>,
                                     escape_seq > >(src);
    }

    const char* kwd_warn(const char* src) {
      return word<warn_kwd>(src);
    }

    const char* kwd_err(const char* src) {
      return word<error_kwd>(src);
    }

    const char* kwd_dbg(const char* src) {
      return word<debug_kwd>(src);
    }

    /* not used anymore - remove?
    const char* directive(const char* src) {
      return sequence< exactly<'@'>, identifier >(src);
    } */

    const char* kwd_null(const char* src) {
      return word<null_kwd>(src);
    }

    const char* css_identifier(const char* src) {
      return sequence <
               zero_plus <
                 exactly <'-'>
               >,
               identifier
             >(src);
    }

    const char* css_ip_identifier(const char* src) {
      return sequence <
               zero_plus <
                 exactly <'-'>
               >,
               alternatives <
                 identifier,
                 interpolant
               >
             >(src);
    }

    // Match CSS type selectors
    const char* namespace_prefix(const char* src) {
      return sequence <
               optional <
                 alternatives <
                   exactly <'*'>,
                   css_identifier
                 >
               >,
               exactly <'|'>,
               negate <
                 exactly <'='>
               >
             >(src);
    }

    // Match CSS type selectors
    const char* namespace_schema(const char* src) {
      return sequence <
               optional <
                 alternatives <
                   exactly <'*'>,
                   css_ip_identifier
                 >
               >,
               exactly<'|'>,
               negate <
                 exactly <'='>
               >
             >(src);
    }

    const char* hyphens_and_identifier(const char* src) {
      return sequence< zero_plus< exactly< '-' > >, identifier_alnums >(src);
    }
    const char* hyphens_and_name(const char* src) {
      return sequence< zero_plus< exactly< '-' > >, name >(src);
    }
    const char* universal(const char* src) {
      return sequence< optional<namespace_schema>, exactly<'*'> >(src);
    }
    // Match CSS id names.
    const char* id_name(const char* src) {
      return sequence<exactly<'#'>, identifier_alnums >(src);
    }
    // Match CSS class names.
    const char* class_name(const char* src) {
      return sequence<exactly<'.'>, identifier >(src);
    }
    // Attribute name in an attribute selector.
    const char* attribute_name(const char* src) {
      return alternatives< sequence< optional<namespace_schema>, identifier>,
                           identifier >(src);
    }
    // match placeholder selectors
    const char* placeholder(const char* src) {
      return sequence<exactly<'%'>, identifier_alnums >(src);
    }
    // Match CSS numeric constants.

    const char* op(const char* src) {
      return class_char<op_chars>(src);
    }
    const char* sign(const char* src) {
      return class_char<sign_chars>(src);
    }
    const char* unsigned_number(const char* src) {
      return alternatives<sequence< zero_plus<digits>,
                                    exactly<'.'>,
                                    one_plus<digits> >,
                          digits>(src);
    }
    const char* number(const char* src) {
      return sequence<
          optional<sign>,
          unsigned_number,
          optional<
            sequence<
              exactly<'e'>,
              optional<sign>,
              unsigned_number
            >
          >
        >(src);
    }
    const char* coefficient(const char* src) {
      return alternatives< sequence< optional<sign>, digits >,
                           sign >(src);
    }
    const char* binomial(const char* src) {
      return sequence <
               optional < sign >,
               optional < digits >,
               exactly <'n'>,
               zero_plus < sequence <
                 optional_css_whitespace, sign,
                 optional_css_whitespace, digits
               > >
             >(src);
    }
    const char* percentage(const char* src) {
      return sequence< number, exactly<'%'> >(src);
    }
    const char* ampersand(const char* src) {
      return exactly<'&'>(src);
    }

    /* not used anymore - remove?
    const char* em(const char* src) {
      return sequence< number, exactly<em_kwd> >(src);
    } */
    const char* dimension(const char* src) {
      return sequence<number, unit_identifier >(src);
    }
    const char* hex(const char* src) {
      const char* p = sequence< exactly<'#'>, one_plus<xdigit> >(src);
      ptrdiff_t len = p - src;
      return (len != 4 && len != 7) ? 0 : p;
    }
    const char* hexa(const char* src) {
      const char* p = sequence< exactly<'#'>, one_plus<xdigit> >(src);
      ptrdiff_t len = p - src;
      return (len != 5 && len != 9) ? 0 : p;
    }
    const char* hex0(const char* src) {
      const char* p = sequence< exactly<'0'>, exactly<'x'>, one_plus<xdigit> >(src);
      ptrdiff_t len = p - src;
      return (len != 5 && len != 8) ? 0 : p;
    }

    /* no longer used - remove?
    const char* rgb_prefix(const char* src) {
      return word<rgb_fn_kwd>(src);
    }*/
    // Match CSS uri specifiers.

    const char* uri_prefix(const char* src) {
      return sequence <
        exactly <
          url_kwd
        >,
        zero_plus <
          sequence <
            exactly <'-'>,
            one_plus <
              alpha
            >
          >
        >,
        exactly <'('>
      >(src);
    }

    // TODO: rename the following two functions
    /* no longer used - remove?
    const char* uri(const char* src) {
      return sequence< exactly<url_kwd>,
                       optional<spaces>,
                       quoted_string,
                       optional<spaces>,
                       exactly<')'> >(src);
    }*/
    /* no longer used - remove?
    const char* url_value(const char* src) {
      return sequence< optional< sequence< identifier, exactly<':'> > >, // optional protocol
                       one_plus< sequence< zero_plus< exactly<'/'> >, filename > >, // one or more folders and/or trailing filename
                       optional< exactly<'/'> > >(src);
    }*/
    /* no longer used - remove?
    const char* url_schema(const char* src) {
      return sequence< optional< sequence< identifier, exactly<':'> > >, // optional protocol
                       filename_schema >(src); // optional trailing slash
    }*/
    // Match CSS "!important" keyword.
    const char* kwd_important(const char* src) {
      return sequence< exactly<'!'>,
                       optional_css_whitespace,
                       word<important_kwd> >(src);
    }
    // Match CSS "!optional" keyword.
    const char* kwd_optional(const char* src) {
      return sequence< exactly<'!'>,
      optional_css_whitespace,
      word<optional_kwd> >(src);
    }
    // Match Sass "!default" keyword.
    const char* default_flag(const char* src) {
      return sequence< exactly<'!'>,
                       optional_css_whitespace,
                       word<default_kwd> >(src);
    }
    // Match Sass "!global" keyword.
    const char* global_flag(const char* src) {
      return sequence< exactly<'!'>,
                       optional_css_whitespace,
                       word<global_kwd> >(src);
    }
    // Match CSS pseudo-class/element prefixes.
    const char* pseudo_prefix(const char* src) {
      return sequence< exactly<':'>, optional< exactly<':'> > >(src);
    }
    // Match CSS function call openers.
    const char* functional_schema(const char* src) {
      return sequence <
               one_plus <
                 sequence <
                   zero_plus <
                     alternatives <
                       identifier,
                       exactly <'-'>
                     >
                   >,
                   one_plus <
                     sequence <
                       interpolant,
                       alternatives <
                         digits,
                         identifier,
                         exactly<'+'>,
                         exactly<'-'>
                       >
                     >
                   >
                 >
               >,
               negate <
                 exactly <'%'>
               >,
               lookahead <
                 exactly <'('>
               >
             > (src);
    }

    const char* re_nothing(const char* src) {
      return src;
    }

    const char* re_functional(const char* src) {
      return sequence< identifier, optional < block_comment >, exactly<'('> >(src);
    }
    const char* re_pseudo_selector(const char* src) {
      return sequence< identifier, optional < block_comment >, exactly<'('> >(src);
    }
    // Match the CSS negation pseudo-class.
    const char* pseudo_not(const char* src) {
      return word< pseudo_not_fn_kwd >(src);
    }
    // Match CSS 'odd' and 'even' keywords for functional pseudo-classes.
    const char* even(const char* src) {
      return word<even_kwd>(src);
    }
    const char* odd(const char* src) {
      return word<odd_kwd>(src);
    }
    // Match CSS attribute-matching operators.
    const char* exact_match(const char* src) { return exactly<'='>(src); }
    const char* class_match(const char* src) { return exactly<tilde_equal>(src); }
    const char* dash_match(const char* src) { return exactly<pipe_equal>(src); }
    const char* prefix_match(const char* src) { return exactly<caret_equal>(src); }
    const char* suffix_match(const char* src) { return exactly<dollar_equal>(src); }
    const char* substring_match(const char* src) { return exactly<star_equal>(src); }
    // Match CSS combinators.
    /* not used anymore - remove?
    const char* adjacent_to(const char* src) {
      return sequence< optional_spaces, exactly<'+'> >(src);
    }
    const char* precedes(const char* src) {
      return sequence< optional_spaces, exactly<'~'> >(src);
    }
    const char* parent_of(const char* src) {
      return sequence< optional_spaces, exactly<'>'> >(src);
    }
    const char* ancestor_of(const char* src) {
      return sequence< spaces, negate< exactly<'{'> > >(src);
    }*/

    // Match SCSS variable names.
    const char* variable(const char* src) {
      return sequence<exactly<'$'>, identifier>(src);
    }

    // parse `calc`, `-a-calc` and `--b-c-calc`
    // but do not parse `foocalc` or `foo-calc`
    const char* calc_fn_call(const char* src) {
      return sequence <
        optional < sequence <
          hyphens,
          one_plus < sequence <
            strict_identifier,
            hyphens
          > >
        > >,
        exactly < calc_fn_kwd >,
        word_boundary
      >(src);
    }

    // Match Sass boolean keywords.
    const char* kwd_true(const char* src) {
      return word<true_kwd>(src);
    }
    const char* kwd_false(const char* src) {
      return word<false_kwd>(src);
    }
    const char* kwd_only(const char* src) {
      return keyword < only_kwd >(src);
    }
    const char* kwd_and(const char* src) {
      return keyword < and_kwd >(src);
    }
    const char* kwd_or(const char* src) {
      return keyword < or_kwd >(src);
    }
    const char* kwd_not(const char* src) {
      return keyword < not_kwd >(src);
    }
    const char* kwd_eq(const char* src) {
      return exactly<eq>(src);
    }
    const char* kwd_neq(const char* src) {
      return exactly<neq>(src);
    }
    const char* kwd_gt(const char* src) {
      return exactly<gt>(src);
    }
    const char* kwd_gte(const char* src) {
      return exactly<gte>(src);
    }
    const char* kwd_lt(const char* src) {
      return exactly<lt>(src);
    }
    const char* kwd_lte(const char* src) {
      return exactly<lte>(src);
    }

    // match specific IE syntax
    const char* ie_progid(const char* src) {
      return sequence <
        word<progid_kwd>,
        exactly<':'>,
        alternatives< identifier_schema, identifier >,
        zero_plus< sequence<
          exactly<'.'>,
          alternatives< identifier_schema, identifier >
        > >,
        zero_plus < sequence<
          exactly<'('>,
          optional_css_whitespace,
          optional < sequence<
            alternatives< variable, identifier_schema, identifier >,
            optional_css_whitespace,
            exactly<'='>,
            optional_css_whitespace,
            alternatives< variable, identifier_schema, identifier, quoted_string, number, hex, hexa >,
            zero_plus< sequence<
              optional_css_whitespace,
              exactly<','>,
              optional_css_whitespace,
              sequence<
                alternatives< variable, identifier_schema, identifier >,
                optional_css_whitespace,
                exactly<'='>,
                optional_css_whitespace,
                alternatives< variable, identifier_schema, identifier, quoted_string, number, hex, hexa >
              >
            > >
          > >,
          optional_css_whitespace,
          exactly<')'>
        > >
      >(src);
    }
    const char* ie_expression(const char* src) {
      return sequence < word<expression_kwd>, exactly<'('>, skip_over_scopes< exactly<'('>, exactly<')'> > >(src);
    }
    const char* ie_property(const char* src) {
      return alternatives < ie_expression, ie_progid >(src);
    }

    // const char* ie_args(const char* src) {
    //   return sequence< alternatives< ie_keyword_arg, value_schema, quoted_string, interpolant, number, identifier, delimited_by< '(', ')', true> >,
    //                    zero_plus< sequence< optional_css_whitespace, exactly<','>, optional_css_whitespace, alternatives< ie_keyword_arg, value_schema, quoted_string, interpolant, number, identifier, delimited_by<'(', ')', true> > > > >(src);
    // }

    const char* ie_keyword_arg_property(const char* src) {
      return alternatives <
          variable,
          identifier_schema,
          identifier
        >(src);
    }
    const char* ie_keyword_arg_value(const char* src) {
      return alternatives <
          variable,
          identifier_schema,
          identifier,
          quoted_string,
          number,
          hex,
          hexa,
          sequence <
            exactly < '(' >,
            skip_over_scopes <
              exactly < '(' >,
              exactly < ')' >
            >
          >
        >(src);
    }

    const char* ie_keyword_arg(const char* src) {
      return sequence <
        ie_keyword_arg_property,
        optional_css_whitespace,
        exactly<'='>,
        optional_css_whitespace,
        ie_keyword_arg_value
      >(src);
    }

    // Path matching functions.
    /* not used anymore - remove?
    const char* folder(const char* src) {
      return sequence< zero_plus< any_char_except<'/'> >,
                       exactly<'/'> >(src);
    }
    const char* folders(const char* src) {
      return zero_plus< folder >(src);
    }*/
    /* not used anymore - remove?
    const char* chunk(const char* src) {
      char inside_str = 0;
      const char* p = src;
      size_t depth = 0;
      while (true) {
        if (!*p) {
          return 0;
        }
        else if (!inside_str && (*p == '"' || *p == '\'')) {
          inside_str = *p;
        }
        else if (*p == inside_str && *(p-1) != '\\') {
          inside_str = 0;
        }
        else if (*p == '(' && !inside_str) {
          ++depth;
        }
        else if (*p == ')' && !inside_str) {
          if (depth == 0) return p;
          else            --depth;
        }
        ++p;
      }
      // unreachable
      return 0;
    }
    */

    // follow the CSS spec more closely and see if this helps us scan URLs correctly
    /* not used anymore - remove?
    const char* NL(const char* src) {
      return alternatives< exactly<'\n'>,
                           sequence< exactly<'\r'>, exactly<'\n'> >,
                           exactly<'\r'>,
                           exactly<'\f'> >(src);
    }*/

    const char* H(const char* src) {
      return std::isxdigit(*src) ? src+1 : 0;
    }

    const char* W(const char* src) {
      return zero_plus< alternatives<
        space,
        exactly< '\t' >,
        exactly< '\r' >,
        exactly< '\n' >,
        exactly< '\f' >
      > >(src);
    }

    const char* UUNICODE(const char* src) {
      return sequence< exactly<'\\'>,
                       between<H, 1, 6>,
                       optional< W >
                       >(src);
    }

    const char* NONASCII(const char* src) {
      return nonascii(src);
    }

    const char* ESCAPE(const char* src) {
      return alternatives<
        UUNICODE,
        sequence<
          exactly<'\\'>,
          alternatives<
            NONASCII,
            escapable_character
          >
        >
      >(src);
    }

    const char* list_terminator(const char* src) {
      return alternatives <
        exactly<';'>,
        exactly<'}'>,
        exactly<'{'>,
        exactly<')'>,
        exactly<']'>,
        exactly<':'>,
        end_of_file,
        exactly<ellipsis>,
        default_flag,
        global_flag
      >(src);
    };

    const char* space_list_terminator(const char* src) {
      return alternatives <
        exactly<','>,
        list_terminator
      >(src);
    };


    // const char* real_uri_prefix(const char* src) {
    //   return alternatives<
    //     exactly< url_kwd >,
    //     exactly< url_prefix_kwd >
    //   >(src);
    // }

    const char* real_uri(const char* src) {
      return sequence<
        exactly< url_kwd >,
        exactly< '(' >,
        W,
        real_uri_value,
        exactly< ')' >
      >(src);
    }

    const char* real_uri_suffix(const char* src) {
      return sequence< W, exactly< ')' > >(src);
    }

    const char* real_uri_value(const char* src) {
      return
      sequence<
        non_greedy<
          alternatives<
            class_char< real_uri_chars >,
            uri_character,
            NONASCII,
            ESCAPE
          >,
          alternatives<
            real_uri_suffix,
            exactly< hash_lbrace >
          >
        >
      >
      (src);
    }

    const char* static_string(const char* src) {
      const char* pos = src;
      const char * s = quoted_string(pos);
      Token t(pos, s);
      const unsigned int p = count_interval< interpolant >(t.begin, t.end);
      return (p == 0) ? t.end : 0;
    }

    const char* unicode_seq(const char* src) {
      return sequence <
        alternatives <
          exactly< 'U' >,
          exactly< 'u' >
        >,
        exactly< '+' >,
        padded_token <
          6, xdigit,
          exactly < '?' >
        >
      >(src);
    }

    const char* static_component(const char* src) {
      return alternatives< identifier,
                           static_string,
                           percentage,
                           hex,
                           hexa,
                           exactly<'|'>,
                           // exactly<'+'>,
                           sequence < number, unit_identifier >,
                           number,
                           sequence< exactly<'!'>, word<important_kwd> >
                          >(src);
    }

    const char* static_property(const char* src) {
      return
        sequence <
          zero_plus<
            sequence <
              optional_css_comments,
              alternatives <
                exactly<','>,
                exactly<'('>,
                exactly<')'>,
                kwd_optional,
                quoted_string,
                interpolant,
                identifier,
                percentage,
                dimension,
                variable,
                alnum,
                sequence <
                  exactly <'\\'>,
                  any_char
                >
              >
            >
          >,
          lookahead <
            sequence <
              optional_css_comments,
              alternatives <
                exactly <';'>,
                exactly <'}'>,
                end_of_file
              >
            >
          >
        >(src);
    }

    const char* static_value(const char* src) {
      return sequence< sequence<
                         static_component,
                         zero_plus< identifier >
                       >,
                       zero_plus < sequence<
                                     alternatives<
                                       sequence< optional_spaces, alternatives<
                                         exactly < '/' >,
                                         exactly < ',' >,
                                         exactly < ' ' >
                                       >, optional_spaces >,
                                       spaces
                                     >,
                                     static_component
                       > >,
                       zero_plus < spaces >,
                       alternatives< exactly<';'>, exactly<'}'> >
                      >(src);
    }

    extern const char css_variable_url_negates[] = "()[]{}\"'#/";
    const char* css_variable_value(const char* src) {
      return sequence<
        alternatives<
          sequence<
            negate< exactly< url_fn_kwd > >,
            one_plus< neg_class_char< css_variable_url_negates > >
          >,
          sequence< exactly<'#'>, negate< exactly<'{'> > >,
          sequence< exactly<'/'>, negate< exactly<'*'> > >,
          static_string,
          real_uri,
          block_comment
        >
      >(src);
    }

    extern const char css_variable_url_top_level_negates[] = "()[]{}\"'#/;";
    const char* css_variable_top_level_value(const char* src) {
      return sequence<
        alternatives<
          sequence<
            negate< exactly< url_fn_kwd > >,
            one_plus< neg_class_char< css_variable_url_top_level_negates > >
          >,
          sequence< exactly<'#'>, negate< exactly<'{'> > >,
          sequence< exactly<'/'>, negate< exactly<'*'> > >,
          static_string,
          real_uri,
          block_comment
        >
      >(src);
    }

    const char* parenthese_scope(const char* src) {
      return sequence <
        exactly < '(' >,
        skip_over_scopes <
          exactly < '(' >,
          exactly < ')' >
        >
      >(src);
    }

    const char* re_selector_list(const char* src) {
      return alternatives <
        // partial bem selector
        sequence <
          ampersand,
          one_plus <
            exactly < '-' >
          >,
          word_boundary,
          optional_spaces
        >,
        // main selector matching
        one_plus <
          alternatives <
            // consume whitespace and comments
            spaces, block_comment, line_comment,
            // match `/deep/` selector (pass-trough)
            // there is no functionality for it yet
            schema_reference_combinator,
            // match selector ops /[*&%,\[\]]/
            class_char < selector_lookahead_ops >,
            // match selector combinators /[>+~]/
            class_char < selector_combinator_ops >,
            // match pseudo selectors
            sequence <
              exactly <'('>,
              optional_spaces,
              optional <re_selector_list>,
              optional_spaces,
              exactly <')'>
            >,
            // match attribute compare operators
            alternatives <
              exact_match, class_match, dash_match,
              prefix_match, suffix_match, substring_match
            >,
            // main selector match
            sequence <
              // allow namespace prefix
              optional < namespace_schema >,
              // modifiers prefixes
              alternatives <
                sequence <
                  exactly <'#'>,
                  // not for interpolation
                  negate < exactly <'{'> >
                >,
                // class match
                exactly <'.'>,
                // single or double colon
                sequence <
                  optional < pseudo_prefix >,
                  // fix libsass issue 2376
                  negate < uri_prefix >
                >
              >,
              // accept hypens in token
              one_plus < sequence <
                // can start with hyphens
                zero_plus <
                  sequence <
                    exactly <'-'>,
                    optional_spaces
                  >
                >,
                // now the main token
                alternatives <
                  kwd_optional,
                  exactly <'*'>,
                  quoted_string,
                  interpolant,
                  identifier,
                  variable,
                  percentage,
                  binomial,
                  dimension,
                  alnum
                >
              > >,
              // can also end with hyphens
              zero_plus < exactly<'-'> >
            >
          >
        >
      >(src);
    }

    const char* type_selector(const char* src) {
      return sequence< optional<namespace_schema>, identifier>(src);
    }
    const char* re_type_selector(const char* src) {
      return alternatives< type_selector, universal, dimension, percentage, number, identifier_alnums >(src);
    }
    const char* re_static_expression(const char* src) {
      return sequence< number, optional_spaces, exactly<'/'>, optional_spaces, number >(src);
    }

    // lexer special_fn: these functions cannot be overloaded
    // (/((-[\w-]+-)?(calc|element)|expression|progid:[a-z\.]*)\(/i)
    const char* re_special_fun(const char* src) {

      // match this first as we test prefix hyphens
      if (const char* calc = calc_fn_call(src)) {
        return calc;
      }

      return sequence <
        optional <
          sequence <
            exactly <'-'>,
            one_plus <
              alternatives <
                alpha,
                exactly <'+'>,
                exactly <'-'>
              >
            >
          >
        >,
        alternatives <
          word < expression_kwd >,
          sequence <
            sequence <
              exactly < progid_kwd >,
              exactly <':'>
            >,
            zero_plus <
              alternatives <
                char_range <'a', 'z'>,
                exactly <'.'>
              >
            >
          >
        >
      >(src);
    }

  }
}
