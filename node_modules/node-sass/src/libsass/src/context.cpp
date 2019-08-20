#include "sass.hpp"
#include <string>
#include <cstdlib>
#include <cstring>
#include <iomanip>
#include <sstream>
#include <iostream>

#include "ast.hpp"
#include "util.hpp"
#include "sass.h"
#include "context.hpp"
#include "plugins.hpp"
#include "constants.hpp"
#include "parser.hpp"
#include "file.hpp"
#include "inspect.hpp"
#include "output.hpp"
#include "expand.hpp"
#include "eval.hpp"
#include "check_nesting.hpp"
#include "cssize.hpp"
#include "listize.hpp"
#include "extend.hpp"
#include "remove_placeholders.hpp"
#include "functions.hpp"
#include "sass_functions.hpp"
#include "backtrace.hpp"
#include "sass2scss.h"
#include "prelexer.hpp"
#include "emitter.hpp"

namespace Sass {
  using namespace Constants;
  using namespace File;
  using namespace Sass;

  inline bool sort_importers (const Sass_Importer_Entry& i, const Sass_Importer_Entry& j)
  { return sass_importer_get_priority(i) > sass_importer_get_priority(j); }

  static std::string safe_input(const char* in_path)
  {
    // enforce some safe defaults
    // used to create relative file links
    std::string safe_path(in_path ? in_path : "");
    return safe_path == "" ? "stdin" : safe_path;
  }

  static std::string safe_output(const char* out_path, const std::string& input_path = "")
  {
    std::string safe_path(out_path ? out_path : "");
    // maybe we can extract an output path from input path
    if (safe_path == "" && input_path != "") {
      int lastindex = static_cast<int>(input_path.find_last_of("."));
      return (lastindex > -1 ? input_path.substr(0, lastindex) : input_path) + ".css";
    }
    // enforce some safe defaults
    // used to create relative file links
    return safe_path == "" ? "stdout" : safe_path;
  }

  Context::Context(struct Sass_Context& c_ctx)
  : CWD(File::get_cwd()),
    c_options(c_ctx),
    entry_path(""),
    head_imports(0),
    plugins(),
    emitter(c_options),

    ast_gc(),
    strings(),
    resources(),
    sheets(),
    subset_map(),
    import_stack(),
    callee_stack(),
    traces(),
    c_compiler(NULL),

    c_headers               (std::vector<Sass_Importer_Entry>()),
    c_importers             (std::vector<Sass_Importer_Entry>()),
    c_functions             (std::vector<Sass_Function_Entry>()),

    indent                  (safe_str(c_options.indent, "  ")),
    linefeed                (safe_str(c_options.linefeed, "\n")),

    input_path              (make_canonical_path(safe_input(c_options.input_path))),
    output_path             (make_canonical_path(safe_output(c_options.output_path, input_path))),
    source_map_file         (make_canonical_path(safe_str(c_options.source_map_file, ""))),
    source_map_root         (make_canonical_path(safe_str(c_options.source_map_root, "")))

  {

    // Sass 3.4: The current working directory will no longer be placed onto the Sass load path by default.
    // If you need the current working directory to be available, set SASS_PATH=. in your shell's environment.
    // include_paths.push_back(CWD);

    // collect more paths from different options
    collect_include_paths(c_options.include_path);
    collect_include_paths(c_options.include_paths);
    collect_plugin_paths(c_options.plugin_path);
    collect_plugin_paths(c_options.plugin_paths);

    // load plugins and register custom behaviors
    for(auto plug : plugin_paths) plugins.load_plugins(plug);
    for(auto fn : plugins.get_headers()) c_headers.push_back(fn);
    for(auto fn : plugins.get_importers()) c_importers.push_back(fn);
    for(auto fn : plugins.get_functions()) c_functions.push_back(fn);

    // sort the items by priority (lowest first)
    sort (c_headers.begin(), c_headers.end(), sort_importers);
    sort (c_importers.begin(), c_importers.end(), sort_importers);

    emitter.set_filename(abs2rel(output_path, source_map_file, CWD));

  }

