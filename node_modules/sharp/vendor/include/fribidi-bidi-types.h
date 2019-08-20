/* FriBidi
 * fribidi-bidi-types.h - character bidi types
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
#ifndef _FRIBIDI_BIDI_TYPES_H
#define _FRIBIDI_BIDI_TYPES_H

#include "fribidi-common.h"

#include "fribidi-types.h"

#include "fribidi-begindecls.h"

typedef signed char FriBidiLevel;

/* 
 * Define bit masks that bidi types are based on, each mask has
 * only one bit set.
 */

/* RTL mask better be the least significant bit. */
#define FRIBIDI_MASK_RTL	0x00000001L	/* Is right to left */
#define FRIBIDI_MASK_ARABIC	0x00000002L	/* Is arabic */

/* Each char can be only one of the three following. */
#define FRIBIDI_MASK_STRONG	0x00000010L	/* Is strong */
#define FRIBIDI_MASK_WEAK	0x00000020L	/* Is weak */
#define FRIBIDI_MASK_NEUTRAL	0x00000040L	/* Is neutral */
#define FRIBIDI_MASK_SENTINEL	0x00000080L	/* Is sentinel */
/* Sentinels are not valid chars, just identify the start/end of strings. */

/* Each char can be only one of the six following. */
#define FRIBIDI_MASK_LETTER	0x00000100L	/* Is letter: L, R, AL */
#define FRIBIDI_MASK_NUMBER	0x00000200L	/* Is number: EN, AN */
#define FRIBIDI_MASK_NUMSEPTER	0x00000400L	/* Is separator or terminator: ES, ET, CS */
#define FRIBIDI_MASK_SPACE	0x00000800L	/* Is space: BN, BS, SS, WS */
#define FRIBIDI_MASK_EXPLICIT	0x00001000L	/* Is explicit mark: LRE, RLE, LRO, RLO, PDF */
#define FRIBIDI_MASK_ISOLATE	0x00008000L     /* Is isolate mark: LRI, RLI, FSI, PDI */

/* Can be set only if FRIBIDI_MASK_SPACE is also set. */
#define FRIBIDI_MASK_SEPARATOR	0x00002000L	/* Is text separator: BS, SS */
/* Can be set only if FRIBIDI_MASK_EXPLICIT is also set. */
#define FRIBIDI_MASK_OVERRIDE	0x00004000L	/* Is explicit override: LRO, RLO */
#define FRIBIDI_MASK_FIRST	0x02000000L     /* Whether direction is determined by first strong */


/* The following exist to make types pairwise different, some of them can
 * be removed but are here because of efficiency (make queries faster). */

#define FRIBIDI_MASK_ES		0x00010000L
#define FRIBIDI_MASK_ET		0x00020000L
#define FRIBIDI_MASK_CS		0x00040000L

#define FRIBIDI_MASK_NSM	0x00080000L
#define FRIBIDI_MASK_BN		0x00100000L

#define FRIBIDI_MASK_BS		0x00200000L
#define FRIBIDI_MASK_SS		0x00400000L
#define FRIBIDI_MASK_WS		0x00800000L

/* We reserve a single bit for user's private use: we will never use it. */
#define FRIBIDI_MASK_PRIVATE	0x01000000L


/*
 * Define values for FriBidiCharType
 */

/* Strong types */

/* Left-To-Right letter */
#define FRIBIDI_TYPE_LTR_VAL	( FRIBIDI_MASK_STRONG | FRIBIDI_MASK_LETTER )
/* Right-To-Left letter */
#define FRIBIDI_TYPE_RTL_VAL	( FRIBIDI_MASK_STRONG | FRIBIDI_MASK_LETTER \
				| FRIBIDI_MASK_RTL)
/* Arabic Letter */
#define FRIBIDI_TYPE_AL_VAL	( FRIBIDI_MASK_STRONG | FRIBIDI_MASK_LETTER \
				| FRIBIDI_MASK_RTL | FRIBIDI_MASK_ARABIC )
/* Left-to-Right Embedding */
#define FRIBIDI_TYPE_LRE_VAL	( FRIBIDI_MASK_STRONG | FRIBIDI_MASK_EXPLICIT)
/* Right-to-Left Embedding */
#define FRIBIDI_TYPE_RLE_VAL	( FRIBIDI_MASK_STRONG | FRIBIDI_MASK_EXPLICIT \
				| FRIBIDI_MASK_RTL )
/* Left-to-Right Override */
#define FRIBIDI_TYPE_LRO_VAL	( FRIBIDI_MASK_STRONG | FRIBIDI_MASK_EXPLICIT \
				| FRIBIDI_MASK_OVERRIDE )
