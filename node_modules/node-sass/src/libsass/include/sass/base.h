#ifndef SASS_BASE_H
#define SASS_BASE_H

// #define DEBUG_SHARED_PTR

#ifdef _MSC_VER
  #pragma warning(disable : 4503)
  #ifndef _SCL_SECURE_NO_WARNINGS
    #define _SCL_SECURE_NO_WARNINGS
  #endif
  #ifndef _CRT_SECURE_NO_WARNINGS
    #define _CRT_SECURE_NO_WARNINGS
  #endif
  #ifndef _CRT_NONSTDC_NO_DEPRECATE
    #define _CRT_NONSTDC_NO_DEPRECATE
  #endif
#endif

#include <stddef.h>
#include <stdbool.h>

#ifdef __GNUC__
  #define DEPRECATED(func) func __attribute__ ((deprecated))
#elif defined(_MSC_VER)
  #define DEPRECATED(func) __declspec(deprecated) func
#else
  #pragma message("WARNING: You need to implement DEPRECATED for this compiler")
  #define DEPRECATED(func) func
#endif

#ifdef _WIN32

  /* You should define ADD_EXPORTS *only* when building the DLL. */
  #ifdef ADD_EXPORTS
    #define ADDAPI __declspec(dllexport)
    #define ADDCALL __cdecl
  #else
    #define ADDAPI
    #define ADDCALL
  #endif

#else /* _WIN32 not defined. */

  /* Define with no value on non-Windows OSes. */
  #define ADDAPI
  #define ADDCALL

#endif

/* Make sure functions are exported with C linkage under C++ compilers. */
#ifdef __cplusplus
extern "C" {
#endif


// Different render styles
enum Sass_Output_Style {
  SASS_STYLE_NESTED,
  SASS_STYLE_EXPANDED,
  SASS_STYLE_COMPACT,
  SASS_STYLE_COMPRESSED,
  // only used internaly
  SASS_STYLE_INSPECT,
  SASS_STYLE_TO_SASS
};

// to allocate buffer to be filled
ADDAPI void* ADDCALL sass_alloc_memory(size_t size);
// to allocate a buffer from existing string
ADDAPI char* ADDCALL sass_copy_c_string(const char* str);
// to free overtaken memory when done
ADDAPI void ADDCALL sass_free_memory(void* ptr);

// Some convenient string helper function
ADDAPI char* ADDCALL sass_string_quote (const char* str, const char quote_mark);
ADDAPI char* ADDCALL sass_string_unquote (const char* str);

// Implemented sass language version
// Hardcoded version 3.4 for time being
ADDAPI const char* ADDCALL libsass_version(void);

// Get compiled libsass language
ADDAPI const char* ADDCALL libsass_language_version(void);

#ifdef __cplusplus
} // __cplusplus defined.
#endif

#endif