  void Context::add_c_function(Sass_Function_Entry function)
  {
    c_functions.push_back(function);
  }
  void Context::add_c_header(Sass_Importer_Entry header)
  {
    c_headers.push_back(header);
    // need to sort the array afterwards (no big deal)
    sort (c_headers.begin(), c_headers.end(), sort_importers);
  }
  void Context::add_c_importer(Sass_Importer_Entry importer)
  {
    c_importers.push_back(importer);
    // need to sort the array afterwards (no big deal)
    sort (c_importers.begin(), c_importers.end(), sort_importers);
  }

  Context::~Context()
  {
    // resources were allocated by malloc
    for (size_t i = 0; i < resources.size(); ++i) {
      free(resources[i].contents);
      free(resources[i].srcmap);
    }
    // free all strings we kept alive during compiler execution
    for (size_t n = 0; n < strings.size(); ++n) free(strings[n]);
    // everything that gets put into sources will be freed by us
    // this shouldn't have anything in it anyway!?
    for (size_t m = 0; m < import_stack.size(); ++m) {
      sass_import_take_source(import_stack[m]);
      sass_import_take_srcmap(import_stack[m]);
      sass_delete_import(import_stack[m]);
    }
    // clear inner structures (vectors) and input source
    resources.clear(); import_stack.clear();
    subset_map.clear(), sheets.clear();
  }

  Data_Context::~Data_Context()
  {
    // --> this will be freed by resources
    // make sure we free the source even if not processed!
    // if (resources.size() == 0 && source_c_str) free(source_c_str);
    // if (resources.size() == 0 && srcmap_c_str) free(srcmap_c_str);
    // source_c_str = 0; srcmap_c_str = 0;
  }

  File_Context::~File_Context()
  {
  }

  void Context::collect_include_paths(const char* paths_str)
  {
    if (paths_str) {
      const char* beg = paths_str;
      const char* end = Prelexer::find_first<PATH_SEP>(beg);

      while (end) {
        std::string path(beg, end - beg);
        if (!path.empty()) {
          if (*path.rbegin() != '/') path += '/';
          include_paths.push_back(path);
        }
        beg = end + 1;
        end = Prelexer::find_first<PATH_SEP>(beg);
      }

      std::string path(beg);
      if (!path.empty()) {
        if (*path.rbegin() != '/') path += '/';
        include_paths.push_back(path);
      }
    }
  }

  void Context::collect_include_paths(string_list* paths_array)
  {
    while (paths_array)
    {
      collect_include_paths(paths_array->string);
      paths_array = paths_array->next;
    }
  }

  void Context::collect_plugin_paths(const char* paths_str)
  {
    if (paths_str) {
      const char* beg = paths_str;
      const char* end = Prelexer::find_first<PATH_SEP>(beg);

      while (end) {
        std::string path(beg, end - beg);
        if (!path.empty()) {
          if (*path.rbegin() != '/') path += '/';
          plugin_paths.push_back(path);
        }
        beg = end + 1;
        end = Prelexer::find_first<PATH_SEP>(beg);
      }

      std::string path(beg);
      if (!path.empty()) {
        if (*path.rbegin() != '/') path += '/';
        plugin_paths.push_back(path);
      }
    }
  }

  void Context::collect_plugin_paths(string_list* paths_array)
  {
    while (paths_array)
    {
      collect_plugin_paths(paths_array->string);
      paths_array = paths_array->next;
    }
  }

  // resolve the imp_path in base_path or include_paths
  // looks for alternatives and returns a list from one directory
  std::vector<Include> Context::find_includes(const Importer& import)
  {
    // make sure we resolve against an absolute path
    std::string base_path(rel2abs(import.base_path));
    // first try to resolve the load path relative to the base path
    std::vector<Include> vec(resolve_includes(base_path, import.imp_path));
    // then search in every include path (but only if nothing found yet)
    for (size_t i = 0, S = include_paths.size(); vec.size() == 0 && i < S; ++i)
    {
      // call resolve_includes and individual base path and append all results
      std::vector<Include> resolved(resolve_includes(include_paths[i], import.imp_path));
      if (resolved.size()) vec.insert(vec.end(), resolved.begin(), resolved.end());
    }
    // return vector
    return vec;
  }

