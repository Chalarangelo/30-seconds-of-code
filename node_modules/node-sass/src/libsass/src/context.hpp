#ifndef SASS_CONTEXT_H
#define SASS_CONTEXT_H

#include <string>
#include <vector>
#include <map>

#define BUFFERSIZE 255
#include "b64/encode.h"

#include "ast_fwd_decl.hpp"
#include "kwd_arg_macros.hpp"
#include "ast_fwd_decl.hpp"
#include "sass_context.hpp"
#include "environment.hpp"
#include "source_map.hpp"
#include "subset_map.hpp"
#include "backtrace.hpp"
#include "output.hpp"
#include "plugins.hpp"
#include "file.hpp"


struct Sass_Function;

namespace Sass {

  class Context {
  public:
    void import_url (Import_Ptr imp, std::string load_path, const std::string& ctx_path);
    bool call_headers(const std::string& load_path, const char* ctx_path, ParserState& pstate, Import_Ptr imp)
    { return call_loader(load_path, ctx_path, pstate, imp, c_headers, false); };
    bool call_importers(const std::string& load_path, const char* ctx_path, ParserState& pstate, Import_Ptr imp)
    { return call_loader(load_path, ctx_path, pstate, imp, c_importers, true); };

  private:
    bool call_loader(const std::string& load_path, const char* ctx_path, ParserState& pstate, Import_Ptr imp, std::vector<Sass_Importer_Entry> importers, bool only_one = true);

  public:
    const std::string CWD;
    struct Sass_Options& c_options;
    std::string entry_path;
    size_t head_imports;
    Plugins plugins;
    Output emitter;

    // generic ast node garbage container
    // used to avoid possible circular refs
    std::vector<AST_Node_Obj> ast_gc;
    // resources add under our control
    // these are guaranteed to be freed
    std::vector<char*> strings;
    std::vector<Resource> resources;
    std::map<const std::string, StyleSheet> sheets;
    Subset_Map subset_map;
    std::vector<Sass_Import_Entry> import_stack;
    std::vector<Sass_Callee> callee_stack;
    std::vector<Backtrace> traces;

    struct Sass_Compiler* c_compiler;

    // absolute paths to includes
    std::vector<std::string> included_files;
    // relative includes for sourcemap
    std::vector<std::string> srcmap_links;
    // vectors above have same size

    std::vector<std::string> plugin_paths; // relative paths to load plugins
    std::vector<std::string> include_paths; // lookup paths for includes





    void apply_custom_headers(Block_Obj root, const char* path, ParserState pstate);

    std::vector<Sass_Importer_Entry> c_headers;
    std::vector<Sass_Importer_Entry> c_importers;
    std::vector<Sass_Function_Entry> c_functions;

    void add_c_header(Sass_Importer_Entry header);
    void add_c_importer(Sass_Importer_Entry importer);
    void add_c_function(Sass_Function_Entry function);

    const std::string indent; // String to be used for indentation
    const std::string linefeed; // String to be used for line feeds
    const std::string input_path; // for relative paths in src-map
    const std::string output_path; // for relative paths to the output
    const std::string source_map_file; // path to source map file (enables feature)
    const std::string source_map_root; // path for sourceRoot property (pass-through)

    virtual ~Context();
    Context(struct Sass_Context&);
    virtual Block_Obj parse() = 0;
    virtual Block_Obj compile();
    virtual char* render(Block_Obj root);
    virtual char* render_srcmap();

    void register_resource(const Include&, const Resource&);
    void register_resource(const Include&, const Resource&, ParserState&);
    std::vector<Include> find_includes(const Importer& import);
    Include load_import(const Importer&, ParserState pstate);

    Sass_Output_Style output_style() { return c_options.output_style; };
    std::vector<std::string> get_included_files(bool skip = false, size_t headers = 0);

  private:
    void collect_plugin_paths(const char* paths_str);
    void collect_plugin_paths(string_list* paths_array);
    void collect_include_paths(const char* paths_str);
    void collect_include_paths(string_list* paths_array);
    std::string format_embedded_source_map();
    std::string format_source_mapping_url(const std::string& out_path);


    // void register_built_in_functions(Env* env);
    // void register_function(Signature sig, Native_Function f, Env* env);
    // void register_function(Signature sig, Native_Function f, size_t arity, Env* env);
    // void register_overload_stub(std::string name, Env* env);

  public:
    const std::string& cwd() { return CWD; };
  };

  class File_Context : public Context {
  public:
    File_Context(struct Sass_File_Context& ctx)
    : Context(ctx)
    { }
    virtual ~File_Context();
    virtual Block_Obj parse();
  };

  class Data_Context : public Context {
  public:
    char* source_c_str;
    char* srcmap_c_str;
    Data_Context(struct Sass_Data_Context& ctx)
    : Context(ctx)
    {
      source_c_str       = ctx.source_string;
      srcmap_c_str       = ctx.srcmap_string;
      ctx.source_string = 0; // passed away
      ctx.srcmap_string = 0; // passed away
    }
    virtual ~Data_Context();
    virtual Block_Obj parse();
  };

}

#endif
