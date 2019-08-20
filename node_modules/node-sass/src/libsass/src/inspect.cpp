#include "sass.hpp"
#include <cmath>
#include <string>
#include <iostream>
#include <iomanip>
#include <stdint.h>
#include <stdint.h>

#include "ast.hpp"
#include "inspect.hpp"
#include "context.hpp"
#include "listize.hpp"
#include "color_maps.hpp"
#include "utf8/checked.h"

namespace Sass {

  Inspect::Inspect(const Emitter& emi)
  : Emitter(emi)
  { }
  Inspect::~Inspect() { }

  // statements
  void Inspect::operator()(Block_Ptr block)
  {
    if (!block->is_root()) {
      add_open_mapping(block);
      append_scope_opener();
    }
    if (output_style() == NESTED) indentation += block->tabs();
    for (size_t i = 0, L = block->length(); i < L; ++i) {
      (*block)[i]->perform(this);
    }
    if (output_style() == NESTED) indentation -= block->tabs();
    if (!block->is_root()) {
      append_scope_closer();
      add_close_mapping(block);
    }

  }

  void Inspect::operator()(Ruleset_Ptr ruleset)
  {
    if (ruleset->selector()) {
      opt.in_selector = true;
      ruleset->selector()->perform(this);
      opt.in_selector = false;
    }
    if (ruleset->block()) {
      ruleset->block()->perform(this);
    }
  }

  void Inspect::operator()(Keyframe_Rule_Ptr rule)
  {
    if (rule->name()) rule->name()->perform(this);
    if (rule->block()) rule->block()->perform(this);
  }

  void Inspect::operator()(Bubble_Ptr bubble)
  {
    append_indentation();
    append_token("::BUBBLE", bubble);
    append_scope_opener();
    bubble->node()->perform(this);
    append_scope_closer();
  }

  void Inspect::operator()(Media_Block_Ptr media_block)
  {
    append_indentation();
    append_token("@media", media_block);
    append_mandatory_space();
    in_media_block = true;
    media_block->media_queries()->perform(this);
    in_media_block = false;
    media_block->block()->perform(this);
  }

  void Inspect::operator()(Supports_Block_Ptr feature_block)
  {
    append_indentation();
    append_token("@supports", feature_block);
    append_mandatory_space();
    feature_block->condition()->perform(this);
    feature_block->block()->perform(this);
  }

  void Inspect::operator()(At_Root_Block_Ptr at_root_block)
  {
    append_indentation();
    append_token("@at-root ", at_root_block);
    append_mandatory_space();
    if(at_root_block->expression()) at_root_block->expression()->perform(this);
    if(at_root_block->block()) at_root_block->block()->perform(this);
  }

  void Inspect::operator()(Directive_Ptr at_rule)
  {
    append_indentation();
    append_token(at_rule->keyword(), at_rule);
    if (at_rule->selector()) {
      append_mandatory_space();
      bool was_wrapped = in_wrapped;
      in_wrapped = true;
      at_rule->selector()->perform(this);
      in_wrapped = was_wrapped;
    }
    if (at_rule->value()) {
      append_mandatory_space();
      at_rule->value()->perform(this);
    }
    if (at_rule->block()) {
      at_rule->block()->perform(this);
    }
    else {
      append_delimiter();
    }
  }

  void Inspect::operator()(Declaration_Ptr dec)
  {
    if (dec->value()->concrete_type() == Expression::NULL_VAL) return;
    bool was_decl = in_declaration;
    in_declaration = true;
    LOCAL_FLAG(in_custom_property, dec->is_custom_property());

    if (output_style() == NESTED)
      indentation += dec->tabs();
    append_indentation();
    if (dec->property())
      dec->property()->perform(this);
    append_colon_separator();

    if (dec->value()->concrete_type() == Expression::SELECTOR) {
      Listize listize;
      Expression_Obj ls = dec->value()->perform(&listize);
      ls->perform(this);
    } else {
      dec->value()->perform(this);
    }

    if (dec->is_important()) {
      append_optional_space();
      append_string("!important");
    }
    append_delimiter();
    if (output_style() == NESTED)
      indentation -= dec->tabs();
    in_declaration = was_decl;
  }

