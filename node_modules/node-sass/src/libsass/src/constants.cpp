#include "sass.hpp"
#include "constants.hpp"

namespace Sass {
  namespace Constants {

    extern const unsigned long MaxCallStack = 1024;

    // https://github.com/sass/libsass/issues/592
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity
    // https://github.com/sass/sass/issues/1495#issuecomment-61189114
    extern const unsigned long Specificity_Star = 0;
    extern const unsigned long Specificity_Universal = 0;
    extern const unsigned long Specificity_Element = 1;
    extern const unsigned long Specificity_Base = 1000;
    extern const unsigned long Specificity_Class = 1000;
    extern const unsigned long Specificity_Attr = 1000;
    extern const unsigned long Specificity_Pseudo = 1000;
    extern const unsigned long Specificity_ID = 1000000;

    // sass keywords
    extern const char at_root_kwd[]       = "@at-root";
    extern const char import_kwd[]        = "@import";
    extern const char mixin_kwd[]         = "@mixin";
    extern const char function_kwd[]      = "@function";
    extern const char return_kwd[]        = "@return";
    extern const char include_kwd[]       = "@include";
    extern const char content_kwd[]       = "@content";
    extern const char extend_kwd[]        = "@extend";
    extern const char if_kwd[]            = "@if";
    extern const char else_kwd[]          = "@else";
    extern const char if_after_else_kwd[] = "if";
    extern const char for_kwd[]           = "@for";
    extern const char from_kwd[]          = "from";
    extern const char to_kwd[]            = "to";
    extern const char through_kwd[]       = "through";
    extern const char each_kwd[]          = "@each";
    extern const char in_kwd[]            = "in";
    extern const char while_kwd[]         = "@while";
    extern const char warn_kwd[]          = "@warn";
    extern const char error_kwd[]         = "@error";
    extern const char debug_kwd[]         = "@debug";
    extern const char default_kwd[]       = "default";
    extern const char global_kwd[]        = "global";
    extern const char null_kwd[]          = "null";
    extern const char optional_kwd[]      = "optional";
    extern const char with_kwd[]          = "with";
    extern const char without_kwd[]       = "without";
    extern const char all_kwd[]           = "all";
    extern const char rule_kwd[]          = "rule";

    // css standard units
    extern const char em_kwd[]   = "em";
    extern const char ex_kwd[]   = "ex";
    extern const char px_kwd[]   = "px";
    extern const char cm_kwd[]   = "cm";
    extern const char mm_kwd[]   = "mm";
    extern const char pt_kwd[]   = "pt";
    extern const char pc_kwd[]   = "pc";
    extern const char deg_kwd[]  = "deg";
    extern const char rad_kwd[]  = "rad";
    extern const char grad_kwd[] = "grad";
    extern const char turn_kwd[] = "turn";
    extern const char ms_kwd[]   = "ms";
    extern const char s_kwd[]    = "s";
    extern const char Hz_kwd[]   = "Hz";
    extern const char kHz_kwd[]  = "kHz";

    // vendor prefixes
    extern const char vendor_opera_kwd[]    = "-o-";
    extern const char vendor_webkit_kwd[]   = "-webkit-";
    extern const char vendor_mozilla_kwd[]  = "-moz-";
    extern const char vendor_ms_kwd[]       = "-ms-";
    extern const char vendor_khtml_kwd[]    = "-khtml-";

    // css functions and keywords
    extern const char charset_kwd[]      = "@charset";
    extern const char media_kwd[]        = "@media";
    extern const char supports_kwd[]     = "@supports";
    extern const char keyframes_kwd[]    = "keyframes";
    extern const char only_kwd[]         = "only";
    extern const char rgb_fn_kwd[]       = "rgb(";
    extern const char url_fn_kwd[]       = "url(";
    extern const char url_kwd[]          = "url";
    // extern const char url_prefix_fn_kwd[] = "url-prefix(";
    extern const char important_kwd[]    = "important";
    extern const char pseudo_not_fn_kwd[] = ":not(";
    extern const char even_kwd[]         = "even";
    extern const char odd_kwd[]          = "odd";
    extern const char progid_kwd[]       = "progid";
    extern const char expression_kwd[]   = "expression";
    extern const char calc_fn_kwd[]      = "calc";

    extern const char almost_any_value_class[] = "\"'#!;{}";

    // css selector keywords
    extern const char sel_deep_kwd[] = "/deep/";