  // register include with resolved path and its content
  // memory of the resources will be freed by us on exit
  void Context::register_resource(const Include& inc, const Resource& res)
  {

    // do not parse same resource twice
    // maybe raise an error in this case
    // if (sheets.count(inc.abs_path)) {
    //   free(res.contents); free(res.srcmap);
    //   throw std::runtime_error("duplicate resource registered");
    //   return;
    // }

    // get index for this resource
    size_t idx = resources.size();

    // tell emitter about new resource
    emitter.add_source_index(idx);

    // put resources under our control
    // the memory will be freed later
    resources.push_back(res);

    // add a relative link to the working directory
    included_files.push_back(inc.abs_path);
    // add a relative link  to the source map output file
    srcmap_links.push_back(abs2rel(inc.abs_path, source_map_file, CWD));

    // get pointer to the loaded content
    Sass_Import_Entry import = sass_make_import(
      inc.imp_path.c_str(),
      inc.abs_path.c_str(),
      res.contents,
      res.srcmap
    );
    // add the entry to the stack
    import_stack.push_back(import);

    // get pointer to the loaded content
    const char* contents = resources[idx].contents;
    // keep a copy of the path around (for parserstates)
    // ToDo: we clean it, but still not very elegant!?
    strings.push_back(sass_copy_c_string(inc.abs_path.c_str()));
    // create the initial parser state from resource
    ParserState pstate(strings.back(), contents, idx);

    // check existing import stack for possible recursion
    for (size_t i = 0; i < import_stack.size() - 2; ++i) {
      auto parent = import_stack[i];
      if (std::strcmp(parent->abs_path, import->abs_path) == 0) {
        std::string cwd(File::get_cwd());
        // make path relative to the current directory
        std::string stack("An @import loop has been found:");
        for (size_t n = 1; n < i + 2; ++n) {
          stack += "\n    " + std::string(File::abs2rel(import_stack[n]->abs_path, cwd, cwd)) +
            " imports " + std::string(File::abs2rel(import_stack[n+1]->abs_path, cwd, cwd));
        }
        // implement error throw directly until we
        // decided how to handle full stack traces
        throw Exception::InvalidSyntax(pstate, traces, stack);
        // error(stack, prstate ? *prstate : pstate, import_stack);
      }
    }

    // create a parser instance from the given c_str buffer
    Parser p(Parser::from_c_str(contents, *this, traces, pstate));
    // do not yet dispose these buffers
    sass_import_take_source(import);
    sass_import_take_srcmap(import);
    // then parse the root block
    Block_Obj root = p.parse();
    // delete memory of current stack frame
    sass_delete_import(import_stack.back());
    // remove current stack frame
    import_stack.pop_back();
    // create key/value pair for ast node
    std::pair<const std::string, StyleSheet>
      ast_pair(inc.abs_path, { res, root });
    // register resulting resource
    sheets.insert(ast_pair);
  }

  // register include with resolved path and its content
  // memory of the resources will be freed by us on exit
  void Context::register_resource(const Include& inc, const Resource& res, ParserState& prstate)
  {
    traces.push_back(Backtrace(prstate));
    register_resource(inc, res);
    traces.pop_back();
  }