  void Inspect::operator()(Assignment_Ptr assn)
  {
    append_token(assn->variable(), assn);
    append_colon_separator();
    assn->value()->perform(this);
    if (assn->is_default()) {
      append_optional_space();
      append_string("!default");
    }
    append_delimiter();
  }

  void Inspect::operator()(Import_Ptr import)
  {
    if (!import->urls().empty()) {
      append_token("@import", import);
      append_mandatory_space();

      import->urls().front()->perform(this);
      if (import->urls().size() == 1) {
        if (import->import_queries()) {
          append_mandatory_space();
          import->import_queries()->perform(this);
        }
      }
      append_delimiter();
      for (size_t i = 1, S = import->urls().size(); i < S; ++i) {
        append_mandatory_linefeed();
        append_token("@import", import);
        append_mandatory_space();

        import->urls()[i]->perform(this);
        if (import->urls().size() - 1 == i) {
          if (import->import_queries()) {
            append_mandatory_space();
            import->import_queries()->perform(this);
          }
        }
        append_delimiter();
      }
    }
  }

  void Inspect::operator()(Import_Stub_Ptr import)
  {
    append_indentation();
    append_token("@import", import);
    append_mandatory_space();
    append_string(import->imp_path());
    append_delimiter();
  }

  void Inspect::operator()(Warning_Ptr warning)
  {
    append_indentation();
    append_token("@warn", warning);
    append_mandatory_space();
    warning->message()->perform(this);
    append_delimiter();
  }

  void Inspect::operator()(Error_Ptr error)
  {
    append_indentation();
    append_token("@error", error);
    append_mandatory_space();
    error->message()->perform(this);
    append_delimiter();
  }

  void Inspect::operator()(Debug_Ptr debug)
  {
    append_indentation();
    append_token("@debug", debug);
    append_mandatory_space();
    debug->value()->perform(this);
    append_delimiter();
  }

  void Inspect::operator()(Comment_Ptr comment)
  {
    in_comment = true;
    comment->text()->perform(this);
    in_comment = false;
  }

  void Inspect::operator()(If_Ptr cond)
  {
    append_indentation();
    append_token("@if", cond);
    append_mandatory_space();
    cond->predicate()->perform(this);
    cond->block()->perform(this);
    if (cond->alternative()) {
      append_optional_linefeed();
      append_indentation();
      append_string("else");
      cond->alternative()->perform(this);
    }
  }

  void Inspect::operator()(For_Ptr loop)
  {
    append_indentation();
    append_token("@for", loop);
    append_mandatory_space();
    append_string(loop->variable());
    append_string(" from ");
    loop->lower_bound()->perform(this);
    append_string(loop->is_inclusive() ? " through " : " to ");
    loop->upper_bound()->perform(this);
    loop->block()->perform(this);
  }

  void Inspect::operator()(Each_Ptr loop)
  {
    append_indentation();
    append_token("@each", loop);
    append_mandatory_space();
    append_string(loop->variables()[0]);
    for (size_t i = 1, L = loop->variables().size(); i < L; ++i) {
      append_comma_separator();
      append_string(loop->variables()[i]);
    }
    append_string(" in ");
    loop->list()->perform(this);
    loop->block()->perform(this);
  }

  void Inspect::operator()(While_Ptr loop)
  {
    append_indentation();
    append_token("@while", loop);
    append_mandatory_space();
    loop->predicate()->perform(this);
    loop->block()->perform(this);
  }

  void Inspect::operator()(Return_Ptr ret)
  {
    append_indentation();
    append_token("@return", ret);
    append_mandatory_space();
    ret->value()->perform(this);
    append_delimiter();
  }

  void Inspect::operator()(Extension_Ptr extend)
  {
    append_indentation();
    append_token("@extend", extend);
    append_mandatory_space();
    extend->selector()->perform(this);
    append_delimiter();
  }

