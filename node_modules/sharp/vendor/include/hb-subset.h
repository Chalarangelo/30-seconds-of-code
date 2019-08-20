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
 * Google Author(s): Rod Sheeter
 */

#ifndef HB_SUBSET_H
#define HB_SUBSET_H

#include "hb.h"

HB_BEGIN_DECLS

/*
 * hb_subset_input_t
 *
 * Things that change based on the input. Characters to keep, etc.
 */

typedef struct hb_subset_input_t hb_subset_input_t;

HB_EXTERN hb_subset_input_t *
hb_subset_input_create_or_fail (void);

HB_EXTERN hb_subset_input_t *
hb_subset_input_reference (hb_subset_input_t *subset_input);

HB_EXTERN void
hb_subset_input_destroy (hb_subset_input_t *subset_input);

HB_EXTERN hb_set_t *
hb_subset_input_unicode_set (hb_subset_input_t *subset_input);

HB_EXTERN hb_set_t *
hb_subset_input_glyph_set (hb_subset_input_t *subset_input);

HB_EXTERN void
hb_subset_input_set_drop_hints (hb_subset_input_t *subset_input,
				hb_bool_t drop_hints);
HB_EXTERN hb_bool_t
hb_subset_input_get_drop_hints (hb_subset_input_t *subset_input);

HB_EXTERN void
hb_subset_input_set_drop_layout (hb_subset_input_t *subset_input,
				 hb_bool_t drop_layout);
HB_EXTERN hb_bool_t
hb_subset_input_get_drop_layout (hb_subset_input_t *subset_input);

HB_EXTERN void
hb_subset_input_set_desubroutinize (hb_subset_input_t *subset_input,
        hb_bool_t desubroutinize);
HB_EXTERN hb_bool_t
hb_subset_input_get_desubroutinize (hb_subset_input_t *subset_input);

/* hb_subset () */
HB_EXTERN hb_face_t *
hb_subset (hb_face_t *source, hb_subset_input_t *input);


HB_END_DECLS

#endif /* HB_SUBSET_H */
