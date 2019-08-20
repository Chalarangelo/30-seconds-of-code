/* GRegex -- regular expression API wrapper around PCRE.
 *
 * Copyright (C) 1999, 2000 Scott Wimer
 * Copyright (C) 2004, Matthias Clasen <mclasen@redhat.com>
 * Copyright (C) 2005 - 2007, Marco Barisione <marco@barisione.org>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this library; if not, see <http://www.gnu.org/licenses/>.
 */

#ifndef __G_REGEX_H__
#define __G_REGEX_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gerror.h>
#include <glib/gstring.h>

G_BEGIN_DECLS

/**
 * GRegexError:
 * @G_REGEX_ERROR_COMPILE: Compilation of the regular expression failed.
 * @G_REGEX_ERROR_OPTIMIZE: Optimization of the regular expression failed.
 * @G_REGEX_ERROR_REPLACE: Replacement failed due to an ill-formed replacement
 *     string.
 * @G_REGEX_ERROR_MATCH: The match process failed.
 * @G_REGEX_ERROR_INTERNAL: Internal error of the regular expression engine.
 *     Since 2.16
 * @G_REGEX_ERROR_STRAY_BACKSLASH: "\\" at end of pattern. Since 2.16
 * @G_REGEX_ERROR_MISSING_CONTROL_CHAR: "\\c" at end of pattern. Since 2.16
 * @G_REGEX_ERROR_UNRECOGNIZED_ESCAPE: Unrecognized character follows "\\".
 *     Since 2.16
 * @G_REGEX_ERROR_QUANTIFIERS_OUT_OF_ORDER: Numbers out of order in "{}"
 *     quantifier. Since 2.16
 * @G_REGEX_ERROR_QUANTIFIER_TOO_BIG: Number too big in "{}" quantifier.
 *     Since 2.16
 * @G_REGEX_ERROR_UNTERMINATED_CHARACTER_CLASS: Missing terminating "]" for
 *     character class. Since 2.16
 * @G_REGEX_ERROR_INVALID_ESCAPE_IN_CHARACTER_CLASS: Invalid escape sequence
 *     in character class. Since 2.16
 * @G_REGEX_ERROR_RANGE_OUT_OF_ORDER: Range out of order in character class.
 *     Since 2.16
 * @G_REGEX_ERROR_NOTHING_TO_REPEAT: Nothing to repeat. Since 2.16
 * @G_REGEX_ERROR_UNRECOGNIZED_CHARACTER: Unrecognized character after "(?",
 *     "(?<" or "(?P". Since 2.16
 * @G_REGEX_ERROR_POSIX_NAMED_CLASS_OUTSIDE_CLASS: POSIX named classes are
 *     supported only within a class. Since 2.16
 * @G_REGEX_ERROR_UNMATCHED_PARENTHESIS: Missing terminating ")" or ")"
 *     without opening "(". Since 2.16
 * @G_REGEX_ERROR_INEXISTENT_SUBPATTERN_REFERENCE: Reference to non-existent
 *     subpattern. Since 2.16
 * @G_REGEX_ERROR_UNTERMINATED_COMMENT: Missing terminating ")" after comment.
 *     Since 2.16
 * @G_REGEX_ERROR_EXPRESSION_TOO_LARGE: Regular expression too large.
 *     Since 2.16
 * @G_REGEX_ERROR_MEMORY_ERROR: Failed to get memory. Since 2.16
 * @G_REGEX_ERROR_VARIABLE_LENGTH_LOOKBEHIND: Lookbehind assertion is not
 *     fixed length. Since 2.16
 * @G_REGEX_ERROR_MALFORMED_CONDITION: Malformed number or name after "(?(".
 *     Since 2.16
 * @G_REGEX_ERROR_TOO_MANY_CONDITIONAL_BRANCHES: Conditional group contains
 *     more than two branches. Since 2.16
 * @G_REGEX_ERROR_ASSERTION_EXPECTED: Assertion expected after "(?(".
 *     Since 2.16
 * @G_REGEX_ERROR_UNKNOWN_POSIX_CLASS_NAME: Unknown POSIX class name.
 *     Since 2.16
 * @G_REGEX_ERROR_POSIX_COLLATING_ELEMENTS_NOT_SUPPORTED: POSIX collating
 *     elements are not supported. Since 2.16
 * @G_REGEX_ERROR_HEX_CODE_TOO_LARGE: Character value in "\\x{...}" sequence
 *     is too large. Since 2.16
 * @G_REGEX_ERROR_INVALID_CONDITION: Invalid condition "(?(0)". Since 2.16
 * @G_REGEX_ERROR_SINGLE_BYTE_MATCH_IN_LOOKBEHIND: \\C not allowed in
 *     lookbehind assertion. Since 2.16
 * @G_REGEX_ERROR_INFINITE_LOOP: Recursive call could loop indefinitely.
 *     Since 2.16
 * @G_REGEX_ERROR_MISSING_SUBPATTERN_NAME_TERMINATOR: Missing terminator
 *     in subpattern name. Since 2.16
 * @G_REGEX_ERROR_DUPLICATE_SUBPATTERN_NAME: Two named subpatterns have
 *     the same name. Since 2.16
 * @G_REGEX_ERROR_MALFORMED_PROPERTY: Malformed "\\P" or "\\p" sequence.
 *     Since 2.16
 * @G_REGEX_ERROR_UNKNOWN_PROPERTY: Unknown property name after "\\P" or
 *     "\\p". Since 2.16
 * @G_REGEX_ERROR_SUBPATTERN_NAME_TOO_LONG: Subpattern name is too long
 *     (maximum 32 characters). Since 2.16
 * @G_REGEX_ERROR_TOO_MANY_SUBPATTERNS: Too many named subpatterns (maximum
 *     10,000). Since 2.16
 * @G_REGEX_ERROR_INVALID_OCTAL_VALUE: Octal value is greater than "\\377".
 *     Since 2.16
 * @G_REGEX_ERROR_TOO_MANY_BRANCHES_IN_DEFINE: "DEFINE" group contains more
 *     than one branch. Since 2.16
 * @G_REGEX_ERROR_DEFINE_REPETION: Repeating a "DEFINE" group is not allowed.
 *     This error is never raised. Since: 2.16 Deprecated: 2.34
 * @G_REGEX_ERROR_INCONSISTENT_NEWLINE_OPTIONS: Inconsistent newline options.
 *     Since 2.16
 * @G_REGEX_ERROR_MISSING_BACK_REFERENCE: "\\g" is not followed by a braced,
 *      angle-bracketed, or quoted name or number, or by a plain number. Since: 2.16
 * @G_REGEX_ERROR_INVALID_RELATIVE_REFERENCE: relative reference must not be zero. Since: 2.34
 * @G_REGEX_ERROR_BACKTRACKING_CONTROL_VERB_ARGUMENT_FORBIDDEN: the backtracing
 *     control verb used does not allow an argument. Since: 2.34
 * @G_REGEX_ERROR_UNKNOWN_BACKTRACKING_CONTROL_VERB: unknown backtracing 
 *     control verb. Since: 2.34
 * @G_REGEX_ERROR_NUMBER_TOO_BIG: number is too big in escape sequence. Since: 2.34
 * @G_REGEX_ERROR_MISSING_SUBPATTERN_NAME: Missing subpattern name. Since: 2.34
 * @G_REGEX_ERROR_MISSING_DIGIT: Missing digit. Since 2.34
 * @G_REGEX_ERROR_INVALID_DATA_CHARACTER: In JavaScript compatibility mode,
 *     "[" is an invalid data character. Since: 2.34
 * @G_REGEX_ERROR_EXTRA_SUBPATTERN_NAME: different names for subpatterns of the 
 *     same number are not allowed. Since: 2.34
 * @G_REGEX_ERROR_BACKTRACKING_CONTROL_VERB_ARGUMENT_REQUIRED: the backtracing control
 *     verb requires an argument. Since: 2.34
 * @G_REGEX_ERROR_INVALID_CONTROL_CHAR: "\\c" must be followed by an ASCII 
 *     character. Since: 2.34
 * @G_REGEX_ERROR_MISSING_NAME: "\\k" is not followed by a braced, angle-bracketed, or 
 *     quoted name. Since: 2.34
 * @G_REGEX_ERROR_NOT_SUPPORTED_IN_CLASS: "\\N" is not supported in a class. Since: 2.34
 * @G_REGEX_ERROR_TOO_MANY_FORWARD_REFERENCES: too many forward references. Since: 2.34
 * @G_REGEX_ERROR_NAME_TOO_LONG: the name is too long in "(*MARK)", "(*PRUNE)", 
 *     "(*SKIP)", or "(*THEN)". Since: 2.34
 * @G_REGEX_ERROR_CHARACTER_VALUE_TOO_LARGE: the character value in the \\u sequence is
 *     too large. Since: 2.34
 *
 * Error codes returned by regular expressions functions.
 *
 * Since: 2.14
 */