  void Inspect::operator()(Definition_Ptr def)
  {
    append_indentation();
    if (def->type() == Definition::MIXIN) {
      append_token("@mixin", def);
      append_mandatory_space();
    } else {
      append_token("@function", def);
      append_mandatory_space();
    }
    append_string(def->name());
    def->parameters()->perform(this);
    def->block()->perform(this);
  }

  void Inspect::operator()(Mixin_Call_Ptr call)
  {
    append_indentation();
    append_token("@include", call);
    append_mandatory_space();
    append_string(call->name());
    if (call->arguments()) {
      call->arguments()->perform(this);
    }
    if (call->block()) {
      append_optional_space();
      call->block()->perform(this);
    }
    if (!call->block()) append_delimiter();
  }

  void Inspect::operator()(Content_Ptr content)
  {
    append_indentation();
    append_token("@content", content);
    append_delimiter();
  }

  void Inspect::operator()(Map_Ptr map)
  {
    if (output_style() == TO_SASS && map->empty()) {
      append_string("()");
      return;
    }
    if (map->empty()) return;
    if (map->is_invisible()) return;
    bool items_output = false;
    append_string("(");
    for (auto key : map->keys()) {
      if (items_output) append_comma_separator();
      key->perform(this);
      append_colon_separator();
      LOCAL_FLAG(in_space_array, true);
      LOCAL_FLAG(in_comma_array, true);
      map->at(key)->perform(this);
      items_output = true;
    }
    append_string(")");
  }

  std::string Inspect::lbracket(List_Ptr list) {
    return list->is_bracketed() ? "[" : "(";
  }

  std::string Inspect::rbracket(List_Ptr list) {
    return list->is_bracketed() ? "]" : ")";
  }

  void Inspect::operator()(List_Ptr list)
  {
    if (list->empty() && (output_style() == TO_SASS || list->is_bracketed())) {
      append_string(lbracket(list));
      append_string(rbracket(list));
      return;
    }
    std::string sep(list->separator() == SASS_SPACE ? " " : ",");
    if ((output_style() != COMPRESSED) && sep == ",") sep += " ";
    else if (in_media_block && sep != " ") sep += " "; // verified
    if (list->empty()) return;
    bool items_output = false;

    bool was_space_array = in_space_array;
    bool was_comma_array = in_comma_array;
    // if the list is bracketed, always include the left bracket
    if (list->is_bracketed()) {
      append_string(lbracket(list));
    }
    // probably ruby sass eqivalent of element_needs_parens
    else if (output_style() == TO_SASS &&
        list->length() == 1 &&
        !list->from_selector() &&
        !Cast<List>(list->at(0)) &&
        !Cast<Selector_List>(list->at(0))
    ) {
      append_string(lbracket(list));
    }
    else if (!in_declaration && (list->separator() == SASS_HASH ||
        (list->separator() == SASS_SPACE && in_space_array) ||
        (list->separator() == SASS_COMMA && in_comma_array)
    )) {
      append_string(lbracket(list));
    }

    if (list->separator() == SASS_SPACE) in_space_array = true;
    else if (list->separator() == SASS_COMMA) in_comma_array = true;

    for (size_t i = 0, L = list->size(); i < L; ++i) {
      if (list->separator() == SASS_HASH)
      { sep[0] = i % 2 ? ':' : ','; }
      Expression_Obj list_item = list->at(i);
      if (output_style() != TO_SASS) {
        if (list_item->is_invisible()) {
          // this fixes an issue with "" in a list
          if (!Cast<String_Constant>(list_item)) {
            continue;
          }
        }
      }
      if (items_output) {
        append_string(sep);
      }
      if (items_output && sep != " ")
        append_optional_space();
      list_item->perform(this);
      items_output = true;
    }

    in_comma_array = was_comma_array;
    in_space_array = was_space_array;

    // if the list is bracketed, always include the right bracket
    if (list->is_bracketed()) {
      if (list->separator() == SASS_COMMA && list->size() == 1) {
        append_string(",");
      }
      append_string(rbracket(list));
    }
    // probably ruby sass eqivalent of element_needs_parens
    else if (output_style() == TO_SASS &&
        list->length() == 1 &&
        !list->from_selector() &&
        !Cast<List>(list->at(0)) &&
        !Cast<Selector_List>(list->at(0))
    ) {
      append_string(",");
      append_string(rbracket(list));
    }
    else if (!in_declaration && (list->separator() == SASS_HASH ||
        (list->separator() == SASS_SPACE && in_space_array) ||
        (list->separator() == SASS_COMMA && in_comma_array)
    )) {
      append_string(rbracket(list));
    }

  }

