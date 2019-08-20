/* fribidi-arabic.h - do Arabic shaping to presentation forms
 *
 * Copyright (C) 2005  Behdad Esfahbod
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
 *   Behdad Esfahbod, 2005
 */
#ifndef _FRIBIDI_ARABIC_H
#define _FRIBIDI_ARABIC_H

#include "fribidi-common.h"

#include "fribidi-types.h"
#include "fribidi-flags.h"
#include "fribidi-bidi-types.h"
#include "fribidi-joining.h"

#include "fribidi-begindecls.h"


/* fribidi_shape_arabic - do Arabic shaping
 *
 * The actual shaping that is done depends on the flags set.  Only flags
 * starting with FRIBIDI_FLAG_SHAPE_ARAB_ affect this function.
 * Currently these are:
 *
 *	* FRIBIDI_FLAG_SHAPE_MIRRORING: Do mirroring.
 *	* FRIBIDI_FLAG_SHAPE_ARAB_PRES: Shape Arabic characters to their
 *					presentation form glyphs.
 *	* FRIBIDI_FLAG_SHAPE_ARAB_LIGA: Form mandatory Arabic ligatures.
 *	* FRIBIDI_FLAG_SHAPE_ARAB_CONSOLE: Perform additional Arabic shaping
 *					   suitable for text rendered on
 *					   grid terminals with no mark
 *					   rendering capabilities.
 *
 * Of the above, FRIBIDI_FLAG_SHAPE_ARAB_CONSOLE is only used in special
 * cases, but the rest are recommended in any environment that doesn't have
 * other means for doing Arabic shaping.  The set of extra flags that enable
 * this level of Arabic support has a shortcut named FRIBIDI_FLAGS_ARABIC.
 */
FRIBIDI_ENTRY void
fribidi_shape_arabic (
  FriBidiFlags flags, /* shaping flags */
  const FriBidiLevel *embedding_levels,
  const FriBidiStrIndex len,	/* input string length */
  FriBidiArabicProp *ar_props, /* input/output Arabic properties as
				* computed by fribidi_join_arabic */
  FriBidiChar *str		/* string to shape */
);

#include "fribidi-enddecls.h"

#endif /* !_FRIBIDI_ARABIC_H */
/* Editor directions:
 * Local Variables:
 *   mode: c
 *   c-basic-offset: 2
 *   indent-tabs-mode: t
 *   tab-width: 8
 * End:
 * vim: textwidth=78: autoindent: cindent: shiftwidth=2: tabstop=8:
 */
