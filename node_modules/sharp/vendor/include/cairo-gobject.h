/* cairo - a vector graphics library with display and print output
 *
 * Copyright © 2010 Red Hat Inc.
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
 * The Initial Developer of the Original Code is University of Southern
 * California.
 *
 * Contributor(s):
 *	Benjamin Otte <otte@redhat.com>
 */

#ifndef CAIRO_GOBJECT_H
#define CAIRO_GOBJECT_H

#include <cairo.h>

#if CAIRO_HAS_GOBJECT_FUNCTIONS

#include <glib-object.h>

CAIRO_BEGIN_DECLS

/* structs */

#define CAIRO_GOBJECT_TYPE_CONTEXT cairo_gobject_context_get_type ()
cairo_public GType
cairo_gobject_context_get_type (void);

#define CAIRO_GOBJECT_TYPE_DEVICE cairo_gobject_device_get_type ()
cairo_public GType
cairo_gobject_device_get_type (void);

#define CAIRO_GOBJECT_TYPE_MATRIX cairo_gobject_matrix_get_type ()
cairo_public GType
cairo_gobject_matrix_get_type (void);

#define CAIRO_GOBJECT_TYPE_PATTERN cairo_gobject_pattern_get_type ()
cairo_public GType
cairo_gobject_pattern_get_type (void);

#define CAIRO_GOBJECT_TYPE_SURFACE cairo_gobject_surface_get_type ()
cairo_public GType
cairo_gobject_surface_get_type (void);

#define CAIRO_GOBJECT_TYPE_RECTANGLE cairo_gobject_rectangle_get_type ()
cairo_public GType
cairo_gobject_rectangle_get_type (void);

#define CAIRO_GOBJECT_TYPE_SCALED_FONT cairo_gobject_scaled_font_get_type ()
cairo_public GType
cairo_gobject_scaled_font_get_type (void);

#define CAIRO_GOBJECT_TYPE_FONT_FACE cairo_gobject_font_face_get_type ()
cairo_public GType
cairo_gobject_font_face_get_type (void);

#define CAIRO_GOBJECT_TYPE_FONT_OPTIONS cairo_gobject_font_options_get_type ()
cairo_public GType
cairo_gobject_font_options_get_type (void);

#define CAIRO_GOBJECT_TYPE_RECTANGLE_INT cairo_gobject_rectangle_int_get_type ()
cairo_public GType
cairo_gobject_rectangle_int_get_type (void);

#define CAIRO_GOBJECT_TYPE_REGION cairo_gobject_region_get_type ()
cairo_public GType
cairo_gobject_region_get_type (void);

/* enums */

#define CAIRO_GOBJECT_TYPE_STATUS cairo_gobject_status_get_type ()
cairo_public GType
cairo_gobject_status_get_type (void);

#define CAIRO_GOBJECT_TYPE_CONTENT cairo_gobject_content_get_type ()
cairo_public GType
cairo_gobject_content_get_type (void);

#define CAIRO_GOBJECT_TYPE_OPERATOR cairo_gobject_operator_get_type ()
cairo_public GType
cairo_gobject_operator_get_type (void);

#define CAIRO_GOBJECT_TYPE_ANTIALIAS cairo_gobject_antialias_get_type ()
cairo_public GType
cairo_gobject_antialias_get_type (void);

#define CAIRO_GOBJECT_TYPE_FILL_RULE cairo_gobject_fill_rule_get_type ()
cairo_public GType
cairo_gobject_fill_rule_get_type (void);

#define CAIRO_GOBJECT_TYPE_LINE_CAP cairo_gobject_line_cap_get_type ()
cairo_public GType
cairo_gobject_line_cap_get_type (void);

#define CAIRO_GOBJECT_TYPE_LINE_JOIN cairo_gobject_line_join_get_type ()
cairo_public GType
cairo_gobject_line_join_get_type (void);

#define CAIRO_GOBJECT_TYPE_TEXT_CLUSTER_FLAGS cairo_gobject_text_cluster_flags_get_type ()
cairo_public GType
cairo_gobject_text_cluster_flags_get_type (void);

#define CAIRO_GOBJECT_TYPE_FONT_SLANT cairo_gobject_font_slant_get_type ()
cairo_public GType
cairo_gobject_font_slant_get_type (void);

#define CAIRO_GOBJECT_TYPE_FONT_WEIGHT cairo_gobject_font_weight_get_type ()
cairo_public GType
cairo_gobject_font_weight_get_type (void);

#define CAIRO_GOBJECT_TYPE_SUBPIXEL_ORDER cairo_gobject_subpixel_order_get_type ()
cairo_public GType
cairo_gobject_subpixel_order_get_type (void);

#define CAIRO_GOBJECT_TYPE_HINT_STYLE cairo_gobject_hint_style_get_type ()
cairo_public GType
cairo_gobject_hint_style_get_type (void);

/* historical accident */
#define CAIRO_GOBJECT_TYPE_HNT_METRICS cairo_gobject_hint_metrics_get_type ()
#define CAIRO_GOBJECT_TYPE_HINT_METRICS cairo_gobject_hint_metrics_get_type ()
cairo_public GType
cairo_gobject_hint_metrics_get_type (void);

#define CAIRO_GOBJECT_TYPE_FONT_TYPE cairo_gobject_font_type_get_type ()
cairo_public GType
cairo_gobject_font_type_get_type (void);

#define CAIRO_GOBJECT_TYPE_PATH_DATA_TYPE cairo_gobject_path_data_type_get_type ()
cairo_public GType
cairo_gobject_path_data_type_get_type (void);

#define CAIRO_GOBJECT_TYPE_DEVICE_TYPE cairo_gobject_device_type_get_type ()
cairo_public GType
cairo_gobject_device_type_get_type (void);

#define CAIRO_GOBJECT_TYPE_SURFACE_TYPE cairo_gobject_surface_type_get_type ()
cairo_public GType
cairo_gobject_surface_type_get_type (void);

#define CAIRO_GOBJECT_TYPE_FORMAT cairo_gobject_format_get_type ()
cairo_public GType
cairo_gobject_format_get_type (void);

#define CAIRO_GOBJECT_TYPE_PATTERN_TYPE cairo_gobject_pattern_type_get_type ()
cairo_public GType
cairo_gobject_pattern_type_get_type (void);

#define CAIRO_GOBJECT_TYPE_EXTEND cairo_gobject_extend_get_type ()
cairo_public GType
cairo_gobject_extend_get_type (void);

#define CAIRO_GOBJECT_TYPE_FILTER cairo_gobject_filter_get_type ()
cairo_public GType
cairo_gobject_filter_get_type (void);

#define CAIRO_GOBJECT_TYPE_REGION_OVERLAP cairo_gobject_region_overlap_get_type ()
cairo_public GType
cairo_gobject_region_overlap_get_type (void);

CAIRO_END_DECLS

#else  /* CAIRO_HAS_GOBJECT_FUNCTIONS */
# error Cairo was not compiled with support for GObject
#endif /* CAIRO_HAS_GOBJECT_FUNCTIONS */

#endif /* CAIRO_GOBJECT_H */