  void Inspect::operator()(Binary_Expression_Ptr expr)
  {
    expr->left()->perform(this);
    if ( in_media_block ||
         (output_style() == INSPECT) || (
          expr->op().ws_before
          && (!expr->is_interpolant())
          && (expr->is_left_interpolant() ||
              expr->is_right_interpolant())

    )) append_string(" ");
    switch (expr->optype()) {
      case Sass_OP::AND: append_string("&&"); break;
      case Sass_OP::OR:  append_string("||");  break;
      case Sass_OP::EQ:  append_string("==");  break;
      case Sass_OP::NEQ: append_string("!=");  break;
      case Sass_OP::GT:  append_string(">");   break;
      case Sass_OP::GTE: append_string(">=");  break;
      case Sass_OP::LT:  append_string("<");   break;
      case Sass_OP::LTE: append_string("<=");  break;
      case Sass_OP::ADD: append_string("+");   break;
      case Sass_OP::SUB: append_string("-");   break;
      case Sass_OP::MUL: append_string("*");   break;
      case Sass_OP::DIV: append_string("/"); break;
      case Sass_OP::MOD: append_string("%");   break;
      default: break; // shouldn't get here
    }
    if ( in_media_block ||
         (output_style() == INSPECT) || (
          expr->op().ws_after
          && (!expr->is_interpolant())
          && (expr->is_left_interpolant() ||
              expr->is_right_interpolant())
    )) append_string(" ");
    expr->right()->perform(this);
  }

  void Inspect::operator()(Unary_Expression_Ptr expr)
  {
    if (expr->optype() == Unary_Expression::PLUS)       append_string("+");
    else if (expr->optype() == Unary_Expression::SLASH) append_string("/");
    else                                                append_string("-");
    expr->operand()->perform(this);
  }

  void Inspect::operator()(Function_Call_Ptr call)
  {
    append_token(call->name(), call);
    call->arguments()->perform(this);
  }

  void Inspect::operator()(Function_Call_Schema_Ptr call)
  {
    call->name()->perform(this);
    call->arguments()->perform(this);
  }

  void Inspect::operator()(Variable_Ptr var)
  {
    append_token(var->name(), var);
  }

  void Inspect::operator()(Number_Ptr n)
  {

    std::string res;

    // reduce units
    n->reduce();

    // check if the fractional part of the value equals to zero
    // neat trick from http://stackoverflow.com/a/1521682/1550314
    // double int_part; bool is_int = modf(value, &int_part) == 0.0;

    // this all cannot be done with one run only, since fixed
    // output differs from normal output and regular output
    // can contain scientific notation which we do not want!

    // first sample
    std::stringstream ss;
    ss.precision(12);
    ss << n->value();

    // check if we got scientific notation in result
    if (ss.str().find_first_of("e") != std::string::npos) {
      ss.clear(); ss.str(std::string());
      ss.precision(std::max(12, opt.precision));
      ss << std::fixed << n->value();
    }

    std::string tmp = ss.str();
    size_t pos_point = tmp.find_first_of(".,");
    size_t pos_fract = tmp.find_last_not_of("0");
    bool is_int = pos_point == pos_fract ||
                  pos_point == std::string::npos;

    // reset stream for another run
    ss.clear(); ss.str(std::string());

    // take a shortcut for integers
    if (is_int)
    {
      ss.precision(0);
      ss << std::fixed << n->value();
      res = std::string(ss.str());
    }
    // process floats
    else
    {
      // do we have have too much precision?
      if (pos_fract < opt.precision + pos_point)
      { ss.precision((int)(pos_fract - pos_point)); }
      else { ss.precision(opt.precision); }
      // round value again
      ss << std::fixed << n->value();
      res = std::string(ss.str());
      // maybe we truncated up to decimal point
      size_t pos = res.find_last_not_of("0");
      // handle case where we have a "0"
      if (pos == std::string::npos) {
        res = "0.0";
      } else {
        bool at_dec_point = res[pos] == '.' ||
                            res[pos] == ',';
        // don't leave a blank point
        if (at_dec_point) ++ pos;
        res.resize (pos + 1);
      }
    }

    // some final cosmetics
    if (res == "0.0") res = "0";
    else if (res == "") res = "0";
    else if (res == "-0") res = "0";
    else if (res == "-0.0") res = "0";
    else if (opt.output_style == COMPRESSED)
    {
      // check if handling negative nr
      size_t off = res[0] == '-' ? 1 : 0;
      // remove leading zero from floating point in compressed mode
      if (n->zero() && res[off] == '0' && res[off+1] == '.') res.erase(off, 1);
    }

    // add unit now
    res += n->unit();

    // output the final token
    append_token(res, n);
  }

