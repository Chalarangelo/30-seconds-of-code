/**
 * sass2scss
 * Licensed under the MIT License
 * Copyright (c) Marcel Greter
 */

#ifdef _MSC_VER
#define _CRT_SECURE_NO_WARNINGS
#define _CRT_NONSTDC_NO_DEPRECATE
#endif

// include library
#include <stack>
#include <string>
#include <cstring>
#include <cstdlib>
#include <sstream>
#include <iostream>
#include <stdio.h>

///*
//
// src comments: comments in sass syntax (staring with //)
// css comments: multiline comments in css syntax (starting with /*)
//
// KEEP_COMMENT: keep src comments in the resulting css code
// STRIP_COMMENT: strip out all comments (either src or css)
// CONVERT_COMMENT: convert all src comments to css comments
//
//*/

// our own header
#include "sass2scss.h"

// add namespace for c++
namespace Sass
{

	// return the actual prettify value from options
	#define PRETTIFY(converter) (converter.options - (converter.options & 248))
	// query the options integer to check if the option is enables
	#define KEEP_COMMENT(converter) ((converter.options & SASS2SCSS_KEEP_COMMENT) == SASS2SCSS_KEEP_COMMENT)
	#define STRIP_COMMENT(converter) ((converter.options & SASS2SCSS_STRIP_COMMENT) == SASS2SCSS_STRIP_COMMENT)
	#define CONVERT_COMMENT(converter) ((converter.options & SASS2SCSS_CONVERT_COMMENT) == SASS2SCSS_CONVERT_COMMENT)

	// some makros to access the indentation stack
	#define INDENT(converter) (converter.indents.top())

	// some makros to query comment parser status
	#define IS_PARSING(converter) (converter.comment == "")
	#define IS_COMMENT(converter) (converter.comment != "")
	#define IS_SRC_COMMENT(converter) (converter.comment == "//" && ! CONVERT_COMMENT(converter))
	#define IS_CSS_COMMENT(converter) (converter.comment == "/*" || (converter.comment == "//" && CONVERT_COMMENT(converter)))

	// pretty printer helper function
	static std::string closer (const converter& converter)
	{
		return PRETTIFY(converter) == 0 ? " }" :
		     PRETTIFY(converter) <= 1 ? " }" :
		       "\n" + INDENT(converter) + "}";
	}

	// pretty printer helper function
	static std::string opener (const converter& converter)
	{
		return PRETTIFY(converter) == 0 ? " { " :
		     PRETTIFY(converter) <= 2 ? " {" :
		       "\n" + INDENT(converter) + "{";
	}

	// check if the given string is a pseudo selector
	// needed to differentiate from sass property syntax
	static bool isPseudoSelector (std::string& sel)
	{

		size_t len = sel.length();
		if (len < 1) return false;
		size_t pos = sel.find_first_not_of("abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ", 1);
		if (pos != std::string::npos) sel.erase(pos, std::string::npos);
		size_t i = sel.length();
		while (i -- > 0) { sel.at(i) = tolower(sel.at(i)); }

		// CSS Level 1 - Recommendation
		if (sel == ":link") return true;
		if (sel == ":visited") return true;
		if (sel == ":active") return true;

		// CSS Level 2 (Revision 1) - Recommendation
		if (sel == ":lang") return true;
		if (sel == ":first-child") return true;
		if (sel == ":hover") return true;
		if (sel == ":focus") return true;
		// disabled - also valid properties
		// if (sel == ":left") return true;
		// if (sel == ":right") return true;
		if (sel == ":first") return true;

		// Selectors Level 3 - Recommendation
		if (sel == ":target") return true;
		if (sel == ":root") return true;
		if (sel == ":nth-child") return true;
		if (sel == ":nth-last-of-child") return true;
		if (sel == ":nth-of-type") return true;
		if (sel == ":nth-last-of-type") return true;
		if (sel == ":last-child") return true;
		if (sel == ":first-of-type") return true;
		if (sel == ":last-of-type") return true;
		if (sel == ":only-child") return true;
		if (sel == ":only-of-type") return true;
		if (sel == ":empty") return true;
		if (sel == ":not") return true;

		// CSS Basic User Interface Module Level 3 - Working Draft
		if (sel == ":default") return true;
		if (sel == ":valid") return true;
		if (sel == ":invalid") return true;
		if (sel == ":in-range") return true;
		if (sel == ":out-of-range") return true;
		if (sel == ":required") return true;
		if (sel == ":optional") return true;
		if (sel == ":read-only") return true;
		if (sel == ":read-write") return true;
		if (sel == ":dir") return true;
		if (sel == ":enabled") return true;
		if (sel == ":disabled") return true;
		if (sel == ":checked") return true;
		if (sel == ":indeterminate") return true;
		if (sel == ":nth-last-child") return true;

		// Selectors Level 4 - Working Draft
		if (sel == ":any-link") return true;
		if (sel == ":local-link") return true;
		if (sel == ":scope") return true;
		if (sel == ":active-drop-target") return true;
		if (sel == ":valid-drop-target") return true;
		if (sel == ":invalid-drop-target") return true;
		if (sel == ":current") return true;
		if (sel == ":past") return true;
		if (sel == ":future") return true;
		if (sel == ":placeholder-shown") return true;
		if (sel == ":user-error") return true;
		if (sel == ":blank") return true;
		if (sel == ":nth-match") return true;
		if (sel == ":nth-last-match") return true;
		if (sel == ":nth-column") return true;
		if (sel == ":nth-last-column") return true;
		if (sel == ":matches") return true;

		// Fullscreen API - Living Standard
		if (sel == ":fullscreen") return true;

		// not a pseudo selector
		return false;

	}

