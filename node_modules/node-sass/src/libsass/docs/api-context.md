Sass Contexts come in two flavors:

- `Sass_File_Context`
- `Sass_Data_Context`

### Basic Usage

```C
#include "sass/context.h"
```

***Sass_Options***

```C
// Precision for fractional numbers
int precision;
```
```C
// Output style for the generated css code
// A value from above SASS_STYLE_* constants
int output_style;
```
```C
// Emit comments in the generated CSS indicating
// the corresponding source line.
bool source_comments;
```
```C
// embed sourceMappingUrl as data uri
bool source_map_embed;
```
```C
// embed include contents in maps
bool source_map_contents;
```
```C
// create file urls for sources
bool source_map_file_urls;
```
```C
// Disable sourceMappingUrl in css output
bool omit_source_map_url;
```
```C
// Treat source_string as sass (as opposed to scss)
bool is_indented_syntax_src;
```
```C
// The input path is used for source map
// generating. It can be used to define
// something with string compilation or to
// overload the input file path. It is
// set to "stdin" for data contexts and
// to the input file on file contexts.
char* input_path;
```
```C
// The output path is used for source map
// generating. LibSass will not write to
// this file, it is just used to create
// information in source-maps etc.
char* output_path;
```
```C
// String to be used for indentation
const char* indent;
```
```C
// String to be used to for line feeds
const char* linefeed;
```
```C
// Colon-separated list of paths
// Semicolon-separated on Windows
char* include_path;
char* plugin_path;
```
```C
// Additional include paths
// Must be null delimited
char** include_paths;
char** plugin_paths;
```
```C
// Path to source map file
// Enables the source map generating
// Used to create sourceMappingUrl
char* source_map_file;
```
```C
// Directly inserted in source maps
char* source_map_root;
```
```C
// Custom functions that can be called from Sass code
Sass_C_Function_List c_functions;
```
```C
// Callback to overload imports
Sass_C_Import_Callback importer;
```

***Sass_Context***

```C
// store context type info
enum Sass_Input_Style type;
````
```C
// generated output data
char* output_string;
```
```C
// generated source map json
char* source_map_string;
```
```C
// error status
int error_status;
char* error_json;
char* error_text;
char* error_message;
// error position
char* error_file;
size_t error_line;
size_t error_column;
```
```C
// report imported files
char** included_files;
```

***Sass_File_Context***

```C
// no additional fields required
// input_path is already on options
```

***Sass_Data_Context***

```C
// provided source string
char* source_string;
```

### Sass Context API

```C
// Forward declaration
struct Sass_Compiler;

// Forward declaration
struct Sass_Options;
struct Sass_Context; // : Sass_Options
struct Sass_File_Context; // : Sass_Context
struct Sass_Data_Context; // : Sass_Context

// Create and initialize an option struct
struct Sass_Options* sass_make_options (void);
// Create and initialize a specific context
struct Sass_File_Context* sass_make_file_context (const char* input_path);
struct Sass_Data_Context* sass_make_data_context (char* source_string);

// Call the compilation step for the specific context
int sass_compile_file_context (struct Sass_File_Context* ctx);
int sass_compile_data_context (struct Sass_Data_Context* ctx);

// Create a sass compiler instance for more control
struct Sass_Compiler* sass_make_file_compiler (struct Sass_File_Context* file_ctx);
struct Sass_Compiler* sass_make_data_compiler (struct Sass_Data_Context* data_ctx);

// Execute the different compilation steps individually
// Usefull if you only want to query the included files
int sass_compiler_parse (struct Sass_Compiler* compiler);
int sass_compiler_execute (struct Sass_Compiler* compiler);

// Release all memory allocated with the compiler
// This does _not_ include any contexts or options
void sass_delete_compiler (struct Sass_Compiler* compiler);
void sass_delete_options(struct Sass_Options* options);

// Release all memory allocated and also ourself
void sass_delete_file_context (struct Sass_File_Context* ctx);
void sass_delete_data_context (struct Sass_Data_Context* ctx);

// Getters for Context from specific implementation
struct Sass_Context* sass_file_context_get_context (struct Sass_File_Context* file_ctx);
struct Sass_Context* sass_data_context_get_context (struct Sass_Data_Context* data_ctx);

// Getters for Context_Options from Sass_Context
struct Sass_Options* sass_context_get_options (struct Sass_Context* ctx);
struct Sass_Options* sass_file_context_get_options (struct Sass_File_Context* file_ctx);
struct Sass_Options* sass_data_context_get_options (struct Sass_Data_Context* data_ctx);
void sass_file_context_set_options (struct Sass_File_Context* file_ctx, struct Sass_Options* opt);
void sass_data_context_set_options (struct Sass_Data_Context* data_ctx, struct Sass_Options* opt);

// Getters for Sass_Context values
const char* sass_context_get_output_string (struct Sass_Context* ctx);
int sass_context_get_error_status (struct Sass_Context* ctx);
const char* sass_context_get_error_json (struct Sass_Context* ctx);
const char* sass_context_get_error_text (struct Sass_Context* ctx);
const char* sass_context_get_error_message (struct Sass_Context* ctx);
const char* sass_context_get_error_file (struct Sass_Context* ctx);
size_t sass_context_get_error_line (struct Sass_Context* ctx);
size_t sass_context_get_error_column (struct Sass_Context* ctx);
const char* sass_context_get_source_map_string (struct Sass_Context* ctx);
char** sass_context_get_included_files (struct Sass_Context* ctx);

