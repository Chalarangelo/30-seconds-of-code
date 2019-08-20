/* cairo - a vector graphics library with display and print output
 *
 * Copyright © 2006 Red Hat, Inc.
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
 *	Carl D. Worth <cworth@cworth.org>
 */

#ifndef CAIRO_DEPRECATED_H
#define CAIRO_DEPRECATED_H

#define CAIRO_FONT_TYPE_ATSUI CAIRO_FONT_TYPE_QUARTZ

/* Obsolete functions. These definitions exist to coerce the compiler
 * into providing a little bit of guidance with its error
 * messages. The idea is to help users port their old code without
 * having to dig through lots of documentation.
 *
 * The first set of REPLACED_BY functions is for functions whose names
 * have just been changed. So fixing these up is mechanical, (and
 * automated by means of the cairo/util/cairo-api-update script.
 *
 * The second set of DEPRECATED_BY functions is for functions where
 * the replacement is used in a different way, (ie. different
 * arguments, multiple functions instead of one, etc). Fixing these up
 * will require a bit more work on the user's part, (and hopefully we
 * can get cairo-api-update to find these and print some guiding
 * information).
 */
#define cairo_current_font_extents   cairo_current_font_extents_REPLACED_BY_cairo_font_extents
#define cairo_get_font_extents       cairo_get_font_extents_REPLACED_BY_cairo_font_extents
#define cairo_current_operator       cairo_current_operator_REPLACED_BY_cairo_get_operator
#define cairo_current_tolerance	     cairo_current_tolerance_REPLACED_BY_cairo_get_tolerance
#define cairo_current_point	     cairo_current_point_REPLACED_BY_cairo_get_current_point
#define cairo_current_fill_rule	     cairo_current_fill_rule_REPLACED_BY_cairo_get_fill_rule
#define cairo_current_line_width     cairo_current_line_width_REPLACED_BY_cairo_get_line_width
#define cairo_current_line_cap       cairo_current_line_cap_REPLACED_BY_cairo_get_line_cap
#define cairo_current_line_join      cairo_current_line_join_REPLACED_BY_cairo_get_line_join
#define cairo_current_miter_limit    cairo_current_miter_limit_REPLACED_BY_cairo_get_miter_limit
#define cairo_current_matrix         cairo_current_matrix_REPLACED_BY_cairo_get_matrix
#define cairo_current_target_surface cairo_current_target_surface_REPLACED_BY_cairo_get_target
#define cairo_get_status             cairo_get_status_REPLACED_BY_cairo_status
#define cairo_concat_matrix		 cairo_concat_matrix_REPLACED_BY_cairo_transform
#define cairo_scale_font                 cairo_scale_font_REPLACED_BY_cairo_set_font_size
#define cairo_select_font                cairo_select_font_REPLACED_BY_cairo_select_font_face
#define cairo_transform_font             cairo_transform_font_REPLACED_BY_cairo_set_font_matrix
#define cairo_transform_point		 cairo_transform_point_REPLACED_BY_cairo_user_to_device
#define cairo_transform_distance	 cairo_transform_distance_REPLACED_BY_cairo_user_to_device_distance
#define cairo_inverse_transform_point	 cairo_inverse_transform_point_REPLACED_BY_cairo_device_to_user
#define cairo_inverse_transform_distance cairo_inverse_transform_distance_REPLACED_BY_cairo_device_to_user_distance
#define cairo_init_clip			 cairo_init_clip_REPLACED_BY_cairo_reset_clip
#define cairo_surface_create_for_image	 cairo_surface_create_for_image_REPLACED_BY_cairo_image_surface_create_for_data
#define cairo_default_matrix		 cairo_default_matrix_REPLACED_BY_cairo_identity_matrix
#define cairo_matrix_set_affine		 cairo_matrix_set_affine_REPLACED_BY_cairo_matrix_init
#define cairo_matrix_set_identity	 cairo_matrix_set_identity_REPLACED_BY_cairo_matrix_init_identity
#define cairo_pattern_add_color_stop	 cairo_pattern_add_color_stop_REPLACED_BY_cairo_pattern_add_color_stop_rgba
#define cairo_set_rgb_color		 cairo_set_rgb_color_REPLACED_BY_cairo_set_source_rgb
#define cairo_set_pattern		 cairo_set_pattern_REPLACED_BY_cairo_set_source
#define cairo_xlib_surface_create_for_pixmap_with_visual	cairo_xlib_surface_create_for_pixmap_with_visual_REPLACED_BY_cairo_xlib_surface_create
#define cairo_xlib_surface_create_for_window_with_visual	cairo_xlib_surface_create_for_window_with_visual_REPLACED_BY_cairo_xlib_surface_create
#define cairo_xcb_surface_create_for_pixmap_with_visual	cairo_xcb_surface_create_for_pixmap_with_visual_REPLACED_BY_cairo_xcb_surface_create
#define cairo_xcb_surface_create_for_window_with_visual	cairo_xcb_surface_create_for_window_with_visual_REPLACED_BY_cairo_xcb_surface_create
#define cairo_ps_surface_set_dpi	cairo_ps_surface_set_dpi_REPLACED_BY_cairo_surface_set_fallback_resolution
#define cairo_pdf_surface_set_dpi	cairo_pdf_surface_set_dpi_REPLACED_BY_cairo_surface_set_fallback_resolution
#define cairo_svg_surface_set_dpi	cairo_svg_surface_set_dpi_REPLACED_BY_cairo_surface_set_fallback_resolution
#define cairo_atsui_font_face_create_for_atsu_font_id  cairo_atsui_font_face_create_for_atsu_font_id_REPLACED_BY_cairo_quartz_font_face_create_for_atsu_font_id

