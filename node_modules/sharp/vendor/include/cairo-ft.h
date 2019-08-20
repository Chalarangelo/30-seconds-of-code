/* cairo - a vector graphics library with display and print output
 *
 * Copyright © 2005 Red Hat, Inc
 *
 * This library is free software; you can redistribute it and/or
 * modify it either under the terms of the GNU Lesser General Public
 * License version 2.1 as published by the Free Software Foundation
 * (the "LGPL") or, at your option, under the terms of the Mozilla
 * Public License Version 1.1 (the "MPL"). If you do not alter this
 * notice, a recipient may use your version of this file under either
 * the MPL or the LGPL.
 *
 * You should have received a copy of the LGPL along with this library
 * in the file COPYING-LGPL-2.1; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Suite 500, Boston, MA 02110-1335, USA
 * You should have received a copy of the MPL along with this library
 * in the file COPYING-MPL-1.1
 *
 * The contents of this file are subject to the Mozilla Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * This software is distributed on an "AS IS" basis, WITHOUT WARRANTY
 * OF ANY KIND, either express or implied. See the LGPL or the MPL for
 * the specific language governing rights and limitations.
 *
 * The Original Code is the cairo graphics library.
 *
 * The Initial Developer of the Original Code is Red Hat, Inc.
 *
 * Contributor(s):
 *      Graydon Hoare <graydon@redhat.com>
 *	Owen Taylor <otaylor@redhat.com>
 */

#ifndef CAIRO_FT_H
#define CAIRO_FT_H

#include "cairo.h"

#if CAIRO_HAS_FT_FONT

/* Fontconfig/Freetype platform-specific font interface */

#include <ft2build.h>
#include FT_FREETYPE_H

#if CAIRO_HAS_FC_FONT
#include <fontconfig/fontconfig.h>
#endif

CAIRO_BEGIN_DECLS

cairo_public cairo_font_face_t *
cairo_ft_font_face_create_for_ft_face (FT_Face         face,
				       int             load_flags);

/**
 * cairo_ft_synthesize_t:
 * @CAIRO_FT_SYNTHESIZE_BOLD: Embolden the glyphs (redraw with a pixel offset)
 * @CAIRO_FT_SYNTHESIZE_OBLIQUE: Slant the glyph outline by 12 degrees to the
 * right.
 *
 * A set of synthesis options to control how FreeType renders the glyphs
 * for a particular font face.
 *
 * Individual synthesis features of a #cairo_ft_font_face_t can be set
 * using cairo_ft_font_face_set_synthesize(), or disabled using
 * cairo_ft_font_face_unset_synthesize(). The currently enabled set of
 * synthesis options can be queried with cairo_ft_font_face_get_synthesize().
 *
 * Note: that when synthesizing glyphs, the font metrics returned will only
 * be estimates.
 *
 * Since: 1.12
 **/
typedef enum {
    CAIRO_FT_SYNTHESIZE_BOLD = 1 << 0,
    CAIRO_FT_SYNTHESIZE_OBLIQUE = 1 << 1
} cairo_ft_synthesize_t;

cairo_public void
cairo_ft_font_face_set_synthesize (cairo_font_face_t *font_face,
				   unsigned int synth_flags);

cairo_public void
cairo_ft_font_face_unset_synthesize (cairo_font_face_t *font_face,
				     unsigned int synth_flags);

cairo_public unsigned int
cairo_ft_font_face_get_synthesize (cairo_font_face_t *font_face);


cairo_public FT_Face
cairo_ft_scaled_font_lock_face (cairo_scaled_font_t *scaled_font);

cairo_public void
cairo_ft_scaled_font_unlock_face (cairo_scaled_font_t *scaled_font);

#if CAIRO_HAS_FC_FONT

cairo_public cairo_font_face_t *
cairo_ft_font_face_create_for_pattern (FcPattern *pattern);

cairo_public void
cairo_ft_font_options_substitute (const cairo_font_options_t *options,
				  FcPattern                  *pattern);

#endif

CAIRO_END_DECLS

#else  /* CAIRO_HAS_FT_FONT */
# error Cairo was not compiled with support for the freetype font backend
#endif /* CAIRO_HAS_FT_FONT */

#endif /* CAIRO_FT_H */