/* Right-to-Left Override */
#define FRIBIDI_TYPE_RLO_VAL	( FRIBIDI_MASK_STRONG | FRIBIDI_MASK_EXPLICIT \
				| FRIBIDI_MASK_RTL | FRIBIDI_MASK_OVERRIDE )

/* Weak types */

/* Pop Directional Flag*/
#define FRIBIDI_TYPE_PDF_VAL	( FRIBIDI_MASK_WEAK | FRIBIDI_MASK_EXPLICIT )
/* European Numeral */
#define FRIBIDI_TYPE_EN_VAL	( FRIBIDI_MASK_WEAK | FRIBIDI_MASK_NUMBER )
/* Arabic Numeral */
#define FRIBIDI_TYPE_AN_VAL	( FRIBIDI_MASK_WEAK | FRIBIDI_MASK_NUMBER \
				| FRIBIDI_MASK_ARABIC )
/* European number Separator */
#define FRIBIDI_TYPE_ES_VAL	( FRIBIDI_MASK_WEAK | FRIBIDI_MASK_NUMSEPTER \
				| FRIBIDI_MASK_ES )
/* European number Terminator */
#define FRIBIDI_TYPE_ET_VAL	( FRIBIDI_MASK_WEAK | FRIBIDI_MASK_NUMSEPTER \
				| FRIBIDI_MASK_ET )
/* Common Separator */
#define FRIBIDI_TYPE_CS_VAL	( FRIBIDI_MASK_WEAK | FRIBIDI_MASK_NUMSEPTER \
				| FRIBIDI_MASK_CS )
/* Non Spacing Mark */
#define FRIBIDI_TYPE_NSM_VAL	( FRIBIDI_MASK_WEAK | FRIBIDI_MASK_NSM )
/* Boundary Neutral */
#define FRIBIDI_TYPE_BN_VAL	( FRIBIDI_MASK_WEAK | FRIBIDI_MASK_SPACE \
				| FRIBIDI_MASK_BN )

/* Neutral types */

/* Block Separator */
#define FRIBIDI_TYPE_BS_VAL	( FRIBIDI_MASK_NEUTRAL | FRIBIDI_MASK_SPACE \
				| FRIBIDI_MASK_SEPARATOR | FRIBIDI_MASK_BS )
/* Segment Separator */
#define FRIBIDI_TYPE_SS_VAL	( FRIBIDI_MASK_NEUTRAL | FRIBIDI_MASK_SPACE \
				| FRIBIDI_MASK_SEPARATOR | FRIBIDI_MASK_SS )
/* WhiteSpace */
#define FRIBIDI_TYPE_WS_VAL	( FRIBIDI_MASK_NEUTRAL | FRIBIDI_MASK_SPACE \
				| FRIBIDI_MASK_WS )
/* Other Neutral */
#define FRIBIDI_TYPE_ON_VAL	( FRIBIDI_MASK_NEUTRAL )


/* The following are used in specifying paragraph direction only. */

/* Weak Left-To-Right */
#define FRIBIDI_TYPE_WLTR_VAL	( FRIBIDI_MASK_WEAK )
/* Weak Right-To-Left */
#define FRIBIDI_TYPE_WRTL_VAL	( FRIBIDI_MASK_WEAK | FRIBIDI_MASK_RTL )

/* start or end of text (run list) SENTINEL.  Only used internally */
#define FRIBIDI_TYPE_SENTINEL	( FRIBIDI_MASK_SENTINEL )

/* Private types for applications.  More private types can be obtained by
 * summing up from this one. */
#define FRIBIDI_TYPE_PRIVATE	( FRIBIDI_MASK_PRIVATE )


/* New types in Unicode 6.3 */

/* Left-to-Right Isolate */
#define FRIBIDI_TYPE_LRI_VAL    ( FRIBIDI_MASK_NEUTRAL | FRIBIDI_MASK_ISOLATE )
/* Right-to-Left Isolate */
#define FRIBIDI_TYPE_RLI_VAL    ( FRIBIDI_MASK_NEUTRAL | FRIBIDI_MASK_ISOLATE | FRIBIDI_MASK_RTL )
/* First strong isolate */
#define FRIBIDI_TYPE_FSI_VAL    ( FRIBIDI_MASK_NEUTRAL | FRIBIDI_MASK_ISOLATE | FRIBIDI_MASK_FIRST )

/* Pop Directional Isolate*/
#define FRIBIDI_TYPE_PDI_VAL	( FRIBIDI_MASK_NEUTRAL | FRIBIDI_MASK_WEAK | FRIBIDI_MASK_ISOLATE )