	// check if there is some char data
	// will ignore everything in comments
	static bool hasCharData (std::string& sass)
	{

		size_t col_pos = 0;

		while (true)
		{

			// try to find some meaningfull char
			col_pos = sass.find_first_not_of(" \t\n\v\f\r", col_pos);

			// there was no meaningfull char found
			if (col_pos == std::string::npos) return false;

			// found a multiline comment opener
			if (sass.substr(col_pos, 2) == "/*")
			{
				// find the multiline comment closer
				col_pos = sass.find("*/", col_pos);
				// maybe we did not find the closer here
				if (col_pos == std::string::npos) return false;
				// skip closer
				col_pos += 2;
			}
			else
			{
				return true;
			}

		}

	}
	// EO hasCharData

	// find src comment opener
	// correctly skips quoted strings
	static size_t findCommentOpener (std::string& sass)
	{

		size_t col_pos = 0;
		bool apoed = false;
		bool quoted = false;
		bool comment = false;
		size_t brackets = 0;

		while (col_pos != std::string::npos)
		{

			// process all interesting chars
			col_pos = sass.find_first_of("\"\'/\\*()", col_pos);

			// assertion for valid result
			if (col_pos != std::string::npos)
			{
				char character = sass.at(col_pos);

				if (character == '(')
				{
					if (!quoted && !apoed) brackets ++;
				}
				else if (character == ')')
				{
					if (!quoted && !apoed) brackets --;
				}
				else if (character == '\"')
				{
					// invert quote bool
					if (!apoed && !comment) quoted = !quoted;
				}
				else if (character == '\'')
				{
					// invert quote bool
					if (!quoted && !comment) apoed = !apoed;
				}
				else if (col_pos > 0 && character == '/')
				{
					if (sass.at(col_pos - 1) == '*')
					{
						comment = false;
					}
					// next needs to be a slash too
					else if (sass.at(col_pos - 1) == '/')
					{
						// only found if not in single or double quote, bracket or comment
						if (!quoted && !apoed && !comment && brackets == 0) return col_pos - 1;
					}
				}
				else if (character == '\\')
				{
					// skip next char if in quote
					if (quoted || apoed) col_pos ++;
				}
				// this might be a comment opener
				else if (col_pos > 0 && character == '*')
				{
					// opening a multiline comment
					if (sass.at(col_pos - 1) == '/')
					{
						// we are now in a comment
						if (!quoted && !apoed) comment = true;
					}
				}

				// skip char
				col_pos ++;

			}

		}
		// EO while

		return col_pos;

	}
	// EO findCommentOpener

