/* Various interpolators.
 *
 * J.Cupitt, 15/10/08
 */

/*

    This file is part of VIPS.

    VIPS is free software; you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
    02110-1301  USA

 */

/*

    These files are distributed with VIPS - http://www.vips.ecs.soton.ac.uk

 */

#ifndef VIPS_INTERPOLATE_H
#define VIPS_INTERPOLATE_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

#define VIPS_TYPE_INTERPOLATE (vips_interpolate_get_type())
#define VIPS_INTERPOLATE( obj ) \
	(G_TYPE_CHECK_INSTANCE_CAST( (obj), \
	VIPS_TYPE_INTERPOLATE, VipsInterpolate ))
#define VIPS_INTERPOLATE_CLASS( klass ) \
	(G_TYPE_CHECK_CLASS_CAST( (klass), \
	VIPS_TYPE_INTERPOLATE, VipsInterpolateClass))
#define VIPS_IS_INTERPOLATE( obj ) \
	(G_TYPE_CHECK_INSTANCE_TYPE( (obj), VIPS_TYPE_INTERPOLATE ))
#define VIPS_IS_INTERPOLATE_CLASS( klass ) \
	(G_TYPE_CHECK_CLASS_TYPE( (klass), VIPS_TYPE_INTERPOLATE ))
#define VIPS_INTERPOLATE_GET_CLASS( obj ) \
	(G_TYPE_INSTANCE_GET_CLASS( (obj), \
	VIPS_TYPE_INTERPOLATE, VipsInterpolateClass ))

typedef struct _VipsInterpolate {
	VipsObject parent_object;

} VipsInterpolate;

/* An interpolation function. This is a class method, but we have a lookup
 * function for it to speed up dispatch. Write to the memory at "out",
 * interpolate the value at position (x, y) in "in".
 */
typedef void (*VipsInterpolateMethod)( VipsInterpolate *interpolate,
	void *out, VipsRegion *in, double x, double y );

typedef struct _VipsInterpolateClass {
	VipsObjectClass parent_class;

	/* Write to pixel out(x,y), interpolating from in(x,y). The caller has
	 * to set the regions up.
	 */
	VipsInterpolateMethod interpolate;

	/* This interpolator needs a window this many pixels across and down.
	 */
	int (*get_window_size)( VipsInterpolate *interpolate );

	/* Or just set this if you want a constant.
	 */
	int window_size;

	/* Stencils are offset by this much. Default to window_size / 2 - 1
	 * (centering) if get_window_offset is NULL and window_offset is -1.
	 */
	int (*get_window_offset)( VipsInterpolate *interpolate );
	int window_offset;
} VipsInterpolateClass;

/* Don't put spaces around void here, it breaks gtk-doc.
 */
GType vips_interpolate_get_type(void);
void vips_interpolate( VipsInterpolate *interpolate,
	void *out, VipsRegion *in, double x, double y );
VipsInterpolateMethod vips_interpolate_get_method( VipsInterpolate *interpolate );
int vips_interpolate_get_window_size( VipsInterpolate *interpolate );
int vips_interpolate_get_window_offset( VipsInterpolate *interpolate );

/* How many bits of precision we keep for transformations, ie. how many
 * pre-computed matricies we have.
 */
#define VIPS_TRANSFORM_SHIFT (6)
#define VIPS_TRANSFORM_SCALE (1 << VIPS_TRANSFORM_SHIFT)

/* How many bits of precision we keep for interpolation, ie. where the decimal
 * is in the fixed-point tables. For 16-bit pixels, we need 16 bits for the
 * data and 4 bits to add 16 values together. That leaves 12 bits for the
 * fractional part.
 */
#define VIPS_INTERPOLATE_SHIFT (12)
#define VIPS_INTERPOLATE_SCALE (1 << VIPS_INTERPOLATE_SHIFT)

/* Convenience: return static interpolators, no need to unref.
 */
VipsInterpolate *vips_interpolate_nearest_static( void );
VipsInterpolate *vips_interpolate_bilinear_static( void );

/* Convenience: make an interpolator from a nickname. g_object_unref() when
 * you're done with it.
 */
VipsInterpolate *vips_interpolate_new( const char *nickname );

#ifdef __cplusplus
}
#endif /*__cplusplus*/

#endif /*VIPS_INTERPOLATE_H*/

