/* fribidi-mirroring.h - get mirrored character
 *
 * Copyright (C) 2004  Sharif FarsiWeb, Inc
 * Copyright (C) 2001, 2002, 2004  Behdad Esfahbod
 * Copyright (C) 1999, 2000, 2017  Dov Grobgeld
 * 
 * This file is part of GNU FriBidi.
 * 
 * GNU FriBidi is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public License
 * as published by the Free Software Foundation; either version 2.1
 * of the License, or (at your option) any later version.
 * 
 * GNU FriBidi is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with GNU FriBidi; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 * 
 * For licensing issues, contact <fribidi.license@gmail.com> or write to
 * Sharif FarsiWeb, Inc., PO Box 13445-389, Tehran, Iran.
 *
 * Author(s):
 *   Behdad Esfahbod, 2001, 2002, 2004
 *   Dov Grobgeld, 1999, 2000
 */
#ifndef _FRIBIDI_MIRRORING_H
#define _FRIBIDI_MIRRORING_H

#include "fribidi-common.h"

#include "fribidi-types.h"
#include "fribidi-bidi-types.h"

#include "fribidi-begindecls.h"

/* fribidi_get_mirror_char - get mirrored character
 *
 * This function finds the mirrored equivalent of a character as defined in
 * the file BidiMirroring.txt of the Unicode Character Database available at
 * http://www.unicode.org/Public/UNIDATA/BidiMirroring.txt.
 *
 * If  the input character is a declared as a mirroring character in the
 * Unicode standard and has a mirrored equivalent.  The matching mirrored
 * character is put in the output, otherwise the input character itself is
 * put.
 *
 * Returns: if the character has a mirroring equivalent or not.
 */
FRIBIDI_ENTRY fribidi_boolean fribidi_get_mirror_char (
  FriBidiChar ch,		/* input character */
  FriBidiChar *mirrored_ch	/* output mirrored character */
);

/* fribidi_shape_mirroring - do mirroring shaping
 *
 * This functions replaces mirroring characters on right-to-left embeddings in
 * string with their mirrored equivalent as returned by
 * fribidi_get_mirror_char().
 *
 * This function implements rule L4 of the Unicode Bidirectional Algorithm
 * available at http://www.unicode.org/reports/tr9/#L4.
 */
FRIBIDI_ENTRY void fribidi_shape_mirroring (
  const FriBidiLevel *embedding_levels,	/* input list of embedding
					   levels, as returned by
					   fribidi_get_par_embedding_levels */
  const FriBidiStrIndex len,	/* input string length */
  FriBidiChar *str		/* string to shape */
);

#include "fribidi-enddecls.h"

#endif /* !_FRIBIDI_MIRRORING_H */
/* Editor directions:
 * Local Variables:
 *   mode: c
 *   c-basic-offset: 2
 *   indent-tabs-mode: t
 *   tab-width: 8
 * End:
 * vim: textwidth=78: autoindent: cindent: shiftwidth=2: tabstop=8:
 */