typedef enum
{
  G_REGEX_ERROR_COMPILE,
  G_REGEX_ERROR_OPTIMIZE,
  G_REGEX_ERROR_REPLACE,
  G_REGEX_ERROR_MATCH,
  G_REGEX_ERROR_INTERNAL,

  /* These are the error codes from PCRE + 100 */
  G_REGEX_ERROR_STRAY_BACKSLASH = 101,
  G_REGEX_ERROR_MISSING_CONTROL_CHAR = 102,
  G_REGEX_ERROR_UNRECOGNIZED_ESCAPE = 103,
  G_REGEX_ERROR_QUANTIFIERS_OUT_OF_ORDER = 104,
  G_REGEX_ERROR_QUANTIFIER_TOO_BIG = 105,
  G_REGEX_ERROR_UNTERMINATED_CHARACTER_CLASS = 106,
  G_REGEX_ERROR_INVALID_ESCAPE_IN_CHARACTER_CLASS = 107,
  G_REGEX_ERROR_RANGE_OUT_OF_ORDER = 108,
  G_REGEX_ERROR_NOTHING_TO_REPEAT = 109,
  G_REGEX_ERROR_UNRECOGNIZED_CHARACTER = 112,
  G_REGEX_ERROR_POSIX_NAMED_CLASS_OUTSIDE_CLASS = 113,
  G_REGEX_ERROR_UNMATCHED_PARENTHESIS = 114,
  G_REGEX_ERROR_INEXISTENT_SUBPATTERN_REFERENCE = 115,
  G_REGEX_ERROR_UNTERMINATED_COMMENT = 118,
  G_REGEX_ERROR_EXPRESSION_TOO_LARGE = 120,
  G_REGEX_ERROR_MEMORY_ERROR = 121,
  G_REGEX_ERROR_VARIABLE_LENGTH_LOOKBEHIND = 125,
  G_REGEX_ERROR_MALFORMED_CONDITION = 126,
  G_REGEX_ERROR_TOO_MANY_CONDITIONAL_BRANCHES = 127,
  G_REGEX_ERROR_ASSERTION_EXPECTED = 128,
  G_REGEX_ERROR_UNKNOWN_POSIX_CLASS_NAME = 130,
  G_REGEX_ERROR_POSIX_COLLATING_ELEMENTS_NOT_SUPPORTED = 131,
  G_REGEX_ERROR_HEX_CODE_TOO_LARGE = 134,
  G_REGEX_ERROR_INVALID_CONDITION = 135,
  G_REGEX_ERROR_SINGLE_BYTE_MATCH_IN_LOOKBEHIND = 136,
  G_REGEX_ERROR_INFINITE_LOOP = 140,
  G_REGEX_ERROR_MISSING_SUBPATTERN_NAME_TERMINATOR = 142,
  G_REGEX_ERROR_DUPLICATE_SUBPATTERN_NAME = 143,
  G_REGEX_ERROR_MALFORMED_PROPERTY = 146,
  G_REGEX_ERROR_UNKNOWN_PROPERTY = 147,
  G_REGEX_ERROR_SUBPATTERN_NAME_TOO_LONG = 148,
  G_REGEX_ERROR_TOO_MANY_SUBPATTERNS = 149,
  G_REGEX_ERROR_INVALID_OCTAL_VALUE = 151,
  G_REGEX_ERROR_TOO_MANY_BRANCHES_IN_DEFINE = 154,
  G_REGEX_ERROR_DEFINE_REPETION = 155,
  G_REGEX_ERROR_INCONSISTENT_NEWLINE_OPTIONS = 156,
  G_REGEX_ERROR_MISSING_BACK_REFERENCE = 157,
  G_REGEX_ERROR_INVALID_RELATIVE_REFERENCE = 158,
  G_REGEX_ERROR_BACKTRACKING_CONTROL_VERB_ARGUMENT_FORBIDDEN = 159,
  G_REGEX_ERROR_UNKNOWN_BACKTRACKING_CONTROL_VERB  = 160,
  G_REGEX_ERROR_NUMBER_TOO_BIG = 161,
  G_REGEX_ERROR_MISSING_SUBPATTERN_NAME = 162,
  G_REGEX_ERROR_MISSING_DIGIT = 163,
  G_REGEX_ERROR_INVALID_DATA_CHARACTER = 164,
  G_REGEX_ERROR_EXTRA_SUBPATTERN_NAME = 165,
  G_REGEX_ERROR_BACKTRACKING_CONTROL_VERB_ARGUMENT_REQUIRED = 166,
  G_REGEX_ERROR_INVALID_CONTROL_CHAR = 168,
  G_REGEX_ERROR_MISSING_NAME = 169,
  G_REGEX_ERROR_NOT_SUPPORTED_IN_CLASS = 171,
  G_REGEX_ERROR_TOO_MANY_FORWARD_REFERENCES = 172,
  G_REGEX_ERROR_NAME_TOO_LONG = 175,
  G_REGEX_ERROR_CHARACTER_VALUE_TOO_LARGE = 176
} GRegexError;

