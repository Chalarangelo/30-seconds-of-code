#include "sass.hpp"
#include "ast.hpp"
#include "output.hpp"

namespace Sass {

  Output::Output(Sass_Output_Options& opt)
  : Inspect(Emitter(opt)),
    charset(""),
    top_nodes(0)
  {}

  Output::~Output() { }

  void Output::fallback_impl(AST_Node_Ptr n)
  {
    return n->perform(this);
  }

  void Output::operator()(Number_Ptr n)
  {
    // check for a valid unit here
    // includes result for reporting
    if (!n->is_valid_css_unit()) {
      // should be handle in check_expression
      throw Exception::InvalidValue({}, *n);
    }
    // use values to_string facility
    std::string res = n->to_string(opt);
    // output the final token
    append_token(res, n);
  }

  void Output::operator()(Import_Ptr imp)
  {
    top_nodes.push_back(imp);
  }

  void Output::operator()(Map_Ptr m)
  {
    // should be handle in check_expression
    throw Exception::InvalidValue({}, *m);
  }

  OutputBuffer Output::get_buffer(void)
  {

    Emitter emitter(opt);
    Inspect inspect(emitter);

    size_t size_nodes = top_nodes.size();
    for (size_t i = 0; i < size_nodes; i++) {
      top_nodes[i]->perform(&inspect);
      inspect.append_mandatory_linefeed();
    }

    // flush scheduled outputs
    // maybe omit semicolon if possible
    inspect.finalize(wbuf.buffer.size() == 0);
    // prepend buffer on top
    prepend_output(inspect.output());
    // make sure we end with a linefeed
    if (!ends_with(wbuf.buffer, opt.linefeed)) {
      // if the output is not completely empty
      if (!wbuf.buffer.empty()) append_string(opt.linefeed);
    }

    // search for unicode char
    for(const char& chr : wbuf.buffer) {
      // skip all ascii chars
      // static cast to unsigned to handle `char` being signed / unsigned
      if (static_cast<unsigned>(chr) < 128) continue;
      // declare the charset
      if (output_style() != COMPRESSED)
        charset = "@charset \"UTF-8\";"
                + std::string(opt.linefeed);
      else charset = "\xEF\xBB\xBF";
      // abort search
      break;
    }

    // add charset as first line, before comments and imports
    if (!charset.empty()) prepend_string(charset);

    return wbuf;

  }

  void Output::operator()(Comment_Ptr c)
  {
    std::string txt = c->text()->to_string(opt);
    // if (indentation && txt == "/**/") return;
    bool important = c->is_important();
    if (output_style() != COMPRESSED || important) {
      if (buffer().size() == 0) {
        top_nodes.push_back(c);
      } else {
        in_comment = true;
        append_indentation();
        c->text()->perform(this);
        in_comment = false;
        if (indentation == 0) {
          append_mandatory_linefeed();
        } else {
          append_optional_linefeed();
        }
      }
    }
  }

  void Output::operator()(Ruleset_Ptr r)
  {
    Selector_Obj s     = r->selector();
    Block_Obj    b     = r->block();

    // Filter out rulesets that aren't printable (process its children though)
    if (!Util::isPrintable(r, output_style())) {
      for (size_t i = 0, L = b->length(); i < L; ++i) {
        const Statement_Obj& stm = b->at(i);
        if (Cast<Has_Block>(stm)) {
          if (!Cast<Declaration>(stm)) {
            stm->perform(this);
          }
        }
      }
      return;
    }

    if (output_style() == NESTED) indentation += r->tabs();
    if (opt.source_comments) {
      std::stringstream ss;
      append_indentation();
      std::string path(File::abs2rel(r->pstate().path));
      ss << "/* line " << r->pstate().line + 1 << ", " << path << " */";
      append_string(ss.str());
      append_optional_linefeed();
    }
    scheduled_crutch = s;
    if (s) s->perform(this);
    append_scope_opener(b);
    for (size_t i = 0, L = b->length(); i < L; ++i) {
      Statement_Obj stm = b->at(i);
      bool bPrintExpression = true;
      // Check print conditions
      if (Declaration_Ptr dec = Cast<Declaration>(stm)) {
        if (String_Constant_Ptr valConst = Cast<String_Constant>(dec->value())) {
          std::string val(valConst->value());
          if (String_Quoted_Ptr qstr = Cast<String_Quoted>(valConst)) {
            if (!qstr->quote_mark() && val.empty()) {
              bPrintExpression = false;
            }
          }
        }
        else if (List_Ptr list = Cast<List>(dec->value())) {
          bool all_invisible = true;
          for (size_t list_i = 0, list_L = list->length(); list_i < list_L; ++list_i) {
            Expression_Ptr item = list->at(list_i);
            if (!item->is_invisible()) all_invisible = false;
          }
          if (all_invisible && !list->is_bracketed()) bPrintExpression = false;
        }
      }
      // Print if OK
      if (bPrintExpression) {
        stm->perform(this);
      }
    }
    if (output_style() == NESTED) indentation -= r->tabs();
    append_scope_closer(b);

  }
  void Output::operator()(Keyframe_Rule_Ptr r)
  {
    Block_Obj b = r->block();
    Selector_Obj v = r->name();

    if (!v.isNull()) {
      v->perform(this);
    }

    if (!b) {
      append_colon_separator();
      return;
    }

    append_scope_opener();
    for (size_t i = 0, L = b->length(); i < L; ++i) {
      Statement_Obj stm = b->at(i);
      stm->perform(this);
      if (i < L - 1) append_special_linefeed();
    }
    append_scope_closer();
  }

