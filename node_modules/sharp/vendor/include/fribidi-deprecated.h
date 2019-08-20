/* FriBidi
 * fribidi-deprecated.h - Deprecated interfaces
 *
 * Author:
 *   Behdad Esfahbod, 2004, 2005
 *
 * Copyright (C) 2004 Sharif FarsiWeb, Inc
 * Copyright (C) 2004, 2005 Behdad Esfahbod
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
#ifndef _FRIBIDI_DEPRECATED_H
#define _FRIBIDI_DEPRECATED_H

#include "fribidi-common.h"

#include "fribidi-types.h"

#include "fribidi-bidi-types.h"

#include "fribidi-begindecls.h"



/* fribidi_mirroring_status - get current mirroring status
 *
 * This function is deprecated and only used with other deprecated functions.
 */
     FRIBIDI_ENTRY fribidi_boolean fribidi_mirroring_status (
  void
) FRIBIDI_GNUC_DEPRECATED;

/* fribidi_set_mirroring - set mirroring on or off
 *
 * This function is used to turn character mirroring on or off.
 * Character mirroring is the act of replacing a mirrorable glyph
 * (character), eg. left parenthesis, with the matching glyph, 
 * eg. right parenthesis, in a right-to-left resolved context.
 * If your rendering engine does mirroring itself, you may want to 
 * turn it off here.
 *
 * This flag is on by default.
 * This function is deprecated and only used with other deprecated functions.
 *
 * Returns: the new mirroring status.
 */
     FRIBIDI_ENTRY fribidi_boolean fribidi_set_mirroring (
  fribidi_boolean state		/* new state to set */
) FRIBIDI_GNUC_DEPRECATED;


/* fribidi_reorder_nsm_status - get current marks reordering status
 *
 * This function is deprecated and only used with other deprecated functions.
 */
     FRIBIDI_ENTRY fribidi_boolean fribidi_reorder_nsm_status (
  void
) FRIBIDI_GNUC_DEPRECATED;

/* fribidi_set_reorder_nsm - set marks reordering on or off
 *
 * This function is used to turn non-spacing marks reordering on or
 * off.  Reordering non-spacing marks is the act of placing non-spacing
 * marks (bidi class NSM) after their base character in a right-to-left
 * resolved context.  If your rendering engine expects non-spacing marks
 * always after the base character in the memory representation of the
 * visual string, you need this option on.  An example of where people
 * may need it off is when rendering in the console when non-spacing
 * marks cannot be applied on top of the base character.
 *
 * This flag is on by default.
 * This function is deprecated and only used with other deprecated functions.
 *
 * Returns: the new marks reordering status.
 */
     FRIBIDI_ENTRY fribidi_boolean fribidi_set_reorder_nsm (
  fribidi_boolean state		/* new state to set */
) FRIBIDI_GNUC_DEPRECATED;




/* fribidi_log2vis_get_embedding_levels - get embedding levels
 *
 * Deprecated. Replaced by fribidi_get_par_embedding_levels_ex.
 */
FRIBIDI_ENTRY FriBidiLevel
fribidi_log2vis_get_embedding_levels (
  const FriBidiCharType *bidi_types,	/* input list of bidi types as returned by
					   fribidi_get_bidi_types() */
  const FriBidiStrIndex len,	/* input string length of the paragraph */
  FriBidiParType *pbase_dir,	/* requested and resolved paragraph
				 * base direction */
  FriBidiLevel *embedding_levels	/* output list of embedding levels */
) FRIBIDI_GNUC_DEPRECATED;

/* fribidi_get_type - get character bidi type
 *
 * Deprecated. Replaced by fribidi_get_bidi_type.
 */
FRIBIDI_ENTRY FriBidiCharType
fribidi_get_type (
  FriBidiChar ch		/* input character */
) FRIBIDI_GNUC_DEPRECATED;

/* fribidi_get_type_internal - get character bidi type
 *
 * Deprecated. Replaced by fribidi_get_bidi_type.
 */
FRIBIDI_ENTRY FriBidiCharType
fribidi_get_type_internal (
  FriBidiChar ch		/* input character */
) FRIBIDI_GNUC_DEPRECATED;

/* fribidi_remove_bidi_marks - remove bidi marks out of an string
 *
 * This function removes the bidi and boundary-neutral marks out of an string
 * and the accompanying lists.  It implements rule X9 of the Unicode
 * Bidirectional Algorithm available at
 * http://www.unicode.org/reports/tr9/#X9, with the exception that it removes
 * U+200E LEFT-TO-RIGHT MARK and U+200F RIGHT-TO-LEFT MARK too.
 *
 * If any of the input lists are NULL, the list is skipped.  If str is the
 * visual string, then positions_to_this is  positions_L_to_V and
 * position_from_this_list is positions_V_to_L;  if str is the logical
 * string, the other way. Moreover, the position maps should be filled with
 * valid entries.
 * 
 * A position map pointing to a removed character is filled with \-1. By the
 * way, you should not use embedding_levels if str is visual string.
 * 
 * For best results this function should be run on a whole paragraph, not
 * lines; but feel free to do otherwise if you know what you are doing.
 * Deprecated.  Use fribidi_remove_special_chars instead.
 *
 * Returns: New length of the string, or \-1 if an error occurred (memory
 * allocation failure most probably).
 */