/**
 * G_REGEX_ERROR:
 *
 * Error domain for regular expressions. Errors in this domain will be
 * from the #GRegexError enumeration. See #GError for information on
 * error domains.
 *
 * Since: 2.14
 */
#define G_REGEX_ERROR g_regex_error_quark ()

GLIB_AVAILABLE_IN_ALL
GQuark g_regex_error_quark (void);

/**
 * GRegexCompileFlags:
 * @G_REGEX_CASELESS: Letters in the pattern match both upper- and
 *     lowercase letters. This option can be changed within a pattern
 *     by a "(?i)" option setting.
 * @G_REGEX_MULTILINE: By default, GRegex treats the strings as consisting
 *     of a single line of characters (even if it actually contains
 *     newlines). The "start of line" metacharacter ("^") matches only
 *     at the start of the string, while the "end of line" metacharacter
 *     ("$") matches only at the end of the string, or before a terminating
 *     newline (unless #G_REGEX_DOLLAR_ENDONLY is set). When
 *     #G_REGEX_MULTILINE is set, the "start of line" and "end of line"
 *     constructs match immediately following or immediately before any
 *     newline in the string, respectively, as well as at the very start
 *     and end. This can be changed within a pattern by a "(?m)" option
 *     setting.
 * @G_REGEX_DOTALL: A dot metacharacter (".") in the pattern matches all
 *     characters, including newlines. Without it, newlines are excluded.
 *     This option can be changed within a pattern by a ("?s") option setting.
 * @G_REGEX_EXTENDED: Whitespace data characters in the pattern are
 *     totally ignored except when escaped or inside a character class.
 *     Whitespace does not include the VT character (code 11). In addition,
 *     characters between an unescaped "#" outside a character class and
 *     the next newline character, inclusive, are also ignored. This can
 *     be changed within a pattern by a "(?x)" option setting.
 * @G_REGEX_ANCHORED: The pattern is forced to be "anchored", that is,
 *     it is constrained to match only at the first matching point in the
 *     string that is being searched. This effect can also be achieved by
 *     appropriate constructs in the pattern itself such as the "^"
 *     metacharacter.
 * @G_REGEX_DOLLAR_ENDONLY: A dollar metacharacter ("$") in the pattern
 *     matches only at the end of the string. Without this option, a
 *     dollar also matches immediately before the final character if
 *     it is a newline (but not before any other newlines). This option
 *     is ignored if #G_REGEX_MULTILINE is set.
 * @G_REGEX_UNGREEDY: Inverts the "greediness" of the quantifiers so that
 *     they are not greedy by default, but become greedy if followed by "?".
 *     It can also be set by a "(?U)" option setting within the pattern.
 * @G_REGEX_RAW: Usually strings must be valid UTF-8 strings, using this
 *     flag they are considered as a raw sequence of bytes.
 * @G_REGEX_NO_AUTO_CAPTURE: Disables the use of numbered capturing
 *     parentheses in the pattern. Any opening parenthesis that is not
 *     followed by "?" behaves as if it were followed by "?:" but named
 *     parentheses can still be used for capturing (and they acquire numbers
 *     in the usual way).
 * @G_REGEX_OPTIMIZE: Optimize the regular expression. If the pattern will
 *     be used many times, then it may be worth the effort to optimize it
 *     to improve the speed of matches.
 * @G_REGEX_FIRSTLINE: Limits an unanchored pattern to match before (or at) the
 *     first newline. Since: 2.34
 * @G_REGEX_DUPNAMES: Names used to identify capturing subpatterns need not
 *     be unique. This can be helpful for certain types of pattern when it
 *     is known that only one instance of the named subpattern can ever be
 *     matched.
 * @G_REGEX_NEWLINE_CR: Usually any newline character or character sequence is
 *     recognized. If this option is set, the only recognized newline character
 *     is '\r'.
 * @G_REGEX_NEWLINE_LF: Usually any newline character or character sequence is
 *     recognized. If this option is set, the only recognized newline character
 *     is '\n'.
 * @G_REGEX_NEWLINE_CRLF: Usually any newline character or character sequence is
 *     recognized. If this option is set, the only recognized newline character
 *     sequence is '\r\n'.
 * @G_REGEX_NEWLINE_ANYCRLF: Usually any newline character or character sequence
 *     is recognized. If this option is set, the only recognized newline character
 *     sequences are '\r', '\n', and '\r\n'. Since: 2.34
 * @G_REGEX_BSR_ANYCRLF: Usually any newline character or character sequence
 *     is recognised. If this option is set, then "\R" only recognizes the newline
 *    characters '\r', '\n' and '\r\n'. Since: 2.34
 * @G_REGEX_JAVASCRIPT_COMPAT: Changes behaviour so that it is compatible with
 *     JavaScript rather than PCRE. Since: 2.34
 *
 * Flags specifying compile-time options.
 *
 * Since: 2.14
 */