  // Add a new import to the context (called from `import_url`)
  Include Context::load_import(const Importer& imp, ParserState pstate)
  {

    // search for valid imports (ie. partials) on the filesystem
    // this may return more than one valid result (ambiguous imp_path)
    const std::vector<Include> resolved(find_includes(imp));

    // error nicely on ambiguous imp_path
    if (resolved.size() > 1) {
      std::stringstream msg_stream;
      msg_stream << "It's not clear which file to import for ";
      msg_stream << "'@import \"" << imp.imp_path << "\"'." << "\n";
      msg_stream << "Candidates:" << "\n";
      for (size_t i = 0, L = resolved.size(); i < L; ++i)
      { msg_stream << "  " << resolved[i].imp_path << "\n"; }
      msg_stream << "Please delete or rename all but one of these files." << "\n";
      error(msg_stream.str(), pstate, traces);
    }

    // process the resolved entry
    else if (resolved.size() == 1) {
      bool use_cache = c_importers.size() == 0;
      // use cache for the resource loading
      if (use_cache && sheets.count(resolved[0].abs_path)) return resolved[0];
      // try to read the content of the resolved file entry
      // the memory buffer returned must be freed by us!
      if (char* contents = read_file(resolved[0].abs_path)) {
        // register the newly resolved file resource
        register_resource(resolved[0], { contents, 0 }, pstate);
        // return resolved entry
        return resolved[0];
      }
    }

    // nothing found
    return { imp, "" };

  }

  void Context::import_url (Import_Ptr imp, std::string load_path, const std::string& ctx_path) {

    ParserState pstate(imp->pstate());
    std::string imp_path(unquote(load_path));
    std::string protocol("file");

    using namespace Prelexer;
    if (const char* proto = sequence< identifier, exactly<':'>, exactly<'/'>, exactly<'/'> >(imp_path.c_str())) {

      protocol = std::string(imp_path.c_str(), proto - 3);
      // if (protocol.compare("file") && true) { }
    }

    // add urls (protocol other than file) and urls without procotol to `urls` member
    // ToDo: if ctx_path is already a file resource, we should not add it here?
    if (imp->import_queries() || protocol != "file" || imp_path.substr(0, 2) == "//") {
      imp->urls().push_back(SASS_MEMORY_NEW(String_Quoted, imp->pstate(), load_path));
    }
    else if (imp_path.length() > 4 && imp_path.substr(imp_path.length() - 4, 4) == ".css") {
      String_Constant_Ptr loc = SASS_MEMORY_NEW(String_Constant, pstate, unquote(load_path));
      Argument_Obj loc_arg = SASS_MEMORY_NEW(Argument, pstate, loc);
      Arguments_Obj loc_args = SASS_MEMORY_NEW(Arguments, pstate);
      loc_args->append(loc_arg);
      Function_Call_Ptr new_url = SASS_MEMORY_NEW(Function_Call, pstate, "url", loc_args);
      imp->urls().push_back(new_url);
    }
    else {
      const Importer importer(imp_path, ctx_path);
      Include include(load_import(importer, pstate));
      if (include.abs_path.empty()) {
        error("File to import not found or unreadable: " + imp_path + ".", pstate, traces);
      }
      imp->incs().push_back(include);
    }

  }


