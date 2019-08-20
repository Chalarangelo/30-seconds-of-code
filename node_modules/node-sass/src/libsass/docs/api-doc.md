## Introduction

LibSass wouldn't be much good without a way to interface with it. These
interface documentations describe the various functions and data structures
available to implementers. They are split up over three major components, which
have all their own source files (plus some common functionality).

- [Sass Context](api-context.md) - Trigger and handle the main Sass compilation
- [Sass Value](api-value.md) - Exchange values and its format with LibSass
- [Sass Function](api-function.md) - Get invoked by LibSass for function statments
- [Sass Importer](api-importer.md) - Get invoked by LibSass for @import statments

### Basic usage

First you will need to include the header file!
This will automatically load all other headers too!

```C
#include "sass/context.h"
```

## Basic C Example

```C
#include <stdio.h>
#include "sass/context.h"

int main() {
  puts(libsass_version());
  return 0;
}
```

```bash
gcc -Wall version.c -lsass -o version && ./version
```

## More C Examples

- [Sample code for Sass Context](api-context-example.md)
- [Sample code for Sass Value](api-value-example.md)
- [Sample code for Sass Function](api-function-example.md)
- [Sample code for Sass Importer](api-importer-example.md)

## Compiling your code

The most important is your sass file (or string of sass code). With this, you
will want to start a LibSass compiler. Here is some pseudocode describing the
process. The compiler has two different modes: direct input as a string with
`Sass_Data_Context` or LibSass will do file reading for you by using
`Sass_File_Context`. See the code for a list of options available
[Sass_Options](https://github.com/sass/libsass/blob/36feef0/include/sass/interface.h#L18)

**Building a file compiler**

    context = sass_make_file_context("file.scss")
    options = sass_file_context_get_options(context)
    sass_option_set_precision(options, 1)
    sass_option_set_source_comments(options, true)

    sass_file_context_set_options(context, options)

    compiler = sass_make_file_compiler(sass_context)
    sass_compiler_parse(compiler)
    sass_compiler_execute(compiler)

    output = sass_context_get_output_string(context)
    // Retrieve errors during compilation
    error_status = sass_context_get_error_status(context)
    json_error = sass_context_get_error_json(context)
    // Release memory dedicated to the C compiler
    sass_delete_compiler(compiler)

**Building a data compiler**

    context = sass_make_data_context("div { a { color: blue; } }")
    options = sass_data_context_get_options(context)
    sass_option_set_precision(options, 1)
    sass_option_set_source_comments(options, true)

    sass_data_context_set_options(context, options)

    compiler = sass_make_data_compiler(context)
    sass_compiler_parse(compiler)
    sass_compiler_execute(compiler)

    output = sass_context_get_output_string(context)
    // div a { color: blue; }
    // Retrieve errors during compilation
    error_status = sass_context_get_error_status(context)
    json_error = sass_context_get_error_json(context)
    // Release memory dedicated to the C compiler
    sass_delete_compiler(compiler)

## Sass Context Internals

Everything is stored in structs:

```C
struct Sass_Options;
struct Sass_Context : Sass_Options;
struct Sass_File_context : Sass_Context;
struct Sass_Data_context : Sass_Context;
```

This mirrors very well how `libsass` uses these structures.

- `Sass_Options` holds everything you feed in before the compilation. It also hosts
`input_path` and `output_path` options, because they are used to generate/calculate
relative links in source-maps. The `input_path` is shared with `Sass_File_Context`.
- `Sass_Context` holds all the data returned by the compilation step.
- `Sass_File_Context` is a specific implementation that requires no additional fields
- `Sass_Data_Context` is a specific implementation that adds the `input_source` field

Structs can be down-casted to access `context` or `options`!

## Memory handling and life-cycles

We keep memory around for as long as the main [context](api-context.md) object
is not destroyed (`sass_delete_context`). LibSass will create copies of most
inputs/options beside the main sass code. You need to allocate and fill that
buffer before passing it to LibSass. You may also overtake memory management
from libsass for certain return values (i.e. `sass_context_take_output_string`).

```C
// to allocate buffer to be filled
void* sass_alloc_memory(size_t size);
// to allocate a buffer from existing string
char* sass_copy_c_string(const char* str);
// to free overtaken memory when done
void sass_free_memory(void* ptr);
```

## Miscellaneous API functions

```C
// Some convenient string helper function
char* sass_string_unquote (const char* str);
char* sass_string_quote (const char* str, const char quote_mark);

// Get compiled libsass version
const char* libsass_version(void);

// Implemented sass language version
// Hardcoded version 3.4 for time being
const char* libsass_language_version(void);
```

## Common Pitfalls

**input_path**

The `input_path` is part of `Sass_Options`, but it also is the main option for
`Sass_File_Context`. It is also used to generate relative file links in source-
maps. Therefore it is pretty usefull to pass this information if you have a
`Sass_Data_Context` and know the original path.

**output_path**

Be aware that `libsass` does not write the output file itself. This option
merely exists to give `libsass` the proper information to generate links in
source-maps. The file has to be written to the disk by the
binding/implementation. If the `output_path` is omitted, `libsass` tries to
extrapolate one from the `input_path` by replacing (or adding) the file ending
with `.css`.

## Error Codes

The `error_code` is integer value which indicates the type of error that
occurred inside the LibSass process. Following is the list of error codes along
with the short description:

* 1: normal errors like parsing or `eval` errors
* 2: bad allocation error (memory error)
* 3: "untranslated" C++ exception (`throw std::exception`)
* 4: legacy string exceptions ( `throw const char*` or `std::string` )
* 5: Some other unknown exception

Although for the API consumer, error codes do not offer much value except
indicating whether *any* error occurred during the compilation, it helps
debugging the LibSass internal code paths.

## Real-World Implementations

The proof is in the pudding, so we have highlighted a few implementations that
should be on par with the latest LibSass interface version. Some of them may not
have all features implemented!

1. [Perl Example](https://github.com/sass/perl-libsass/blob/master/lib/CSS/Sass.xs)
2. [Go Example](https://godoc.org/github.com/wellington/go-libsass#example-Compiler--Stdin)
3. [Node Example](https://github.com/sass/node-sass/blob/master/src/binding.cpp)

## ABI forward compatibility

We use a functional API to make dynamic linking more robust and future
compatible. The API is not yet 100% stable, so we do not yet guarantee
[ABI](https://gcc.gnu.org/onlinedocs/libstdc++/manual/abi.html) forward
compatibility.

## Plugins (experimental)

LibSass can load plugins from directories. Just define `plugin_path` on context
options to load all plugins from the directories. To implement plugins, please
consult the following example implementations.

- https://github.com/mgreter/libsass-glob
- https://github.com/mgreter/libsass-math
- https://github.com/mgreter/libsass-digest

## Internal Structs

- [Sass Context Internals](api-context-internal.md)
- [Sass Value Internals](api-value-internal.md)
- [Sass Function Internals](api-function-internal.md)
- [Sass Importer Internals](api-importer-internal.md)