/* Remember to update G_REGEX_COMPILE_MASK in gregex.c after
 * adding a new flag.
 */
typedef enum
{
  G_REGEX_CASELESS          = 1 << 0,
  G_REGEX_MULTILINE         = 1 << 1,
  G_REGEX_DOTALL            = 1 << 2,
  G_REGEX_EXTENDED          = 1 << 3,
  G_REGEX_ANCHORED          = 1 << 4,
  G_REGEX_DOLLAR_ENDONLY    = 1 << 5,
  G_REGEX_UNGREEDY          = 1 << 9,
  G_REGEX_RAW               = 1 << 11,
  G_REGEX_NO_AUTO_CAPTURE   = 1 << 12,
  G_REGEX_OPTIMIZE          = 1 << 13,
  G_REGEX_FIRSTLINE         = 1 << 18,
  G_REGEX_DUPNAMES          = 1 << 19,
  G_REGEX_NEWLINE_CR        = 1 << 20,
  G_REGEX_NEWLINE_LF        = 1 << 21,
  G_REGEX_NEWLINE_CRLF      = G_REGEX_NEWLINE_CR | G_REGEX_NEWLINE_LF,
  G_REGEX_NEWLINE_ANYCRLF   = G_REGEX_NEWLINE_CR | 1 << 22,
  G_REGEX_BSR_ANYCRLF       = 1 << 23,
  G_REGEX_JAVASCRIPT_COMPAT = 1 << 25
} GRegexCompileFlags;

