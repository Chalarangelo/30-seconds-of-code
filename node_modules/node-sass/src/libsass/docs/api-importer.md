By using custom importers, Sass stylesheets can be implemented in any possible way, such as by being loaded via a remote server. Please note: this feature is experimental and is implemented differently than importers in Ruby Sass. Imports must be relative to the parent import context and therefore we need to pass this information to the importer callback. This is currently done by passing the complete import string/path of the previous import context.

## Return Imports

You actually have to return a list of imports, since some importers may want to import multiple files from one import statement (ie. a glob/star importer).  The memory you pass with source and srcmap is taken over by LibSass and freed automatically when the import is done. You are also allowed to return `0` instead of a list, which will tell LibSass to handle the import by itself (as if no custom importer was in use).

```C
Sass_Import_Entry* rv = sass_make_import_list(1);
rv[0] = sass_make_import(rel, abs, source, srcmap);
```

Every import will then be included in LibSass. You are allowed to only return a file path without any loaded source. This way you can ie. implement rewrite rules for import paths and leave the loading part for LibSass.

Please note that LibSass doesn't use the srcmap parameter yet. It has been added to not deprecate the C-API once support has been implemented. It will be used to re-map the actual sourcemap with the provided ones.

### Basic Usage

```C
#include "sass/functions.h"
```

## Sass Importer API

```C
// Forward declaration
struct Sass_Import;

// Forward declaration
struct Sass_C_Import_Descriptor;

// Typedef defining the custom importer callback
typedef struct Sass_C_Import_Descriptor (*Sass_C_Import_Callback);
// Typedef defining the importer c function prototype
typedef Sass_Import_Entry* (*Sass_C_Import_Fn) (const char* url, const char* prev, void* cookie);

// Creators for custom importer callback (with some additional pointer)
// The pointer is mostly used to store the callback into the actual function
Sass_C_Import_Callback sass_make_importer (Sass_C_Import_Fn, void* cookie);

// Getters for import function descriptors
Sass_C_Import_Fn sass_import_get_function (Sass_C_Import_Callback fn);
void* sass_import_get_cookie (Sass_C_Import_Callback fn);

// Deallocator for associated memory
void sass_delete_importer (Sass_C_Import_Callback fn);

// Creator for sass custom importer return argument list
Sass_Import_Entry* sass_make_import_list (size_t length);
// Creator for a single import entry returned by the custom importer inside the list
Sass_Import_Entry sass_make_import_entry (const char* path, char* source, char* srcmap);
Sass_Import_Entry sass_make_import (const char* rel, const char* abs, char* source, char* srcmap);

// set error message to abort import and to print out a message (path from existing object is used in output)
Sass_Import_Entry sass_import_set_error(Sass_Import_Entry import, const char* message, size_t line, size_t col);

// Setters to insert an entry into the import list (you may also use [] access directly)
// Since we are dealing with pointers they should have a guaranteed and fixed size
void sass_import_set_list_entry (Sass_Import_Entry* list, size_t idx, Sass_Import_Entry entry);
Sass_Import_Entry sass_import_get_list_entry (Sass_Import_Entry* list, size_t idx);

// Getters for import entry
const char* sass_import_get_imp_path (Sass_Import_Entry);
const char* sass_import_get_abs_path (Sass_Import_Entry);
const char* sass_import_get_source (Sass_Import_Entry);
const char* sass_import_get_srcmap (Sass_Import_Entry);
// Explicit functions to take ownership of these items
// The property on our struct will be reset to NULL
char* sass_import_take_source (Sass_Import_Entry);
char* sass_import_take_srcmap (Sass_Import_Entry);

// Getters for import error entries
size_t sass_import_get_error_line (Sass_Import_Entry);
size_t sass_import_get_error_column (Sass_Import_Entry);
const char* sass_import_get_error_message (Sass_Import_Entry);

// Deallocator for associated memory (incl. entries)
void sass_delete_import_list (Sass_Import_Entry*);
// Just in case we have some stray import structs
void sass_delete_import (Sass_Import_Entry);
```

### More links

- [Sass Importer Example](api-importer-example.md)
- [Sass Importer Internal](api-importer-internal.md)

