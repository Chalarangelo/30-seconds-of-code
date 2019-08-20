/*
 * Copyright © 2018  Google, Inc.
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
 *
 * Google Author(s): Behdad Esfahbod
 */

#ifndef HB_OT_H_IN
#error "Include <hb-ot.h> instead."
#endif

#ifndef HB_OT_DEPRECATED_H
#define HB_OT_DEPRECATED_H

#include "hb.h"
#include "hb-ot-name.h"


HB_BEGIN_DECLS

#ifndef HB_DISABLE_DEPRECATED


/* Like hb_ot_layout_table_find_script, but takes zero-terminated array of scripts to test */
HB_EXTERN HB_DEPRECATED_FOR (hb_ot_layout_table_select_script) hb_bool_t
hb_ot_layout_table_choose_script (hb_face_t      *face,
				  hb_tag_t        table_tag,
				  const hb_tag_t *script_tags,
				  unsigned int   *script_index,
				  hb_tag_t       *chosen_script);

HB_EXTERN HB_DEPRECATED_FOR (hb_ot_layout_script_select_language) hb_bool_t
hb_ot_layout_script_find_language (hb_face_t    *face,
				   hb_tag_t      table_tag,
				   unsigned int  script_index,
				   hb_tag_t      language_tag,
				   unsigned int *language_index);

HB_EXTERN HB_DEPRECATED_FOR (hb_ot_tags_from_script_and_language) void
hb_ot_tags_from_script (hb_script_t  script,
			hb_tag_t    *script_tag_1,
			hb_tag_t    *script_tag_2);

HB_EXTERN HB_DEPRECATED_FOR (hb_ot_tags_from_script_and_language) hb_tag_t
hb_ot_tag_from_language (hb_language_t language);


/**
 * HB_OT_VAR_NO_AXIS_INDEX:
 *
 * Since: 1.4.2
 * Deprecated: 2.2.0
 */
#define HB_OT_VAR_NO_AXIS_INDEX		0xFFFFFFFFu

/**
 * hb_ot_var_axis_t:
 *
 * Since: 1.4.2
 * Deprecated: 2.2.0
 */
typedef struct hb_ot_var_axis_t
{
  hb_tag_t tag;
  hb_ot_name_id_t name_id;
  float min_value;
  float default_value;
  float max_value;
} hb_ot_var_axis_t;

HB_EXTERN HB_DEPRECATED_FOR (hb_ot_var_get_axis_infos) unsigned int
hb_ot_var_get_axes (hb_face_t        *face,
		    unsigned int      start_offset,
		    unsigned int     *axes_count /* IN/OUT */,
		    hb_ot_var_axis_t *axes_array /* OUT */);

HB_EXTERN HB_DEPRECATED_FOR (hb_ot_var_find_axis_info) hb_bool_t
hb_ot_var_find_axis (hb_face_t        *face,
		     hb_tag_t          axis_tag,
		     unsigned int     *axis_index,
		     hb_ot_var_axis_t *axis_info);


#endif

HB_END_DECLS

#endif /* HB_OT_DEPRECATED_H */
