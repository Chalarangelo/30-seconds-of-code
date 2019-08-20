#ifndef SASS_CONSTANTS_H
#define SASS_CONSTANTS_H

namespace Sass {
  namespace Constants {

    // The maximum call stack that can be created
    extern const unsigned long MaxCallStack;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity
    // The following list of selectors is by increasing specificity:
    extern const unsigned long Specificity_Star;
    extern const unsigned long Specificity_Universal;
    extern const unsigned long Specificity_Element;
    extern const unsigned long Specificity_Base;
    extern const unsigned long Specificity_Class;
    extern const unsigned long Specificity_Attr;
    extern const unsigned long Specificity_Pseudo;
    extern const unsigned long Specificity_ID;

    // sass keywords
    extern const char at_root_kwd[];
    extern const char import_kwd[];
    extern const char mixin_kwd[];
    extern const char function_kwd[];
    extern const char return_kwd[];
    extern const char include_kwd[];
    extern const char content_kwd[];
    extern const char extend_kwd[];
    extern const char if_kwd[];
    extern const char else_kwd[];
    extern const char if_after_else_kwd[];
    extern const char for_kwd[];
    extern const char from_kwd[];
    extern const char to_kwd[];
    extern const char through_kwd[];
    extern const char each_kwd[];
    extern const char in_kwd[];
    extern const char while_kwd[];
    extern const char warn_kwd[];
    extern const char error_kwd[];
    extern const char debug_kwd[];
    extern const char default_kwd[];
    extern const char global_kwd[];
    extern const char null_kwd[];
    extern const char optional_kwd[];
    extern const char with_kwd[];
    extern const char without_kwd[];
    extern const char all_kwd[];
    extern const char rule_kwd[];

    // css standard units
    extern const char em_kwd[];
    extern const char ex_kwd[];
    extern const char px_kwd[];
    extern const char cm_kwd[];
    extern const char mm_kwd[];
    extern const char pt_kwd[];
    extern const char pc_kwd[];
    extern const char deg_kwd[];
    extern const char rad_kwd[];
    extern const char grad_kwd[];
    extern const char turn_kwd[];
    extern const char ms_kwd[];
    extern const char s_kwd[];
    extern const char Hz_kwd[];
    extern const char kHz_kwd[];

    // vendor prefixes
    extern const char vendor_opera_kwd[];
    extern const char vendor_webkit_kwd[];
    extern const char vendor_mozilla_kwd[];
    extern const char vendor_ms_kwd[];
    extern const char vendor_khtml_kwd[];

    // css functions and keywords
    extern const char charset_kwd[];
    extern const char media_kwd[];
    extern const char supports_kwd[];
    extern const char keyframes_kwd[];
    extern const char only_kwd[];
    extern const char rgb_fn_kwd[];
    extern const char url_fn_kwd[];
    extern const char url_kwd[];
    // extern const char url_prefix_fn_kwd[];
    extern const char important_kwd[];
    extern const char pseudo_not_fn_kwd[];
    extern const char even_kwd[];
    extern const char odd_kwd[];
    extern const char progid_kwd[];
    extern const char expression_kwd[];
    extern const char calc_fn_kwd[];

    // char classes for "regular expressions"
    extern const char almost_any_value_class[];

    // css selector keywords
    extern const char sel_deep_kwd[];

    // css attribute-matching operators
    extern const char tilde_equal[];
    extern const char pipe_equal[];
    extern const char caret_equal[];
    extern const char dollar_equal[];
    extern const char star_equal[];

    // relational & logical operators and constants
    extern const char and_kwd[];
    extern const char or_kwd[];
    extern const char not_kwd[];
    extern const char gt[];
    extern const char gte[];
    extern const char lt[];
    extern const char lte[];
    extern const char eq[];
    extern const char neq[];
    extern const char true_kwd[];
    extern const char false_kwd[];

    // miscellaneous punctuation and delimiters
    extern const char percent_str[];
    extern const char empty_str[];
    extern const char slash_slash[];
    extern const char slash_star[];
    extern const char star_slash[];
    extern const char hash_lbrace[];
    extern const char rbrace[];
    extern const char rparen[];
    extern const char sign_chars[];
    extern const char op_chars[];
    extern const char hyphen[];
    extern const char ellipsis[];
    // extern const char url_space_chars[];

    // type names
    extern const char numeric_name[];
    extern const char number_name[];
    extern const char percentage_name[];
    extern const char dimension_name[];
    extern const char string_name[];
    extern const char bool_name[];
    extern const char color_name[];
    extern const char list_name[];
    extern const char map_name[];
    extern const char arglist_name[];

    // constants for uri parsing (RFC 3986 Appendix A.)
    extern const char uri_chars[];
    extern const char real_uri_chars[];

    // some specific constant character classes
    // they must be static to be useable by lexer
    extern const char static_ops[];
    extern const char selector_list_delims[];
    extern const char complex_selector_delims[];
    extern const char selector_combinator_ops[];
    extern const char attribute_compare_modifiers[];
    extern const char selector_lookahead_ops[];

    // byte order marks
    // (taken from http://en.wikipedia.org/wiki/Byte_order_mark)
    extern const unsigned char utf_8_bom[];
    extern const unsigned char utf_16_bom_be[];
    extern const unsigned char utf_16_bom_le[];
    extern const unsigned char utf_32_bom_be[];
    extern const unsigned char utf_32_bom_le[];
    extern const unsigned char utf_7_bom_1[];
    extern const unsigned char utf_7_bom_2[];
    extern const unsigned char utf_7_bom_3[];
    extern const unsigned char utf_7_bom_4[];
    extern const unsigned char utf_7_bom_5[];
    extern const unsigned char utf_1_bom[];
    extern const unsigned char utf_ebcdic_bom[];
    extern const unsigned char scsu_bom[];
    extern const unsigned char bocu_1_bom[];
    extern const unsigned char gb_18030_bom[];

  }
}

#endif