  // helper function for serializing colors
  template <size_t range>
  static double cap_channel(double c) {
    if      (c > range) return range;
    else if (c < 0)     return 0;
    else                return c;
  }

  void Inspect::operator()(Color_Ptr c)
  {
    // output the final token
    std::stringstream ss;

    // original color name
    // maybe an unknown token
    std::string name = c->disp();

    if (opt.in_selector && name != "") {
      append_token(name, c);
      return;
    }

    // resolved color
    std::string res_name = name;

    double r = Sass::round(cap_channel<0xff>(c->r()), opt.precision);
    double g = Sass::round(cap_channel<0xff>(c->g()), opt.precision);
    double b = Sass::round(cap_channel<0xff>(c->b()), opt.precision);
    double a = cap_channel<1>   (c->a());

    // get color from given name (if one was given at all)
    if (name != "" && name_to_color(name)) {
      Color_Ptr_Const n = name_to_color(name);
      r = Sass::round(cap_channel<0xff>(n->r()), opt.precision);
      g = Sass::round(cap_channel<0xff>(n->g()), opt.precision);
      b = Sass::round(cap_channel<0xff>(n->b()), opt.precision);
      a = cap_channel<1>   (n->a());
    }
    // otherwise get the possible resolved color name
    else {
      double numval = r * 0x10000 + g * 0x100 + b;
      if (color_to_name(numval))
        res_name = color_to_name(numval);
    }

    std::stringstream hexlet;
    // dart sass compressed all colors in regular css always
    // ruby sass and libsass does it only when not delayed
    // since color math is going to be removed, this can go too
    bool compressed = opt.output_style == COMPRESSED;
    hexlet << '#' << std::setw(1) << std::setfill('0');
    // create a short color hexlet if there is any need for it
    if (compressed && is_color_doublet(r, g, b) && a == 1) {
      hexlet << std::hex << std::setw(1) << (static_cast<unsigned long>(r) >> 4);
      hexlet << std::hex << std::setw(1) << (static_cast<unsigned long>(g) >> 4);
      hexlet << std::hex << std::setw(1) << (static_cast<unsigned long>(b) >> 4);
    } else {
      hexlet << std::hex << std::setw(2) << static_cast<unsigned long>(r);
      hexlet << std::hex << std::setw(2) << static_cast<unsigned long>(g);
      hexlet << std::hex << std::setw(2) << static_cast<unsigned long>(b);
    }

    if (compressed && !c->is_delayed()) name = "";
    if (opt.output_style == INSPECT && a >= 1) {
      append_token(hexlet.str(), c);
      return;
    }

    // retain the originally specified color definition if unchanged
    if (name != "") {
      ss << name;
    }
    else if (a >= 1) {
      if (res_name != "") {
        if (compressed && hexlet.str().size() < res_name.size()) {
          ss << hexlet.str();
        } else {
          ss << res_name;
        }
      }
      else {
        ss << hexlet.str();
      }
    }
    else {
      ss << "rgba(";
      ss << static_cast<unsigned long>(r) << ",";
      if (!compressed) ss << " ";
      ss << static_cast<unsigned long>(g) << ",";
      if (!compressed) ss << " ";
      ss << static_cast<unsigned long>(b) << ",";
      if (!compressed) ss << " ";
      ss << a << ')';
    }

    append_token(ss.str(), c);

  }