#define cairo_current_path	     cairo_current_path_DEPRECATED_BY_cairo_copy_path
#define cairo_current_path_flat	     cairo_current_path_flat_DEPRECATED_BY_cairo_copy_path_flat
#define cairo_get_path		     cairo_get_path_DEPRECATED_BY_cairo_copy_path
#define cairo_get_path_flat	     cairo_get_path_flat_DEPRECATED_BY_cairo_get_path_flat
#define cairo_set_alpha		     cairo_set_alpha_DEPRECATED_BY_cairo_set_source_rgba_OR_cairo_paint_with_alpha
#define cairo_show_surface	     cairo_show_surface_DEPRECATED_BY_cairo_set_source_surface_AND_cairo_paint
#define cairo_copy		     cairo_copy_DEPRECATED_BY_cairo_create_AND_MANY_INDIVIDUAL_FUNCTIONS
#define cairo_surface_set_repeat	cairo_surface_set_repeat_DEPRECATED_BY_cairo_pattern_set_extend
#define cairo_surface_set_matrix	cairo_surface_set_matrix_DEPRECATED_BY_cairo_pattern_set_matrix
#define cairo_surface_get_matrix	cairo_surface_get_matrix_DEPRECATED_BY_cairo_pattern_get_matrix
#define cairo_surface_set_filter	cairo_surface_set_filter_DEPRECATED_BY_cairo_pattern_set_filter
#define cairo_surface_get_filter	cairo_surface_get_filter_DEPRECATED_BY_cairo_pattern_get_filter
#define cairo_matrix_create		cairo_matrix_create_DEPRECATED_BY_cairo_matrix_t
#define cairo_matrix_destroy		cairo_matrix_destroy_DEPRECATED_BY_cairo_matrix_t
#define cairo_matrix_copy		cairo_matrix_copy_DEPRECATED_BY_cairo_matrix_t
#define cairo_matrix_get_affine		cairo_matrix_get_affine_DEPRECATED_BY_cairo_matrix_t
#define cairo_set_target_surface	cairo_set_target_surface_DEPRECATED_BY_cairo_create
#define cairo_set_target_image		cairo_set_target_image_DEPRECATED_BY_cairo_image_surface_create_for_data
#define cairo_set_target_pdf		cairo_set_target_pdf_DEPRECATED_BY_cairo_pdf_surface_create
#define cairo_set_target_png		cairo_set_target_png_DEPRECATED_BY_cairo_surface_write_to_png
#define cairo_set_target_ps		cairo_set_target_ps_DEPRECATED_BY_cairo_ps_surface_create
#define cairo_set_target_quartz		cairo_set_target_quartz_DEPRECATED_BY_cairo_quartz_surface_create
#define cairo_set_target_win32		cairo_set_target_win32_DEPRECATED_BY_cairo_win32_surface_create
#define cairo_set_target_xcb		cairo_set_target_xcb_DEPRECATED_BY_cairo_xcb_surface_create
#define cairo_set_target_drawable	cairo_set_target_drawable_DEPRECATED_BY_cairo_xlib_surface_create
#define cairo_get_status_string		cairo_get_status_string_DEPRECATED_BY_cairo_status_AND_cairo_status_to_string
#define cairo_status_string		cairo_status_string_DEPRECATED_BY_cairo_status_AND_cairo_status_to_string

#endif /* CAIRO_DEPRECATED_H */
