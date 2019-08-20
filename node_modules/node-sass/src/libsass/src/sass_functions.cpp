#include "sass.hpp"
#include <cstring>
#include "util.hpp"
#include "context.hpp"
#include "values.hpp"
#include "sass/functions.h"
#include "sass_functions.hpp"

extern "C" {
  using namespace Sass;

  Sass_Function_List ADDCALL sass_make_function_list(size_t length)
  {
    return (Sass_Function_List) calloc(length + 1, sizeof(Sass_Function_Entry));
  }

  Sass_Function_Entry ADDCALL sass_make_function(const char* signature, Sass_Function_Fn function, void* cookie)
  {
    Sass_Function_Entry cb = (Sass_Function_Entry) calloc(1, sizeof(Sass_Function));
    if (cb == 0) return 0;
    cb->signature = sass_copy_c_string(signature);
    cb->function = function;
    cb->cookie = cookie;
    return cb;
  }

  void ADDCALL sass_delete_function(Sass_Function_Entry entry)
  {
    free(entry->signature);
    free(entry);
  }

  // Deallocator for the allocated memory
  void ADDCALL sass_delete_function_list(Sass_Function_List list)
  {
    Sass_Function_List it = list;
    if (list == 0) return;
    while(*list) {
      sass_delete_function(*list);
      ++list;
    }
    free(it);
  }

  // Setters and getters for callbacks on function lists
  Sass_Function_Entry ADDCALL sass_function_get_list_entry(Sass_Function_List list, size_t pos) { return list[pos]; }
  void sass_function_set_list_entry(Sass_Function_List list, size_t pos, Sass_Function_Entry cb) { list[pos] = cb; }

  const char* ADDCALL sass_function_get_signature(Sass_Function_Entry cb) { return cb->signature; }
  Sass_Function_Fn ADDCALL sass_function_get_function(Sass_Function_Entry cb) { return cb->function; }
  void* ADDCALL sass_function_get_cookie(Sass_Function_Entry cb) { return cb->cookie; }

  Sass_Importer_Entry ADDCALL sass_make_importer(Sass_Importer_Fn importer, double priority, void* cookie)
  {
    Sass_Importer_Entry cb = (Sass_Importer_Entry) calloc(1, sizeof(Sass_Importer));
    if (cb == 0) return 0;
    cb->importer = importer;
    cb->priority = priority;
    cb->cookie = cookie;
    return cb;
  }

  Sass_Importer_Fn ADDCALL sass_importer_get_function(Sass_Importer_Entry cb) { return cb->importer; }
  double ADDCALL sass_importer_get_priority (Sass_Importer_Entry cb) { return cb->priority; }
  void* ADDCALL sass_importer_get_cookie(Sass_Importer_Entry cb) { return cb->cookie; }

  // Just in case we have some stray import structs
  void ADDCALL sass_delete_importer (Sass_Importer_Entry cb)
  {
    free(cb);
  }

  // Creator for sass custom importer function list
  Sass_Importer_List ADDCALL sass_make_importer_list(size_t length)
  {
    return (Sass_Importer_List) calloc(length + 1, sizeof(Sass_Importer_Entry));
  }

  // Deallocator for the allocated memory
  void ADDCALL sass_delete_importer_list(Sass_Importer_List list)
  {
    Sass_Importer_List it = list;
    if (list == 0) return;
    while(*list) {
      sass_delete_importer(*list);
      ++list;
    }
    free(it);
  }

  Sass_Importer_Entry ADDCALL sass_importer_get_list_entry(Sass_Importer_List list, size_t idx) { return list[idx]; }
  void ADDCALL sass_importer_set_list_entry(Sass_Importer_List list, size_t idx, Sass_Importer_Entry cb) { list[idx] = cb; }

  // Creator for sass custom importer return argument list
  Sass_Import_List ADDCALL sass_make_import_list(size_t length)
  {
    return (Sass_Import**) calloc(length + 1, sizeof(Sass_Import*));
  }

  // Creator for a single import entry returned by the custom importer inside the list
  // We take ownership of the memory for source and srcmap (freed when context is destroyd)
  Sass_Import_Entry ADDCALL sass_make_import(const char* imp_path, const char* abs_path, char* source, char* srcmap)
  {
    Sass_Import* v = (Sass_Import*) calloc(1, sizeof(Sass_Import));
    if (v == 0) return 0;
    v->imp_path = imp_path ? sass_copy_c_string(imp_path) : 0;
    v->abs_path = abs_path ? sass_copy_c_string(abs_path) : 0;
    v->source = source;
    v->srcmap = srcmap;
    v->error = 0;
    v->line = -1;
    v->column = -1;
    return v;
  }

  // Older style, but somehow still valid - keep around or deprecate?
  Sass_Import_Entry ADDCALL sass_make_import_entry(const char* path, char* source, char* srcmap)
  {
    return sass_make_import(path, path, source, srcmap);
  }

  // Upgrade a normal import entry to throw an error (original path can be re-used by error reporting)
  Sass_Import_Entry ADDCALL sass_import_set_error(Sass_Import_Entry import, const char* error, size_t line, size_t col)
  {
    if (import == 0) return 0;
    if (import->error) free(import->error);
    import->error = error ? sass_copy_c_string(error) : 0;
    import->line = line ? line : -1;
    import->column = col ? col : -1;
    return import;
  }

  // Setters and getters for entries on the import list
  void ADDCALL sass_import_set_list_entry(Sass_Import_List list, size_t idx, Sass_Import_Entry entry) { list[idx] = entry; }
  Sass_Import_Entry ADDCALL sass_import_get_list_entry(Sass_Import_List list, size_t idx) { return list[idx]; }

  // Deallocator for the allocated memory
  void ADDCALL sass_delete_import_list(Sass_Import_List list)
  {
    Sass_Import_List it = list;
    if (list == 0) return;
    while(*list) {
      sass_delete_import(*list);
      ++list;
    }
    free(it);
  }

  // Just in case we have some stray import structs
  void ADDCALL sass_delete_import(Sass_Import_Entry import)
  {
    free(import->imp_path);
    free(import->abs_path);
    free(import->source);
    free(import->srcmap);
    free(import->error);
    free(import);
  }

  // Getter for callee entry
  const char* ADDCALL sass_callee_get_name(Sass_Callee_Entry entry) { return entry->name; }
  const char* ADDCALL sass_callee_get_path(Sass_Callee_Entry entry) { return entry->path; }
  size_t ADDCALL sass_callee_get_line(Sass_Callee_Entry entry) { return entry->line; }
  size_t ADDCALL sass_callee_get_column(Sass_Callee_Entry entry) { return entry->column; }
  enum Sass_Callee_Type ADDCALL sass_callee_get_type(Sass_Callee_Entry entry) { return entry->type; }
  Sass_Env_Frame ADDCALL sass_callee_get_env (Sass_Callee_Entry entry) { return &entry->env; }

  // Getters and Setters for environments (lexical, local and global)
  union Sass_Value* ADDCALL sass_env_get_lexical (Sass_Env_Frame env, const char* name) {
    Expression_Ptr ex = Cast<Expression>((*env->frame)[name]);
    return ex != NULL ? ast_node_to_sass_value(ex) : NULL;
  }
  void ADDCALL sass_env_set_lexical (Sass_Env_Frame env, const char* name, union Sass_Value* val) {
    (*env->frame)[name] = sass_value_to_ast_node(val);
  }
  union Sass_Value* ADDCALL sass_env_get_local (Sass_Env_Frame env, const char* name) {
    Expression_Ptr ex = Cast<Expression>(env->frame->get_local(name));
    return ex != NULL ? ast_node_to_sass_value(ex) : NULL;
  }
  void ADDCALL sass_env_set_local (Sass_Env_Frame env, const char* name, union Sass_Value* val) {
    env->frame->set_local(name, sass_value_to_ast_node(val));
  }
  union Sass_Value* ADDCALL sass_env_get_global (Sass_Env_Frame env, const char* name) {
    Expression_Ptr ex = Cast<Expression>(env->frame->get_global(name));
    return ex != NULL ? ast_node_to_sass_value(ex) : NULL;
  }
  void ADDCALL sass_env_set_global (Sass_Env_Frame env, const char* name, union Sass_Value* val) {
    env->frame->set_global(name, sass_value_to_ast_node(val));
  }

  // Getter for import entry
  const char* ADDCALL sass_import_get_imp_path(Sass_Import_Entry entry) { return entry->imp_path; }
  const char* ADDCALL sass_import_get_abs_path(Sass_Import_Entry entry) { return entry->abs_path; }
  const char* ADDCALL sass_import_get_source(Sass_Import_Entry entry) { return entry->source; }
  const char* ADDCALL sass_import_get_srcmap(Sass_Import_Entry entry) { return entry->srcmap; }

  // Getter for import error entry
  size_t ADDCALL sass_import_get_error_line(Sass_Import_Entry entry) { return entry->line; }
  size_t ADDCALL sass_import_get_error_column(Sass_Import_Entry entry) { return entry->column; }
  const char* ADDCALL sass_import_get_error_message(Sass_Import_Entry entry) { return entry->error; }

  // Explicit functions to take ownership of the memory
  // Resets our own property since we do not know if it is still alive
  char* ADDCALL sass_import_take_source(Sass_Import_Entry entry) { char* ptr = entry->source; entry->source = 0; return ptr; }
  char* ADDCALL sass_import_take_srcmap(Sass_Import_Entry entry) { char* ptr = entry->srcmap; entry->srcmap = 0; return ptr; }

}
