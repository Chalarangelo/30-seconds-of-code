#ifndef SASS_FILE_H
#define SASS_FILE_H

#include <string>
#include <vector>

#include "sass/context.h"
#include "ast_fwd_decl.hpp"

namespace Sass {

  namespace File {

    // return the current directory
    // always with forward slashes
    std::string get_cwd();

    // test if path exists and is a file
    bool file_exists(const std::string& file);

    // return if given path is absolute
    // works with *nix and windows paths
    bool is_absolute_path(const std::string& path);

    // return only the directory part of path
    std::string dir_name(const std::string& path);

    // return only the filename part of path
    std::string base_name(const std::string&);

    // do a locigal clean up of the path
    // no physical check on the filesystem
    std::string make_canonical_path (std::string path);

    // join two path segments cleanly together
    // but only if right side is not absolute yet
    std::string join_paths(std::string root, std::string name);

    // if the relative path is outside of the cwd we want want to
    // show the absolute path in console messages
    std::string path_for_console(const std::string& rel_path, const std::string& abs_path, const std::string& orig_path);

    // create an absolute path by resolving relative paths with cwd
    std::string rel2abs(const std::string& path, const std::string& base = ".", const std::string& cwd = get_cwd());

    // create a path that is relative to the given base directory
    // path and base will first be resolved against cwd to make them absolute
    std::string abs2rel(const std::string& path, const std::string& base = ".", const std::string& cwd = get_cwd());

    // helper function to resolve a filename
    // searching without variations in all paths
    std::string find_file(const std::string& file, struct Sass_Compiler* options);
    std::string find_file(const std::string& file, const std::vector<std::string> paths);

    // helper function to resolve a include filename
    // this has the original resolve logic for sass include
    std::string find_include(const std::string& file, const std::vector<std::string> paths);

    // split a path string delimited by semicolons or colons (OS dependent)
    std::vector<std::string> split_path_list(const char* paths);

    // try to load the given filename
    // returned memory must be freed
    // will auto convert .sass files
    char* read_file(const std::string& file);

  }

  // requested import
  class Importer {
    public:
      // requested import path
      std::string imp_path;
      // parent context path
      std::string ctx_path;
      // base derived from context path
      // this really just acts as a cache
      std::string base_path;
    public:
      Importer(std::string imp_path, std::string ctx_path)
      : imp_path(File::make_canonical_path(imp_path)),
        ctx_path(File::make_canonical_path(ctx_path)),
        base_path(File::dir_name(ctx_path))
      { }
  };

  // a resolved include (final import)
  class Include : public Importer {
    public:
      // resolved absolute path
      std::string abs_path;
    public:
      Include(const Importer& imp, std::string abs_path)
      : Importer(imp), abs_path(abs_path)
      { }
  };

  // a loaded resource
  class Resource {
    public:
      // the file contents
      char* contents;
      // conected sourcemap
      char* srcmap;
    public:
      Resource(char* contents, char* srcmap)
      : contents(contents), srcmap(srcmap)
      { }
  };

  // parsed stylesheet from loaded resource
  class StyleSheet : public Resource {
    public:
      // parsed root block
      Block_Obj root;
    public:
      StyleSheet(const Resource& res, Block_Obj root)
      : Resource(res), root(root)
      { }
  };

  namespace File {

    static std::vector<std::string> defaultExtensions = { ".scss", ".sass", ".css" };

    std::vector<Include> resolve_includes(const std::string& root, const std::string& file,
      const std::vector<std::string>& exts = defaultExtensions);

  }

}

#endif
