# Developer Documentation

Custom functions are internally represented by `struct Sass_C_Function_Descriptor`.

## Sass_C_Function_Descriptor

```C
struct Sass_C_Function_Descriptor {
  const char*      signature;
  Sass_C_Function  function;
  void*            cookie;
};
```

- `signature`: The function declaration, like `foo($bar, $baz:1)`
- `function`:  Reference to the C function callback
- `cookie`:    any pointer you want to attach

### signature

The signature defines how the function can be invoked. It also declares which arguments are required and which are optional.  Required arguments will be enforced by LibSass and a Sass error is thrown in the event a call as missing an argument. Optional arguments only need to be present when you want to overwrite the default value.

    foo($bar, $baz: 2)

In this example, `$bar` is required and will error if not passed. `$baz` is optional and the default value of it is 2. A call like `foo(10)` is therefore equal to `foo(10, 2)`, while `foo()` will produce an error.

### function

The callback function needs to be of the following form:

```C
union Sass_Value* call_sass_function(
    const union Sass_Value* s_args,
    void*                   cookie
) {
  return sass_clone_value(s_args);
}
```

### cookie

The cookie can hold any pointer you want. In the `perl-libsass` implementation it holds the structure with the reference of the actual registered callback into the perl interpreter. Before that call `perl-libsass` will convert all `Sass_Values` to corresponding perl data types (so they can be used natively inside the perl interpretor). The callback can also return a `Sass_Value`. In `perl-libsass` the actual function returns a perl value, which has to be converted before `libsass` can work with it again!

## Sass_Values

```C
// allocate memory (copies passed strings)
union Sass_Value* sass_make_null    (void);
union Sass_Value* sass_make_boolean (bool val);
union Sass_Value* sass_make_string  (const char* val);
union Sass_Value* sass_make_qstring (const char* val);
union Sass_Value* sass_make_number  (double val, const char* unit);
union Sass_Value* sass_make_color   (double r, double g, double b, double a);
union Sass_Value* sass_make_list    (size_t len, enum Sass_Separator sep, bool is_bracketed);
union Sass_Value* sass_make_map     (size_t len);
union Sass_Value* sass_make_error   (const char* msg);
union Sass_Value* sass_make_warning (const char* msg);

// Make a deep cloned copy of the given sass value
union Sass_Value* sass_clone_value (const union Sass_Value* val);

// deallocate memory (incl. all copied memory)
void sass_delete_value (const union Sass_Value* val);
```

## Example main.c

```C
#include <stdio.h>
#include <stdint.h>
#include "sass/context.h"

union Sass_Value* call_fn_foo(const union Sass_Value* s_args, void* cookie)
{
  // we actually abuse the void* to store an "int"
  return sass_make_number((size_t)cookie, "px");
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
  Sass_C_Function_Callback fn_foo =
    sass_make_function("foo()", call_fn_foo, (void*)42);

  // create list of all custom functions
  Sass_C_Function_List fn_list = sass_make_function_list(1);
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

## Compile main.c

```bash
gcc -c main.c -o main.o
gcc -o sample main.o -lsass
echo "foo { margin: foo(); }" > foo.scss
./sample foo.scss => "foo { margin: 42px }"
```
