#ifndef SASS_C_CONTEXT_H
#define SASS_C_CONTEXT_H

#include <stddef.h>
#include <stdbool.h>
#include <sass/base.h>
#include <sass/values.h>
#include <sass/functions.h>

#ifdef __cplusplus
extern "C" {
#endif


// Forward declaration
struct Sass_Compiler;

// Forward declaration
struct Sass_Options; // base struct
struct Sass_Context; // : Sass_Options
struct Sass_File_Context; // : Sass_Context
struct Sass_Data_Context; // : Sass_Context

// Compiler states
enum Sass_Compiler_State {
  SASS_COMPILER_CREATED,
  SASS_COMPILER_PARSED,
  SASS_COMPILER_EXECUTED
};

// Create and initialize an option struct
ADDAPI struct Sass_Options* ADDCALL sass_make_options (void);
// Create and initialize a specific context
ADDAPI struct Sass_File_Context* ADDCALL sass_make_file_context (const char* input_path);
ADDAPI struct Sass_Data_Context* ADDCALL sass_make_data_context (char* source_string);

// Call the compilation step for the specific context
ADDAPI int ADDCALL sass_compile_file_context (struct Sass_File_Context* ctx);
ADDAPI int ADDCALL sass_compile_data_context (struct Sass_Data_Context* ctx);

// Create a sass compiler instance for more control
ADDAPI struct Sass_Compiler* ADDCALL sass_make_file_compiler (struct Sass_File_Context* file_ctx);
ADDAPI struct Sass_Compiler* ADDCALL sass_make_data_compiler (struct Sass_Data_Context* data_ctx);

// Execute the different compilation steps individually
// Usefull if you only want to query the included files
ADDAPI int ADDCALL sass_compiler_parse(struct Sass_Compiler* compiler);
ADDAPI int ADDCALL sass_compiler_execute(struct Sass_Compiler* compiler);

// Release all memory allocated with the compiler
// This does _not_ include any contexts or options
ADDAPI void ADDCALL sass_delete_compiler(struct Sass_Compiler* compiler);
ADDAPI void ADDCALL sass_delete_options(struct Sass_Options* options);

// Release all memory allocated and also ourself
ADDAPI void ADDCALL sass_delete_file_context (struct Sass_File_Context* ctx);
ADDAPI void ADDCALL sass_delete_data_context (struct Sass_Data_Context* ctx);

// Getters for context from specific implementation
ADDAPI struct Sass_Context* ADDCALL sass_file_context_get_context (struct Sass_File_Context* file_ctx);
ADDAPI struct Sass_Context* ADDCALL sass_data_context_get_context (struct Sass_Data_Context* data_ctx);

// Getters for Context_Options from Sass_Context
ADDAPI struct Sass_Options* ADDCALL sass_context_get_options (struct Sass_Context* ctx);
ADDAPI struct Sass_Options* ADDCALL sass_file_context_get_options (struct Sass_File_Context* file_ctx);
ADDAPI struct Sass_Options* ADDCALL sass_data_context_get_options (struct Sass_Data_Context* data_ctx);
ADDAPI void ADDCALL sass_file_context_set_options (struct Sass_File_Context* file_ctx, struct Sass_Options* opt);
ADDAPI void ADDCALL sass_data_context_set_options (struct Sass_Data_Context* data_ctx, struct Sass_Options* opt);


// Getters for Context_Option values
ADDAPI int ADDCALL sass_option_get_precision (struct Sass_Options* options);
ADDAPI enum Sass_Output_Style ADDCALL sass_option_get_output_style (struct Sass_Options* options);
ADDAPI bool ADDCALL sass_option_get_source_comments (struct Sass_Options* options);
ADDAPI bool ADDCALL sass_option_get_source_map_embed (struct Sass_Options* options);
ADDAPI bool ADDCALL sass_option_get_source_map_contents (struct Sass_Options* options);
ADDAPI bool ADDCALL sass_option_get_source_map_file_urls (struct Sass_Options* options);
ADDAPI bool ADDCALL sass_option_get_omit_source_map_url (struct Sass_Options* options);
ADDAPI bool ADDCALL sass_option_get_is_indented_syntax_src (struct Sass_Options* options);
ADDAPI const char* ADDCALL sass_option_get_indent (struct Sass_Options* options);
ADDAPI const char* ADDCALL sass_option_get_linefeed (struct Sass_Options* options);
ADDAPI const char* ADDCALL sass_option_get_input_path (struct Sass_Options* options);
ADDAPI const char* ADDCALL sass_option_get_output_path (struct Sass_Options* options);
ADDAPI const char* ADDCALL sass_option_get_source_map_file (struct Sass_Options* options);
ADDAPI const char* ADDCALL sass_option_get_source_map_root (struct Sass_Options* options);
ADDAPI Sass_Importer_List ADDCALL sass_option_get_c_headers (struct Sass_Options* options);
ADDAPI Sass_Importer_List ADDCALL sass_option_get_c_importers (struct Sass_Options* options);
ADDAPI Sass_Function_List ADDCALL sass_option_get_c_functions (struct Sass_Options* options);

// Setters for Context_Option values
ADDAPI void ADDCALL sass_option_set_precision (struct Sass_Options* options, int precision);
ADDAPI void ADDCALL sass_option_set_output_style (struct Sass_Options* options, enum Sass_Output_Style output_style);
ADDAPI void ADDCALL sass_option_set_source_comments (struct Sass_Options* options, bool source_comments);
ADDAPI void ADDCALL sass_option_set_source_map_embed (struct Sass_Options* options, bool source_map_embed);
ADDAPI void ADDCALL sass_option_set_source_map_contents (struct Sass_Options* options, bool source_map_contents);
ADDAPI void ADDCALL sass_option_set_source_map_file_urls (struct Sass_Options* options, bool source_map_file_urls);
ADDAPI void ADDCALL sass_option_set_omit_source_map_url (struct Sass_Options* options, bool omit_source_map_url);
ADDAPI void ADDCALL sass_option_set_is_indented_syntax_src (struct Sass_Options* options, bool is_indented_syntax_src);
ADDAPI void ADDCALL sass_option_set_indent (struct Sass_Options* options, const char* indent);
ADDAPI void ADDCALL sass_option_set_linefeed (struct Sass_Options* options, const char* linefeed);
ADDAPI void ADDCALL sass_option_set_input_path (struct Sass_Options* options, const char* input_path);
ADDAPI void ADDCALL sass_option_set_output_path (struct Sass_Options* options, const char* output_path);
ADDAPI void ADDCALL sass_option_set_plugin_path (struct Sass_Options* options, const char* plugin_path);
ADDAPI void ADDCALL sass_option_set_include_path (struct Sass_Options* options, const char* include_path);
ADDAPI void ADDCALL sass_option_set_source_map_file (struct Sass_Options* options, const char* source_map_file);
ADDAPI void ADDCALL sass_option_set_source_map_root (struct Sass_Options* options, const char* source_map_root);
ADDAPI void ADDCALL sass_option_set_c_headers (struct Sass_Options* options, Sass_Importer_List c_headers);
ADDAPI void ADDCALL sass_option_set_c_importers (struct Sass_Options* options, Sass_Importer_List c_importers);
ADDAPI void ADDCALL sass_option_set_c_functions (struct Sass_Options* options, Sass_Function_List c_functions);


// Getters for Sass_Context values
ADDAPI const char* ADDCALL sass_context_get_output_string (struct Sass_Context* ctx);
ADDAPI int ADDCALL sass_context_get_error_status (struct Sass_Context* ctx);
ADDAPI const char* ADDCALL sass_context_get_error_json (struct Sass_Context* ctx);
ADDAPI const char* ADDCALL sass_context_get_error_text (struct Sass_Context* ctx);
ADDAPI const char* ADDCALL sass_context_get_error_message (struct Sass_Context* ctx);
ADDAPI const char* ADDCALL sass_context_get_error_file (struct Sass_Context* ctx);
ADDAPI const char* ADDCALL sass_context_get_error_src (struct Sass_Context* ctx);
ADDAPI size_t ADDCALL sass_context_get_error_line (struct Sass_Context* ctx);
ADDAPI size_t ADDCALL sass_context_get_error_column (struct Sass_Context* ctx);
ADDAPI const char* ADDCALL sass_context_get_source_map_string (struct Sass_Context* ctx);
ADDAPI char** ADDCALL sass_context_get_included_files (struct Sass_Context* ctx);

// Getters for options include path array
ADDAPI size_t ADDCALL sass_option_get_include_path_size(struct Sass_Options* options);
ADDAPI const char* ADDCALL sass_option_get_include_path(struct Sass_Options* options, size_t i);

// Calculate the size of the stored null terminated array
ADDAPI size_t ADDCALL sass_context_get_included_files_size (struct Sass_Context* ctx);

// Take ownership of memory (value on context is set to 0)
ADDAPI char* ADDCALL sass_context_take_error_json (struct Sass_Context* ctx);
ADDAPI char* ADDCALL sass_context_take_error_text (struct Sass_Context* ctx);
ADDAPI char* ADDCALL sass_context_take_error_message (struct Sass_Context* ctx);
ADDAPI char* ADDCALL sass_context_take_error_file (struct Sass_Context* ctx);
ADDAPI char* ADDCALL sass_context_take_output_string (struct Sass_Context* ctx);
ADDAPI char* ADDCALL sass_context_take_source_map_string (struct Sass_Context* ctx);
ADDAPI char** ADDCALL sass_context_take_included_files (struct Sass_Context* ctx);

// Getters for Sass_Compiler options
ADDAPI enum Sass_Compiler_State ADDCALL sass_compiler_get_state(struct Sass_Compiler* compiler);
ADDAPI struct Sass_Context* ADDCALL sass_compiler_get_context(struct Sass_Compiler* compiler);
ADDAPI struct Sass_Options* ADDCALL sass_compiler_get_options(struct Sass_Compiler* compiler);
ADDAPI size_t ADDCALL sass_compiler_get_import_stack_size(struct Sass_Compiler* compiler);
ADDAPI Sass_Import_Entry ADDCALL sass_compiler_get_last_import(struct Sass_Compiler* compiler);
ADDAPI Sass_Import_Entry ADDCALL sass_compiler_get_import_entry(struct Sass_Compiler* compiler, size_t idx);
ADDAPI size_t ADDCALL sass_compiler_get_callee_stack_size(struct Sass_Compiler* compiler);
ADDAPI Sass_Callee_Entry ADDCALL sass_compiler_get_last_callee(struct Sass_Compiler* compiler);
ADDAPI Sass_Callee_Entry ADDCALL sass_compiler_get_callee_entry(struct Sass_Compiler* compiler, size_t idx);

// Push function for paths (no manipulation support for now)
ADDAPI void ADDCALL sass_option_push_plugin_path (struct Sass_Options* options, const char* path);
ADDAPI void ADDCALL sass_option_push_include_path (struct Sass_Options* options, const char* path);

// Resolve a file via the given include paths in the sass option struct
// find_file looks for the exact file name while find_include does a regular sass include
ADDAPI char* ADDCALL sass_find_file (const char* path, struct Sass_Options* opt);
ADDAPI char* ADDCALL sass_find_include (const char* path, struct Sass_Options* opt);

// Resolve a file relative to last import or include paths in the sass option struct
// find_file looks for the exact file name while find_include does a regular sass include
ADDAPI char* ADDCALL sass_compiler_find_file (const char* path, struct Sass_Compiler* compiler);
ADDAPI char* ADDCALL sass_compiler_find_include (const char* path, struct Sass_Compiler* compiler);

#ifdef __cplusplus
} // __cplusplus defined.
#endif

#endif
