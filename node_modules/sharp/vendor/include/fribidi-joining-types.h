/* FriBidi
 * fribidi-joining-types.h - character joining types
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
#ifndef _FRIBIDI_JOINING_TYPES_H
#define _FRIBIDI_JOINING_TYPES_H

#include "fribidi-common.h"

#include "fribidi-types.h"

#include "fribidi-begindecls.h"

/* 
 * Define bit masks that joining types are based on, each mask has
 * only one bit set.
 */

#define FRIBIDI_MASK_JOINS_RIGHT	0x01	/* May join to right */
#define FRIBIDI_MASK_JOINS_LEFT		0x02	/* May join to right */
#define FRIBIDI_MASK_ARAB_SHAPES	0x04	/* May Arabic shape */
#define FRIBIDI_MASK_TRANSPARENT	0x08	/* Is transparent */
#define FRIBIDI_MASK_IGNORED		0x10	/* Is ignored */
#define FRIBIDI_MASK_LIGATURED		0x20	/* Is ligatured */

/*
 * Define values for FriBidiJoiningType
 */

/* nUn-joining */
#define FRIBIDI_JOINING_TYPE_U_VAL	( 0 )

/* Right-joining */
#define FRIBIDI_JOINING_TYPE_R_VAL	\
	( FRIBIDI_MASK_JOINS_RIGHT | FRIBIDI_MASK_ARAB_SHAPES )

/* Dual-joining */
#define FRIBIDI_JOINING_TYPE_D_VAL	\
	( FRIBIDI_MASK_JOINS_RIGHT | FRIBIDI_MASK_JOINS_LEFT \
	| FRIBIDI_MASK_ARAB_SHAPES )

/* join-Causing */
#define FRIBIDI_JOINING_TYPE_C_VAL	\
	( FRIBIDI_MASK_JOINS_RIGHT | FRIBIDI_MASK_JOINS_LEFT )

/* Left-joining */
#define FRIBIDI_JOINING_TYPE_L_VAL	\
	( FRIBIDI_MASK_JOINS_LEFT | FRIBIDI_MASK_ARAB_SHAPES )

/* Transparent */
#define FRIBIDI_JOINING_TYPE_T_VAL	\
	( FRIBIDI_MASK_TRANSPARENT | FRIBIDI_MASK_ARAB_SHAPES )

/* iGnored */
#define FRIBIDI_JOINING_TYPE_G_VAL	( FRIBIDI_MASK_IGNORED )


enum _FriBidiJoiningTypeEnum
{
# define _FRIBIDI_ADD_TYPE(TYPE,SYMBOL) \
	FRIBIDI_JOINING_TYPE_##TYPE = FRIBIDI_JOINING_TYPE_##TYPE##_VAL,
# include "fribidi-joining-types-list.h"
# undef _FRIBIDI_ADD_TYPE
  _FRIBIDI_JOINING_TYPE_JUNK	/* Don't use this */
};

#ifdef __FRIBIDI_DOC
typedef enum _FriBidiJoiningTypeEnum FriBidiJoiningType;
#else /* !__FRIBIDI_DOC */
typedef uint8_t FriBidiJoiningType;
#endif /* !__FRIBIDI_DOC */

/* FriBidiArabicProp is essentially the same type as FriBidiJoiningType, but
 * not limited to the few values returned by fribidi_get_joining_type. */
typedef uint8_t FriBidiArabicProp;

/*
 * The equivalent of JoiningType values for ArabicProp
 */

/* Primary Arabic Joining Classes (Table 8-2) */

/* nUn-joining */
#define FRIBIDI_IS_JOINING_TYPE_U(p)	\
	( 0 == ( (p) &	\
		( FRIBIDI_MASK_TRANSPARENT | FRIBIDI_MASK_IGNORED	\
		| FRIBIDI_MASK_JOINS_RIGHT | FRIBIDI_MASK_JOINS_LEFT ) ) )

/* Right-joining */
#define FRIBIDI_IS_JOINING_TYPE_R(p)	\
	( FRIBIDI_MASK_JOINS_RIGHT == ( (p) &	\
		( FRIBIDI_MASK_TRANSPARENT | FRIBIDI_MASK_IGNORED	\
		| FRIBIDI_MASK_JOINS_RIGHT | FRIBIDI_MASK_JOINS_LEFT ) ) )

/* Dual-joining */
#define FRIBIDI_IS_JOINING_TYPE_D(p)	\
	( ( FRIBIDI_MASK_JOINS_RIGHT | FRIBIDI_MASK_JOINS_LEFT	\
	  | FRIBIDI_MASK_ARAB_SHAPES ) == ( (p) &	\
		( FRIBIDI_MASK_TRANSPARENT | FRIBIDI_MASK_IGNORED	\
		| FRIBIDI_MASK_JOINS_RIGHT | FRIBIDI_MASK_JOINS_LEFT	\
		| FRIBIDI_MASK_ARAB_SHAPES ) ) )

/* join-Causing */
#define FRIBIDI_IS_JOINING_TYPE_C(p)	\
	( ( FRIBIDI_MASK_JOINS_RIGHT | FRIBIDI_MASK_JOINS_LEFT ) == ( (p) & \
		( FRIBIDI_MASK_TRANSPARENT | FRIBIDI_MASK_IGNORED	\
		| FRIBIDI_MASK_JOINS_RIGHT | FRIBIDI_MASK_JOINS_LEFT	\
		| FRIBIDI_MASK_ARAB_SHAPES ) ) )

/* Left-joining */
#define FRIBIDI_IS_JOINING_TYPE_L(p)	\
	( FRIBIDI_MASK_JOINS_LEFT == ( (p) &	\
		( FRIBIDI_MASK_TRANSPARENT | FRIBIDI_MASK_IGNORED	\
		| FRIBIDI_MASK_JOINS_RIGHT | FRIBIDI_MASK_JOINS_LEFT ) ) )

