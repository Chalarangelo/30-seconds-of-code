/* cairo - a vector graphics library with display and print output
 *
 * Copyright © 2006, 2007 Mozilla Corporation
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
 * The Initial Developer of the Original Code is Mozilla Foundation.
 *
 * Contributor(s):
 *      Vladimir Vukicevic <vladimir@mozilla.com>
 */

#ifndef CAIRO_QUARTZ_H
#define CAIRO_QUARTZ_H

#include "cairo.h"

#if CAIRO_HAS_QUARTZ_SURFACE

#include <ApplicationServices/ApplicationServices.h>

CAIRO_BEGIN_DECLS

cairo_public cairo_surface_t *
cairo_quartz_surface_create (cairo_format_t format,
                             unsigned int width,
                             unsigned int height);

cairo_public cairo_surface_t *
cairo_quartz_surface_create_for_cg_context (CGContextRef cgContext,
                                            unsigned int width,
                                            unsigned int height);

cairo_public CGContextRef
cairo_quartz_surface_get_cg_context (cairo_surface_t *surface);

#if CAIRO_HAS_QUARTZ_FONT

/*
 * Quartz font support
 */

cairo_public cairo_font_face_t *
cairo_quartz_font_face_create_for_cgfont (CGFontRef font);

cairo_public cairo_font_face_t *
cairo_quartz_font_face_create_for_atsu_font_id (ATSUFontID font_id);

#endif /* CAIRO_HAS_QUARTZ_FONT */

CAIRO_END_DECLS

#else

# error Cairo was not compiled with support for the quartz backend

#endif /* CAIRO_HAS_QUARTZ_SURFACE */

#endif /* CAIRO_QUARTZ_H */
