## Example main.c

```C
#include <stdio.h>
#include <stdint.h>
#include "sass/context.h"

union Sass_Value* call_fn_foo(const union Sass_Value* s_args, Sass_Function_Entry cb, struct Sass_Compiler* comp)
{
  // get context/option struct associated with this compiler
  struct Sass_Context* ctx = sass_compiler_get_context(comp);
  struct Sass_Options* opts = sass_compiler_get_options(comp);
  // get information about previous importer entry from the stack
  Sass_Import_Entry import = sass_compiler_get_last_import(comp);
  const char* prev_abs_path = sass_import_get_abs_path(import);
  const char* prev_imp_path = sass_import_get_imp_path(import);
  // get the cookie from function descriptor
  void* cookie = sass_function_get_cookie(cb);
  // we actually abuse the void* to store an "int"
  return sass_make_number((intptr_t)cookie, "px");
}

int main( int argc, const char* argv[] )
{

  // get the input file from first argument or use default
  const char* input = argc > 1 ? argv[1] : "styles.scss";

  // create the file context and get all related structs
  struct Sass_File_Context* file_ctx = sass_make_file_context(input);
  struct Sass_Context* ctx = sass_file_context_get_context(file_ctx);
  struct Sass_Options* ctx_opt = sass_context_get_options(ctx);

  // allocate a custom function caller
  Sass_Function_Entry fn_foo =
    sass_make_function("foo()", call_fn_foo, (void*)42);

  // create list of all custom functions
  Sass_Function_List fn_list = sass_make_function_list(1);
  sass_function_set_list_entry(fn_list, 0, fn_foo);
  sass_option_set_c_functions(ctx_opt, fn_list);

  // context is set up, call the compile step now
  int status = sass_compile_file_context(file_ctx);

  // print the result or the error to the stdout
  if (status == 0) puts(sass_context_get_output_string(ctx));
  else puts(sass_context_get_error_message(ctx));

  // release allocated memory
  sass_delete_file_context(file_ctx);

  // exit status
  return status;

}
```

### Compile main.c

```bash
gcc -c main.c -o main.o
gcc -o sample main.o -lsass
echo "foo { margin: foo(); }" > foo.scss
./sample foo.scss => "foo { margin: 42px }"
```

