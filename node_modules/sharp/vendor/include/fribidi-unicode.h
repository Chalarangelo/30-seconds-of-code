/* FriBidi
 * fribidi-unicode.h - general Unicode definitions
 *
 * Author:
 *   Behdad Esfahbod, 2001, 2002, 2004
 *
 * Copyright (C) 2004 Sharif FarsiWeb, Inc
 * Copyright (C) 2001,2002 Behdad Esfahbod
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
#ifndef _FRIBIDI_UNICODE_H
#define _FRIBIDI_UNICODE_H

#include "fribidi-common.h"

#include "fribidi-types.h"

#include "fribidi-begindecls.h"

/* We do not support surrogates yet */
#define FRIBIDI_UNICODE_CHARS	(sizeof(FriBidiChar) >= 4 ? 0x110000 : 0xFFFE)

/* Unicode version - FRIBIDI_UNICODE_VERSION */
#ifdef DONT_HAVE_FRIBIDI_UNICODE_VERSION_H
# define FRIBIDI_UNICODE_VERSION "unknown"
#else /* !DONT_HAVE_FRIBIDI_UNICODE_VERSION_H */
# include "fribidi-unicode-version.h"
#endif /* !DONT_HAVE_FRIBIDI_UNICODE_VERSION_H */

/* An string containing the version the Unicode standard implemented,
 * in the form of "x.y.z", or "unknown". */
extern const char *fribidi_unicode_version;


/* Unicode Bidirectional Algorithm definitions: */

/* Number of types defined in the bidi algorithm */
#define FRIBIDI_BIDI_NUM_TYPES			19

/* The maximum embedding level value assigned by explicit marks */
#define FRIBIDI_BIDI_MAX_EXPLICIT_LEVEL		125

/* The maximum *number* of different resolved embedding levels: 0-126 */
#define FRIBIDI_BIDI_MAX_RESOLVED_LEVELS	127

/* The maximum *number* of nested brackets: 0-63 */
#define FRIBIDI_BIDI_MAX_NESTED_BRACKET_PAIRS   63

/* A few Unicode characters: */

/* Bidirectional marks */
#define FRIBIDI_CHAR_LRM		0x200E
#define FRIBIDI_CHAR_RLM		0x200F
#define FRIBIDI_CHAR_LRE		0x202A
#define FRIBIDI_CHAR_RLE		0x202B
#define FRIBIDI_CHAR_PDF		0x202C
#define FRIBIDI_CHAR_LRO		0x202D
#define FRIBIDI_CHAR_RLO		0x202E
#define FRIBIDI_CHAR_LRI		0x2066
#define FRIBIDI_CHAR_RLI		0x2067
#define FRIBIDI_CHAR_FSI		0x2068
#define FRIBIDI_CHAR_PDI		0x2069

/* Line and Paragraph Separators */
#define FRIBIDI_CHAR_LS			0x2028
#define FRIBIDI_CHAR_PS			0x2029

/* Arabic Joining marks */
#define FRIBIDI_CHAR_ZWNJ		0x200C
#define FRIBIDI_CHAR_ZWJ		0x200D

/* Hebrew and Arabic */
#define FRIBIDI_CHAR_HEBREW_ALEF	0x05D0
#define FRIBIDI_CHAR_ARABIC_ALEF	0x0627
#define FRIBIDI_CHAR_ARABIC_ZERO	0x0660
#define FRIBIDI_CHAR_PERSIAN_ZERO	0x06F0

/* Misc */
#define FRIBIDI_CHAR_ZWNBSP		0xFEFF

/* Char we place for a deleted slot, to delete later */
#define FRIBIDI_CHAR_FILL		FRIBIDI_CHAR_ZWNBSP

#include "fribidi-enddecls.h"

#endif /* !_FRIBIDI_UNICODE_H */
/* Editor directions:
 * vim:textwidth=78:tabstop=8:shiftwidth=2:autoindent:cindent
 */
