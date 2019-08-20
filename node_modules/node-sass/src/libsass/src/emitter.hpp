#ifndef SASS_EMITTER_H
#define SASS_EMITTER_H

#include <string>
#include "sass.hpp"
#include "sass/base.h"
#include "source_map.hpp"
#include "ast_fwd_decl.hpp"

namespace Sass {
  class Context;

  class Emitter {

    public:
      Emitter(struct Sass_Output_Options& opt);
      virtual ~Emitter() { }

    protected:
      OutputBuffer wbuf;
    public:
      const std::string& buffer(void) { return wbuf.buffer; }
      const SourceMap smap(void) { return wbuf.smap; }
      const OutputBuffer output(void) { return wbuf; }
      // proxy methods for source maps
      void add_source_index(size_t idx);
      void set_filename(const std::string& str);
      void add_open_mapping(const AST_Node_Ptr node);
      void add_close_mapping(const AST_Node_Ptr node);
      void schedule_mapping(const AST_Node_Ptr node);
      std::string render_srcmap(Context &ctx);
      ParserState remap(const ParserState& pstate);

    public:
      struct Sass_Output_Options& opt;
      size_t indentation;
      size_t scheduled_space;
      size_t scheduled_linefeed;
      bool scheduled_delimiter;
      AST_Node_Ptr scheduled_crutch;
      AST_Node_Ptr scheduled_mapping;

    public:
      // output strings different in custom css properties
      bool in_custom_property;
      // output strings different in comments
      bool in_comment;
      // selector list does not get linefeeds
      bool in_wrapped;
      // lists always get a space after delimiter
      bool in_media_block;
      // nested list must not have parentheses
      bool in_declaration;
      // nested lists need parentheses
      bool in_space_array;
      bool in_comma_array;

    public:
      // return buffer as std::string
      std::string get_buffer(void);
      // flush scheduled space/linefeed
      Sass_Output_Style output_style(void) const;
      // add outstanding linefeed
      void finalize(bool final = true);
      // flush scheduled space/linefeed
      void flush_schedules(void);
      // prepend some text or token to the buffer
      void prepend_string(const std::string& text);
      void prepend_output(const OutputBuffer& out);
      // append some text or token to the buffer
      void append_string(const std::string& text);
      // append a single character to buffer
      void append_char(const char chr);
      // append some white-space only text
      void append_wspace(const std::string& text);
      // append some text or token to the buffer
      // this adds source-mappings for node start and end
      void append_token(const std::string& text, const AST_Node_Ptr node);
      // query last appended character
      char last_char();

    public: // syntax sugar
      void append_indentation();
      void append_optional_space(void);
      void append_mandatory_space(void);
      void append_special_linefeed(void);
      void append_optional_linefeed(void);
      void append_mandatory_linefeed(void);
      void append_scope_opener(AST_Node_Ptr node = 0);
      void append_scope_closer(AST_Node_Ptr node = 0);
      void append_comma_separator(void);
      void append_colon_separator(void);
      void append_delimiter(void);

  };

}

#endif
