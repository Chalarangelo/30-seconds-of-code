#ifndef __FRIBIDI_DOC
/* FriBidi
 * fribidi-char-sets-list.h - list of supported character sets
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

/* The order of types in this list should not be important at compile time,
 * but apparently it should not be changed after compilation! */
#endif /* !__FRIBIDI_DOC */
#ifdef _FRIBIDI_ADD_CHAR_SET
# define _FRIBIDI_ADD_CHAR_SET_OTHERS _FRIBIDI_ADD_CHAR_SET
# define _FRIBIDI_ADD_CHAR_SET_ONE2ONE _FRIBIDI_ADD_CHAR_SET
#endif /* _FRIBIDI_ADD_CHAR_SET */
#ifdef _FRIBIDI_ADD_CHAR_SET_OTHERS
_FRIBIDI_ADD_CHAR_SET_OTHERS (UTF8, utf8)		/* UTF-8 (Unicode) */
_FRIBIDI_ADD_CHAR_SET_OTHERS (CAP_RTL, cap_rtl)		/* CapRTL (Test) */
#endif /* _FRIBIDI_ADD_CHAR_SET_OTHERS */
#ifdef _FRIBIDI_ADD_CHAR_SET_ONE2ONE
_FRIBIDI_ADD_CHAR_SET_ONE2ONE (ISO8859_6, iso8859_6)	/* ISO8859-6 (Arabic) */
_FRIBIDI_ADD_CHAR_SET_ONE2ONE (ISO8859_8, iso8859_8)	/* ISO8859-8 (Hebrew) */
_FRIBIDI_ADD_CHAR_SET_ONE2ONE (CP1255, cp1255)		/* CP1255 (MS Hebrew/Yiddish) */
_FRIBIDI_ADD_CHAR_SET_ONE2ONE (CP1256, cp1256)		/* CP1256 (MS Arabic) */
#endif /* _FRIBIDI_ADD_CHAR_SET_ONE2ONE */
#ifdef _FRIBIDI_ADD_CHAR_SET
# undef _FRIBIDI_ADD_CHAR_SET_OTHERS
# undef _FRIBIDI_ADD_CHAR_SET_ONE2ONE
#endif /* _FRIBIDI_ADD_CHAR_SET */

#ifndef __FRIBIDI_DOC
/* *INDENT-ON* */
#endif /* !__FRIBIDI_DOC */