	// remove multiline comments from sass string
	// correctly skips quoted strings
	static std::string removeMultilineComment (std::string &sass)
	{

		std::string clean = "";
		size_t col_pos = 0;
		size_t open_pos = 0;
		size_t close_pos = 0;
		bool apoed = false;
		bool quoted = false;
		bool comment = false;

		// process sass til string end
		while (col_pos != std::string::npos)
		{

			// process all interesting chars
			col_pos = sass.find_first_of("\"\'/\\*", col_pos);

			// assertion for valid result
			if (col_pos != std::string::npos)
			{
				char character = sass.at(col_pos);

				// found quoted string delimiter
				if (character == '\"')
				{
					if (!apoed && !comment) quoted = !quoted;
				}
				else if (character == '\'')
				{
					if (!quoted && !comment) apoed = !apoed;
				}
				// found possible comment closer
				else if (character == '/')
				{
					// look back to see if it is actually a closer
					if (comment && col_pos > 0 && sass.at(col_pos - 1) == '*')
					{
						close_pos = col_pos + 1; comment = false;
					}
				}
				else if (character == '\\')
				{
					// skip escaped char
					if (quoted || apoed) col_pos ++;
				}
				// this might be a comment opener
				else if (character == '*')
				{
					// look back to see if it is actually an opener
					if (!quoted && !apoed && col_pos > 0 && sass.at(col_pos - 1) == '/')
					{
						comment = true; open_pos = col_pos - 1;
						clean += sass.substr(close_pos, open_pos - close_pos);
					}
				}

				// skip char
				col_pos ++;

			}

		}
		// EO while

		// add final parts (add half open comment text)
		if (comment) clean += sass.substr(open_pos);
		else clean += sass.substr(close_pos);

		// return string
		return clean;

	}
	// EO removeMultilineComment

	// right trim a given string
	std::string rtrim(const std::string &sass)
	{
		std::string trimmed = sass;
		size_t pos_ws = trimmed.find_last_not_of(" \t\n\v\f\r");
		if (pos_ws != std::string::npos)
		{ trimmed.erase(pos_ws + 1); }
		else { trimmed.clear(); }
		return trimmed;
	}
	// EO rtrim

	// flush whitespace and print additional text, but
	// only print additional chars and buffer whitespace
	std::string flush (std::string& sass, converter& converter)
	{

		// return flushed
		std::string scss = "";

		// print whitespace buffer
		scss += PRETTIFY(converter) > 0 ?
		        converter.whitespace : "";
		// reset whitespace buffer
		converter.whitespace = "";

		// remove possible newlines from string
		size_t pos_right = sass.find_last_not_of("\n\r");
		if (pos_right == std::string::npos) return scss;

		// get the linefeeds from the string
		std::string lfs = sass.substr(pos_right + 1);
		sass = sass.substr(0, pos_right + 1);

		// find some source comment opener
		size_t comment_pos = findCommentOpener(sass);
		// check if there was a source comment
		if (comment_pos != std::string::npos)
		{
			// convert comment (but only outside other coments)
			if (CONVERT_COMMENT(converter) && !IS_COMMENT(converter))
			{
				// convert to multiline comment
				sass.at(comment_pos + 1) = '*';
				// add comment node to the whitespace
				sass += " */";
			}
			// not at line start
			if (comment_pos > 0)
			{
				// also include whitespace before the actual comment opener
				size_t ws_pos = sass.find_last_not_of(SASS2SCSS_FIND_WHITESPACE, comment_pos - 1);
				comment_pos = ws_pos == std::string::npos ? 0 : ws_pos + 1;
			}
			if (!STRIP_COMMENT(converter))
			{
				// add comment node to the whitespace
				converter.whitespace += sass.substr(comment_pos);
			}
			else
			{
				// sass = removeMultilineComments(sass);
			}
			// update the actual sass code
			sass = sass.substr(0, comment_pos);
		}

		// add newline as getline discharged it
		converter.whitespace += lfs + "\n";

		// maybe remove any leading whitespace
		if (PRETTIFY(converter) == 0)
		{
			// remove leading whitespace and update string
			size_t pos_left = sass.find_first_not_of(SASS2SCSS_FIND_WHITESPACE);
			if (pos_left != std::string::npos) sass = sass.substr(pos_left);
		}

		// add flushed data
		scss += sass;

		// return string
		return scss;

	}
	// EO flush

