Sass functions are used to define new custom functions callable by Sass code. They are also used to overload debug or error statements. You can also define a fallback function, which is called for every unknown function found in the Sass code. Functions get passed zero or more `Sass_Values` (a `Sass_List` value) and they must also return a `Sass_Value`. Return a `Sass_Error` if you want to signal an error.

## Special signatures

- `*` - Fallback implementation
- `@warn` - Overload warn statements
- `@error` - Overload error statements
- `@debug` - Overload debug statements

Note: The fallback implementation will be given the name of the called function as the first argument, before all the original function arguments. These features are pretty new and should be considered experimental.

### Basic Usage

```C
#include "sass/functions.h"
```

## Sass Function API

```C
// Forward declaration
struct Sass_Compiler;
struct Sass_Function;

// Typedef helpers for custom functions lists
typedef struct Sass_Function (*Sass_Function_Entry);
typedef struct Sass_Function* (*Sass_Function_List);
// Typedef defining function signature and return type
typedef union Sass_Value* (*Sass_Function_Fn)
  (const union Sass_Value*, Sass_Function_Entry cb, struct Sass_Compiler* compiler);

// Creators for sass function list and function descriptors
Sass_Function_List sass_make_function_list (size_t length);
Sass_Function_Entry sass_make_function (const char* signature, Sass_Function_Fn cb, void* cookie);
// In case you need to free them yourself
void sass_delete_function (Sass_Function_Entry entry);
void sass_delete_function_list (Sass_Function_List list);

// Setters and getters for callbacks on function lists
Sass_Function_Entry sass_function_get_list_entry(Sass_Function_List list, size_t pos);
void sass_function_set_list_entry(Sass_Function_List list, size_t pos, Sass_Function_Entry cb);

// Setters to insert an entry into the import list (you may also use [] access directly)
// Since we are dealing with pointers they should have a guaranteed and fixed size
void sass_import_set_list_entry (Sass_Import_List list, size_t idx, Sass_Import_Entry entry);
Sass_Import_Entry sass_import_get_list_entry (Sass_Import_List list, size_t idx);

// Getters for custom function descriptors
const char* sass_function_get_signature (Sass_Function_Entry cb);
Sass_Function_Fn sass_function_get_function (Sass_Function_Entry cb);
void* sass_function_get_cookie (Sass_Function_Entry cb);

// Getters for callee entry
const char* sass_callee_get_name (Sass_Callee_Entry);
const char* sass_callee_get_path (Sass_Callee_Entry);
size_t sass_callee_get_line (Sass_Callee_Entry);
size_t sass_callee_get_column (Sass_Callee_Entry);
enum Sass_Callee_Type sass_callee_get_type (Sass_Callee_Entry);
Sass_Env_Frame sass_callee_get_env (Sass_Callee_Entry);

// Getters and Setters for environments (lexical, local and global)
union Sass_Value* sass_env_get_lexical (Sass_Env_Frame, const char*);
void sass_env_set_lexical (Sass_Env_Frame, const char*, union Sass_Value*);
union Sass_Value* sass_env_get_local (Sass_Env_Frame, const char*);
void sass_env_set_local (Sass_Env_Frame, const char*, union Sass_Value*);
union Sass_Value* sass_env_get_global (Sass_Env_Frame, const char*);
void sass_env_set_global (Sass_Env_Frame, const char*, union Sass_Value*);
```

### More links

- [Sass Function Example](api-function-example.md)
- [Sass Function Internal](api-function-internal.md)

