#ifndef SASS_SASS_CONTEXT_H
#define SASS_SASS_CONTEXT_H

#include "sass/base.h"
#include "sass/context.h"
#include "ast_fwd_decl.hpp"

// sass config options structure
struct Sass_Options : Sass_Output_Options {

  // embed sourceMappingUrl as data uri
  bool source_map_embed;

  // embed include contents in maps
  bool source_map_contents;

  // create file urls for sources
  bool source_map_file_urls;

  // Disable sourceMappingUrl in css output
  bool omit_source_map_url;

  // Treat source_string as sass (as opposed to scss)
  bool is_indented_syntax_src;

  // The input path is used for source map
  // generation. It can be used to define
  // something with string compilation or to
  // overload the input file path. It is
  // set to "stdin" for data contexts and
  // to the input file on file contexts.
  char* input_path;

  // The output path is used for source map
  // generation. LibSass will not write to
  // this file, it is just used to create
  // information in source-maps etc.
  char* output_path;

  // Colon-separated list of paths
  // Semicolon-separated on Windows
  // Maybe use array interface instead?
  char* include_path;
  char* plugin_path;

  // Include paths (linked string list)
  struct string_list* include_paths;
  // Plugin paths (linked string list)
  struct string_list* plugin_paths;

  // Path to source map file
  // Enables source map generation
  // Used to create sourceMappingUrl
  char* source_map_file;

  // Directly inserted in source maps
  char* source_map_root;

  // Custom functions that can be called from sccs code
  Sass_Function_List c_functions;

  // List of custom importers
  Sass_Importer_List c_importers;

  // List of custom headers
  Sass_Importer_List c_headers;

};


// base for all contexts
struct Sass_Context : Sass_Options
{

  // store context type info
  enum Sass_Input_Style type;

  // generated output data
  char* output_string;

  // generated source map json
  char* source_map_string;

  // error status
  int error_status;
  char* error_json;
  char* error_text;
  char* error_message;
  // error position
  char* error_file;
  size_t error_line;
  size_t error_column;
  const char* error_src;

  // report imported files
  char** included_files;

};

// struct for file compilation
struct Sass_File_Context : Sass_Context {

  // no additional fields required
  // input_path is already on options

};

// struct for data compilation
struct Sass_Data_Context : Sass_Context {

  // provided source string
  char* source_string;
  char* srcmap_string;

};

// link c and cpp context
struct Sass_Compiler {
  // progress status
  Sass_Compiler_State state;
  // original c context
  Sass_Context* c_ctx;
  // Sass::Context
  Sass::Context* cpp_ctx;
  // Sass::Block
  Sass::Block_Obj root;
};

#endif