	// process a line of the sass text
	std::string process (std::string& sass, converter& converter)
	{

		// resulting string
		std::string scss = "";

		// strip multi line comments
		if (STRIP_COMMENT(converter))
		{
			sass = removeMultilineComment(sass);
		}

		// right trim input
		sass = rtrim(sass);

		// get postion of first meaningfull character in string
		size_t pos_left = sass.find_first_not_of(SASS2SCSS_FIND_WHITESPACE);

		// special case for final run
		if (converter.end_of_file) pos_left = 0;

		// maybe has only whitespace
		if (pos_left == std::string::npos)
		{
			// just add complete whitespace
			converter.whitespace += sass + "\n";
		}
		// have meaningfull first char
		else
		{

			// extract and store indentation string
			std::string indent = sass.substr(0, pos_left);

			// check if current line starts a comment
			std::string open = sass.substr(pos_left, 2);

			// line has less or same indentation
			// finalize previous open parser context
			if (indent.length() <= INDENT(converter).length())
			{

				// close multilinie comment
				if (IS_CSS_COMMENT(converter))
				{
					// check if comments will be stripped anyway
					if (!STRIP_COMMENT(converter)) scss += " */";
				}
				// close src comment comment
				else if (IS_SRC_COMMENT(converter))
				{
					// add a newline to avoid closer on same line
					// this would put the bracket in the comment node
					// no longer needed since we parse them correctly
					// if (KEEP_COMMENT(converter)) scss += "\n";
				}
				// close css properties
				else if (converter.property)
				{
					// add closer unless in concat mode
					if (!converter.comma)
					{
						// if there was no colon we have a selector
						// looks like there were no inner properties
						if (converter.selector) scss += " {}";
						// add final semicolon
						else if (!converter.semicolon) scss += ";";
					}
				}

				// reset comment state
				converter.comment = "";

			}

			// make sure we close every "higher" block
			while (indent.length() < INDENT(converter).length())
			{
				// pop stacked context
				converter.indents.pop();
				// print close bracket
				if (IS_PARSING(converter))
				{ scss += closer(converter); }
				else { scss += " */"; }
				// reset comment state
				converter.comment = "";
			}

			// reset converter state
			converter.selector = false;

			// looks like some undocumented behavior ...
			// https://github.com/mgreter/sass2scss/issues/29
			if (sass.substr(pos_left, 1) == "\\") {
				converter.selector = true;
				sass[pos_left] = ' ';
			}

			// check if we have sass property syntax
			if (sass.substr(pos_left, 1) == ":" && sass.substr(pos_left, 2) != "::")
			{

				// default to a selector
				// change back if property found
				converter.selector = true;
				// get postion of first whitespace char
				size_t pos_wspace = sass.find_first_of(SASS2SCSS_FIND_WHITESPACE, pos_left);
				// assertion check for valid result
				if (pos_wspace != std::string::npos)
				{
					// get the possible pseudo selector
					std::string pseudo = sass.substr(pos_left, pos_wspace - pos_left);
					// get position of the first real property value char
					// pseudo selectors get this far, but have no actual value
					size_t pos_value =  sass.find_first_not_of(SASS2SCSS_FIND_WHITESPACE, pos_wspace);
					// assertion check for valid result
					if (pos_value != std::string::npos)
					{
						// only process if not (fallowed by a semicolon or is a pseudo selector)
						if (!(sass.at(pos_value) == ':' || isPseudoSelector(pseudo)))
						{
							// create new string by interchanging the colon sign for property and value
							sass = indent + sass.substr(pos_left + 1, pos_wspace - pos_left - 1) + ":" + sass.substr(pos_wspace);
							// try to find a colon in the current line, but only ...
							size_t pos_colon = sass.find_first_not_of(":", pos_left);
							// assertion for valid result
							if (pos_colon != std::string::npos)
							{
								// ... after the first word (skip begining colons)
								pos_colon = sass.find_first_of(":", pos_colon);
								// it is a selector if there was no colon found
								converter.selector = pos_colon == std::string::npos;
							}
						}
					}
				}

				// check if we have a BEM property (one colon and no selector)
				if (sass.substr(pos_left, 1) == ":" && converter.selector == true) {
					size_t pos_wspace = sass.find_first_of(SASS2SCSS_FIND_WHITESPACE, pos_left);
					sass = indent + sass.substr(pos_left + 1, pos_wspace) + ":";
				}

			}

			// terminate some statements immediately
			else if (
				sass.substr(pos_left, 5) == "@warn" ||
				sass.substr(pos_left, 6) == "@debug" ||
				sass.substr(pos_left, 6) == "@error" ||
				sass.substr(pos_left, 8) == "@charset" ||
				sass.substr(pos_left, 10) == "@namespace"
			) { sass = indent + sass.substr(pos_left); }
			// replace some specific sass shorthand directives (if not fallowed by a white space character)
			else if (sass.substr(pos_left, 1) == "=")
			{ sass = indent + "@mixin " + sass.substr(pos_left + 1); }
			else if (sass.substr(pos_left, 1) == "+")
			{
				// must be followed by a mixin call (no whitespace afterwards or at ending directly)
				if (sass[pos_left+1] != 0 && sass[pos_left+1] != ' ' && sass[pos_left+1] != '\t') {
					sass = indent + "@include " + sass.substr(pos_left + 1);
				}
			}

			// add quotes for import if needed
			else if (sass.substr(pos_left, 7) == "@import")
			{
				// get positions for the actual import url
				size_t pos_import = sass.find_first_of(SASS2SCSS_FIND_WHITESPACE, pos_left + 7);
				size_t pos_quote = sass.find_first_not_of(SASS2SCSS_FIND_WHITESPACE, pos_import);
				// leave proper urls untouched
				if (sass.substr(pos_quote, 4) != "url(")
				{
					// check if the url appears to be already quoted
					if (sass.substr(pos_quote, 1) != "\"" && sass.substr(pos_quote, 1) != "\'")
					{
						// get position of the last char on the line
						size_t pos_end = sass.find_last_not_of(SASS2SCSS_FIND_WHITESPACE);
						// assertion check for valid result
						if (pos_end != std::string::npos)
						{
							// add quotes around the full line after the import statement
							sass = sass.substr(0, pos_quote) + "\"" + sass.substr(pos_quote, pos_end - pos_quote + 1) + "\"";
						}
					}
				}

			}
			else if (
				sass.substr(pos_left, 7) != "@return" &&
				sass.substr(pos_left, 7) != "@extend" &&
				sass.substr(pos_left, 8) != "@include" &&
				sass.substr(pos_left, 8) != "@content"
			) {

				// probably a selector anyway
				converter.selector = true;
				// try to find first colon in the current line
				size_t pos_colon = sass.find_first_of(":", pos_left);
				// assertion that we have a colon
				if (pos_colon != std::string::npos)
				{
					// it is not a selector if we have a space after a colon
					if (sass[pos_colon+1] == ' ') converter.selector = false;
					if (sass[pos_colon+1] == '	') converter.selector = false;
				}

			}

			// current line has more indentation
			if (indent.length() >= INDENT(converter).length())
			{
				// not in comment mode
				if (IS_PARSING(converter))
				{
					// has meaningfull chars
					if (hasCharData(sass))
					{
						// is probably a property
						// also true for selectors
						converter.property = true;
					}
				}
			}
			// current line has more indentation
			if (indent.length() > INDENT(converter).length())
			{
				// not in comment mode
				if (IS_PARSING(converter))
				{
					// had meaningfull chars
					if (converter.property)
					{
						// print block opener
						scss += opener(converter);
						// push new stack context
						converter.indents.push("");
						// store block indentation
						INDENT(converter) = indent;
					}
				}
				// is and will be a src comment
				else if (!IS_CSS_COMMENT(converter))
				{
					// scss does not allow multiline src comments
					// therefore add forward slashes to all lines
					sass.at(INDENT(converter).length()+0) = '/';
					// there is an edge case here if indentation
					// is minimal (will overwrite the fist char)
					sass.at(INDENT(converter).length()+1) = '/';
					// could code around that, but I dont' think
					// this will ever be the cause for any trouble
				}
			}

			// line is opening a new comment
			if (open == "/*" || open == "//")
			{
				// reset the property state
				converter.property = false;
				// close previous comment
				if (IS_CSS_COMMENT(converter) && open != "")
				{
					if (!STRIP_COMMENT(converter) && !CONVERT_COMMENT(converter)) scss += " */";
				}
				// force single line comments
				// into a correct css comment
				if (CONVERT_COMMENT(converter))
				{
					if (IS_PARSING(converter))
					{ sass.at(pos_left + 1) = '*'; }
				}
				// set comment flag
				converter.comment = open;

			}

			// flush data only under certain conditions
			if (!(
				// strip css and src comments if option is set
				(IS_COMMENT(converter) && STRIP_COMMENT(converter)) ||
				// strip src comment even if strip option is not set
				// but only if the keep src comment option is not set
				(IS_SRC_COMMENT(converter) && ! KEEP_COMMENT(converter))
			))
			{
				// flush data and buffer whitespace
				scss += flush(sass, converter);
			}

			// get postion of last meaningfull char
			size_t pos_right = sass.find_last_not_of(SASS2SCSS_FIND_WHITESPACE);

			// check for invalid result
			if (pos_right != std::string::npos)
			{

				// get the last meaningfull char
				std::string close = sass.substr(pos_right, 1);

				// check if next line should be concatenated (list mode)
				converter.comma = IS_PARSING(converter) && close == ",";
				converter.semicolon = IS_PARSING(converter) && close == ";";

				// check if we have more than
				// one meaningfull char
				if (pos_right > 0)
				{

					// get the last two chars from string
					std::string close = sass.substr(pos_right - 1, 2);
					// update parser status for expicitly closed comment
					if (close == "*/") converter.comment = "";

				}

			}
			// EO have meaningfull chars from end

		}
		// EO have meaningfull chars from start

		// return scss
		return scss;

	}
	// EO process