/* Transparent */
#define FRIBIDI_IS_JOINING_TYPE_T(p)	\
	( FRIBIDI_MASK_TRANSPARENT == ( (p) &	\
		( FRIBIDI_MASK_TRANSPARENT | FRIBIDI_MASK_IGNORED ) ) )

/* iGnored */
#define FRIBIDI_IS_JOINING_TYPE_G(p)	\
	( FRIBIDI_MASK_IGNORED == ( (p) &	\
		( FRIBIDI_MASK_TRANSPARENT | FRIBIDI_MASK_IGNORED ) ) )

/* and for Derived Arabic Joining Classes (Table 8-3) */

/* Right join-Causing */
#define FRIBIDI_IS_JOINING_TYPE_RC(p)	\
	( FRIBIDI_MASK_JOINS_RIGHT == ( (p) &	\
		( FRIBIDI_MASK_TRANSPARENT | FRIBIDI_MASK_IGNORED	\
		| FRIBIDI_MASK_JOINS_RIGHT ) ) )

/* Left join-Causing */
#define FRIBIDI_IS_JOINING_TYPE_LC(p)	\
	( FRIBIDI_MASK_JOINS_LEFT == ( (p) &	\
		( FRIBIDI_MASK_TRANSPARENT | FRIBIDI_MASK_IGNORED	\
		| FRIBIDI_MASK_JOINS_LEFT ) ) )


/*
 * Defining macros for needed queries, It is fully dependent on the 
 * implementation of FriBidiJoiningType.
 */

/* Joins to right: R, D, C? */
#define FRIBIDI_JOINS_RIGHT(p)	((p) & FRIBIDI_MASK_JOINS_RIGHT)

/* Joins to left: L, D, C? */
#define FRIBIDI_JOINS_LEFT(p)	((p) & FRIBIDI_MASK_JOINS_LEFT)

/* May shape: R, D, L, T? */
#define FRIBIDI_ARAB_SHAPES(p)	((p) & FRIBIDI_MASK_ARAB_SHAPES)

/* Is skipped in joining: T, G? */
#define FRIBIDI_IS_JOIN_SKIPPED(p)	\
	((p) & (FRIBIDI_MASK_TRANSPARENT | FRIBIDI_MASK_IGNORED))

/* Is base that will be shaped: R, D, L? */
#define FRIBIDI_IS_JOIN_BASE_SHAPES(p)	\
	( FRIBIDI_MASK_ARAB_SHAPES == ( (p) &	\
		( FRIBIDI_MASK_TRANSPARENT | FRIBIDI_MASK_IGNORED	\
		| FRIBIDI_MASK_ARAB_SHAPES ) ) )

#define FRIBIDI_JOINS_PRECEDING_MASK(level)	\
	(FRIBIDI_LEVEL_IS_RTL (level) ? FRIBIDI_MASK_JOINS_RIGHT	\
				      : FRIBIDI_MASK_JOINS_LEFT)

#define FRIBIDI_JOINS_FOLLOWING_MASK(level)	\
	(FRIBIDI_LEVEL_IS_RTL (level) ? FRIBIDI_MASK_JOINS_LEFT	\
				      : FRIBIDI_MASK_JOINS_RIGHT)

#define FRIBIDI_JOIN_SHAPE(p)	\
	((p) & ( FRIBIDI_MASK_JOINS_RIGHT | FRIBIDI_MASK_JOINS_LEFT ))

/* Functions finally */


/* fribidi_get_joining_type - get character joining type
 *
 * This function returns the joining type of a character as defined in Table
 * 8-2 Primary Arabic Joining Classes of the Unicode standard available at
 * http://www.unicode.org/versions/Unicode4.0.0/ch08.pdf#G7462, using data
 * provided in file ArabicShaping.txt and UnicodeData.txt of the Unicode
 * Character Database available at
 * http://www.unicode.org/Public/UNIDATA/ArabicShaping.txt and
 * http://www.unicode.org/Public/UNIDATA/UnicodeData.txt. 
 *
 * There are a few macros defined in fribidi-joining-types.h for querying a
 * joining type.
 */
FRIBIDI_ENTRY FriBidiJoiningType
fribidi_get_joining_type (
  FriBidiChar ch		/* input character */
) FRIBIDI_GNUC_CONST;

/* fribidi_get_joining_types - get joining types for an string of characters
 *
 * This function finds the joining types of an string of characters.  See
 * fribidi_get_joining_type for more information about the joining types
 * returned by this function.
 */
     FRIBIDI_ENTRY void fribidi_get_joining_types (
  const FriBidiChar *str,	/* input string */
  const FriBidiStrIndex len,	/* input string length */
  FriBidiJoiningType *jtypes	/* output joining types */
);

/* fribidi_get_joining_type_name - get joining type name
 *
 * This function returns the joining type name of a joining type.  The
 * returned string is a static string and should not be freed.
 *
 * The type names are the same as ones defined in Table 8-2  Primary Arabic
 * Joining Classes of the Unicode standard available at
 * http://www.unicode.org/versions/Unicode4.0.0/ch08.pdf#G7462.
 */
     FRIBIDI_ENTRY const char *fribidi_get_joining_type_name (
  FriBidiJoiningType j		/* input joining type */
) FRIBIDI_GNUC_CONST;

#include "fribidi-enddecls.h"

#endif /* !_FRIBIDI_JOINING_TYPES_H */
/* Editor directions:
 * vim:textwidth=78:tabstop=8:shiftwidth=2:autoindent:cindent
 */
