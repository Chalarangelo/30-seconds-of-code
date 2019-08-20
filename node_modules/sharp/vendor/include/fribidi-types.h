/* FriBidi
 * fribidi-types.h - define data types for the rest of the library
 *
 * Author:
 *   Behdad Esfahbod, 2001, 2002, 2004
 *
 * Copyright (C) 2004 Sharif FarsiWeb, Inc.
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
#ifndef _FRIBIDI_TYPES_H
#define _FRIBIDI_TYPES_H

#ifdef HAVE_CONFIG_H
# include <config.h>
#endif

#include "fribidi-common.h"

#include "fribidi-begindecls.h"


# if defined (_SVR4) || defined (SVR4) || defined (__OpenBSD__) || \
     defined (_sgi) || defined (__sun) || defined (sun) || \
     defined (__digital__) || defined (__HP_cc)
#  include <inttypes.h>
# elif defined (_AIX)
#  include <sys/inttypes.h>
# else
#  include <stdint.h>
# endif

typedef int fribidi_boolean;

typedef uint32_t FriBidiChar;
typedef int FriBidiStrIndex;

/* The MSB is used to indicate an opening bracket */
typedef FriBidiChar FriBidiBracketType;

/* Use FRIBIDI_NO_BRACKET for assigning to a non-bracket */
#define FRIBIDI_NO_BRACKET 0

/* A few macros for working with bits */

#define FRIBIDI_TEST_BITS(x, mask) (((x) & (mask)) ? 1 : 0)

#define FRIBIDI_INCLUDE_BITS(x, mask) ((x) | (mask))

#define FRIBIDI_EXCLUDE_BITS(x, mask) ((x) & ~(mask))

#define FRIBIDI_SET_BITS(x, mask)	((x) |= (mask))

#define FRIBIDI_UNSET_BITS(x, mask)	((x) &= ~(mask))

#define FRIBIDI_ADJUST_BITS(x, mask, cond)	\
	((x) = ((x) & ~(mask)) | ((cond) ? (mask) : 0))

#define FRIBIDI_ADJUST_AND_TEST_BITS(x, mask, cond)	\
	FRIBIDI_TEST_BITS(FRIBIDI_ADJUST_BITS((x), (mask), (cond)), (mask))

#include "fribidi-enddecls.h"

#endif /* !_FRIBIDI_TYPES_H */
/* Editor directions:
 * vim:textwidth=78:tabstop=8:shiftwidth=2:autoindent:cindent
 */
