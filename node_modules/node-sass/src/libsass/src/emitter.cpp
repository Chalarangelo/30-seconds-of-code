#include "sass.hpp"
#include "util.hpp"
#include "context.hpp"
#include "output.hpp"
#include "emitter.hpp"
#include "utf8_string.hpp"

namespace Sass {

  Emitter::Emitter(struct Sass_Output_Options& opt)
  : wbuf(),
    opt(opt),
    indentation(0),
    scheduled_space(0),
    scheduled_linefeed(0),
    scheduled_delimiter(false),
    scheduled_crutch(0),
    scheduled_mapping(0),
    in_custom_property(false),
    in_comment(false),
    in_wrapped(false),
    in_media_block(false),
    in_declaration(false),
    in_space_array(false),
    in_comma_array(false)
  { }

  // return buffer as string
  std::string Emitter::get_buffer(void)
  {
    return wbuf.buffer;
  }

  Sass_Output_Style Emitter::output_style(void) const
  {
    return opt.output_style;
  }

  // PROXY METHODS FOR SOURCE MAPS

  void Emitter::add_source_index(size_t idx)
  { wbuf.smap.source_index.push_back(idx); }

  std::string Emitter::render_srcmap(Context &ctx)
  { return wbuf.smap.render_srcmap(ctx); }

  void Emitter::set_filename(const std::string& str)
  { wbuf.smap.file = str; }

  void Emitter::schedule_mapping(const AST_Node_Ptr node)
  { scheduled_mapping = node; }
  void Emitter::add_open_mapping(const AST_Node_Ptr node)
  { wbuf.smap.add_open_mapping(node); }
  void Emitter::add_close_mapping(const AST_Node_Ptr node)
  { wbuf.smap.add_close_mapping(node); }
  ParserState Emitter::remap(const ParserState& pstate)
  { return wbuf.smap.remap(pstate); }

  // MAIN BUFFER MANIPULATION

  // add outstanding delimiter
  void Emitter::finalize(bool final)
  {
    scheduled_space = 0;
    if (output_style() == SASS_STYLE_COMPRESSED)
      if (final) scheduled_delimiter = false;
    if (scheduled_linefeed)
      scheduled_linefeed = 1;
    flush_schedules();
  }

  // flush scheduled space/linefeed
  void Emitter::flush_schedules(void)
  {
    // check the schedule
    if (scheduled_linefeed) {
      std::string linefeeds = "";

      for (size_t i = 0; i < scheduled_linefeed; i++)
        linefeeds += opt.linefeed;
      scheduled_space = 0;
      scheduled_linefeed = 0;
      append_string(linefeeds);

    } else if (scheduled_space) {
      std::string spaces(scheduled_space, ' ');
      scheduled_space = 0;
      append_string(spaces);
    }
    if (scheduled_delimiter) {
      scheduled_delimiter = false;
      append_string(";");
    }
  }

  // prepend some text or token to the buffer
  void Emitter::prepend_output(const OutputBuffer& output)
  {
    wbuf.smap.prepend(output);
    wbuf.buffer = output.buffer + wbuf.buffer;
  }

  // prepend some text or token to the buffer
  void Emitter::prepend_string(const std::string& text)
  {
    // do not adjust mappings for utf8 bom
    // seems they are not counted in any UA
    if (text.compare("\xEF\xBB\xBF") != 0) {
      wbuf.smap.prepend(Offset(text));
    }
    wbuf.buffer = text + wbuf.buffer;
  }

  char Emitter::last_char()
  {
    return wbuf.buffer.back();
  }

  // append a single char to the buffer
  void Emitter::append_char(const char chr)
  {
    // write space/lf
    flush_schedules();
    // add to buffer
    wbuf.buffer += chr;
    // account for data in source-maps
    wbuf.smap.append(Offset(chr));
  }

