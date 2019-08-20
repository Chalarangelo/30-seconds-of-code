/* FriBidi
 * fribidi-shape.h - shaping
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
#ifndef _FRIBIDI_SHAPE_H
#define _FRIBIDI_SHAPE_H

#include "fribidi-types.h"
#include "fribidi-flags.h"
#include "fribidi-bidi-types.h"
#include "fribidi-joining-types.h"

#include "fribidi-begindecls.h"


/* fribidi_shape - do bidi-aware shaping
 *
 * This function does all shaping work that depends on the resolved embedding
 * levels of the characters.  Currently it does mirroring and Arabic shaping,
 * but the list may grow in the future.  This function is a wrapper around
 * fribidi_shape_mirroring and fribidi_shape_arabic.
 *
 * The flags parameter specifies which shapings are applied.  The only flags
 * affecting the functionality of this function are those beginning with
 * FRIBIDI_FLAG_SHAPE_.  Of these, only FRIBIDI_FLAG_SHAPE_MIRRORING is on
 * in FRIBIDI_FLAGS_DEFAULT.  For details of the Arabic-specific flags see
 * fribidi_shape_arabic.  If ar_props is NULL, no Arabic shaping is performed.
 *
 * Feel free to do your own shaping before or after calling this function,
 * but you should take care of embedding levels yourself then.
 */
FRIBIDI_ENTRY void fribidi_shape (
  FriBidiFlags flags, /* shaping flags */
  const FriBidiLevel *embedding_levels,	/* input list of embedding
					   levels, as returned by
					   fribidi_get_par_embedding_levels */
  const FriBidiStrIndex len,	/* input string length */
  FriBidiArabicProp *ar_props, /* input/output Arabic properties as
				       * computed by fribidi_join_arabic */
  FriBidiChar *str		/* string to shape */
);


#include "fribidi-enddecls.h"

#endif /* !_FRIBIDI_SHAPE_H */
/* Editor directions:
 * vim:textwidth=78:tabstop=8:shiftwidth=2:autoindent:cindent
 */