  // call custom importers on the given (unquoted) load_path and eventually parse the resulting style_sheet
  bool Context::call_loader(const std::string& load_path, const char* ctx_path, ParserState& pstate, Import_Ptr imp, std::vector<Sass_Importer_Entry> importers, bool only_one)
  {
    // unique counter
    size_t count = 0;
    // need one correct import
    bool has_import = false;
    // process all custom importers (or custom headers)
    for (Sass_Importer_Entry& importer_ent : importers) {
      // int priority = sass_importer_get_priority(importer);
      Sass_Importer_Fn fn = sass_importer_get_function(importer_ent);
      // skip importer if it returns NULL
      if (Sass_Import_List includes =
          fn(load_path.c_str(), importer_ent, c_compiler)
      ) {
        // get c pointer copy to iterate over
        Sass_Import_List it_includes = includes;
        while (*it_includes) { ++count;
          // create unique path to use as key
          std::string uniq_path = load_path;
          if (!only_one && count) {
            std::stringstream path_strm;
            path_strm << uniq_path << ":" << count;
            uniq_path = path_strm.str();
          }
          // create the importer struct
          Importer importer(uniq_path, ctx_path);
          // query data from the current include
          Sass_Import_Entry include_ent = *it_includes;
          char* source = sass_import_take_source(include_ent);
          char* srcmap = sass_import_take_srcmap(include_ent);
          size_t line = sass_import_get_error_line(include_ent);
          size_t column = sass_import_get_error_column(include_ent);
          const char *abs_path = sass_import_get_abs_path(include_ent);
          // handle error message passed back from custom importer
          // it may (or may not) override the line and column info
          if (const char* err_message = sass_import_get_error_message(include_ent)) {
            if (source || srcmap) register_resource({ importer, uniq_path }, { source, srcmap }, pstate);
            if (line == std::string::npos && column == std::string::npos) error(err_message, pstate, traces);
            else error(err_message, ParserState(ctx_path, source, Position(line, column)), traces);
          }
          // content for import was set
          else if (source) {
            // resolved abs_path should be set by custom importer
            // use the created uniq_path as fallback (maybe enforce)
            std::string path_key(abs_path ? abs_path : uniq_path);
            // create the importer struct
            Include include(importer, path_key);
            // attach information to AST node
            imp->incs().push_back(include);
            // register the resource buffers
            register_resource(include, { source, srcmap }, pstate);
          }
          // only a path was retuned
          // try to load it like normal
          else if(abs_path) {
            // checks some urls to preserve
            // `http://`, `https://` and `//`
            // or dispatchs to `import_file`
            // which will check for a `.css` extension
            // or resolves the file on the filesystem
            // added and resolved via `add_file`
            // finally stores everything on `imp`
            import_url(imp, abs_path, ctx_path);
          }
          // move to next
          ++it_includes;
        }
        // deallocate the returned memory
        sass_delete_import_list(includes);
        // set success flag
        has_import = true;
        // break out of loop
        if (only_one) break;
      }
    }
    // return result
    return has_import;
  }

  void register_function(Context&, Signature sig, Native_Function f, Env* env);
  void register_function(Context&, Signature sig, Native_Function f, size_t arity, Env* env);
  void register_overload_stub(Context&, std::string name, Env* env);
  void register_built_in_functions(Context&, Env* env);
  void register_c_functions(Context&, Env* env, Sass_Function_List);
  void register_c_function(Context&, Env* env, Sass_Function_Entry);

  char* Context::render(Block_Obj root)
  {
    // check for valid block
    if (!root) return 0;
    // start the render process
    root->perform(&emitter);
    // finish emitter stream
    emitter.finalize();
    // get the resulting buffer from stream
    OutputBuffer emitted = emitter.get_buffer();
    // should we append a source map url?
    if (!c_options.omit_source_map_url) {
      // generate an embeded source map
      if (c_options.source_map_embed) {
        emitted.buffer += linefeed;
        emitted.buffer += format_embedded_source_map();
      }
      // or just link the generated one
      else if (source_map_file != "") {
        emitted.buffer += linefeed;
        emitted.buffer += format_source_mapping_url(source_map_file);
      }
    }
    // create a copy of the resulting buffer string
    // this must be freed or taken over by implementor
    return sass_copy_c_string(emitted.buffer.c_str());
  }

  void Context::apply_custom_headers(Block_Obj root, const char* ctx_path, ParserState pstate)
  {
    // create a custom import to resolve headers
    Import_Obj imp = SASS_MEMORY_NEW(Import, pstate);
    // dispatch headers which will add custom functions
    // custom headers are added to the import instance
    call_headers(entry_path, ctx_path, pstate, imp);
    // increase head count to skip later
    head_imports += resources.size() - 1;
    // add the statement if we have urls
    if (!imp->urls().empty()) root->append(imp);
    // process all other resources (add Import_Stub nodes)
    for (size_t i = 0, S = imp->incs().size(); i < S; ++i) {
      root->append(SASS_MEMORY_NEW(Import_Stub, pstate, imp->incs()[i]));
    }
  }

