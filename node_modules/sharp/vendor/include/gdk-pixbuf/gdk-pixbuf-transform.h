/* GdkPixbuf library - transformations
 *
 * Copyright (C) 2003 The Free Software Foundation
 *
 * Authors: Mark Crichton <crichton@gimp.org>
 *          Miguel de Icaza <miguel@gnu.org>
 *          Federico Mena-Quintero <federico@gimp.org>
 *          Havoc Pennington <hp@redhat.com>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, see <http://www.gnu.org/licenses/>.
 */

#ifndef GDK_PIXBUF_TRANSFORM_H
#define GDK_PIXBUF_TRANSFORM_H

#if defined(GDK_PIXBUF_DISABLE_SINGLE_INCLUDES) && !defined (GDK_PIXBUF_H_INSIDE) && !defined (GDK_PIXBUF_COMPILATION)
#error "Only <gdk-pixbuf/gdk-pixbuf.h> can be included directly."
#endif

#include <glib.h>
#include <gdk-pixbuf/gdk-pixbuf-core.h>


G_BEGIN_DECLS

/* Scaling */

/**
 * GdkInterpType:
 * @GDK_INTERP_NEAREST: Nearest neighbor sampling; this is the fastest
 *  and lowest quality mode. Quality is normally unacceptable when scaling 
 *  down, but may be OK when scaling up.
 * @GDK_INTERP_TILES: This is an accurate simulation of the PostScript
 *  image operator without any interpolation enabled.  Each pixel is
 *  rendered as a tiny parallelogram of solid color, the edges of which
 *  are implemented with antialiasing.  It resembles nearest neighbor for
 *  enlargement, and bilinear for reduction.
 * @GDK_INTERP_BILINEAR: Best quality/speed balance; use this mode by
 *  default. Bilinear interpolation.  For enlargement, it is
 *  equivalent to point-sampling the ideal bilinear-interpolated image.
 *  For reduction, it is equivalent to laying down small tiles and
 *  integrating over the coverage area.
 * @GDK_INTERP_HYPER: This is the slowest and highest quality
 *  reconstruction function. It is derived from the hyperbolic filters in
 *  Wolberg's "Digital Image Warping", and is formally defined as the
 *  hyperbolic-filter sampling the ideal hyperbolic-filter interpolated
 *  image (the filter is designed to be idempotent for 1:1 pixel mapping).
 *  **Deprecated**: this interpolation filter is deprecated, as in reality
 *  it has a lower quality than the @GDK_INTERP_BILINEAR filter
 *  (Since: 2.38)
 * 
 * This enumeration describes the different interpolation modes that
 * can be used with the scaling functions. @GDK_INTERP_NEAREST is
 * the fastest scaling method, but has horrible quality when
 * scaling down. @GDK_INTERP_BILINEAR is the best choice if you
 * aren't sure what to choose, it has a good speed/quality balance.
 * 
 * **Note**: Cubic filtering is missing from the list; hyperbolic
 * interpolation is just as fast and results in higher quality.
 */
typedef enum {
	GDK_INTERP_NEAREST,
	GDK_INTERP_TILES,
	GDK_INTERP_BILINEAR,
	GDK_INTERP_HYPER
} GdkInterpType;

/**
 * GdkPixbufRotation:
 * @GDK_PIXBUF_ROTATE_NONE: No rotation.
 * @GDK_PIXBUF_ROTATE_COUNTERCLOCKWISE: Rotate by 90 degrees.
 * @GDK_PIXBUF_ROTATE_UPSIDEDOWN: Rotate by 180 degrees.
 * @GDK_PIXBUF_ROTATE_CLOCKWISE: Rotate by 270 degrees.
 * 
 * The possible rotations which can be passed to gdk_pixbuf_rotate_simple().
 * To make them easier to use, their numerical values are the actual degrees.
 */
typedef enum {
	GDK_PIXBUF_ROTATE_NONE             =   0,
	GDK_PIXBUF_ROTATE_COUNTERCLOCKWISE =  90,
	GDK_PIXBUF_ROTATE_UPSIDEDOWN       = 180,
	GDK_PIXBUF_ROTATE_CLOCKWISE        = 270
} GdkPixbufRotation;

GDK_PIXBUF_AVAILABLE_IN_ALL
void gdk_pixbuf_scale           (const GdkPixbuf *src,
				 GdkPixbuf       *dest,
				 int              dest_x,
				 int              dest_y,
				 int              dest_width,
				 int              dest_height,
				 double           offset_x,
				 double           offset_y,
				 double           scale_x,
				 double           scale_y,
				 GdkInterpType    interp_type);
GDK_PIXBUF_AVAILABLE_IN_ALL
void gdk_pixbuf_composite       (const GdkPixbuf *src,
				 GdkPixbuf       *dest,
				 int              dest_x,
				 int              dest_y,
				 int              dest_width,
				 int              dest_height,
				 double           offset_x,
				 double           offset_y,
				 double           scale_x,
				 double           scale_y,
				 GdkInterpType    interp_type,
				 int              overall_alpha);
GDK_PIXBUF_AVAILABLE_IN_ALL
void gdk_pixbuf_composite_color (const GdkPixbuf *src,
				 GdkPixbuf       *dest,
				 int              dest_x,
				 int              dest_y,
				 int              dest_width,
				 int              dest_height,
				 double           offset_x,
				 double           offset_y,
				 double           scale_x,
				 double           scale_y,
				 GdkInterpType    interp_type,
				 int              overall_alpha,
				 int              check_x,
				 int              check_y,
				 int              check_size,
				 guint32          color1,
				 guint32          color2);

GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbuf *gdk_pixbuf_scale_simple           (const GdkPixbuf *src,
					      int              dest_width,
					      int              dest_height,
					      GdkInterpType    interp_type);

GDK_PIXBUF_AVAILABLE_IN_ALL
GdkPixbuf *gdk_pixbuf_composite_color_simple (const GdkPixbuf *src,
					      int              dest_width,
					      int              dest_height,
					      GdkInterpType    interp_type,
					      int              overall_alpha,
					      int              check_size,
					      guint32          color1,
					      guint32          color2);

GDK_PIXBUF_AVAILABLE_IN_2_6
GdkPixbuf *gdk_pixbuf_rotate_simple          (const GdkPixbuf   *src,
				              GdkPixbufRotation  angle);
GDK_PIXBUF_AVAILABLE_IN_2_6
GdkPixbuf *gdk_pixbuf_flip                   (const GdkPixbuf   *src,
				              gboolean           horizontal);
				     
G_END_DECLS


#endif  /* GDK_PIXBUF_TRANSFORM_H */