  void Inspect::operator()(Boolean_Ptr b)
  {
    // output the final token
    append_token(b->value() ? "true" : "false", b);
  }

  void Inspect::operator()(String_Schema_Ptr ss)
  {
    // Evaluation should turn these into String_Constants,
    // so this method is only for inspection purposes.
    for (size_t i = 0, L = ss->length(); i < L; ++i) {
      if ((*ss)[i]->is_interpolant()) append_string("#{");
      (*ss)[i]->perform(this);
      if ((*ss)[i]->is_interpolant()) append_string("}");
    }
  }

  void Inspect::operator()(String_Constant_Ptr s)
  {
    append_token(s->value(), s);
  }

  void Inspect::operator()(String_Quoted_Ptr s)
  {
    if (const char q = s->quote_mark()) {
      append_token(quote(s->value(), q), s);
    } else {
      append_token(s->value(), s);
    }
  }

  void Inspect::operator()(Custom_Error_Ptr e)
  {
    append_token(e->message(), e);
  }

  void Inspect::operator()(Custom_Warning_Ptr w)
  {
    append_token(w->message(), w);
  }

  void Inspect::operator()(Supports_Operator_Ptr so)
  {

    if (so->needs_parens(so->left())) append_string("(");
    so->left()->perform(this);
    if (so->needs_parens(so->left())) append_string(")");

    if (so->operand() == Supports_Operator::AND) {
      append_mandatory_space();
      append_token("and", so);
      append_mandatory_space();
    } else if (so->operand() == Supports_Operator::OR) {
      append_mandatory_space();
      append_token("or", so);
      append_mandatory_space();
    }

    if (so->needs_parens(so->right())) append_string("(");
    so->right()->perform(this);
    if (so->needs_parens(so->right())) append_string(")");
  }

  void Inspect::operator()(Supports_Negation_Ptr sn)
  {
    append_token("not", sn);
    append_mandatory_space();
    if (sn->needs_parens(sn->condition())) append_string("(");
    sn->condition()->perform(this);
    if (sn->needs_parens(sn->condition())) append_string(")");
  }

  void Inspect::operator()(Supports_Declaration_Ptr sd)
  {
    append_string("(");
    sd->feature()->perform(this);
    append_string(": ");
    sd->value()->perform(this);
    append_string(")");
  }

  void Inspect::operator()(Supports_Interpolation_Ptr sd)
  {
    sd->value()->perform(this);
  }

  void Inspect::operator()(Media_Query_Ptr mq)
  {
    size_t i = 0;
    if (mq->media_type()) {
      if      (mq->is_negated())    append_string("not ");
      else if (mq->is_restricted()) append_string("only ");
      mq->media_type()->perform(this);
    }
    else {
      (*mq)[i++]->perform(this);
    }
    for (size_t L = mq->length(); i < L; ++i) {
      append_string(" and ");
      (*mq)[i]->perform(this);
    }
  }

  void Inspect::operator()(Media_Query_Expression_Ptr mqe)
  {
    if (mqe->is_interpolated()) {
      mqe->feature()->perform(this);
    }
    else {
      append_string("(");
      mqe->feature()->perform(this);
      if (mqe->value()) {
        append_string(": "); // verified
        mqe->value()->perform(this);
      }
      append_string(")");
    }
  }

  void Inspect::operator()(At_Root_Query_Ptr ae)
  {
    if (ae->feature()) {
      append_string("(");
      ae->feature()->perform(this);
      if (ae->value()) {
        append_colon_separator();
        ae->value()->perform(this);
      }
      append_string(")");
    }
  }

