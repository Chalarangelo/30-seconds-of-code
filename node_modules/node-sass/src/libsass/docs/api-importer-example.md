## Example importer.c

```C
#include <stdio.h>
#include <string.h>
#include "sass/context.h"

Sass_Import_List sass_importer(const char* path, Sass_Importer_Entry cb, struct Sass_Compiler* comp)
{
  // get the cookie from importer descriptor
  void* cookie = sass_importer_get_cookie(cb);
  Sass_Import_List list = sass_make_import_list(2);
  char* local = sass_copy_c_string("local { color: green; }");
  char* remote = sass_copy_c_string("remote { color: red; }");
  list[0] = sass_make_import_entry("/tmp/styles.scss", local, 0);
  list[1] = sass_make_import_entry("http://www.example.com", remote, 0);
  return list;
}

int main( int argc, const char* argv[] )
{

  // get the input file from first argument or use default
  const char* input = argc > 1 ? argv[1] : "styles.scss";

  // create the file context and get all related structs
  struct Sass_File_Context* file_ctx = sass_make_file_context(input);
  struct Sass_Context* ctx = sass_file_context_get_context(file_ctx);
  struct Sass_Options* ctx_opt = sass_context_get_options(ctx);

  // allocate custom importer
  Sass_Importer_Entry c_imp =
    sass_make_importer(sass_importer, 0, 0);
  // create list for all custom importers
  Sass_Importer_List imp_list = sass_make_importer_list(1);
  // put only the importer on to the list
  sass_importer_set_list_entry(imp_list, 0, c_imp);
  // register list on to the context options
  sass_option_set_c_importers(ctx_opt, imp_list);
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

Compile importer.c

```bash
gcc -c importer.c -o importer.o
gcc -o importer importer.o -lsass
echo "@import 'foobar';" > importer.scss
./importer importer.scss
```

## Importer Behavior Examples

```C
Sass_Import_List importer(const char* path, Sass_Importer_Entry cb, struct Sass_Compiler* comp) {
  // let LibSass handle the import request
  return NULL;
}

Sass_Import_List importer(const char* path, Sass_Importer_Entry cb, struct Sass_Compiler* comp) {
  // let LibSass handle the request
  // swallows »@import "http://…"« pass-through
  // (arguably a bug)
  Sass_Import_List list = sass_make_import_list(1);
  list[0] = sass_make_import_entry(path, 0, 0);
  return list;
}

Sass_Import_List importer(const char* path, Sass_Importer_Entry cb, struct Sass_Compiler* comp) {
  // return an error to halt execution
  Sass_Import_List list = sass_make_import_list(1);
  const char* message = "some error message";
  list[0] = sass_make_import_entry(path, 0, 0);
  sass_import_set_error(list[0], sass_copy_c_string(message), 0, 0);
  return list;
}

Sass_Import_List importer(const char* path, Sass_Importer_Entry cb, struct Sass_Compiler* comp) {
  // let LibSass load the file identifed by the importer
  Sass_Import_List list = sass_make_import_list(1);
  list[0] = sass_make_import_entry("/tmp/file.scss", 0, 0);
  return list;
}

Sass_Import_List importer(const char* path, Sass_Importer_Entry cb, struct Sass_Compiler* comp) {
  // completely hide the import
  // (arguably a bug)
  Sass_Import_List list = sass_make_import_list(0);
  return list;
}

Sass_Import_List importer(const char* path, Sass_Importer_Entry cb, struct Sass_Compiler* comp) {
  // completely hide the import
  // (arguably a bug)
  Sass_Import_List list = sass_make_import_list(1);
  list[0] = sass_make_import_entry(0, 0, 0);
  return list;
}
```