/**
 * GRegexMatchFlags:
 * @G_REGEX_MATCH_ANCHORED: The pattern is forced to be "anchored", that is,
 *     it is constrained to match only at the first matching point in the
 *     string that is being searched. This effect can also be achieved by
 *     appropriate constructs in the pattern itself such as the "^"
 *     metacharacter.
 * @G_REGEX_MATCH_NOTBOL: Specifies that first character of the string is
 *     not the beginning of a line, so the circumflex metacharacter should
 *     not match before it. Setting this without #G_REGEX_MULTILINE (at
 *     compile time) causes circumflex never to match. This option affects
 *     only the behaviour of the circumflex metacharacter, it does not
 *     affect "\A".
 * @G_REGEX_MATCH_NOTEOL: Specifies that the end of the subject string is
 *     not the end of a line, so the dollar metacharacter should not match
 *     it nor (except in multiline mode) a newline immediately before it.
 *     Setting this without #G_REGEX_MULTILINE (at compile time) causes
 *     dollar never to match. This option affects only the behaviour of
 *     the dollar metacharacter, it does not affect "\Z" or "\z".
 * @G_REGEX_MATCH_NOTEMPTY: An empty string is not considered to be a valid
 *     match if this option is set. If there are alternatives in the pattern,
 *     they are tried. If all the alternatives match the empty string, the
 *     entire match fails. For example, if the pattern "a?b?" is applied to
 *     a string not beginning with "a" or "b", it matches the empty string
 *     at the start of the string. With this flag set, this match is not
 *     valid, so GRegex searches further into the string for occurrences
 *     of "a" or "b".
 * @G_REGEX_MATCH_PARTIAL: Turns on the partial matching feature, for more
 *     documentation on partial matching see g_match_info_is_partial_match().
 * @G_REGEX_MATCH_NEWLINE_CR: Overrides the newline definition set when
 *     creating a new #GRegex, setting the '\r' character as line terminator.
 * @G_REGEX_MATCH_NEWLINE_LF: Overrides the newline definition set when
 *     creating a new #GRegex, setting the '\n' character as line terminator.
 * @G_REGEX_MATCH_NEWLINE_CRLF: Overrides the newline definition set when
 *     creating a new #GRegex, setting the '\r\n' characters sequence as line terminator.
 * @G_REGEX_MATCH_NEWLINE_ANY: Overrides the newline definition set when
 *     creating a new #GRegex, any Unicode newline sequence
 *     is recognised as a newline. These are '\r', '\n' and '\rn', and the
 *     single characters U+000B LINE TABULATION, U+000C FORM FEED (FF),
 *     U+0085 NEXT LINE (NEL), U+2028 LINE SEPARATOR and
 *     U+2029 PARAGRAPH SEPARATOR.
 * @G_REGEX_MATCH_NEWLINE_ANYCRLF: Overrides the newline definition set when
 *     creating a new #GRegex; any '\r', '\n', or '\r\n' character sequence
 *     is recognized as a newline. Since: 2.34
 * @G_REGEX_MATCH_BSR_ANYCRLF: Overrides the newline definition for "\R" set when
 *     creating a new #GRegex; only '\r', '\n', or '\r\n' character sequences
 *     are recognized as a newline by "\R". Since: 2.34
 * @G_REGEX_MATCH_BSR_ANY: Overrides the newline definition for "\R" set when
 *     creating a new #GRegex; any Unicode newline character or character sequence
 *     are recognized as a newline by "\R". These are '\r', '\n' and '\rn', and the
 *     single characters U+000B LINE TABULATION, U+000C FORM FEED (FF),
 *     U+0085 NEXT LINE (NEL), U+2028 LINE SEPARATOR and
 *     U+2029 PARAGRAPH SEPARATOR. Since: 2.34
 * @G_REGEX_MATCH_PARTIAL_SOFT: An alias for #G_REGEX_MATCH_PARTIAL. Since: 2.34
 * @G_REGEX_MATCH_PARTIAL_HARD: Turns on the partial matching feature. In contrast to
 *     to #G_REGEX_MATCH_PARTIAL_SOFT, this stops matching as soon as a partial match
 *     is found, without continuing to search for a possible complete match. See
 *     g_match_info_is_partial_match() for more information. Since: 2.34
 * @G_REGEX_MATCH_NOTEMPTY_ATSTART: Like #G_REGEX_MATCH_NOTEMPTY, but only applied to
 *     the start of the matched string. For anchored
 *     patterns this can only happen for pattern containing "\K". Since: 2.34
 *
 * Flags specifying match-time options.
 *
 * Since: 2.14
 */
