#include "sass.hpp"
#include <cstdlib>
#include <cstring>
#include <vector>
#include <sstream>

#include "sass.h"
#include "file.hpp"
#include "util.hpp"
#include "sass_context.hpp"
#include "sass_functions.hpp"

namespace Sass {

  // helper to convert string list to vector
  std::vector<std::string> list2vec(struct string_list* cur)
  {
    std::vector<std::string> list;
    while (cur) {
      list.push_back(cur->string);
      cur = cur->next;
    }
    return list;
  }

}

extern "C" {
  using namespace Sass;

  // Allocate libsass heap memory
  // Don't forget string termination!
  void* ADDCALL sass_alloc_memory(size_t size)
  {
    void* ptr = malloc(size);
    if (ptr == NULL) {
      std::cerr << "Out of memory.\n";
      exit(EXIT_FAILURE);
    }
    return ptr;
  }

  char* ADDCALL sass_copy_c_string(const char* str)
  {
    size_t len = strlen(str) + 1;
    char* cpy = (char*) sass_alloc_memory(len);
    std::memcpy(cpy, str, len);
    return cpy;
  }

  // Deallocate libsass heap memory
  void ADDCALL sass_free_memory(void* ptr)
  {
    if (ptr) free (ptr);
  }

  // caller must free the returned memory
  char* ADDCALL sass_string_quote (const char *str, const char quote_mark)
  {
    std::string quoted = quote(str, quote_mark);
    return sass_copy_c_string(quoted.c_str());
  }

  // caller must free the returned memory
  char* ADDCALL sass_string_unquote (const char *str)
  {
    std::string unquoted = unquote(str);
    return sass_copy_c_string(unquoted.c_str());
  }

  char* ADDCALL sass_compiler_find_include (const char* file, struct Sass_Compiler* compiler)
  {
    // get the last import entry to get current base directory
    Sass_Import_Entry import = sass_compiler_get_last_import(compiler);
    const std::vector<std::string>& incs = compiler->cpp_ctx->include_paths;
    // create the vector with paths to lookup
    std::vector<std::string> paths(1 + incs.size());
    paths.push_back(File::dir_name(import->abs_path));
    paths.insert( paths.end(), incs.begin(), incs.end() );
    // now resolve the file path relative to lookup paths
    std::string resolved(File::find_include(file, paths));
    return sass_copy_c_string(resolved.c_str());
  }

  char* ADDCALL sass_compiler_find_file (const char* file, struct Sass_Compiler* compiler)
  {
    // get the last import entry to get current base directory
    Sass_Import_Entry import = sass_compiler_get_last_import(compiler);
    const std::vector<std::string>& incs = compiler->cpp_ctx->include_paths;
    // create the vector with paths to lookup
    std::vector<std::string> paths(1 + incs.size());
    paths.push_back(File::dir_name(import->abs_path));
    paths.insert( paths.end(), incs.begin(), incs.end() );
    // now resolve the file path relative to lookup paths
    std::string resolved(File::find_file(file, paths));
    return sass_copy_c_string(resolved.c_str());
  }

  // Make sure to free the returned value!
  // Incs array has to be null terminated!
  // this has the original resolve logic for sass include
  char* ADDCALL sass_find_include (const char* file, struct Sass_Options* opt)
  {
    std::vector<std::string> vec(list2vec(opt->include_paths));
    std::string resolved(File::find_include(file, vec));
    return sass_copy_c_string(resolved.c_str());
  }

  // Make sure to free the returned value!
  // Incs array has to be null terminated!
  char* ADDCALL sass_find_file (const char* file, struct Sass_Options* opt)
  {
    std::vector<std::string> vec(list2vec(opt->include_paths));
    std::string resolved(File::find_file(file, vec));
    return sass_copy_c_string(resolved.c_str());
  }

  // Get compiled libsass version
  const char* ADDCALL libsass_version(void)
  {
    return LIBSASS_VERSION;
  }

  // Get compiled libsass version
  const char* ADDCALL libsass_language_version(void)
  {
    return LIBSASS_LANGUAGE_VERSION;
  }

}

namespace Sass {

  // helper to aid dreaded MSVC debug mode
  char* sass_copy_string(std::string str)
  {
    // In MSVC the following can lead to segfault:
    // sass_copy_c_string(stream.str().c_str());
    // Reason is that the string returned by str() is disposed before
    // sass_copy_c_string is invoked. The string is actually a stack
    // object, so indeed nobody is holding on to it. So it seems
    // perfectly fair to release it right away. So the const char*
    // by c_str will point to invalid memory. I'm not sure if this is
    // the behavior for all compiler, but I'm pretty sure we would
    // have gotten more issues reported if that would be the case.
    // Wrapping it in a functions seems the cleanest approach as the
    // function must hold on to the stack variable until it's done.
    return sass_copy_c_string(str.c_str());
  }

}