  Block_Obj File_Context::parse()
  {

    // check if entry file is given
    if (input_path.empty()) return 0;

    // create absolute path from input filename
    // ToDo: this should be resolved via custom importers
    std::string abs_path(rel2abs(input_path, CWD));

    // try to load the entry file
    char* contents = read_file(abs_path);

    // alternatively also look inside each include path folder
    // I think this differs from ruby sass (IMO too late to remove)
    for (size_t i = 0, S = include_paths.size(); contents == 0 && i < S; ++i) {
      // build absolute path for this include path entry
      abs_path = rel2abs(input_path, include_paths[i]);
      // try to load the resulting path
      contents = read_file(abs_path);
    }

    // abort early if no content could be loaded (various reasons)
    if (!contents) throw std::runtime_error("File to read not found or unreadable: " + input_path);

    // store entry path
    entry_path = abs_path;

    // create entry only for import stack
    Sass_Import_Entry import = sass_make_import(
      input_path.c_str(),
      entry_path.c_str(),
      contents,
      0
    );
    // add the entry to the stack
    import_stack.push_back(import);

    // create the source entry for file entry
    register_resource({{ input_path, "." }, abs_path }, { contents, 0 });

    // create root ast tree node
    return compile();

  }

  Block_Obj Data_Context::parse()
  {

    // check if source string is given
    if (!source_c_str) return 0;

    // convert indented sass syntax
    if(c_options.is_indented_syntax_src) {
      // call sass2scss to convert the string
      char * converted = sass2scss(source_c_str,
        // preserve the structure as much as possible
        SASS2SCSS_PRETTIFY_1 | SASS2SCSS_KEEP_COMMENT);
      // replace old source_c_str with converted
      free(source_c_str); source_c_str = converted;
    }

    // remember entry path (defaults to stdin for string)
    entry_path = input_path.empty() ? "stdin" : input_path;

    // ToDo: this may be resolved via custom importers
    std::string abs_path(rel2abs(entry_path));
    char* abs_path_c_str = sass_copy_c_string(abs_path.c_str());
    strings.push_back(abs_path_c_str);

    // create entry only for the import stack
    Sass_Import_Entry import = sass_make_import(
      entry_path.c_str(),
      abs_path_c_str,
      source_c_str,
      srcmap_c_str
    );
    // add the entry to the stack
    import_stack.push_back(import);

    // register a synthetic resource (path does not really exist, skip in includes)
    register_resource({{ input_path, "." }, input_path }, { source_c_str, srcmap_c_str });

    // create root ast tree node
    return compile();
  }



  // parse root block from includes
  Block_Obj Context::compile()
  {
    // abort if there is no data
    if (resources.size() == 0) return 0;
    // get root block from the first style sheet
    Block_Obj root = sheets.at(entry_path).root;
    // abort on invalid root
    if (root.isNull()) return 0;
    Env global; // create root environment
    // register built-in functions on env
    register_built_in_functions(*this, &global);
    // register custom functions (defined via C-API)
    for (size_t i = 0, S = c_functions.size(); i < S; ++i)
    { register_c_function(*this, &global, c_functions[i]); }
    // create initial backtrace entry
    // create crtp visitor objects
    Expand expand(*this, &global);
    Cssize cssize(*this);
    CheckNesting check_nesting;
    // check nesting in all files
    for (auto sheet : sheets) {
      auto styles = sheet.second;
      check_nesting(styles.root);
    }
    // expand and eval the tree
    root = expand(root);
    // check nesting
    check_nesting(root);
    // merge and bubble certain rules
    root = cssize(root);
    // should we extend something?
    if (!subset_map.empty()) {
      // create crtp visitor object
      Extend extend(subset_map);
      extend.setEval(expand.eval);
      // extend tree nodes
      extend(root);
    }

    // clean up by removing empty placeholders
    // ToDo: maybe we can do this somewhere else?
    Remove_Placeholders remove_placeholders;
    root->perform(&remove_placeholders);
    // return processed tree
    return root;
  }
  // EO compile

  std::string Context::format_embedded_source_map()
  {
    std::string map = emitter.render_srcmap(*this);
    std::istringstream is( map );
    std::ostringstream buffer;
    base64::encoder E;
    E.encode(is, buffer);
    std::string url = "data:application/json;base64," + buffer.str();
    url.erase(url.size() - 1);
    return "/*# sourceMappingURL=" + url + " */";
  }