  // append some text or token to the buffer
  void Emitter::append_string(const std::string& text)
  {

    // write space/lf
    flush_schedules();

    if (in_comment && output_style() == COMPACT) {
      // unescape comment nodes
      std::string out = comment_to_string(text);
      // add to buffer
      wbuf.buffer += out;
      // account for data in source-maps
      wbuf.smap.append(Offset(out));
    } else {
      // add to buffer
      wbuf.buffer += text;
      // account for data in source-maps
      wbuf.smap.append(Offset(text));
    }
  }

  // append some white-space only text
  void Emitter::append_wspace(const std::string& text)
  {
    if (text.empty()) return;
    if (peek_linefeed(text.c_str())) {
      scheduled_space = 0;
      append_mandatory_linefeed();
    }
  }

  // append some text or token to the buffer
  // this adds source-mappings for node start and end
  void Emitter::append_token(const std::string& text, const AST_Node_Ptr node)
  {
    flush_schedules();
    add_open_mapping(node);
    // hotfix for browser issues
    // this is pretty ugly indeed
    if (scheduled_crutch) {
      add_open_mapping(scheduled_crutch);
      scheduled_crutch = 0;
    }
    append_string(text);
    add_close_mapping(node);
  }

  // HELPER METHODS

  void Emitter::append_indentation()
  {
    if (output_style() == COMPRESSED) return;
    if (output_style() == COMPACT) return;
    if (in_declaration && in_comma_array) return;
    if (scheduled_linefeed && indentation)
      scheduled_linefeed = 1;
    std::string indent = "";
    for (size_t i = 0; i < indentation; i++)
      indent += opt.indent;
    append_string(indent);
  }

  void Emitter::append_delimiter()
  {
    scheduled_delimiter = true;
    if (output_style() == COMPACT) {
      if (indentation == 0) {
        append_mandatory_linefeed();
      } else {
        append_mandatory_space();
      }
    } else if (output_style() != COMPRESSED) {
      append_optional_linefeed();
    }
  }

  void Emitter::append_comma_separator()
  {
    // scheduled_space = 0;
    append_string(",");
    append_optional_space();
  }

  void Emitter::append_colon_separator()
  {
    scheduled_space = 0;
    append_string(":");
    if (!in_custom_property) append_optional_space();
  }

  void Emitter::append_mandatory_space()
  {
    scheduled_space = 1;
  }

  void Emitter::append_optional_space()
  {
    if ((output_style() != COMPRESSED) && buffer().size()) {
      unsigned char lst = buffer().at(buffer().length() - 1);
      if (!isspace(lst) || scheduled_delimiter) {
        if (last_char() != '(') {
          append_mandatory_space();
        }
      }
    }
  }

  void Emitter::append_special_linefeed()
  {
    if (output_style() == COMPACT) {
      append_mandatory_linefeed();
      for (size_t p = 0; p < indentation; p++)
        append_string(opt.indent);
    }
  }

  void Emitter::append_optional_linefeed()
  {
    if (in_declaration && in_comma_array) return;
    if (output_style() == COMPACT) {
      append_mandatory_space();
    } else {
      append_mandatory_linefeed();
    }
  }

  void Emitter::append_mandatory_linefeed()
  {
    if (output_style() != COMPRESSED) {
      scheduled_linefeed = 1;
      scheduled_space = 0;
      // flush_schedules();
    }
  }

  void Emitter::append_scope_opener(AST_Node_Ptr node)
  {
    scheduled_linefeed = 0;
    append_optional_space();
    flush_schedules();
    if (node) add_open_mapping(node);
    append_string("{");
    append_optional_linefeed();
    // append_optional_space();
    ++ indentation;
  }
  void Emitter::append_scope_closer(AST_Node_Ptr node)
  {
    -- indentation;
    scheduled_linefeed = 0;
    if (output_style() == COMPRESSED)
      scheduled_delimiter = false;
    if (output_style() == EXPANDED) {
      append_optional_linefeed();
      append_indentation();
    } else {
      append_optional_space();
    }
    append_string("}");
    if (node) add_close_mapping(node);
    append_optional_linefeed();
    if (indentation != 0) return;
    if (output_style() != COMPRESSED)
      scheduled_linefeed = 2;
  }

}
