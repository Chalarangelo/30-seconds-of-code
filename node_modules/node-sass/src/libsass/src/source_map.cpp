#include "sass.hpp"
#include <string>
#include <sstream>
#include <iostream>
#include <iomanip>

#include "ast.hpp"
#include "json.hpp"
#include "context.hpp"
#include "position.hpp"
#include "source_map.hpp"

namespace Sass {
  SourceMap::SourceMap() : current_position(0, 0, 0), file("stdin") { }
  SourceMap::SourceMap(const std::string& file) : current_position(0, 0, 0), file(file) { }

  std::string SourceMap::render_srcmap(Context &ctx) {

    const bool include_sources = ctx.c_options.source_map_contents;
    const std::vector<std::string> links = ctx.srcmap_links;
    const std::vector<Resource>& sources(ctx.resources);

    JsonNode* json_srcmap = json_mkobject();

    json_append_member(json_srcmap, "version", json_mknumber(3));

    const char *file_name = file.c_str();
    JsonNode *json_file_name = json_mkstring(file_name);
    json_append_member(json_srcmap, "file", json_file_name);

    // pass-through sourceRoot option
    if (!ctx.source_map_root.empty()) {
      JsonNode* root = json_mkstring(ctx.source_map_root.c_str());
      json_append_member(json_srcmap, "sourceRoot", root);
    }

    JsonNode *json_sources = json_mkarray();
    for (size_t i = 0; i < source_index.size(); ++i) {
      std::string source(links[source_index[i]]);
      if (ctx.c_options.source_map_file_urls) {
        source = File::rel2abs(source);
        // check for windows abs path
        if (source[0] == '/') {
          // ends up with three slashes
          source = "file://" + source;
        } else {
          // needs an additional slash
          source = "file:///" + source;
        }
      }
      const char* source_name = source.c_str();
      JsonNode *json_source_name = json_mkstring(source_name);
      json_append_element(json_sources, json_source_name);
    }
    json_append_member(json_srcmap, "sources", json_sources);

    if (include_sources && source_index.size()) {
      JsonNode *json_contents = json_mkarray();
      for (size_t i = 0; i < source_index.size(); ++i) {
        const Resource& resource(sources[source_index[i]]);
        JsonNode *json_content = json_mkstring(resource.contents);
        json_append_element(json_contents, json_content);
      }
      json_append_member(json_srcmap, "sourcesContent", json_contents);
    }

    JsonNode *json_names = json_mkarray();
    // so far we have no implementation for names
    // no problem as we do not alter any identifiers
    json_append_member(json_srcmap, "names", json_names);

    std::string mappings = serialize_mappings();
    JsonNode *json_mappings = json_mkstring(mappings.c_str());
    json_append_member(json_srcmap, "mappings", json_mappings);

    char *str = json_stringify(json_srcmap, "\t");
    std::string result = std::string(str);
    free(str);
    json_delete(json_srcmap);
    return result;
  }

  std::string SourceMap::serialize_mappings() {
    std::string result = "";

    size_t previous_generated_line = 0;
    size_t previous_generated_column = 0;
    size_t previous_original_line = 0;
    size_t previous_original_column = 0;
    size_t previous_original_file = 0;
    for (size_t i = 0; i < mappings.size(); ++i) {
      const size_t generated_line = mappings[i].generated_position.line;
      const size_t generated_column = mappings[i].generated_position.column;
      const size_t original_line = mappings[i].original_position.line;
      const size_t original_column = mappings[i].original_position.column;
      const size_t original_file = mappings[i].original_position.file;

      if (generated_line != previous_generated_line) {
        previous_generated_column = 0;
        if (generated_line > previous_generated_line) {
          result += std::string(generated_line - previous_generated_line, ';');
          previous_generated_line = generated_line;
        }
      }
      else if (i > 0) {
        result += ",";
      }

      // generated column
      result += base64vlq.encode(static_cast<int>(generated_column) - static_cast<int>(previous_generated_column));
      previous_generated_column = generated_column;
      // file
      result += base64vlq.encode(static_cast<int>(original_file) - static_cast<int>(previous_original_file));
      previous_original_file = original_file;
      // source line
      result += base64vlq.encode(static_cast<int>(original_line) - static_cast<int>(previous_original_line));
      previous_original_line = original_line;
      // source column
      result += base64vlq.encode(static_cast<int>(original_column) - static_cast<int>(previous_original_column));
      previous_original_column = original_column;
    }

    return result;
  }

  void SourceMap::prepend(const OutputBuffer& out)
  {
    Offset size(out.smap.current_position);
    for (Mapping mapping : out.smap.mappings) {
      if (mapping.generated_position.line > size.line) {
        throw(std::runtime_error("prepend sourcemap has illegal line"));
      }
      if (mapping.generated_position.line == size.line) {
        if (mapping.generated_position.column > size.column) {
          throw(std::runtime_error("prepend sourcemap has illegal column"));
        }
      }
    }
    // adjust the buffer offset
    prepend(Offset(out.buffer));
    // now add the new mappings
    VECTOR_UNSHIFT(mappings, out.smap.mappings);
  }

  void SourceMap::append(const OutputBuffer& out)
  {
    append(Offset(out.buffer));
  }

  void SourceMap::prepend(const Offset& offset)
  {
    if (offset.line != 0 || offset.column != 0) {
      for (Mapping& mapping : mappings) {
        // move stuff on the first old line
        if (mapping.generated_position.line == 0) {
          mapping.generated_position.column += offset.column;
        }
        // make place for the new lines
        mapping.generated_position.line += offset.line;
      }
    }
    if (current_position.line == 0) {
      current_position.column += offset.column;
    }
    current_position.line += offset.line;
  }

  void SourceMap::append(const Offset& offset)
  {
    current_position += offset;
  }

  void SourceMap::add_open_mapping(const AST_Node_Ptr node)
  {
    mappings.push_back(Mapping(node->pstate(), current_position));
  }

  void SourceMap::add_close_mapping(const AST_Node_Ptr node)
  {
    mappings.push_back(Mapping(node->pstate() + node->pstate().offset, current_position));
  }

  ParserState SourceMap::remap(const ParserState& pstate) {
    for (size_t i = 0; i < mappings.size(); ++i) {
      if (
        mappings[i].generated_position.file == pstate.file &&
        mappings[i].generated_position.line == pstate.line &&
        mappings[i].generated_position.column == pstate.column
      ) return ParserState(pstate.path, pstate.src, mappings[i].original_position, pstate.offset);
    }
    return ParserState(pstate.path, pstate.src, Position(-1, -1, -1), Offset(0, 0));

  }

}