  void Inspect::operator()(Function_Ptr f)
  {
    append_token("get-function", f);
    append_string("(");
    append_string(quote(f->name()));
    append_string(")");
  }

  void Inspect::operator()(Null_Ptr n)
  {
    // output the final token
    append_token("null", n);
  }

  // parameters and arguments
  void Inspect::operator()(Parameter_Ptr p)
  {
    append_token(p->name(), p);
    if (p->default_value()) {
      append_colon_separator();
      p->default_value()->perform(this);
    }
    else if (p->is_rest_parameter()) {
      append_string("...");
    }
  }

  void Inspect::operator()(Parameters_Ptr p)
  {
    append_string("(");
    if (!p->empty()) {
      (*p)[0]->perform(this);
      for (size_t i = 1, L = p->length(); i < L; ++i) {
        append_comma_separator();
        (*p)[i]->perform(this);
      }
    }
    append_string(")");
  }

  void Inspect::operator()(Argument_Ptr a)
  {
    if (!a->name().empty()) {
      append_token(a->name(), a);
      append_colon_separator();
    }
    if (!a->value()) return;
    // Special case: argument nulls can be ignored
    if (a->value()->concrete_type() == Expression::NULL_VAL) {
      return;
    }
    if (a->value()->concrete_type() == Expression::STRING) {
      String_Constant_Ptr s = Cast<String_Constant>(a->value());
      if (s) s->perform(this);
    } else {
      a->value()->perform(this);
    }
    if (a->is_rest_argument()) {
      append_string("...");
    }
  }

  void Inspect::operator()(Arguments_Ptr a)
  {
    append_string("(");
    if (!a->empty()) {
      (*a)[0]->perform(this);
      for (size_t i = 1, L = a->length(); i < L; ++i) {
        append_string(", "); // verified
        // Sass Bug? append_comma_separator();
        (*a)[i]->perform(this);
      }
    }
    append_string(")");
  }

  void Inspect::operator()(Selector_Schema_Ptr s)
  {
    opt.in_selector = true;
    s->contents()->perform(this);
    opt.in_selector = false;
  }

  void Inspect::operator()(Parent_Selector_Ptr p)
  {
    if (p->is_real_parent_ref()) append_string("&");
  }

  void Inspect::operator()(Placeholder_Selector_Ptr s)
  {
    append_token(s->name(), s);
    if (s->has_line_break()) append_optional_linefeed();
    if (s->has_line_break()) append_indentation();

  }

  void Inspect::operator()(Element_Selector_Ptr s)
  {
    append_token(s->ns_name(), s);
  }

  void Inspect::operator()(Class_Selector_Ptr s)
  {
    append_token(s->ns_name(), s);
    if (s->has_line_break()) append_optional_linefeed();
    if (s->has_line_break()) append_indentation();
  }

  void Inspect::operator()(Id_Selector_Ptr s)
  {
    append_token(s->ns_name(), s);
    if (s->has_line_break()) append_optional_linefeed();
    if (s->has_line_break()) append_indentation();
  }

  void Inspect::operator()(Attribute_Selector_Ptr s)
  {
    append_string("[");
    add_open_mapping(s);
    append_token(s->ns_name(), s);
    if (!s->matcher().empty()) {
      append_string(s->matcher());
      if (s->value() && *s->value()) {
        s->value()->perform(this);
      }
    }
    add_close_mapping(s);
    if (s->modifier() != 0) {
      append_mandatory_space();
      append_char(s->modifier());
    }
    append_string("]");
  }

  void Inspect::operator()(Pseudo_Selector_Ptr s)
  {
    append_token(s->ns_name(), s);
    if (s->expression()) {
      append_string("(");
      s->expression()->perform(this);
      append_string(")");
    }
  }

  void Inspect::operator()(Wrapped_Selector_Ptr s)
  {
    if (s->name() == " ") {
      append_string("");
    } else {
      bool was = in_wrapped;
      in_wrapped = true;
      append_token(s->name(), s);
      append_string("(");
      bool was_comma_array = in_comma_array;
      in_comma_array = false;
      s->selector()->perform(this);
      in_comma_array = was_comma_array;
      append_string(")");
      in_wrapped = was;
    }
  }