  void Output::operator()(Supports_Block_Ptr f)
  {
    if (f->is_invisible()) return;

    Supports_Condition_Obj c = f->condition();
    Block_Obj b              = f->block();

    // Filter out feature blocks that aren't printable (process its children though)
    if (!Util::isPrintable(f, output_style())) {
      for (size_t i = 0, L = b->length(); i < L; ++i) {
        Statement_Obj stm = b->at(i);
        if (Cast<Has_Block>(stm)) {
          stm->perform(this);
        }
      }
      return;
    }

    if (output_style() == NESTED) indentation += f->tabs();
    append_indentation();
    append_token("@supports", f);
    append_mandatory_space();
    c->perform(this);
    append_scope_opener();

    for (size_t i = 0, L = b->length(); i < L; ++i) {
      Statement_Obj stm = b->at(i);
      stm->perform(this);
      if (i < L - 1) append_special_linefeed();
    }

    if (output_style() == NESTED) indentation -= f->tabs();

    append_scope_closer();

  }

  void Output::operator()(Media_Block_Ptr m)
  {
    if (m->is_invisible()) return;

    Block_Obj b     = m->block();

    // Filter out media blocks that aren't printable (process its children though)
    if (!Util::isPrintable(m, output_style())) {
      for (size_t i = 0, L = b->length(); i < L; ++i) {
        Statement_Obj stm = b->at(i);
        if (Cast<Has_Block>(stm)) {
          stm->perform(this);
        }
      }
      return;
    }
    if (output_style() == NESTED) indentation += m->tabs();
    append_indentation();
    append_token("@media", m);
    append_mandatory_space();
    in_media_block = true;
    m->media_queries()->perform(this);
    in_media_block = false;
    append_scope_opener();

    for (size_t i = 0, L = b->length(); i < L; ++i) {
      if (b->at(i)) {
      Statement_Obj stm = b->at(i);
        stm->perform(this);
      }
      if (i < L - 1) append_special_linefeed();
    }

    if (output_style() == NESTED) indentation -= m->tabs();
    append_scope_closer();
  }

  void Output::operator()(Directive_Ptr a)
  {
    std::string      kwd   = a->keyword();
    Selector_Obj   s     = a->selector();
    Expression_Obj v     = a->value();
    Block_Obj      b     = a->block();

    append_indentation();
    append_token(kwd, a);
    if (s) {
      append_mandatory_space();
      in_wrapped = true;
      s->perform(this);
      in_wrapped = false;
    }
    if (v) {
      append_mandatory_space();
      // ruby sass bug? should use options?
      append_token(v->to_string(/* opt */), v);
    }
    if (!b) {
      append_delimiter();
      return;
    }

    if (b->is_invisible() || b->length() == 0) {
      append_optional_space();
      return append_string("{}");
    }

    append_scope_opener();

    bool format = kwd != "@font-face";;

    for (size_t i = 0, L = b->length(); i < L; ++i) {
      Statement_Obj stm = b->at(i);
      stm->perform(this);
      if (i < L - 1 && format) append_special_linefeed();
    }

    append_scope_closer();
  }

  void Output::operator()(String_Quoted_Ptr s)
  {
    if (s->quote_mark()) {
      append_token(quote(s->value(), s->quote_mark()), s);
    } else if (!in_comment) {
      append_token(string_to_output(s->value()), s);
    } else {
      append_token(s->value(), s);
    }
  }

  void Output::operator()(String_Constant_Ptr s)
  {
    std::string value(s->value());
    if (s->can_compress_whitespace() && output_style() == COMPRESSED) {
      value.erase(std::remove_if(value.begin(), value.end(), ::isspace), value.end());
    }
    if (!in_comment && !in_custom_property) {
      append_token(string_to_output(value), s);
    } else {
      append_token(value, s);
    }
  }

}