  std::string Context::format_source_mapping_url(const std::string& file)
  {
    std::string url = abs2rel(file, output_path, CWD);
    return "/*# sourceMappingURL=" + url + " */";
  }

  char* Context::render_srcmap()
  {
    if (source_map_file == "") return 0;
    std::string map = emitter.render_srcmap(*this);
    return sass_copy_c_string(map.c_str());
  }


  // for data context we want to start after "stdin"
  // we probably always want to skip the header includes?
  std::vector<std::string> Context::get_included_files(bool skip, size_t headers)
  {
      // create a copy of the vector for manipulations
      std::vector<std::string> includes = included_files;
      if (includes.size() == 0) return includes;
      if (skip) { includes.erase( includes.begin(), includes.begin() + 1 + headers); }
      else { includes.erase( includes.begin() + 1, includes.begin() + 1 + headers); }
      includes.erase( std::unique( includes.begin(), includes.end() ), includes.end() );
      std::sort( includes.begin() + (skip ? 0 : 1), includes.end() );
      return includes;
  }

  void register_function(Context& ctx, Signature sig, Native_Function f, Env* env)
  {
    Definition_Ptr def = make_native_function(sig, f, ctx);
    def->environment(env);
    (*env)[def->name() + "[f]"] = def;
  }

  void register_function(Context& ctx, Signature sig, Native_Function f, size_t arity, Env* env)
  {
    Definition_Ptr def = make_native_function(sig, f, ctx);
    std::stringstream ss;
    ss << def->name() << "[f]" << arity;
    def->environment(env);
    (*env)[ss.str()] = def;
  }

  void register_overload_stub(Context& ctx, std::string name, Env* env)
  {
    Definition_Ptr stub = SASS_MEMORY_NEW(Definition,
                                       ParserState("[built-in function]"),
                                       0,
                                       name,
                                       0,
                                       0,
                                       true);
    (*env)[name + "[f]"] = stub;
  }


