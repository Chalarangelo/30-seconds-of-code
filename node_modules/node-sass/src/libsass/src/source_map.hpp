#ifndef SASS_SOURCE_MAP_H
#define SASS_SOURCE_MAP_H

#include <string>
#include <vector>

#include "ast_fwd_decl.hpp"
#include "base64vlq.hpp"
#include "position.hpp"
#include "mapping.hpp"

#define VECTOR_PUSH(vec, ins) vec.insert(vec.end(), ins.begin(), ins.end())
#define VECTOR_UNSHIFT(vec, ins) vec.insert(vec.begin(), ins.begin(), ins.end())

namespace Sass {

  class Context;
  class OutputBuffer;

  class SourceMap {

  public:
    std::vector<size_t> source_index;
    SourceMap();
    SourceMap(const std::string& file);

    void append(const Offset& offset);
    void prepend(const Offset& offset);
    void append(const OutputBuffer& out);
    void prepend(const OutputBuffer& out);
    void add_open_mapping(const AST_Node_Ptr node);
    void add_close_mapping(const AST_Node_Ptr node);

    std::string render_srcmap(Context &ctx);
    ParserState remap(const ParserState& pstate);

  private:

    std::string serialize_mappings();

    std::vector<Mapping> mappings;
    Position current_position;
public:
    std::string file;
private:
    Base64VLQ base64vlq;
  };

  class OutputBuffer {
    public:
      OutputBuffer(void)
      : buffer(""),
        smap()
      { }
    public:
      std::string buffer;
      SourceMap smap;
  };

}

#endif
