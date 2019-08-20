#include <cstring>
#include <iostream>
#include <stdint.h>
#include <sass.h>

// gcc: g++ -shared plugin.cpp -o plugin.so -fPIC -Llib -lsass
// mingw: g++ -shared plugin.cpp -o plugin.dll -Llib -lsass

extern "C" const char* ADDCALL libsass_get_version() {
  return libsass_version();
}

union Sass_Value* custom_function(const union Sass_Value* s_args, Sass_Function_Entry cb, struct Sass_Compiler* comp)
{
  // get context/option struct associated with this compiler
  struct Sass_Context* ctx = sass_compiler_get_context(comp);
  struct Sass_Options* opts = sass_compiler_get_options(comp);
  // get the cookie from function descriptor
  void* cookie = sass_function_get_cookie(cb);
  // we actually abuse the void* to store an "int"
  return sass_make_number((intptr_t)cookie, "px");
}

extern "C" Sass_Function_List ADDCALL libsass_load_functions()
{
  // allocate a custom function caller
  Sass_Function_Entry c_func =
    sass_make_function("foo()", custom_function, (void*)42);
  // create list of all custom functions
  Sass_Function_List fn_list = sass_make_function_list(1);
  // put the only function in this plugin to the list
  sass_function_set_list_entry(fn_list, 0, c_func);
  // return the list
  return fn_list;
}

Sass_Import_List custom_importer(const char* cur_path, Sass_Importer_Entry cb, struct Sass_Compiler* comp)
{
  // get the cookie from importer descriptor
  void* cookie = sass_importer_get_cookie(cb);
  // create a list to hold our import entries
  Sass_Import_List incs = sass_make_import_list(1);
  // create our only import entry (route path back)
  incs[0] = sass_make_import_entry(cur_path, 0, 0);
  // return imports
  return incs;
}

extern "C" Sass_Importer_List ADDCALL libsass_load_importers()
{
  // allocate a custom function caller
  Sass_Importer_Entry c_imp =
    sass_make_importer(custom_importer, - 99, (void*)42);
  // create list of all custom functions
  Sass_Importer_List imp_list = sass_make_importer_list(1);
  // put the only function in this plugin to the list
  sass_importer_set_list_entry(imp_list, 0, c_imp);
  // return the list
  return imp_list;
}