// Getters for Sass_Compiler options (query import stack)
size_t sass_compiler_get_import_stack_size(struct Sass_Compiler* compiler);
Sass_Import_Entry sass_compiler_get_last_import(struct Sass_Compiler* compiler);
Sass_Import_Entry sass_compiler_get_import_entry(struct Sass_Compiler* compiler, size_t idx);
// Getters for Sass_Compiler options (query function stack)
size_t sass_compiler_get_callee_stack_size(struct Sass_Compiler* compiler);
Sass_Callee_Entry sass_compiler_get_last_callee(struct Sass_Compiler* compiler);
Sass_Callee_Entry sass_compiler_get_callee_entry(struct Sass_Compiler* compiler, size_t idx);

// Take ownership of memory (value on context is set to 0)
char* sass_context_take_error_json (struct Sass_Context* ctx);
char* sass_context_take_error_text (struct Sass_Context* ctx);
char* sass_context_take_error_message (struct Sass_Context* ctx);
char* sass_context_take_error_file (struct Sass_Context* ctx);
char* sass_context_take_output_string (struct Sass_Context* ctx);
char* sass_context_take_source_map_string (struct Sass_Context* ctx);
```

### Sass Options API

```C
// Getters for Context_Option values
int sass_option_get_precision (struct Sass_Options* options);
enum Sass_Output_Style sass_option_get_output_style (struct Sass_Options* options);
bool sass_option_get_source_comments (struct Sass_Options* options);
bool sass_option_get_source_map_embed (struct Sass_Options* options);
bool sass_option_get_source_map_contents (struct Sass_Options* options);
bool sass_option_get_source_map_file_urls (struct Sass_Options* options);
bool sass_option_get_omit_source_map_url (struct Sass_Options* options);
bool sass_option_get_is_indented_syntax_src (struct Sass_Options* options);
const char* sass_option_get_indent (struct Sass_Options* options);
const char* sass_option_get_linefeed (struct Sass_Options* options);
const char* sass_option_get_input_path (struct Sass_Options* options);
const char* sass_option_get_output_path (struct Sass_Options* options);
const char* sass_option_get_source_map_file (struct Sass_Options* options);
const char* sass_option_get_source_map_root (struct Sass_Options* options);
Sass_C_Function_List sass_option_get_c_functions (struct Sass_Options* options);
Sass_C_Import_Callback sass_option_get_importer (struct Sass_Options* options);

// Getters for Context_Option include path array
size_t sass_option_get_include_path_size(struct Sass_Options* options);
const char* sass_option_get_include_path(struct Sass_Options* options, size_t i);
// Plugin paths to load dynamic libraries work the same
size_t sass_option_get_plugin_path_size(struct Sass_Options* options);
const char* sass_option_get_plugin_path(struct Sass_Options* options, size_t i);

// Setters for Context_Option values
void sass_option_set_precision (struct Sass_Options* options, int precision);
void sass_option_set_output_style (struct Sass_Options* options, enum Sass_Output_Style output_style);
void sass_option_set_source_comments (struct Sass_Options* options, bool source_comments);
void sass_option_set_source_map_embed (struct Sass_Options* options, bool source_map_embed);
void sass_option_set_source_map_contents (struct Sass_Options* options, bool source_map_contents);
void sass_option_set_source_map_file_urls (struct Sass_Options* options, bool source_map_file_urls);
void sass_option_set_omit_source_map_url (struct Sass_Options* options, bool omit_source_map_url);
void sass_option_set_is_indented_syntax_src (struct Sass_Options* options, bool is_indented_syntax_src);
void sass_option_set_indent (struct Sass_Options* options, const char* indent);
void sass_option_set_linefeed (struct Sass_Options* options, const char* linefeed);
void sass_option_set_input_path (struct Sass_Options* options, const char* input_path);
void sass_option_set_output_path (struct Sass_Options* options, const char* output_path);
void sass_option_set_plugin_path (struct Sass_Options* options, const char* plugin_path);
void sass_option_set_include_path (struct Sass_Options* options, const char* include_path);
void sass_option_set_source_map_file (struct Sass_Options* options, const char* source_map_file);
void sass_option_set_source_map_root (struct Sass_Options* options, const char* source_map_root);
void sass_option_set_c_functions (struct Sass_Options* options, Sass_C_Function_List c_functions);
void sass_option_set_importer (struct Sass_Options* options, Sass_C_Import_Callback importer);

// Push function for paths (no manipulation support for now)
void sass_option_push_plugin_path (struct Sass_Options* options, const char* path);
void sass_option_push_include_path (struct Sass_Options* options, const char* path);

// Resolve a file via the given include paths in the sass option struct
// find_file looks for the exact file name while find_include does a regular sass include
char* sass_find_file (const char* path, struct Sass_Options* opt);
char* sass_find_include (const char* path, struct Sass_Options* opt);

// Resolve a file relative to last import or include paths in the sass option struct
// find_file looks for the exact file name while find_include does a regular sass include
char* sass_compiler_find_file (const char* path, struct Sass_Compiler* compiler);
char* sass_compiler_find_include (const char* path, struct Sass_Compiler* compiler);
```

### More links

- [Sass Context Example](api-context-example.md)
- [Sass Context Internal](api-context-internal.md)

