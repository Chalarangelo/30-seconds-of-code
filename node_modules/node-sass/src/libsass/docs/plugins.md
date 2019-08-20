Plugins are shared object files (.so on *nix and .dll on win) that can be loaded by LibSass on runtime. Currently we only provide a way to load internal/custom functions from plugins. In the future we probably will also add a way to provide custom importers via plugins (needs more refactoring to [support multiple importers with some kind of priority system](https://github.com/sass/libsass/issues/962)).

## plugin.cpp

```C++
#include <cstring>
#include <iostream>
#include <stdint.h>
#include "sass_values.h"

union Sass_Value* ADDCALL call_fn_foo(const union Sass_Value* s_args, void* cookie)
{
  // we actually abuse the void* to store an "int"
  return sass_make_number((intptr_t)cookie, "px");
}

extern "C" const char* ADDCALL libsass_get_version() {
  return libsass_version();
}

extern "C" Sass_C_Function_List ADDCALL libsass_load_functions()
{
  // allocate a custom function caller
  Sass_C_Function_Callback fn_foo =
    sass_make_function("foo()", call_fn_foo, (void*)42);
  // create list of all custom functions
  Sass_C_Function_List fn_list = sass_make_function_list(1);
  // put the only function in this plugin to the list
  sass_function_set_list_entry(fn_list, 0, fn_foo);
  // return the list
  return fn_list;
}
```

To compile the plugin you need to have LibSass already built as a shared library (to link against it). The commands below expect the shared library in the `lib` sub-directory (`-Llib`). The plugin and the main LibSass process should "consume" the same shared LibSass library on runtime. It will propably also work if they use different LibSass versions. In this case we check if the major versions are compatible (i.e. 3.1.3 and 3.1.1 would be considered compatible).

## Compile with gcc on linux

```bash
g++ -O2 -shared plugin.cpp -o plugin.so -fPIC -Llib -lsass
```

## Compile with mingw on windows

```bash
g++ -O2 -shared plugin.cpp -o plugin.dll -Llib -lsass
```
