/* FriBidi
 * fribidi-char-sets.h - character set conversion routines
 *
 * Authors:
 *   Behdad Esfahbod, 2001, 2002, 2004
 *   Dov Grobgeld, 1999, 2000
 *
 * Copyright (C) 2004 Sharif FarsiWeb, Inc
 * Copyright (C) 2001,2002 Behdad Esfahbod
 * Copyright (C) 1999,2000 Dov Grobgeld
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
 * along with this library, in a file named COPYING; if not, write to the
 * Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA 02110-1301, USA
 * 
 * For licensing issues, contact <fribidi.license@gmail.com>.
 */
#ifndef _FRIBIDI_CHAR_SETS_H
#define _FRIBIDI_CHAR_SETS_H

#include "fribidi-common.h"

#include "fribidi-types.h"

#include "fribidi-begindecls.h"

typedef enum
{
  _FRIBIDI_CHAR_SET_NOT_FOUND,
# define _FRIBIDI_ADD_CHAR_SET(CHAR_SET, char_set) FRIBIDI_CHAR_SET_##CHAR_SET,
# include "fribidi-char-sets-list.h"
# undef _FRIBIDI_ADD_CHAR_SET
  _FRIBIDI_CHAR_SETS_NUM_PLUS_ONE
}
FriBidiCharSet;

#define FRIBIDI_CHAR_SET_NOT_FOUND _FRIBIDI_CHAR_SET_NOT_FOUND
#define FRIBIDI_CHAR_SETS_NUM (_FRIBIDI_CHAR_SETS_NUM_PLUS_ONE - 1)


/* fribidi_charset_to_unicode - convert string to Unicode
 *
 * This function converts an string from a character set, to a Unicode string.
 *
 * Returns: The length of the new string.
 */
FRIBIDI_ENTRY FriBidiStrIndex fribidi_charset_to_unicode (
  FriBidiCharSet char_set,	/* character set to convert from */
  const char *s,		/* input string encoded in char_set */
  FriBidiStrIndex len,		/* input string length */
  FriBidiChar *us		/* output Unicode string */
);

/* fribidi_unicode_to_charset - convert string from Unicode
 *
 * This function converts a Unicode string to an string in another character
 * set.  It also null-terminates the output string.
 *
 * Returns: The length of the new string.
 */
FRIBIDI_ENTRY FriBidiStrIndex fribidi_unicode_to_charset (
  FriBidiCharSet char_set,	/* character set to conver to */
  const FriBidiChar *us,	/* input Unicode string */
  FriBidiStrIndex len,		/* input string length */
  char *s			/* output string encoded in char_set */
);

/* fribidi_parse_charset - parse character set name
 *
 * Returns: The character set named s, or FRIBIDI_CHAR_SET_NOT_FOUND if the
 * character set is not available.
 */
FRIBIDI_ENTRY FriBidiCharSet fribidi_parse_charset (
  const char *s			/* input name of the character set */
);


FRIBIDI_ENTRY const char *fribidi_char_set_name (
  FriBidiCharSet char_set
);

FRIBIDI_ENTRY const char *fribidi_char_set_title (
  FriBidiCharSet char_set
);

FRIBIDI_ENTRY const char *fribidi_char_set_desc (
  FriBidiCharSet char_set
);

#include "fribidi-enddecls.h"

#endif /* !_FRIBIDI_CHAR_SETS_H */
/* Editor directions:
 * vim:textwidth=78:tabstop=8:shiftwidth=2:autoindent:cindent
 */