/* Define Enums only if sizeof(int) == 4 (UTF-32), and not compiling C++.
 * The problem with C++ is that then casts between int32 and enum will fail!
 */
#if defined(__FRIBIDI_DOC) || (FRIBIDI_SIZEOF_INT+0 == 4 && !defined(__cplusplus))

typedef enum
{
# define _FRIBIDI_ADD_TYPE(TYPE,SYMBOL) \
	FRIBIDI_TYPE_##TYPE = FRIBIDI_TYPE_##TYPE##_VAL,
# include "fribidi-bidi-types-list.h"
# undef _FRIBIDI_ADD_TYPE
  _FRIBIDI_TYPE_SENTINEL = FRIBIDI_TYPE_SENTINEL	/* Don't use this */
} FriBidiCharType;

typedef enum
{
# define _FRIBIDI_PAR_TYPES
# define _FRIBIDI_ADD_TYPE(TYPE,SYMBOL) \
	FRIBIDI_PAR_##TYPE = FRIBIDI_TYPE_##TYPE##_VAL,
# include "fribidi-bidi-types-list.h"
# undef _FRIBIDI_ADD_TYPE
# undef _FRIBIDI_PAR_TYPES
  _FRIBIDI_PAR_SENTINEL = FRIBIDI_TYPE_SENTINEL	/* Don't use this */
} FriBidiParType;

#else

typedef uint32_t FriBidiCharType;
# define FRIBIDI_TYPE_LTR	FRIBIDI_TYPE_LTR_VAL
# define FRIBIDI_TYPE_RTL	FRIBIDI_TYPE_RTL_VAL
# define FRIBIDI_TYPE_AL	FRIBIDI_TYPE_AL_VAL
# define FRIBIDI_TYPE_EN	FRIBIDI_TYPE_EN_VAL
# define FRIBIDI_TYPE_AN	FRIBIDI_TYPE_AN_VAL
# define FRIBIDI_TYPE_ES	FRIBIDI_TYPE_ES_VAL
# define FRIBIDI_TYPE_ET	FRIBIDI_TYPE_ET_VAL
# define FRIBIDI_TYPE_CS	FRIBIDI_TYPE_CS_VAL
# define FRIBIDI_TYPE_NSM	FRIBIDI_TYPE_NSM_VAL
# define FRIBIDI_TYPE_BN	FRIBIDI_TYPE_BN_VAL
# define FRIBIDI_TYPE_BS	FRIBIDI_TYPE_BS_VAL
# define FRIBIDI_TYPE_SS	FRIBIDI_TYPE_SS_VAL
# define FRIBIDI_TYPE_WS	FRIBIDI_TYPE_WS_VAL
# define FRIBIDI_TYPE_ON	FRIBIDI_TYPE_ON_VAL
# define FRIBIDI_TYPE_LRE	FRIBIDI_TYPE_LRE_VAL
# define FRIBIDI_TYPE_RLE	FRIBIDI_TYPE_RLE_VAL
# define FRIBIDI_TYPE_LRO	FRIBIDI_TYPE_LRO_VAL
# define FRIBIDI_TYPE_RLO	FRIBIDI_TYPE_RLO_VAL
# define FRIBIDI_TYPE_PDF	FRIBIDI_TYPE_PDF_VAL
# define FRIBIDI_TYPE_LRI	FRIBIDI_TYPE_PDF_LRI
# define FRIBIDI_TYPE_RLI	FRIBIDI_TYPE_PDF_RLI
# define FRIBIDI_TYPE_FSI	FRIBIDI_TYPE_PDF_FSI
# define FRIBIDI_TYPE_PDI	FRIBIDI_TYPE_PDF_PDI

typedef uint32_t FriBidiParType;
# define FRIBIDI_PAR_LTR	FRIBIDI_TYPE_LTR_VAL
# define FRIBIDI_PAR_RTL	FRIBIDI_TYPE_RTL_VAL
# define FRIBIDI_PAR_ON		FRIBIDI_TYPE_ON_VAL
# define FRIBIDI_PAR_WLTR	FRIBIDI_TYPE_WLTR_VAL
# define FRIBIDI_PAR_WRTL	FRIBIDI_TYPE_WRTL_VAL

#endif

/* Please don't use these two type names, use FRIBIDI_PAR_* form instead. */
#define FRIBIDI_TYPE_WLTR	FRIBIDI_PAR_WLTR
#define FRIBIDI_TYPE_WRTL	FRIBIDI_PAR_WRTL