/* Remember to update G_REGEX_MATCH_MASK in gregex.c after
 * adding a new flag. */
typedef enum
{
  G_REGEX_MATCH_ANCHORED         = 1 << 4,
  G_REGEX_MATCH_NOTBOL           = 1 << 7,
  G_REGEX_MATCH_NOTEOL           = 1 << 8,
  G_REGEX_MATCH_NOTEMPTY         = 1 << 10,
  G_REGEX_MATCH_PARTIAL          = 1 << 15,
  G_REGEX_MATCH_NEWLINE_CR       = 1 << 20,
  G_REGEX_MATCH_NEWLINE_LF       = 1 << 21,
  G_REGEX_MATCH_NEWLINE_CRLF     = G_REGEX_MATCH_NEWLINE_CR | G_REGEX_MATCH_NEWLINE_LF,
  G_REGEX_MATCH_NEWLINE_ANY      = 1 << 22,
  G_REGEX_MATCH_NEWLINE_ANYCRLF  = G_REGEX_MATCH_NEWLINE_CR | G_REGEX_MATCH_NEWLINE_ANY,
  G_REGEX_MATCH_BSR_ANYCRLF      = 1 << 23,
  G_REGEX_MATCH_BSR_ANY          = 1 << 24,
  G_REGEX_MATCH_PARTIAL_SOFT     = G_REGEX_MATCH_PARTIAL,
  G_REGEX_MATCH_PARTIAL_HARD     = 1 << 27,
  G_REGEX_MATCH_NOTEMPTY_ATSTART = 1 << 28
} GRegexMatchFlags;