  void register_built_in_functions(Context& ctx, Env* env)
  {
    using namespace Functions;
    // RGB Functions
    register_function(ctx, rgb_sig, rgb, env);
    register_overload_stub(ctx, "rgba", env);
    register_function(ctx, rgba_4_sig, rgba_4, 4, env);
    register_function(ctx, rgba_2_sig, rgba_2, 2, env);
    register_function(ctx, red_sig, red, env);
    register_function(ctx, green_sig, green, env);
    register_function(ctx, blue_sig, blue, env);
    register_function(ctx, mix_sig, mix, env);
    // HSL Functions
    register_function(ctx, hsl_sig, hsl, env);
    register_function(ctx, hsla_sig, hsla, env);
    register_function(ctx, hue_sig, hue, env);
    register_function(ctx, saturation_sig, saturation, env);
    register_function(ctx, lightness_sig, lightness, env);
    register_function(ctx, adjust_hue_sig, adjust_hue, env);
    register_function(ctx, lighten_sig, lighten, env);
    register_function(ctx, darken_sig, darken, env);
    register_function(ctx, saturate_sig, saturate, env);
    register_function(ctx, desaturate_sig, desaturate, env);
    register_function(ctx, grayscale_sig, grayscale, env);
    register_function(ctx, complement_sig, complement, env);
    register_function(ctx, invert_sig, invert, env);
    // Opacity Functions
    register_function(ctx, alpha_sig, alpha, env);
    register_function(ctx, opacity_sig, alpha, env);
    register_function(ctx, opacify_sig, opacify, env);
    register_function(ctx, fade_in_sig, opacify, env);
    register_function(ctx, transparentize_sig, transparentize, env);
    register_function(ctx, fade_out_sig, transparentize, env);
    // Other Color Functions
    register_function(ctx, adjust_color_sig, adjust_color, env);
    register_function(ctx, scale_color_sig, scale_color, env);
    register_function(ctx, change_color_sig, change_color, env);
    register_function(ctx, ie_hex_str_sig, ie_hex_str, env);
    // String Functions
    register_function(ctx, unquote_sig, sass_unquote, env);
    register_function(ctx, quote_sig, sass_quote, env);
    register_function(ctx, str_length_sig, str_length, env);
    register_function(ctx, str_insert_sig, str_insert, env);
    register_function(ctx, str_index_sig, str_index, env);
    register_function(ctx, str_slice_sig, str_slice, env);
    register_function(ctx, to_upper_case_sig, to_upper_case, env);
    register_function(ctx, to_lower_case_sig, to_lower_case, env);
    // Number Functions
    register_function(ctx, percentage_sig, percentage, env);
    register_function(ctx, round_sig, round, env);
    register_function(ctx, ceil_sig, ceil, env);
    register_function(ctx, floor_sig, floor, env);
    register_function(ctx, abs_sig, abs, env);
    register_function(ctx, min_sig, min, env);
    register_function(ctx, max_sig, max, env);
    register_function(ctx, random_sig, random, env);
    // List Functions
    register_function(ctx, length_sig, length, env);
    register_function(ctx, nth_sig, nth, env);
    register_function(ctx, set_nth_sig, set_nth, env);
    register_function(ctx, index_sig, index, env);
    register_function(ctx, join_sig, join, env);
    register_function(ctx, append_sig, append, env);
    register_function(ctx, zip_sig, zip, env);
    register_function(ctx, list_separator_sig, list_separator, env);
    register_function(ctx, is_bracketed_sig, is_bracketed, env);
    // Map Functions
    register_function(ctx, map_get_sig, map_get, env);
    register_function(ctx, map_merge_sig, map_merge, env);
    register_function(ctx, map_remove_sig, map_remove, env);
    register_function(ctx, map_keys_sig, map_keys, env);
    register_function(ctx, map_values_sig, map_values, env);
    register_function(ctx, map_has_key_sig, map_has_key, env);
    register_function(ctx, keywords_sig, keywords, env);
    // Introspection Functions
    register_function(ctx, type_of_sig, type_of, env);
    register_function(ctx, unit_sig, unit, env);
    register_function(ctx, unitless_sig, unitless, env);
    register_function(ctx, comparable_sig, comparable, env);
    register_function(ctx, variable_exists_sig, variable_exists, env);
    register_function(ctx, global_variable_exists_sig, global_variable_exists, env);
    register_function(ctx, function_exists_sig, function_exists, env);
    register_function(ctx, mixin_exists_sig, mixin_exists, env);
    register_function(ctx, feature_exists_sig, feature_exists, env);
    register_function(ctx, call_sig, call, env);
    register_function(ctx, content_exists_sig, content_exists, env);
    register_function(ctx, get_function_sig, get_function, env);
    // Boolean Functions
    register_function(ctx, not_sig, sass_not, env);
    register_function(ctx, if_sig, sass_if, env);
    // Misc Functions
    register_function(ctx, inspect_sig, inspect, env);
    register_function(ctx, unique_id_sig, unique_id, env);
    // Selector functions
    register_function(ctx, selector_nest_sig, selector_nest, env);
    register_function(ctx, selector_append_sig, selector_append, env);
    register_function(ctx, selector_extend_sig, selector_extend, env);
    register_function(ctx, selector_replace_sig, selector_replace, env);
    register_function(ctx, selector_unify_sig, selector_unify, env);
    register_function(ctx, is_superselector_sig, is_superselector, env);
    register_function(ctx, simple_selectors_sig, simple_selectors, env);
    register_function(ctx, selector_parse_sig, selector_parse, env);
  }

  void register_c_functions(Context& ctx, Env* env, Sass_Function_List descrs)
  {
    while (descrs && *descrs) {
      register_c_function(ctx, env, *descrs);
      ++descrs;
    }
  }
  void register_c_function(Context& ctx, Env* env, Sass_Function_Entry descr)
  {
    Definition_Ptr def = make_c_function(descr, ctx);
    def->environment(env);
    (*env)[def->name() + "[f]"] = def;
  }

}
