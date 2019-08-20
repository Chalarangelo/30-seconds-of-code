/*
 * Copyright © 2009  Red Hat, Inc.
 * Copyright © 2015  Google, Inc.
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
 * Red Hat Author(s): Behdad Esfahbod
 * Google Author(s): Behdad Esfahbod
 */

#ifndef HB_FT_H
#define HB_FT_H

#include "hb.h"

#include <ft2build.h>
#include FT_FREETYPE_H

HB_BEGIN_DECLS

/*
 * Note: FreeType is not thread-safe.
 * Hence, these functions are not either.
 */

/*
 * hb-face from ft-face.
 */

/* This one creates a new hb-face for given ft-face.
 * When the returned hb-face is destroyed, the destroy
 * callback is called (if not NULL), with the ft-face passed
 * to it.
 *
 * The client is responsible to make sure that ft-face is
 * destroyed after hb-face is destroyed.
 *
 * Most often you don't want this function.  You should use either
 * hb_ft_face_create_cached(), or hb_ft_face_create_referenced().
 * In particular, if you are going to pass NULL as destroy, you
 * probably should use (the more recent) hb_ft_face_create_referenced()
 * instead.
 */
HB_EXTERN hb_face_t *
hb_ft_face_create (FT_Face           ft_face,
		   hb_destroy_func_t destroy);

/* This version is like hb_ft_face_create(), except that it caches
 * the hb-face using the generic pointer of the ft-face.  This means
 * that subsequent calls to this function with the same ft-face will
 * return the same hb-face (correctly referenced).
 *
 * Client is still responsible for making sure that ft-face is destroyed
 * after hb-face is.
 */
HB_EXTERN hb_face_t *
hb_ft_face_create_cached (FT_Face ft_face);

/* This version is like hb_ft_face_create(), except that it calls
 * FT_Reference_Face() on ft-face, as such keeping ft-face alive
 * as long as the hb-face is.
 *
 * This is the most convenient version to use.  Use it unless you have
 * very good reasons not to.
 */
HB_EXTERN hb_face_t *
hb_ft_face_create_referenced (FT_Face ft_face);


/*
 * hb-font from ft-face.
 */

/*
 * Note:
 *
 * Set face size on ft-face before creating hb-font from it.
 * Otherwise hb-ft would NOT pick up the font size correctly.
 */

/* See notes on hb_ft_face_create().  Same issues re lifecycle-management
 * apply here.  Use hb_ft_font_create_referenced() if you can. */
HB_EXTERN hb_font_t *
hb_ft_font_create (FT_Face           ft_face,
		   hb_destroy_func_t destroy);

/* See notes on hb_ft_face_create_referenced() re lifecycle-management
 * issues. */
HB_EXTERN hb_font_t *
hb_ft_font_create_referenced (FT_Face ft_face);

HB_EXTERN FT_Face
hb_ft_font_get_face (hb_font_t *font);

HB_EXTERN void
hb_ft_font_set_load_flags (hb_font_t *font, int load_flags);

HB_EXTERN int
hb_ft_font_get_load_flags (hb_font_t *font);

/* Call when size or variations settings on underlying FT_Face change. */
HB_EXTERN void
hb_ft_font_changed (hb_font_t *font);

/* Makes an hb_font_t use FreeType internally to implement font functions.
 * Note: this internally creates an FT_Face.  Use it when you create your
 * hb_face_t using hb_face_create(). */
HB_EXTERN void
hb_ft_font_set_funcs (hb_font_t *font);


HB_END_DECLS

#endif /* HB_FT_H */