    // css attribute-matching operators
    extern const char tilde_equal[]  = "~=";
    extern const char pipe_equal[]   = "|=";
    extern const char caret_equal[]  = "^=";
    extern const char dollar_equal[] = "$=";
    extern const char star_equal[]   = "*=";

    // relational & logical operators and constants
    extern const char and_kwd[]   = "and";
    extern const char or_kwd[]    = "or";
    extern const char not_kwd[]   = "not";
    extern const char gt[]        = ">";
    extern const char gte[]       = ">=";
    extern const char lt[]        = "<";
    extern const char lte[]       = "<=";
    extern const char eq[]        = "==";
    extern const char neq[]       = "!=";
    extern const char true_kwd[]  = "true";
    extern const char false_kwd[] = "false";

    // miscellaneous punctuation and delimiters
    extern const char percent_str[]     = "%";
    extern const char empty_str[]       = "";
    extern const char slash_slash[]     = "//";
    extern const char slash_star[]      = "/*";
    extern const char star_slash[]      = "*/";
    extern const char hash_lbrace[]     = "#{";
    extern const char rbrace[]          = "}";
    extern const char rparen[]          = ")";
    extern const char sign_chars[]      = "-+";
    extern const char op_chars[]        = "-+";
    extern const char hyphen[]          = "-";
    extern const char ellipsis[]        = "...";
    // extern const char url_space_chars[] = " \t\r\n\f";
    // type names
    extern const char numeric_name[]    = "numeric value";
    extern const char number_name[]     = "number";
    extern const char percentage_name[] = "percentage";
    extern const char dimension_name[]  = "numeric dimension";
    extern const char string_name[]     = "string";
    extern const char bool_name[]       = "bool";
    extern const char color_name[]      = "color";
    extern const char list_name[]       = "list";
    extern const char map_name[]        = "map";
    extern const char arglist_name[]    = "arglist";

    // constants for uri parsing (RFC 3986 Appendix A.)
    extern const char uri_chars[]  = ":;/?!%&#@|[]{}'`^\"*+-.,_=~";
    extern const char real_uri_chars[]  = "#%&";

    // some specific constant character classes
    // they must be static to be useable by lexer
    extern const char static_ops[]      = "*/%";
    // some character classes for the parser
    extern const char selector_list_delims[] = "){};!";
    extern const char complex_selector_delims[] = ",){};!";
    extern const char selector_combinator_ops[] = "+~>";
    // optional modifiers for alternative compare context
    extern const char attribute_compare_modifiers[] = "~|^$*";
    extern const char selector_lookahead_ops[] = "*&%,()[]";

    // byte order marks
    // (taken from http://en.wikipedia.org/wiki/Byte_order_mark)
    extern const unsigned char utf_8_bom[]      = { 0xEF, 0xBB, 0xBF };
    extern const unsigned char utf_16_bom_be[]  = { 0xFE, 0xFF };
    extern const unsigned char utf_16_bom_le[]  = { 0xFF, 0xFE };
    extern const unsigned char utf_32_bom_be[]  = { 0x00, 0x00, 0xFE, 0xFF };
    extern const unsigned char utf_32_bom_le[]  = { 0xFF, 0xFE, 0x00, 0x00 };
    extern const unsigned char utf_7_bom_1[]    = { 0x2B, 0x2F, 0x76, 0x38 };
    extern const unsigned char utf_7_bom_2[]    = { 0x2B, 0x2F, 0x76, 0x39 };
    extern const unsigned char utf_7_bom_3[]    = { 0x2B, 0x2F, 0x76, 0x2B };
    extern const unsigned char utf_7_bom_4[]    = { 0x2B, 0x2F, 0x76, 0x2F };
    extern const unsigned char utf_7_bom_5[]    = { 0x2B, 0x2F, 0x76, 0x38, 0x2D };
    extern const unsigned char utf_1_bom[]      = { 0xF7, 0x64, 0x4C };
    extern const unsigned char utf_ebcdic_bom[] = { 0xDD, 0x73, 0x66, 0x73 };
    extern const unsigned char scsu_bom[]       = { 0x0E, 0xFE, 0xFF };
    extern const unsigned char bocu_1_bom[]     = { 0xFB, 0xEE, 0x28 };
    extern const unsigned char gb_18030_bom[]   = { 0x84, 0x31, 0x95, 0x33 };

  }
}