/*
 * Defining macros for needed queries, It is fully dependent on the 
 * implementation of FriBidiCharType.
 */


/* Is right-to-left level? */
#define FRIBIDI_LEVEL_IS_RTL(lev) ((lev) & 1)

/* Return the bidi type corresponding to the direction of the level number,
   FRIBIDI_TYPE_LTR for evens and FRIBIDI_TYPE_RTL for odds. */
#define FRIBIDI_LEVEL_TO_DIR(lev)	\
	(FRIBIDI_LEVEL_IS_RTL (lev) ? FRIBIDI_TYPE_RTL : FRIBIDI_TYPE_LTR)

/* Return the minimum level of the direction, 0 for FRIBIDI_TYPE_LTR and
   1 for FRIBIDI_TYPE_RTL and FRIBIDI_TYPE_AL. */
#define FRIBIDI_DIR_TO_LEVEL(dir)	\
	((FriBidiLevel) (FRIBIDI_IS_RTL (dir) ? 1 : 0))

/* Is right to left: RTL, AL, RLE, RLO? */
#define FRIBIDI_IS_RTL(p)      ((p) & FRIBIDI_MASK_RTL)
/* Is arabic: AL, AN? */
#define FRIBIDI_IS_ARABIC(p)   ((p) & FRIBIDI_MASK_ARABIC)

/* Is strong? */
#define FRIBIDI_IS_STRONG(p)   ((p) & FRIBIDI_MASK_STRONG)
/* Is weak? */
#define FRIBIDI_IS_WEAK(p)     ((p) & FRIBIDI_MASK_WEAK)
/* Is neutral? */
#define FRIBIDI_IS_NEUTRAL(p)  ((p) & FRIBIDI_MASK_NEUTRAL)
/* Is sentinel? */
#define FRIBIDI_IS_SENTINEL(p) ((p) & FRIBIDI_MASK_SENTINEL)

/* Is letter: L, R, AL? */
#define FRIBIDI_IS_LETTER(p)   ((p) & FRIBIDI_MASK_LETTER)
/* Is number: EN, AN? */
#define FRIBIDI_IS_NUMBER(p)   ((p) & FRIBIDI_MASK_NUMBER)
/* Is number separator or terminator: ES, ET, CS? */
#define FRIBIDI_IS_NUMBER_SEPARATOR_OR_TERMINATOR(p) \
	((p) & FRIBIDI_MASK_NUMSEPTER)
/* Is space: BN, BS, SS, WS? */
#define FRIBIDI_IS_SPACE(p)    ((p) & FRIBIDI_MASK_SPACE)
/* Is explicit mark: LRE, RLE, LRO, RLO, PDF? */
#define FRIBIDI_IS_EXPLICIT(p) ((p) & FRIBIDI_MASK_EXPLICIT)
/* Is isolator */
#define FRIBIDI_IS_ISOLATE(p)    ((p) & FRIBIDI_MASK_ISOLATE)

/* Is text separator: BS, SS? */
#define FRIBIDI_IS_SEPARATOR(p) ((p) & FRIBIDI_MASK_SEPARATOR)

/* Is explicit override: LRO, RLO? */
#define FRIBIDI_IS_OVERRIDE(p) ((p) & FRIBIDI_MASK_OVERRIDE)

/* Some more: */

/* Is left to right letter: LTR? */
#define FRIBIDI_IS_LTR_LETTER(p) \
	((p) & (FRIBIDI_MASK_LETTER | FRIBIDI_MASK_RTL) == FRIBIDI_MASK_LETTER)

/* Is right to left letter: RTL, AL? */
#define FRIBIDI_IS_RTL_LETTER(p) \
	((p) & (FRIBIDI_MASK_LETTER | FRIBIDI_MASK_RTL) \
	== (FRIBIDI_MASK_LETTER | FRIBIDI_MASK_RTL))

/* Is ES or CS: ES, CS? */
#define FRIBIDI_IS_ES_OR_CS(p) \
	((p) & (FRIBIDI_MASK_ES | FRIBIDI_MASK_CS))

/* Is explicit or BN: LRE, RLE, LRO, RLO, PDF, BN? */
#define FRIBIDI_IS_EXPLICIT_OR_BN(p) \
	((p) & (FRIBIDI_MASK_EXPLICIT | FRIBIDI_MASK_BN))

/* Is explicit or BN or NSM: LRE, RLE, LRO, RLO, PDF, BN, NSM? */
#define FRIBIDI_IS_EXPLICIT_OR_BN_OR_NSM(p) \
	((p) & (FRIBIDI_MASK_EXPLICIT | FRIBIDI_MASK_BN | FRIBIDI_MASK_NSM))