/**
 * GRegex:
 *
 * A GRegex is the "compiled" form of a regular expression pattern.
 * This structure is opaque and its fields cannot be accessed directly.
 *
 * Since: 2.14
 */
typedef struct _GRegex		GRegex;


/**
 * GMatchInfo:
 *
 * A GMatchInfo is an opaque struct used to return information about
 * matches.
 */
typedef struct _GMatchInfo	GMatchInfo;

/**
 * GRegexEvalCallback:
 * @match_info: the #GMatchInfo generated by the match.
 *     Use g_match_info_get_regex() and g_match_info_get_string() if you
 *     need the #GRegex or the matched string.
 * @result: a #GString containing the new string
 * @user_data: user data passed to g_regex_replace_eval()
 *
 * Specifies the type of the function passed to g_regex_replace_eval().
 * It is called for each occurrence of the pattern in the string passed
 * to g_regex_replace_eval(), and it should append the replacement to
 * @result.
 *
 * Returns: %FALSE to continue the replacement process, %TRUE to stop it
 *
 * Since: 2.14
 */
typedef gboolean (*GRegexEvalCallback)		(const GMatchInfo *match_info,
						 GString          *result,
						 gpointer          user_data);


GLIB_AVAILABLE_IN_ALL
GRegex		 *g_regex_new			(const gchar         *pattern,
						 GRegexCompileFlags   compile_options,
						 GRegexMatchFlags     match_options,
						 GError             **error);
GLIB_AVAILABLE_IN_ALL
GRegex           *g_regex_ref			(GRegex              *regex);
GLIB_AVAILABLE_IN_ALL
void		  g_regex_unref			(GRegex              *regex);
GLIB_AVAILABLE_IN_ALL
const gchar	 *g_regex_get_pattern		(const GRegex        *regex);
GLIB_AVAILABLE_IN_ALL
gint		  g_regex_get_max_backref	(const GRegex        *regex);
GLIB_AVAILABLE_IN_ALL
gint		  g_regex_get_capture_count	(const GRegex        *regex);
GLIB_AVAILABLE_IN_ALL
gboolean          g_regex_get_has_cr_or_lf      (const GRegex        *regex);
GLIB_AVAILABLE_IN_2_38
gint              g_regex_get_max_lookbehind    (const GRegex        *regex);
GLIB_AVAILABLE_IN_ALL
gint		  g_regex_get_string_number	(const GRegex        *regex, 
						 const gchar         *name);
GLIB_AVAILABLE_IN_ALL
gchar		 *g_regex_escape_string		(const gchar         *string,
						 gint                 length);
GLIB_AVAILABLE_IN_ALL
gchar		 *g_regex_escape_nul		(const gchar         *string,
						 gint                 length);

GLIB_AVAILABLE_IN_ALL
GRegexCompileFlags g_regex_get_compile_flags    (const GRegex        *regex);
GLIB_AVAILABLE_IN_ALL
GRegexMatchFlags   g_regex_get_match_flags      (const GRegex        *regex);

/* Matching. */
GLIB_AVAILABLE_IN_ALL
gboolean	  g_regex_match_simple		(const gchar         *pattern,
						 const gchar         *string,
						 GRegexCompileFlags   compile_options,
						 GRegexMatchFlags     match_options);
GLIB_AVAILABLE_IN_ALL
gboolean	  g_regex_match			(const GRegex        *regex,
						 const gchar         *string,
						 GRegexMatchFlags     match_options,
						 GMatchInfo         **match_info);
GLIB_AVAILABLE_IN_ALL
gboolean	  g_regex_match_full		(const GRegex        *regex,
						 const gchar         *string,
						 gssize               string_len,
						 gint                 start_position,
						 GRegexMatchFlags     match_options,
						 GMatchInfo         **match_info,
						 GError             **error);
GLIB_AVAILABLE_IN_ALL
gboolean	  g_regex_match_all		(const GRegex        *regex,
						 const gchar         *string,
						 GRegexMatchFlags     match_options,
						 GMatchInfo         **match_info);
GLIB_AVAILABLE_IN_ALL
gboolean	  g_regex_match_all_full	(const GRegex        *regex,
						 const gchar         *string,
						 gssize               string_len,
						 gint                 start_position,
						 GRegexMatchFlags     match_options,
						 GMatchInfo         **match_info,
						 GError             **error);

