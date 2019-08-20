#ifndef SASS_C_FUNCTIONS_H
#define SASS_C_FUNCTIONS_H

#include <stddef.h>
#include <stdbool.h>
#include <sass/base.h>

#ifdef __cplusplus
extern "C" {
#endif


// Forward declaration
struct Sass_Env;
struct Sass_Callee;
struct Sass_Import;
struct Sass_Options;
struct Sass_Compiler;
struct Sass_Importer;
struct Sass_Function;

// Typedef helpers for callee lists
typedef struct Sass_Env (*Sass_Env_Frame);
// Typedef helpers for callee lists
typedef struct Sass_Callee (*Sass_Callee_Entry);
// Typedef helpers for import lists
typedef struct Sass_Import (*Sass_Import_Entry);
typedef struct Sass_Import* (*Sass_Import_List);
// Typedef helpers for custom importer lists
typedef struct Sass_Importer (*Sass_Importer_Entry);
typedef struct Sass_Importer* (*Sass_Importer_List);
// Typedef defining importer signature and return type
typedef Sass_Import_List (*Sass_Importer_Fn)
  (const char* url, Sass_Importer_Entry cb, struct Sass_Compiler* compiler);

// Typedef helpers for custom functions lists
typedef struct Sass_Function (*Sass_Function_Entry);
typedef struct Sass_Function* (*Sass_Function_List);
// Typedef defining function signature and return type
typedef union Sass_Value* (*Sass_Function_Fn)
  (const union Sass_Value*, Sass_Function_Entry cb, struct Sass_Compiler* compiler);

// Type of function calls
enum Sass_Callee_Type {
  SASS_CALLEE_MIXIN,
  SASS_CALLEE_FUNCTION,
  SASS_CALLEE_C_FUNCTION,
};

// Creator for sass custom importer return argument list
ADDAPI Sass_Importer_List ADDCALL sass_make_importer_list (size_t length);
ADDAPI Sass_Importer_Entry ADDCALL sass_importer_get_list_entry (Sass_Importer_List list, size_t idx);
ADDAPI void ADDCALL sass_importer_set_list_entry (Sass_Importer_List list, size_t idx, Sass_Importer_Entry entry);
ADDAPI void ADDCALL sass_delete_importer_list (Sass_Importer_List list);


// Creators for custom importer callback (with some additional pointer)
// The pointer is mostly used to store the callback into the actual binding
ADDAPI Sass_Importer_Entry ADDCALL sass_make_importer (Sass_Importer_Fn importer, double priority, void* cookie);

// Getters for import function descriptors
ADDAPI Sass_Importer_Fn ADDCALL sass_importer_get_function (Sass_Importer_Entry cb);
ADDAPI double ADDCALL sass_importer_get_priority (Sass_Importer_Entry cb);
ADDAPI void* ADDCALL sass_importer_get_cookie (Sass_Importer_Entry cb);

// Deallocator for associated memory
ADDAPI void ADDCALL sass_delete_importer (Sass_Importer_Entry cb);

// Creator for sass custom importer return argument list
ADDAPI Sass_Import_List ADDCALL sass_make_import_list (size_t length);
// Creator for a single import entry returned by the custom importer inside the list
ADDAPI Sass_Import_Entry ADDCALL sass_make_import_entry (const char* path, char* source, char* srcmap);
ADDAPI Sass_Import_Entry ADDCALL sass_make_import (const char* imp_path, const char* abs_base, char* source, char* srcmap);
// set error message to abort import and to print out a message (path from existing object is used in output)
ADDAPI Sass_Import_Entry ADDCALL sass_import_set_error(Sass_Import_Entry import, const char* message, size_t line, size_t col);

// Setters to insert an entry into the import list (you may also use [] access directly)
// Since we are dealing with pointers they should have a guaranteed and fixed size
ADDAPI void ADDCALL sass_import_set_list_entry (Sass_Import_List list, size_t idx, Sass_Import_Entry entry);
ADDAPI Sass_Import_Entry ADDCALL sass_import_get_list_entry (Sass_Import_List list, size_t idx);

// Getters for callee entry
ADDAPI const char* ADDCALL sass_callee_get_name (Sass_Callee_Entry);
ADDAPI const char* ADDCALL sass_callee_get_path (Sass_Callee_Entry);
ADDAPI size_t ADDCALL sass_callee_get_line (Sass_Callee_Entry);
ADDAPI size_t ADDCALL sass_callee_get_column (Sass_Callee_Entry);
ADDAPI enum Sass_Callee_Type ADDCALL sass_callee_get_type (Sass_Callee_Entry);
ADDAPI Sass_Env_Frame ADDCALL sass_callee_get_env (Sass_Callee_Entry);

// Getters and Setters for environments (lexical, local and global)
ADDAPI union Sass_Value* ADDCALL sass_env_get_lexical (Sass_Env_Frame, const char*);
ADDAPI void ADDCALL sass_env_set_lexical (Sass_Env_Frame, const char*, union Sass_Value*);
ADDAPI union Sass_Value* ADDCALL sass_env_get_local (Sass_Env_Frame, const char*);
ADDAPI void ADDCALL sass_env_set_local (Sass_Env_Frame, const char*, union Sass_Value*);
ADDAPI union Sass_Value* ADDCALL sass_env_get_global (Sass_Env_Frame, const char*);
ADDAPI void ADDCALL sass_env_set_global (Sass_Env_Frame, const char*, union Sass_Value*);

// Getters for import entry
ADDAPI const char* ADDCALL sass_import_get_imp_path (Sass_Import_Entry);
ADDAPI const char* ADDCALL sass_import_get_abs_path (Sass_Import_Entry);
ADDAPI const char* ADDCALL sass_import_get_source (Sass_Import_Entry);
ADDAPI const char* ADDCALL sass_import_get_srcmap (Sass_Import_Entry);
// Explicit functions to take ownership of these items
// The property on our struct will be reset to NULL
ADDAPI char* ADDCALL sass_import_take_source (Sass_Import_Entry);
ADDAPI char* ADDCALL sass_import_take_srcmap (Sass_Import_Entry);
// Getters from import error entry
ADDAPI size_t ADDCALL sass_import_get_error_line (Sass_Import_Entry);
ADDAPI size_t ADDCALL sass_import_get_error_column (Sass_Import_Entry);
ADDAPI const char* ADDCALL sass_import_get_error_message (Sass_Import_Entry);

// Deallocator for associated memory (incl. entries)
ADDAPI void ADDCALL sass_delete_import_list (Sass_Import_List);
// Just in case we have some stray import structs
ADDAPI void ADDCALL sass_delete_import (Sass_Import_Entry);



// Creators for sass function list and function descriptors
ADDAPI Sass_Function_List ADDCALL sass_make_function_list (size_t length);
ADDAPI Sass_Function_Entry ADDCALL sass_make_function (const char* signature, Sass_Function_Fn cb, void* cookie);
ADDAPI void ADDCALL sass_delete_function (Sass_Function_Entry entry);
ADDAPI void ADDCALL sass_delete_function_list (Sass_Function_List list);

// Setters and getters for callbacks on function lists
ADDAPI Sass_Function_Entry ADDCALL sass_function_get_list_entry(Sass_Function_List list, size_t pos);
ADDAPI void ADDCALL sass_function_set_list_entry(Sass_Function_List list, size_t pos, Sass_Function_Entry cb);

// Getters for custom function descriptors
ADDAPI const char* ADDCALL sass_function_get_signature (Sass_Function_Entry cb);
ADDAPI Sass_Function_Fn ADDCALL sass_function_get_function (Sass_Function_Entry cb);
ADDAPI void* ADDCALL sass_function_get_cookie (Sass_Function_Entry cb);


#ifdef __cplusplus
} // __cplusplus defined.
#endif

#endif