  void Inspect::operator()(Compound_Selector_Ptr s)
  {
    for (size_t i = 0, L = s->length(); i < L; ++i) {
      (*s)[i]->perform(this);
    }
    if (s->has_line_break()) {
      if (output_style() != COMPACT) {
        append_optional_linefeed();
      }
    }
  }

  void Inspect::operator()(Complex_Selector_Ptr c)
  {
    Compound_Selector_Obj      head = c->head();
    Complex_Selector_Obj            tail = c->tail();
    Complex_Selector::Combinator comb = c->combinator();

    if (comb == Complex_Selector::ANCESTOR_OF && (!head || head->empty())) {
      if (tail) tail->perform(this);
      return;
    }

    if (c->has_line_feed()) {
      if (!(c->has_parent_ref())) {
        append_optional_linefeed();
        append_indentation();
      }
    }

    if (head && head->length() != 0) head->perform(this);
    bool is_empty = !head || head->length() == 0 || head->is_empty_reference();
    bool is_tail = head && !head->is_empty_reference() && tail;
    if (output_style() == COMPRESSED && comb != Complex_Selector::ANCESTOR_OF) scheduled_space = 0;

    switch (comb) {
      case Complex_Selector::ANCESTOR_OF:
        if (is_tail) append_mandatory_space();
      break;
      case Complex_Selector::PARENT_OF:
        append_optional_space();
        append_string(">");
        append_optional_space();
      break;
      case Complex_Selector::ADJACENT_TO:
        append_optional_space();
        append_string("+");
        append_optional_space();
      break;
      case Complex_Selector::REFERENCE:
        append_mandatory_space();
        append_string("/");
        if (c->reference()) c->reference()->perform(this);
        append_string("/");
        append_mandatory_space();
      break;
      case Complex_Selector::PRECEDES:
        if (is_empty) append_optional_space();
        else append_mandatory_space();
        append_string("~");
        if (tail) append_mandatory_space();
        else append_optional_space();
      break;
      default: break;
    }
    if (tail && comb != Complex_Selector::ANCESTOR_OF) {
      if (c->has_line_break()) append_optional_linefeed();
    }
    if (tail) tail->perform(this);
    if (!tail && c->has_line_break()) {
      if (output_style() == COMPACT) {
        append_mandatory_space();
      }
    }
  }

  void Inspect::operator()(Selector_List_Ptr g)
  {

    if (g->empty()) {
      if (output_style() == TO_SASS) {
        append_token("()", g);
      }
      return;
    }


    bool was_comma_array = in_comma_array;
    // probably ruby sass eqivalent of element_needs_parens
    if (output_style() == TO_SASS && g->length() == 1 &&
      (!Cast<List>((*g)[0]) &&
       !Cast<Selector_List>((*g)[0]))) {
      append_string("(");
    }
    else if (!in_declaration && in_comma_array) {
      append_string("(");
    }

    if (in_declaration) in_comma_array = true;

    for (size_t i = 0, L = g->length(); i < L; ++i) {
      if (!in_wrapped && i == 0) append_indentation();
      if ((*g)[i] == 0) continue;
      schedule_mapping(g->at(i)->last());
      // add_open_mapping((*g)[i]->last());
      (*g)[i]->perform(this);
      // add_close_mapping((*g)[i]->last());
      if (i < L - 1) {
        scheduled_space = 0;
        append_comma_separator();
      }
    }

    in_comma_array = was_comma_array;
    // probably ruby sass eqivalent of element_needs_parens
    if (output_style() == TO_SASS && g->length() == 1 &&
      (!Cast<List>((*g)[0]) &&
       !Cast<Selector_List>((*g)[0]))) {
      append_string(",)");
    }
    else if (!in_declaration && in_comma_array) {
      append_string(")");
    }

  }

  void Inspect::fallback_impl(AST_Node_Ptr n)
  {
  }

}
