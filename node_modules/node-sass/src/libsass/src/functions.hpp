#ifndef SASS_FUNCTIONS_H
#define SASS_FUNCTIONS_H

#include "listize.hpp"
#include "position.hpp"
#include "environment.hpp"
#include "ast_fwd_decl.hpp"
#include "sass/functions.h"

#define BUILT_IN(name) Expression_Ptr \
name(Env& env, Env& d_env, Context& ctx, Signature sig, ParserState pstate, Backtraces traces, std::vector<Selector_List_Obj> selector_stack)

namespace Sass {
  struct Backtrace;
  typedef const char* Signature;
  typedef Expression_Ptr (*Native_Function)(Env&, Env&, Context&, Signature, ParserState, Backtraces, std::vector<Selector_List_Obj>);

  Definition_Ptr make_native_function(Signature, Native_Function, Context& ctx);
  Definition_Ptr make_c_function(Sass_Function_Entry c_func, Context& ctx);

  std::string function_name(Signature);

  namespace Functions {

    extern Signature rgb_sig;
    extern Signature rgba_4_sig;
    extern Signature rgba_2_sig;
    extern Signature red_sig;
    extern Signature green_sig;
    extern Signature blue_sig;
    extern Signature mix_sig;
    extern Signature hsl_sig;
    extern Signature hsla_sig;
    extern Signature hue_sig;
    extern Signature saturation_sig;
    extern Signature lightness_sig;
    extern Signature adjust_hue_sig;
    extern Signature lighten_sig;
    extern Signature darken_sig;
    extern Signature saturate_sig;
    extern Signature desaturate_sig;
    extern Signature grayscale_sig;
    extern Signature complement_sig;
    extern Signature invert_sig;
    extern Signature alpha_sig;
    extern Signature opacity_sig;
    extern Signature opacify_sig;
    extern Signature fade_in_sig;
    extern Signature transparentize_sig;
    extern Signature fade_out_sig;
    extern Signature adjust_color_sig;
    extern Signature scale_color_sig;
    extern Signature change_color_sig;
    extern Signature ie_hex_str_sig;
    extern Signature unquote_sig;
    extern Signature quote_sig;
    extern Signature str_length_sig;
    extern Signature str_insert_sig;
    extern Signature str_index_sig;
    extern Signature str_slice_sig;
    extern Signature to_upper_case_sig;
    extern Signature to_lower_case_sig;
    extern Signature percentage_sig;
    extern Signature round_sig;
    extern Signature ceil_sig;
    extern Signature floor_sig;
    extern Signature abs_sig;
    extern Signature min_sig;
    extern Signature max_sig;
    extern Signature inspect_sig;
    extern Signature random_sig;
    extern Signature length_sig;
    extern Signature nth_sig;
    extern Signature index_sig;
    extern Signature join_sig;
    extern Signature append_sig;
    extern Signature zip_sig;
    extern Signature list_separator_sig;
    extern Signature type_of_sig;
    extern Signature unit_sig;
    extern Signature unitless_sig;
    extern Signature comparable_sig;
    extern Signature variable_exists_sig;
    extern Signature global_variable_exists_sig;
    extern Signature function_exists_sig;
    extern Signature mixin_exists_sig;
    extern Signature feature_exists_sig;
    extern Signature call_sig;
    extern Signature not_sig;
    extern Signature if_sig;
    extern Signature map_get_sig;
    extern Signature map_merge_sig;
    extern Signature map_remove_sig;
    extern Signature map_keys_sig;
    extern Signature map_values_sig;
    extern Signature map_has_key_sig;
    extern Signature keywords_sig;
    extern Signature set_nth_sig;
    extern Signature unique_id_sig;
    extern Signature selector_nest_sig;
    extern Signature selector_append_sig;
    extern Signature selector_extend_sig;
    extern Signature selector_replace_sig;
    extern Signature selector_unify_sig;
    extern Signature is_superselector_sig;
    extern Signature simple_selectors_sig;
    extern Signature selector_parse_sig;
    extern Signature is_bracketed_sig;
    extern Signature content_exists_sig;
    extern Signature get_function_sig;

    BUILT_IN(rgb);
    BUILT_IN(rgba_4);
    BUILT_IN(rgba_2);
    BUILT_IN(red);
    BUILT_IN(green);
    BUILT_IN(blue);
    BUILT_IN(mix);
    BUILT_IN(hsl);
    BUILT_IN(hsla);
    BUILT_IN(hue);
    BUILT_IN(saturation);
    BUILT_IN(lightness);
    BUILT_IN(adjust_hue);
    BUILT_IN(lighten);
    BUILT_IN(darken);
    BUILT_IN(saturate);
    BUILT_IN(desaturate);
    BUILT_IN(grayscale);
    BUILT_IN(complement);
    BUILT_IN(invert);
    BUILT_IN(alpha);
    BUILT_IN(opacify);
    BUILT_IN(transparentize);
    BUILT_IN(adjust_color);
    BUILT_IN(scale_color);
    BUILT_IN(change_color);
    BUILT_IN(ie_hex_str);
    BUILT_IN(sass_unquote);
    BUILT_IN(sass_quote);
    BUILT_IN(str_length);
    BUILT_IN(str_insert);
    BUILT_IN(str_index);
    BUILT_IN(str_slice);
    BUILT_IN(to_upper_case);
    BUILT_IN(to_lower_case);
    BUILT_IN(percentage);
    BUILT_IN(round);
    BUILT_IN(ceil);
    BUILT_IN(floor);
    BUILT_IN(abs);
    BUILT_IN(min);
    BUILT_IN(max);
    BUILT_IN(inspect);
    BUILT_IN(random);
    BUILT_IN(length);
    BUILT_IN(nth);
    BUILT_IN(index);
    BUILT_IN(join);
    BUILT_IN(append);
    BUILT_IN(zip);
    BUILT_IN(list_separator);
    BUILT_IN(type_of);
    BUILT_IN(unit);
    BUILT_IN(unitless);
    BUILT_IN(comparable);
    BUILT_IN(variable_exists);
    BUILT_IN(global_variable_exists);
    BUILT_IN(function_exists);
    BUILT_IN(mixin_exists);
    BUILT_IN(feature_exists);
    BUILT_IN(call);
    BUILT_IN(sass_not);
    BUILT_IN(sass_if);
    BUILT_IN(map_get);
    BUILT_IN(map_merge);
    BUILT_IN(map_remove);
    BUILT_IN(map_keys);
    BUILT_IN(map_values);
    BUILT_IN(map_has_key);
    BUILT_IN(keywords);
    BUILT_IN(set_nth);
    BUILT_IN(unique_id);
    BUILT_IN(selector_nest);
    BUILT_IN(selector_append);
    BUILT_IN(selector_extend);
    BUILT_IN(selector_replace);
    BUILT_IN(selector_unify);
    BUILT_IN(is_superselector);
    BUILT_IN(simple_selectors);
    BUILT_IN(selector_parse);
    BUILT_IN(is_bracketed);
    BUILT_IN(content_exists);
    BUILT_IN(get_function);
  }
}

#endif
