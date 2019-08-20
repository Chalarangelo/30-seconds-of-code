/* FriBidi
 * fribidi-bidi.h - bidirectional algorithm
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
#ifndef _FRIBIDI_BIDI_H
#define _FRIBIDI_BIDI_H

#include "fribidi-common.h"

#include "fribidi-types.h"
#include "fribidi-flags.h"
#include "fribidi-bidi-types.h"

#include "fribidi-begindecls.h"

/* fribidi_get_par_direction - get base paragraph direction
 *
 * This function finds the base direction of a single paragraph,
 * as defined by rule P2 of the Unicode Bidirectional Algorithm available at
 * http://www.unicode.org/reports/tr9/#P2.
 *
 * You typically do not need this function as
 * fribidi_get_par_embedding_levels() knows how to compute base direction
 * itself, but you may need this to implement a more sophisticated paragraph
 * direction handling.  Note that you can pass more than a paragraph to this
 * function and the direction of the first non-neutral paragraph is returned,
 * which is a very good heuristic to set direction of the neutral paragraphs
 * at the beginning of text.  For other neutral paragraphs, you better use the
 * direction of the previous paragraph.
 *
 * Returns: Base pargraph direction.  No weak paragraph direction is returned,
 * only LTR, RTL, or ON.
 */
FRIBIDI_ENTRY FriBidiParType fribidi_get_par_direction (
  const FriBidiCharType *bidi_types,	/* input list of bidi types as returned by
					   fribidi_get_bidi_types() */
  const FriBidiStrIndex len	/* input string length */
);

/* fribidi_get_par_embedding_levels_ex - get bidi embedding levels of a paragraph
 *
 * This function finds the bidi embedding levels of a single paragraph,
 * as defined by the Unicode Bidirectional Algorithm available at
 * http://www.unicode.org/reports/tr9/.  This function implements rules P2 to
 * I1 inclusive, and parts 1 to 3 of L1, except for rule X9 which is
 *  implemented in fribidi_remove_bidi_marks().  Part 4 of L1 is implemented
 *  in fribidi_reorder_line().
 *
 * There are a few macros defined in fribidi-bidi-types.h to work with this
 * embedding levels.
 *
 * Returns: Maximum level found plus one, or zero if any error occurred
 * (memory allocation failure most probably).
 */
FRIBIDI_ENTRY FriBidiLevel
fribidi_get_par_embedding_levels_ex (
  const FriBidiCharType *bidi_types,	/* input list of bidi types as returned by
					   fribidi_get_bidi_types() */
  const FriBidiBracketType *bracket_types,	/* input list of bracket types as returned by
					   fribidi_get_bracket_types() */
  const FriBidiStrIndex len,	/* input string length of the paragraph */
  FriBidiParType *pbase_dir,	/* requested and resolved paragraph
				 * base direction */
  FriBidiLevel *embedding_levels	/* output list of embedding levels */
) FRIBIDI_GNUC_WARN_UNUSED;

/* fribidi_reorder_line - reorder a line of logical string to visual
 *
 * This function reorders the characters in a line of text from logical to
 * final visual order.  This function implements part 4 of rule L1, and rules
 * L2 and L3 of the Unicode Bidirectional Algorithm available at
 * http://www.unicode.org/reports/tr9/#Reordering_Resolved_Levels.
 *
 * As a side effect it also sets position maps if not NULL.
 *
 * You should provide the resolved paragraph direction and embedding levels as
 * set by fribidi_get_par_embedding_levels().  Also note that the embedding
 * levels may change a bit.  To be exact, the embedding level of any sequence
 * of white space at the end of line is reset to the paragraph embedding level
 * (That is part 4 of rule L1).
 *
 * Note that the bidi types and embedding levels are not reordered.  You can
 * reorder these (or any other) arrays using the map later.  The user is
 * responsible to initialize map to something sensible, like an identity
 * mapping, or pass NULL if no map is needed.
 *
 * There is an optional part to this function, which is whether non-spacing
 * marks for right-to-left parts of the text should be reordered to come after
 * their base characters in the visual string or not.  Most rendering engines
 * expect this behavior, but console-based systems for example do not like it.
 * This is controlled by the FRIBIDI_FLAG_REORDER_NSM flag.  The flag is on
 * in FRIBIDI_FLAGS_DEFAULT.
 *
 * Returns: Maximum level found in this line plus one, or zero if any error
 * occurred (memory allocation failure most probably).
 */
     FRIBIDI_ENTRY FriBidiLevel fribidi_reorder_line (
  FriBidiFlags flags, /* reorder flags */
  const FriBidiCharType *bidi_types,	/* input list of bidi types as returned by
					   fribidi_get_bidi_types() */
  const FriBidiStrIndex len,	/* input length of the line */
  const FriBidiStrIndex off,	/* input offset of the beginning of the line
				   in the paragraph */
  const FriBidiParType base_dir,	/* resolved paragraph base direction */
  FriBidiLevel *embedding_levels,	/* input list of embedding levels,
					   as returned by
					   fribidi_get_par_embedding_levels */
  FriBidiChar *visual_str,	/* visual string to reorder */
  FriBidiStrIndex *map		/* a map of string indices which is reordered
				 * to reflect where each glyph ends up. */
) FRIBIDI_GNUC_WARN_UNUSED;

#include "fribidi-enddecls.h"

#endif /* !_FRIBIDI_BIDI_H */
/* Editor directions:
 * vim:textwidth=78:tabstop=8:shiftwidth=2:autoindent:cindent
 */
