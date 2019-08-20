#ifndef __FRIBIDI_DOC
/* FriBidi
 * fribidi-joining-types-list.h - list of joining types
 *
 * Author:
 *   Behdad Esfahbod, 2004
 *
 * Copyright (C) 2004 Sharif FarsiWeb, Inc.
 * Copyright (C) 2004 Behdad Esfahbod
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

_FRIBIDI_ADD_TYPE (U, '|')	/* nUn-joining, e.g. Full Stop */
_FRIBIDI_ADD_TYPE (R, '<')	/* Right-joining, e.g. Arabic Letter Dal */
_FRIBIDI_ADD_TYPE (D, '+')	/* Dual-joining, e.g. Arabic Letter Ain */
_FRIBIDI_ADD_TYPE (C, '-')	/* join-Causing, e.g. Tatweel, ZWJ */
_FRIBIDI_ADD_TYPE (T, '^')	/* Transparent, e.g. Arabic Fatha */
_FRIBIDI_ADD_TYPE (L, '>')	/* Left-joining, i.e. fictional */
_FRIBIDI_ADD_TYPE (G, '~')	/* iGnored, e.g. LRE, RLE, ZWNBSP */

#ifndef __FRIBIDI_DOC
/* *INDENT-ON* */
#endif /* !__FRIBIDI_DOC */