	// read line with either CR, LF or CR LF format
	// http://stackoverflow.com/a/6089413/1550314
	static std::istream& safeGetline(std::istream& is, std::string& t)
	{
		t.clear();

		// The characters in the stream are read one-by-one using a std::streambuf.
		// That is faster than reading them one-by-one using the std::istream.
		// Code that uses streambuf this way must be guarded by a sentry object.
		// The sentry object performs various tasks,
		// such as thread synchronization and updating the stream state.

		std::istream::sentry se(is, true);
		std::streambuf* sb = is.rdbuf();

		for(;;) {
			int c = sb->sbumpc();
			switch (c) {
				case '\n':
					return is;
				case '\r':
					if(sb->sgetc() == '\n')
						sb->sbumpc();
					return is;
				case EOF:
					// Also handle the case when the last line has no line ending
					if(t.empty())
						is.setstate(std::ios::eofbit);
					return is;
				default:
					t += (char)c;
			}
		}
	}

	// the main converter function for c++
	char* sass2scss (const std::string& sass, const int options)
	{

		// local variables
		std::string line;
		std::string scss = "";
		std::stringstream stream(sass);

		// create converter variable
		converter converter;
		// initialise all options
		converter.comma = false;
		converter.property = false;
		converter.selector = false;
		converter.semicolon = false;
		converter.end_of_file = false;
		converter.comment = "";
		converter.whitespace = "";
		converter.indents.push("");
		converter.options = options;

		// read line by line and process them
		while(safeGetline(stream, line) && !stream.eof())
		{ scss += process(line, converter); }

		// create mutable string
		std::string closer = "";
		// set the end of file flag
		converter.end_of_file = true;
		// process to close all open blocks
		scss += process(closer, converter);

		// allocate new memory on the heap
		// caller has to free it after use
		char * cstr = (char*) malloc (scss.length() + 1);
		// create a copy of the string
		strcpy (cstr, scss.c_str());
		// return pointer
		return &cstr[0];

	}
	// EO sass2scss

}
// EO namespace

// implement for c
extern "C"
{

	char* ADDCALL sass2scss (const char* sass, const int options)
	{
		return Sass::sass2scss(sass, options);
	}

	// Get compiled sass2scss version
	const char* ADDCALL sass2scss_version(void) {
		return SASS2SCSS_VERSION;
	}

}
