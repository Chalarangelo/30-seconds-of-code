/* -*- Mode: C; indent-tabs-mode:nil; c-basic-offset: 8-*- */

/*
 * This file is part of The Croco Library
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of version 2.1 of 
 * the GNU Lesser General Public
 * License as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the 
 * GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
 * USA
 *
 * Author: Dodji Seketeli
 * See COPYRIGHTS file for copyright information.
 */

#ifndef __CR_FONTS_H__
#define __CR_FONTS_H__

#include "cr-utils.h"
#include "cr-num.h"

/**
 *@file
 *Various type declarations about font selection related
 *properties.
 */
G_BEGIN_DECLS


enum CRFontFamilyType
{
	FONT_FAMILY_SANS_SERIF,
	FONT_FAMILY_SERIF,	
	FONT_FAMILY_CURSIVE,
	FONT_FAMILY_FANTASY,
	FONT_FAMILY_MONOSPACE,
	FONT_FAMILY_NON_GENERIC,
	FONT_FAMILY_INHERIT,
	/**/
	NB_FONT_FAMILIE_TYPES
} ;

typedef struct _CRFontFamily CRFontFamily ;

struct _CRFontFamily
{
	enum CRFontFamilyType type ;

	/*
	 *The name of the font family, in case
	 *it is non generic.
	 *Is set only if the type is FONT_FAMILY_NON_GENERIC.
	 */
	guchar *name ;

	CRFontFamily *next ;
	CRFontFamily *prev ;
} ;


/**
 *The different types
 *of absolute font size.
 *This is used by the 'font-size'
 *property defined in css2 spec
 *in chapter 15.2.4 .
 *These values a indexes of 
 *table of size so please, do not
 *change their definition order unless
 *you know what you are doing.
 */
enum CRPredefinedAbsoluteFontSize
{
        FONT_SIZE_XX_SMALL=0,
        FONT_SIZE_X_SMALL,
        FONT_SIZE_SMALL,
        FONT_SIZE_MEDIUM,
        FONT_SIZE_LARGE,
        FONT_SIZE_X_LARGE,
        FONT_SIZE_XX_LARGE,
	FONT_SIZE_INHERIT,
        NB_PREDEFINED_ABSOLUTE_FONT_SIZES
} ;

/**
 *The different types
 *of relative font size.
 *This is used by the 'font-size'
 *property defined in css2 spec
 *in chapter 15.2.4 .
 *These values a indexes of 
 *table of size so please, do not
 *change their definition order unless
 *you know what you are doing.
 */
enum CRRelativeFontSize
{        
        FONT_SIZE_LARGER,
        FONT_SIZE_SMALLER,
        NB_RELATIVE_FONT_SIZE
} ;

/**
 *The type of font-size property.
 *Used to define the type of #CRFontSize .
 *See css2 spec chapter 15.2.4 to understand.
 */
enum CRFontSizeType {
        /**
         *If the type of #CRFontSize is
         *PREDEFINED_ABSOLUTE_FONT_SIZE,
         *the CRFontSize::value.predefined_absolute 
         *field will be defined.
         */
        PREDEFINED_ABSOLUTE_FONT_SIZE,
        
        /**
         *If the type of #CRFontSize is
         *ABSOLUTE_FONT_SIZE,
         *the CRFontSize::value.absolute 
         *field will be defined.
         */
        ABSOLUTE_FONT_SIZE,

        /**
         *If the type of #CRFontSize is
         *RELATIVE_FONT_SIZE,
         *the CRFontSize::value.relative
         *field will be defined.
         */
        RELATIVE_FONT_SIZE,

        /**
         *If the type of #CRFontSize is
         *INHERITED_FONT_SIZE,
         *the None of the field of the CRFontSize::value enum
         *will be defined.
         */
        INHERITED_FONT_SIZE,

        NB_FONT_SIZE_TYPE
} ;

typedef struct _CRFontSize CRFontSize ;
struct _CRFontSize {
        enum CRFontSizeType type ;
        union  {
                enum CRPredefinedAbsoluteFontSize predefined ;
                enum CRRelativeFontSize relative ;
                CRNum absolute ;
        } value;
} ;

enum CRFontSizeAdjustType
{
        FONT_SIZE_ADJUST_NONE = 0,
        FONT_SIZE_ADJUST_NUMBER,
        FONT_SIZE_ADJUST_INHERIT
} ;
typedef struct _CRFontSizeAdjust CRFontSizeAdjust ;
struct _CRFontSizeAdjust
{
        enum CRFontSizeAdjustType type ;
        CRNum *num ;
} ;

enum CRFontStyle
{
        FONT_STYLE_NORMAL=0,
        FONT_STYLE_ITALIC,
        FONT_STYLE_OBLIQUE,
        FONT_STYLE_INHERIT
} ;

enum CRFontVariant
{
        FONT_VARIANT_NORMAL=0,
        FONT_VARIANT_SMALL_CAPS,
        FONT_VARIANT_INHERIT
} ;

