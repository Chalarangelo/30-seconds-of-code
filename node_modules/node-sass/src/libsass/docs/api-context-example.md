## Example main.c

```C
#include <stdio.h>
#include "sass/context.h"

int main( int argc, const char* argv[] )
{

  // get the input file from first argument or use default
  const char* input = argc > 1 ? argv[1] : "styles.scss";

  // create the file context and get all related structs
  struct Sass_File_Context* file_ctx = sass_make_file_context(input);
  struct Sass_Context* ctx = sass_file_context_get_context(file_ctx);
  struct Sass_Options* ctx_opt = sass_context_get_options(ctx);

  // configure some options ...
  sass_option_set_precision(ctx_opt, 10);

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
echo "foo { margin: 21px * 2; }" > foo.scss
./sample foo.scss => "foo { margin: 42px }"
```

