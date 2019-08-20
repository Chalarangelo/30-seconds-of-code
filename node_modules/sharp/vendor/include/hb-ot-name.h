/*
 * Copyright © 2018  Ebrahim Byagowi.
 *
 *  This is part of HarfBuzz, a text shaping library.
 *
 * Permission is hereby granted, without written agreement and without
 * license or royalty fees, to use, copy, modify, and distribute this
 * software and its documentation for any purpose, provided that the
 * above copyright notice and the following two paragraphs appear in
 * all copies of this software.
 *
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE TO ANY PARTY FOR
 * DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES
 * ARISING OUT OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN
 * IF THE COPYRIGHT HOLDER HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
 * DAMAGE.
 *
 * THE COPYRIGHT HOLDER SPECIFICALLY DISCLAIMS ANY WARRANTIES, INCLUDING,
 * BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE.  THE SOFTWARE PROVIDED HEREUNDER IS
 * ON AN "AS IS" BASIS, AND THE COPYRIGHT HOLDER HAS NO OBLIGATION TO
 * PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS, OR MODIFICATIONS.
 */

#ifndef HB_OT_H_IN
#error "Include <hb-ot.h> instead."
#endif

#ifndef HB_OT_NAME_H
#define HB_OT_NAME_H

#include "hb.h"

HB_BEGIN_DECLS


/**
 * hb_ot_name_id_t:
 * @HB_OT_NAME_ID_INVALID: Value to represent a nonexistent name ID.
 *
 * An integral type representing an OpenType 'name' table name identifier.
 * There are predefined name IDs, as well as name IDs return from other
 * API.  These can be used to fetch name strings from a font face.
 *
 * Since: 2.0.0
 **/
enum
{
  HB_OT_NAME_ID_COPYRIGHT		= 0,
  HB_OT_NAME_ID_FONT_FAMILY		= 1,
  HB_OT_NAME_ID_FONT_SUBFAMILY		= 2,
  HB_OT_NAME_ID_UNIQUE_ID		= 3,
  HB_OT_NAME_ID_FULL_NAME		= 4,
  HB_OT_NAME_ID_VERSION_STRING		= 5,
  HB_OT_NAME_ID_POSTSCRIPT_NAME		= 6,
  HB_OT_NAME_ID_TRADEMARK		= 7,
  HB_OT_NAME_ID_MANUFACTURER		= 8,
  HB_OT_NAME_ID_DESIGNER		= 9,
  HB_OT_NAME_ID_DESCRIPTION		= 10,
  HB_OT_NAME_ID_VENDOR_URL		= 11,
  HB_OT_NAME_ID_DESIGNER_URL		= 12,
  HB_OT_NAME_ID_LICENSE			= 13,
  HB_OT_NAME_ID_LICENSE_URL		= 14,
/*HB_OT_NAME_ID_RESERVED		= 15,*/
  HB_OT_NAME_ID_TYPOGRAPHIC_FAMILY	= 16,
  HB_OT_NAME_ID_TYPOGRAPHIC_SUBFAMILY	= 17,
  HB_OT_NAME_ID_MAC_FULL_NAME		= 18,
  HB_OT_NAME_ID_SAMPLE_TEXT		= 19,
  HB_OT_NAME_ID_CID_FINDFONT_NAME	= 20,
  HB_OT_NAME_ID_WWS_FAMILY		= 21,
  HB_OT_NAME_ID_WWS_SUBFAMILY		= 22,
  HB_OT_NAME_ID_LIGHT_BACKGROUND	= 23,
  HB_OT_NAME_ID_DARK_BACKGROUND		= 24,
  HB_OT_NAME_ID_VARIATIONS_PS_PREFIX	= 25,

  HB_OT_NAME_ID_INVALID			= 0xFFFF
};

typedef unsigned int hb_ot_name_id_t;


/**
 * hb_ot_name_entry_t:
 * @name_id: name ID
 * @language: language
 *
 * Structure representing a name ID in a particular language.
 *
 * Since: 2.1.0
 **/
typedef struct hb_ot_name_entry_t
{
  hb_ot_name_id_t name_id;
  /*< private >*/
  hb_var_int_t    var;
  /*< public >*/
  hb_language_t   language;
} hb_ot_name_entry_t;

HB_EXTERN const hb_ot_name_entry_t *
hb_ot_name_list_names (hb_face_t    *face,
		       unsigned int *num_entries /* OUT */);


HB_EXTERN unsigned int
hb_ot_name_get_utf8 (hb_face_t       *face,
		     hb_ot_name_id_t  name_id,
		     hb_language_t    language,
		     unsigned int    *text_size /* IN/OUT */,
		     char            *text      /* OUT */);

HB_EXTERN unsigned int
hb_ot_name_get_utf16 (hb_face_t       *face,
		      hb_ot_name_id_t  name_id,
		      hb_language_t    language,
		      unsigned int    *text_size /* IN/OUT */,
		      uint16_t        *text      /* OUT */);

HB_EXTERN unsigned int
hb_ot_name_get_utf32 (hb_face_t       *face,
		      hb_ot_name_id_t  name_id,
		      hb_language_t    language,
		      unsigned int    *text_size /* IN/OUT */,
		      uint32_t        *text      /* OUT */);


HB_END_DECLS

#endif /* HB_OT_NAME_H */
