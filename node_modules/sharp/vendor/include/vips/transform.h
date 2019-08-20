/* Affine transforms.
 */

/*

    Copyright (C) 1991-2003 The National Gallery

    This program is free software; you can redistribute it and/or modify
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

#ifndef VIPS_TRANSFORM_H
#define VIPS_TRANSFORM_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

/* Params for an affine transformation.
 */
typedef struct {
	/* Area of input we can use. This can be smaller than the real input 
	 * image: we expand the input to add extra pixels for interpolation. 
	 */
	VipsRect iarea;			

	/* The area of the output we've been asked to generate. left/top can
	 * be negative.
	 */
	VipsRect oarea;

	/* The transform.
	 */
	double a, b, c, d;		
	double idx, idy;
	double odx, ody;

	double ia, ib, ic, id;		/* Inverse of matrix abcd */
} VipsTransformation;

void vips__transform_init( VipsTransformation *trn );
int vips__transform_calc_inverse( VipsTransformation *trn );
int vips__transform_isidentity( const VipsTransformation *trn );
int vips__transform_add( const VipsTransformation *in1, 
	const VipsTransformation *in2, 
	VipsTransformation *out );
void vips__transform_print( const VipsTransformation *trn );

void vips__transform_forward_point( const VipsTransformation *trn, 
	const double x, const double y, double *ox, double *oy );
void vips__transform_invert_point( const VipsTransformation *trn, 
	const double x, const double y, double *ox, double *oy );
void vips__transform_forward_rect( const VipsTransformation *trn,
	const VipsRect *in, VipsRect *out );
void vips__transform_invert_rect( const VipsTransformation *trn, 
	const VipsRect *in, VipsRect *out );

void vips__transform_set_area( VipsTransformation * );

int vips__affine( VipsImage *in, VipsImage *out, VipsTransformation *trn );

#ifdef __cplusplus
}
#endif /*__cplusplus*/

#endif /*VIPS_TRANSFORM_H*/