enum CRFontWeight
{
        FONT_WEIGHT_NORMAL = 1,
        FONT_WEIGHT_BOLD = 1<<1,
        FONT_WEIGHT_BOLDER = 1<<2,
        FONT_WEIGHT_LIGHTER = 1<<3,
        FONT_WEIGHT_100 = 1<<4,
        FONT_WEIGHT_200 = 1<<5,
        FONT_WEIGHT_300 = 1<<6,
        FONT_WEIGHT_400 = 1<<7,
        FONT_WEIGHT_500 = 1<<8,
        FONT_WEIGHT_600 = 1<<9,
        FONT_WEIGHT_700 = 1<<10,
        FONT_WEIGHT_800 = 1<<11,
        FONT_WEIGHT_900 = 1<<12,
        FONT_WEIGHT_INHERIT = 1<<13,
        NB_FONT_WEIGHTS
} ;

enum CRFontStretch
{
        FONT_STRETCH_NORMAL=0,
        FONT_STRETCH_WIDER,
        FONT_STRETCH_NARROWER,
        FONT_STRETCH_ULTRA_CONDENSED,
        FONT_STRETCH_EXTRA_CONDENSED,
        FONT_STRETCH_CONDENSED,
        FONT_STRETCH_SEMI_CONDENSED,
        FONT_STRETCH_SEMI_EXPANDED,
        FONT_STRETCH_EXPANDED,
        FONT_STRETCH_EXTRA_EXPANDED,
        FONT_STRETCH_ULTRA_EXPANDED,
        FONT_STRETCH_INHERIT
} ;

/**************************************
 *'font-family' manipulation functions
 ***************************************/
CRFontFamily *
cr_font_family_new (enum CRFontFamilyType a_type, guchar *a_name) ;

CRFontFamily *
cr_font_family_append (CRFontFamily *a_this, 
		       CRFontFamily *a_family_to_append) ;

guchar *
cr_font_family_to_string (CRFontFamily const *a_this,
                          gboolean a_walk_font_family_list) ;

CRFontFamily *
cr_font_family_prepend (CRFontFamily *a_this, 
			CRFontFamily *a_family_to_prepend);

enum CRStatus
cr_font_family_destroy (CRFontFamily *a_this) ;

enum CRStatus
cr_font_family_set_name (CRFontFamily *a_this, guchar *a_name) ;


/************************************
 *'font-size' manipulation functions
 ***********************************/

CRFontSize * cr_font_size_new (void) ;

enum CRStatus cr_font_size_clear (CRFontSize *a_this) ;

enum CRStatus cr_font_size_copy (CRFontSize *a_dst, 
                                 CRFontSize const *a_src) ;
enum CRStatus cr_font_size_set_predefined_absolute_font_size (CRFontSize *a_this, 
                                                              enum CRPredefinedAbsoluteFontSize a_predefined) ;
enum CRStatus cr_font_size_set_relative_font_size (CRFontSize *a_this,
                                                   enum CRRelativeFontSize a_relative) ;

enum CRStatus cr_font_size_set_absolute_font_size (CRFontSize *a_this,
                                                   enum CRNumType a_num_type,
                                                   gdouble a_value) ;

enum CRStatus cr_font_size_set_to_inherit (CRFontSize *a_this) ;

gboolean cr_font_size_is_set_to_inherit (CRFontSize const *a_this) ;

gchar* cr_font_size_to_string (CRFontSize const *a_this) ;

void cr_font_size_destroy (CRFontSize *a_font_size) ;

/*******************************************************
 *'font-size-adjust' manipulation function declarations
 *******************************************************/

CRFontSizeAdjust * cr_font_size_adjust_new (void) ;

gchar * cr_font_size_adjust_to_string (CRFontSizeAdjust const *a_this) ;

void cr_font_size_adjust_destroy (CRFontSizeAdjust *a_this) ;

void 
cr_font_size_get_smaller_predefined_font_size (enum CRPredefinedAbsoluteFontSize a_font_size,
                                               enum CRPredefinedAbsoluteFontSize *a_smaller_size) ;
void
cr_font_size_get_larger_predefined_font_size (enum CRPredefinedAbsoluteFontSize a_font_size,
                                              enum CRPredefinedAbsoluteFontSize *a_larger_size) ;

gboolean
cr_font_size_is_predefined_absolute_font_size (enum CRPredefinedAbsoluteFontSize a_font_size) ;

/***********************************
 *various other font related functions
 ***********************************/
const gchar * cr_font_style_to_string (enum CRFontStyle a_code) ;

const gchar * cr_font_weight_to_string (enum CRFontWeight a_code)  ;

enum CRFontWeight
cr_font_weight_get_bolder (enum CRFontWeight a_weight) ;

const gchar * cr_font_variant_to_string (enum CRFontVariant a_code) ;

const gchar * cr_font_stretch_to_string (enum CRFontStretch a_code) ;

G_END_DECLS

#endif
