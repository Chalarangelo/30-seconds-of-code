/* FriBidi
 * fribidi-flags.h - option flags
 *
 * Author:
 *   Behdad Esfahbod, 2005
 *
 * Copyright (C) 2005 Behdad Esfahbod
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
#ifndef _FRIBIDI_FLAGS_H
#define _FRIBIDI_FLAGS_H

#include "fribidi-common.h"

#include "fribidi-types.h"

#include "fribidi-begindecls.h"

typedef uint32_t FriBidiFlags;

/* 
 * Define option flags that various functions use. Each mask has
 * only one bit set.
 */

#define FRIBIDI_FLAG_SHAPE_MIRRORING	0x00000001
#define FRIBIDI_FLAG_REORDER_NSM	0x00000002

#define FRIBIDI_FLAG_SHAPE_ARAB_PRES	0x00000100
#define FRIBIDI_FLAG_SHAPE_ARAB_LIGA	0x00000200
#define FRIBIDI_FLAG_SHAPE_ARAB_CONSOLE	0x00000400

#define FRIBIDI_FLAG_REMOVE_BIDI	0x00010000
#define FRIBIDI_FLAG_REMOVE_JOINING	0x00020000
#define FRIBIDI_FLAG_REMOVE_SPECIALS	0x00040000


/*
 * And their combinations.
 */

#define FRIBIDI_FLAGS_DEFAULT		( \
	FRIBIDI_FLAG_SHAPE_MIRRORING	| \
	FRIBIDI_FLAG_REORDER_NSM	| \
	FRIBIDI_FLAG_REMOVE_SPECIALS	)

#define FRIBIDI_FLAGS_ARABIC		( \
	FRIBIDI_FLAG_SHAPE_ARAB_PRES	| \
	FRIBIDI_FLAG_SHAPE_ARAB_LIGA	)

#include "fribidi-enddecls.h"

#endif /* !_FRIBIDI_FLAGS_H */
/* Editor directions:
 * vim:textwidth=78:tabstop=8:shiftwidth=2:autoindent:cindent
 */
