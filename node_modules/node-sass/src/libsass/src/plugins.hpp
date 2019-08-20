#ifndef SASS_PLUGINS_H
#define SASS_PLUGINS_H

#include <string>
#include <vector>
#include "utf8_string.hpp"
#include "sass/functions.h"

#ifdef _WIN32

  #define LOAD_LIB(var, path) HMODULE var = LoadLibraryW(UTF_8::convert_to_utf16(path).c_str())
  #define LOAD_LIB_WCHR(var, path_wide_str) HMODULE var = LoadLibraryW(path_wide_str.c_str())
  #define LOAD_LIB_FN(type, var, name) type var = (type) GetProcAddress(plugin, name)
  #define CLOSE_LIB(var) FreeLibrary(var)

  #ifndef dlerror
  #define dlerror() 0
  #endif

#else

  #define LOAD_LIB(var, path) void* var = dlopen(path.c_str(), RTLD_LAZY)
  #define LOAD_LIB_FN(type, var, name) type var = (type) dlsym(plugin, name)
  #define CLOSE_LIB(var) dlclose(var)

#endif

namespace Sass {


  class Plugins {

    public: // c-tor
      Plugins(void);
      ~Plugins(void);

    public: // methods
      // load one specific plugin
      bool load_plugin(const std::string& path);
      // load all plugins from a directory
      size_t load_plugins(const std::string& path);

    public: // public accessors
      const std::vector<Sass_Importer_Entry> get_headers(void) { return headers; }
      const std::vector<Sass_Importer_Entry> get_importers(void) { return importers; }
      const std::vector<Sass_Function_Entry> get_functions(void) { return functions; }

    private: // private vars
      std::vector<Sass_Importer_Entry> headers;
      std::vector<Sass_Importer_Entry> importers;
      std::vector<Sass_Function_Entry> functions;

  };

}

#endif
