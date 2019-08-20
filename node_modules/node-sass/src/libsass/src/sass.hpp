// must be the first include in all compile units
#ifndef SASS_SASS_H
#define SASS_SASS_H

// undefine extensions macro to tell sys includes
// that we do not want any macros to be exported
// mainly fixes an issue on SmartOS (SEC macro)
#undef __EXTENSIONS__

#ifdef _MSC_VER
#pragma warning(disable : 4005)
#endif

// aplies to MSVC and MinGW
#ifdef _WIN32
// we do not want the ERROR macro
# define NOGDI
// we do not want the min/max macro
# define NOMINMAX
// we do not want the IN/OUT macro
# define _NO_W32_PSEUDO_MODIFIERS
#endif


// should we be case insensitive
// when dealing with files or paths
#ifndef FS_CASE_SENSITIVE
# ifdef _WIN32
#  define FS_CASE_SENSITIVE 0
# else
#  define FS_CASE_SENSITIVE 1
# endif
#endif

// path separation char
#ifndef PATH_SEP
# ifdef _WIN32
#  define PATH_SEP ';'
# else
#  define PATH_SEP ':'
# endif
#endif


// include C-API header
#include "sass/base.h"

// For C++ helper
#include <string>

// output behaviours
namespace Sass {

  // create some C++ aliases for the most used options
  const static Sass_Output_Style NESTED = SASS_STYLE_NESTED;
  const static Sass_Output_Style COMPACT = SASS_STYLE_COMPACT;
  const static Sass_Output_Style EXPANDED = SASS_STYLE_EXPANDED;
  const static Sass_Output_Style COMPRESSED = SASS_STYLE_COMPRESSED;
  // only used internal to trigger ruby inspect behavior
  const static Sass_Output_Style INSPECT = SASS_STYLE_INSPECT;
  const static Sass_Output_Style TO_SASS = SASS_STYLE_TO_SASS;

  // helper to aid dreaded MSVC debug mode
  // see implementation for more details
  char* sass_copy_string(std::string str);

}

// input behaviours
enum Sass_Input_Style {
  SASS_CONTEXT_NULL,
  SASS_CONTEXT_FILE,
  SASS_CONTEXT_DATA,
  SASS_CONTEXT_FOLDER
};

// simple linked list
struct string_list {
  string_list* next;
  char* string;
};

// sass config options structure
struct Sass_Inspect_Options {

  // Output style for the generated css code
  // A value from above SASS_STYLE_* constants
  enum Sass_Output_Style output_style;

  // Precision for fractional numbers
  int precision;

  // Do not compress colors in selectors
  bool in_selector;

  // initialization list (constructor with defaults)
  Sass_Inspect_Options(Sass_Output_Style style = Sass::NESTED,
                       int precision = 5, bool in_selector = false)
  : output_style(style), precision(precision), in_selector(in_selector)
  { }

};

// sass config options structure
struct Sass_Output_Options : Sass_Inspect_Options {

  // String to be used for indentation
  const char* indent;
  // String to be used to for line feeds
  const char* linefeed;

  // Emit comments in the generated CSS indicating
  // the corresponding source line.
  bool source_comments;

  // initialization list (constructor with defaults)
  Sass_Output_Options(struct Sass_Inspect_Options opt,
                      const char* indent = "  ",
                      const char* linefeed = "\n",
                      bool source_comments = false)
  : Sass_Inspect_Options(opt),
    indent(indent), linefeed(linefeed),
    source_comments(source_comments)
  { }

  // initialization list (constructor with defaults)
  Sass_Output_Options(Sass_Output_Style style = Sass::NESTED,
                      int precision = 5,
                      const char* indent = "  ",
                      const char* linefeed = "\n",
                      bool source_comments = false)
  : Sass_Inspect_Options(style, precision),
    indent(indent), linefeed(linefeed),
    source_comments(source_comments)
  { }

};

#endif