/* Is explicit or BN or NSM: LRE, RLE, LRO, RLO, PDF, BN, NSM? */
#define FRIBIDI_IS_EXPLICIT_OR_ISOLATE_OR_BN_OR_NSM(p) \
	((p) & (FRIBIDI_MASK_EXPLICIT | FRIBIDI_MASK_ISOLATE | FRIBIDI_MASK_BN | FRIBIDI_MASK_NSM))

/* Is explicit or BN or WS: LRE, RLE, LRO, RLO, PDF, BN, WS? */
#define FRIBIDI_IS_EXPLICIT_OR_BN_OR_WS(p) \
	((p) & (FRIBIDI_MASK_EXPLICIT | FRIBIDI_MASK_BN | FRIBIDI_MASK_WS))

/* Is explicit or separator or BN or WS: LRE, RLE, LRO, RLO, PDF, BS, SS, BN, WS? */
#define FRIBIDI_IS_EXPLICIT_OR_SEPARATOR_OR_BN_OR_WS(p) \
	((p) & (FRIBIDI_MASK_EXPLICIT | FRIBIDI_MASK_SEPARATOR \
		| FRIBIDI_MASK_BN | FRIBIDI_MASK_WS))

/* Is private-use type for application? */
#define FRIBIDI_IS_PRIVATE(p) ((p) & FRIBIDI_MASK_PRIVATE)

/* Define some conversions. */

/* Change numbers to RTL: EN,AN -> RTL. */
#define FRIBIDI_CHANGE_NUMBER_TO_RTL(p) \
	(FRIBIDI_IS_NUMBER(p) ? FRIBIDI_TYPE_RTL : (p))

/* Override status of an explicit mark:
 * LRO,LRE->LTR, RLO,RLE->RTL, otherwise->ON. */
#define FRIBIDI_EXPLICIT_TO_OVERRIDE_DIR(p) \
	(FRIBIDI_IS_OVERRIDE(p) ? FRIBIDI_LEVEL_TO_DIR(FRIBIDI_DIR_TO_LEVEL(p)) \
				: FRIBIDI_TYPE_ON)

/* Weaken type for paragraph fallback purposes:
 * LTR->WLTR, RTL->WRTL. */
#define FRIBIDI_WEAK_PARAGRAPH(p) (FRIBIDI_PAR_WLTR | ((p) & FRIBIDI_MASK_RTL))


/* Functions finally */


/* fribidi_get_bidi_type - get character bidi type
 *
 * This function returns the bidi type of a character as defined in Table 3.7
 * Bidirectional Character Types of the Unicode Bidirectional Algorithm
 * available at
 * http://www.unicode.org/reports/tr9/#Bidirectional_Character_Types, using
 * data provided in file UnicodeData.txt of the Unicode Character Database
 * available at http://www.unicode.org/Public/UNIDATA/UnicodeData.txt.
 *
 * There are a few macros defined in fribidi-bidi-types.h for querying a bidi
 * type.
 */
FRIBIDI_ENTRY FriBidiCharType
fribidi_get_bidi_type (
  FriBidiChar ch		/* input character */
) FRIBIDI_GNUC_CONST;

/* fribidi_get_bidi_types - get bidi types for an string of characters
 *
 * This function finds the bidi types of an string of characters.  See
 * fribidi_get_bidi_type() for more information about the bidi types returned
 * by this function.
 */
     FRIBIDI_ENTRY void fribidi_get_bidi_types (
  const FriBidiChar *str,	/* input string */
  const FriBidiStrIndex len,	/* input string length */
  FriBidiCharType *btypes	/* output bidi types */
);

/* fribidi_get_bidi_type_name - get bidi type name
 *
 * This function returns the bidi type name of a character type.  The
 * returned string is a static string and should not be freed.
 *
 * The type names are the same as ones defined in Table 3.7 Bidirectional
 * Character Types of the Unicode Bidirectional Algorithm available at
 * http://www.unicode.org/reports/tr9/#Bidirectional_Character_Types, with a
 * few modifications: L->LTR, R->RTL, B->BS, S->SS.
 */
     FRIBIDI_ENTRY const char *fribidi_get_bidi_type_name (
  FriBidiCharType t		/* input bidi type */
) FRIBIDI_GNUC_CONST;

#include "fribidi-enddecls.h"

#endif /* !_FRIBIDI_BIDI_TYPES_H */
/* Editor directions:
 * vim:textwidth=78:tabstop=8:shiftwidth=2:autoindent:cindent
 */