FRIBIDI_ENTRY FriBidiStrIndex
fribidi_remove_bidi_marks (
  FriBidiChar *str,		/* input string to clean */
  const FriBidiStrIndex len,	/* input string length */
  FriBidiStrIndex *positions_to_this,	/* list mapping positions to the
					   order used in str */
  FriBidiStrIndex *position_from_this_list,	/* list mapping positions from the
						   order used in str */
  FriBidiLevel *embedding_levels	/* list of embedding levels */
)
     FRIBIDI_GNUC_WARN_UNUSED FRIBIDI_GNUC_DEPRECATED;


/* fribidi_log2vis - get visual string
 *
 * This function converts the logical input string to the visual output
 * strings as specified by the Unicode Bidirectional Algorithm.  As a side
 * effect it also generates mapping lists between the two strings, and the
 * list of embedding levels as defined by the algorithm.
 *
 * If NULL is passed as any of the the lists, the list is ignored and not
 * filled.
 *
 * This function is obsolete because it only handles one-line paragraphs. 
 * Please consider using other functions instead.  Deprecated.
 *
 * Returns: Maximum level found plus one, or zero if any error occurred
 * (memory allocation failure most probably).
 */
     FRIBIDI_ENTRY FriBidiLevel fribidi_log2vis (
  const FriBidiChar *str,	/* input logical string */
  const FriBidiStrIndex len,	/* input string length */
  FriBidiParType *pbase_dir,	/* requested and resolved paragraph
				 * base direction */
  FriBidiChar *visual_str,	/* output visual string */
  FriBidiStrIndex *positions_L_to_V,	/* output mapping from logical to 
					 * visual string positions */
  FriBidiStrIndex *positions_V_to_L,	/* output mapping from visual string
					 * back to the logical string
					 * positions */
  FriBidiLevel *embedding_levels	/* output list of embedding levels */
)
     FRIBIDI_GNUC_WARN_UNUSED FRIBIDI_GNUC_DEPRECATED;


/* fribidi_get_par_embedding_levels - get bidi embedding levels of a paragraph
 *
 * Deprecated interface to fribidi_get_par_embedding_levels_ex(). Refer to
 * it for documentation.
 */
FRIBIDI_ENTRY FriBidiLevel
fribidi_get_par_embedding_levels (
  const FriBidiCharType *bidi_types,	/* input list of bidi types as returned by
					   fribidi_get_bidi_types() */
  const FriBidiStrIndex len,	/* input string length of the paragraph */
  FriBidiParType *pbase_dir,	/* requested and resolved paragraph
				 * base direction */
  FriBidiLevel *embedding_levels	/* output list of embedding levels */
) 
     FRIBIDI_GNUC_WARN_UNUSED FRIBIDI_GNUC_DEPRECATED;

#define UNI_MAX_BIDI_LEVEL	FRIBIDI_BIDI_MAX_EXPLICIT_LEVEL
#define UNI_LRM			FRIBIDI_CHAR_LRM
#define UNI_RLM			FRIBIDI_CHAR_RLM
#define UNI_LRE			FRIBIDI_CHAR_LRE
#define UNI_RLE			FRIBIDI_CHAR_RLE
#define UNI_LRO			FRIBIDI_CHAR_LRO
#define UNI_RLO			FRIBIDI_CHAR_RLO
#define UNI_LS			FRIBIDI_CHAR_LS
#define UNI_PS			FRIBIDI_CHAR_PS
#define UNI_ZWNJ		FRIBIDI_CHAR_ZWNJ
#define UNI_ZWJ			FRIBIDI_CHAR_ZWJ
#define UNI_HEBREW_ALEF		FRIBIDI_CHAR_HEBREW_ALEF
#define UNI_ARABIC_ALEF		FRIBIDI_CHAR_ARABIC_ALEF
#define UNI_ARABIC_ZERO		FRIBIDI_CHAR_ARABIC_ZERO
#define UNI_FARSI_ZERO		FRIBIDI_CHAR_PERSIAN_ZERO

#define FRIBIDI_TYPE_WL		FRIBIDI_PAR_WLTR
#define FRIBIDI_TYPE_WR		FRIBIDI_PAR_WRTL
#define FRIBIDI_TYPE_L		FRIBIDI_PAR_LTR
#define FRIBIDI_TYPE_R		FRIBIDI_PAR_RTL
#define FRIBIDI_TYPE_N		FRIBIDI_PAR_ON
#define FRIBIDI_TYPE_B		FRIBIDI_TYPE_BS
#define FRIBIDI_TYPE_S		FRIBIDI_TYPE_SS

#include "fribidi-enddecls.h"

#endif /* !_FRIBIDI_DEPRECATED_H */
/* Editor directions:
 * vim:textwidth=78:tabstop=8:shiftwidth=2:autoindent:cindent
 */
