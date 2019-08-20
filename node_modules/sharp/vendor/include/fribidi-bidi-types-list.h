#ifndef __FRIBIDI_DOC
/* FriBidi
 * fribidi-bidi-types-list.h - list of bidi types
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
/* *INDENT-OFF* */
#endif /* !__FRIBIDI_DOC */
#ifndef _FRIBIDI_ADD_TYPE
# define _FRIBIDI_ADD_TYPE(x,y)
#endif
#ifndef _FRIBIDI_ADD_ALIAS
# define _FRIBIDI_ADD_ALIAS(x1,x2)
#endif

#if !defined(_FRIBIDI_PAR_TYPES) || defined(_FRIBIDI_ALL_TYPES)

_FRIBIDI_ADD_TYPE (LTR, 'L')	/* Left-To-Right letter */
_FRIBIDI_ADD_TYPE (RTL, 'R')	/* Right-To-Left letter */
_FRIBIDI_ADD_TYPE (AL, 'A')	/* Arabic Letter */
_FRIBIDI_ADD_TYPE (EN, '1')	/* European Numeral */
_FRIBIDI_ADD_TYPE (AN, '9')	/* Arabic Numeral */
_FRIBIDI_ADD_TYPE (ES, 'w')	/* European number Separator */
_FRIBIDI_ADD_TYPE (ET, 'w')	/* European number Terminator */
_FRIBIDI_ADD_TYPE (CS, 'w')	/* Common Separator */
_FRIBIDI_ADD_TYPE (NSM, '`')	/* Non Spacing Mark */
_FRIBIDI_ADD_TYPE (BN, 'b')	/* Boundary Neutral */
_FRIBIDI_ADD_TYPE (BS, 'B')	/* Block Separator */
_FRIBIDI_ADD_TYPE (SS, 'S')	/* Segment Separator */
_FRIBIDI_ADD_TYPE (WS, '_')	/* WhiteSpace */
_FRIBIDI_ADD_TYPE (ON, 'n')	/* Other Neutral */
_FRIBIDI_ADD_TYPE (LRE, '+')	/* Left-to-Right Embedding */
_FRIBIDI_ADD_TYPE (RLE, '+')	/* Right-to-Left Embedding */
_FRIBIDI_ADD_TYPE (LRO, '+')	/* Left-to-Right Override */
_FRIBIDI_ADD_TYPE (RLO, '+')	/* Right-to-Left Override */
_FRIBIDI_ADD_TYPE (PDF, '-')	/* Pop Directional Flag */
_FRIBIDI_ADD_TYPE (LRI, '+')	/* Left-to-Right Isolate */
_FRIBIDI_ADD_TYPE (RLI, '+')	/* Right-to-Left Isolate */
_FRIBIDI_ADD_TYPE (FSI, '+')	/* First-Strong Isolate */
_FRIBIDI_ADD_TYPE (PDI, '-')	/* Pop Directional Isolate */

#if defined(_FRIBIDI_ADD_ALIAS)
_FRIBIDI_ADD_ALIAS (L, LTR)
_FRIBIDI_ADD_ALIAS (R, RTL)
_FRIBIDI_ADD_ALIAS (B, BS)
_FRIBIDI_ADD_ALIAS (S, SS)
#endif /* _FRIBIDI_ADD_ALIAS */

#if defined(_FRIBIDI_SENTINEL_TYPE) || defined(_FRIBIDI_ALL_TYPES)
_FRIBIDI_ADD_TYPE (SENTINEL, '$')	/* SENTINEL */
#endif /* _FRIBIDI_SENTINEL_TYPES || _FRIBIDI_ALL_TYPES*/
#endif /* !_FRIBIDI_PAR_TYPES || _FRIBIDI_ALL_TYPES */

#if defined(_FRIBIDI_PAR_TYPES) || defined(_FRIBIDI_ALL_TYPES)
# if !defined(_FRIBIDI_ALL_TYPES)
_FRIBIDI_ADD_TYPE (LTR, 'L')	/* Left-To-Right paragraph */
_FRIBIDI_ADD_TYPE (RTL, 'R')	/* Right-To-Left paragraph */
_FRIBIDI_ADD_TYPE (ON, 'n')	/* directiOn-Neutral paragraph */
# endif /* !_FRIBIDI_ALL_TYPES */
_FRIBIDI_ADD_TYPE (WLTR, 'l')	/* Weak Left To Right paragraph */
_FRIBIDI_ADD_TYPE (WRTL, 'r')	/* Weak Right To Left paragraph */
#endif /* _FRIBIDI_PAR_TYPES || _FRIBIDI_ALL_TYPES*/

#if defined(_FRIBIDI_ENUM_TYPES)
typedef enum {
# define _FRIBIDI_ADD_TYPE _FRIBIDI_ENUM_ADD_TYPE
# include "fribidi-bidi-types-list.h"
# undef _FRIBIDI_ADD_TYPE
  _FRIBIDI_TYPES_MAX
} _FRIBIDI_ENUM_TYPES
#endif /* _FRIBIDI_ENUM_TYPES */

#ifndef __FRIBIDI_DOC
/* *INDENT-ON* */
#endif /* !__FRIBIDI_DOC */
