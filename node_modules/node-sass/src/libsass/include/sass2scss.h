/**
 * sass2scss
 * Licensed under the MIT License
 * Copyright (c) Marcel Greter
 */

#ifndef SASS2SCSS_H
#define SASS2SCSS_H

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

#ifdef __cplusplus

#include <stack>
#include <string>
#include <cstring>
#include <sstream>
#include <iostream>

#ifndef SASS2SCSS_VERSION
// Hardcode once the file is copied from
// https://github.com/mgreter/sass2scss
#define SASS2SCSS_VERSION "1.1.1"
#endif

// add namespace for c++
namespace Sass
{

	// pretty print options
	const int SASS2SCSS_PRETTIFY_0 = 0;
	const int SASS2SCSS_PRETTIFY_1 = 1;
	const int SASS2SCSS_PRETTIFY_2 = 2;
	const int SASS2SCSS_PRETTIFY_3 = 3;

	// remove one-line comment
	const int SASS2SCSS_KEEP_COMMENT    =  32;
	// remove multi-line comments
	const int SASS2SCSS_STRIP_COMMENT   =  64;
	// convert one-line to multi-line
	const int SASS2SCSS_CONVERT_COMMENT = 128;

	// String for finding something interesting
	const std::string SASS2SCSS_FIND_WHITESPACE = " \t\n\v\f\r";

	// converter struct
	// holding all states
	struct converter
	{
		// bit options
		int options;
		// is selector
		bool selector;
		// concat lists
		bool comma;
		// has property
		bool property;
		// has semicolon
		bool semicolon;
		// comment context
		std::string comment;
		// flag end of file
		bool end_of_file;
		// whitespace buffer
		std::string whitespace;
		// context/block stack
		std::stack<std::string> indents;
	};

	// function only available in c++ code
	char* sass2scss (const std::string& sass, const int options);

}
// EO namespace

// declare for c
extern "C" {
#endif

	// prettyfy print options
	#define SASS2SCSS_PRETTIFY_0   0
	#define SASS2SCSS_PRETTIFY_1   1
	#define SASS2SCSS_PRETTIFY_2   2
	#define SASS2SCSS_PRETTIFY_3   3

	// keep one-line comments
	#define SASS2SCSS_KEEP_COMMENT     32
	// remove multi-line comments
	#define SASS2SCSS_STRIP_COMMENT    64
	// convert one-line to multi-line
	#define SASS2SCSS_CONVERT_COMMENT  128

	// available to c and c++ code
	ADDAPI char* ADDCALL sass2scss (const char* sass, const int options);

	// Get compiled sass2scss version
	ADDAPI const char* ADDCALL sass2scss_version(void);

#ifdef __cplusplus
} // __cplusplus defined.
#endif

#endif