/* String splitting. */
GLIB_AVAILABLE_IN_ALL
gchar		**g_regex_split_simple		(const gchar         *pattern,
						 const gchar         *string,
						 GRegexCompileFlags   compile_options,
						 GRegexMatchFlags     match_options);
GLIB_AVAILABLE_IN_ALL
gchar		**g_regex_split			(const GRegex        *regex,
						 const gchar         *string,
						 GRegexMatchFlags     match_options);
GLIB_AVAILABLE_IN_ALL
gchar		**g_regex_split_full		(const GRegex        *regex,
						 const gchar         *string,
						 gssize               string_len,
						 gint                 start_position,
						 GRegexMatchFlags     match_options,
						 gint                 max_tokens,
						 GError             **error);

/* String replacement. */
GLIB_AVAILABLE_IN_ALL
gchar		 *g_regex_replace		(const GRegex        *regex,
						 const gchar         *string,
						 gssize               string_len,
						 gint                 start_position,
						 const gchar         *replacement,
						 GRegexMatchFlags     match_options,
						 GError             **error);
GLIB_AVAILABLE_IN_ALL
gchar		 *g_regex_replace_literal	(const GRegex        *regex,
						 const gchar         *string,
						 gssize               string_len,
						 gint                 start_position,
						 const gchar         *replacement,
						 GRegexMatchFlags     match_options,
						 GError             **error);
GLIB_AVAILABLE_IN_ALL
gchar		 *g_regex_replace_eval		(const GRegex        *regex,
						 const gchar         *string,
						 gssize               string_len,
						 gint                 start_position,
						 GRegexMatchFlags     match_options,
						 GRegexEvalCallback   eval,
						 gpointer             user_data,
						 GError             **error);
GLIB_AVAILABLE_IN_ALL
gboolean	  g_regex_check_replacement	(const gchar         *replacement,
						 gboolean            *has_references,
						 GError             **error);

/* Match info */
GLIB_AVAILABLE_IN_ALL
GRegex		 *g_match_info_get_regex	(const GMatchInfo    *match_info);
GLIB_AVAILABLE_IN_ALL
const gchar      *g_match_info_get_string       (const GMatchInfo    *match_info);

GLIB_AVAILABLE_IN_ALL
GMatchInfo       *g_match_info_ref              (GMatchInfo          *match_info);
GLIB_AVAILABLE_IN_ALL
void              g_match_info_unref            (GMatchInfo          *match_info);
GLIB_AVAILABLE_IN_ALL
void		  g_match_info_free		(GMatchInfo          *match_info);
GLIB_AVAILABLE_IN_ALL
gboolean	  g_match_info_next		(GMatchInfo          *match_info,
						 GError             **error);
GLIB_AVAILABLE_IN_ALL
gboolean	  g_match_info_matches		(const GMatchInfo    *match_info);
GLIB_AVAILABLE_IN_ALL
gint		  g_match_info_get_match_count	(const GMatchInfo    *match_info);
GLIB_AVAILABLE_IN_ALL
gboolean	  g_match_info_is_partial_match	(const GMatchInfo    *match_info);
GLIB_AVAILABLE_IN_ALL
gchar		 *g_match_info_expand_references(const GMatchInfo    *match_info,
						 const gchar         *string_to_expand,
						 GError             **error);
GLIB_AVAILABLE_IN_ALL
gchar		 *g_match_info_fetch		(const GMatchInfo    *match_info,
						 gint                 match_num);
GLIB_AVAILABLE_IN_ALL
gboolean	  g_match_info_fetch_pos	(const GMatchInfo    *match_info,
						 gint                 match_num,
						 gint                *start_pos,
						 gint                *end_pos);
GLIB_AVAILABLE_IN_ALL
gchar		 *g_match_info_fetch_named	(const GMatchInfo    *match_info,
						 const gchar         *name);
GLIB_AVAILABLE_IN_ALL
gboolean	  g_match_info_fetch_named_pos	(const GMatchInfo    *match_info,
						 const gchar         *name,
						 gint                *start_pos,
						 gint                *end_pos);
GLIB_AVAILABLE_IN_ALL
gchar		**g_match_info_fetch_all	(const GMatchInfo    *match_info);

G_END_DECLS

#endif  /*  __G_REGEX_H__ */
