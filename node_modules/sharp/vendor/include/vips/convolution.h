/* convolution.h
 *
 * 20/9/09
 * 	- from proto.h
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

#ifndef VIPS_CONVOLUTION_H
#define VIPS_CONVOLUTION_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

typedef enum {
	VIPS_COMBINE_MAX,
	VIPS_COMBINE_SUM,
	VIPS_COMBINE_MIN,
	VIPS_COMBINE_LAST
} VipsCombine;

int vips_conv( VipsImage *in, VipsImage **out, VipsImage *mask, ... )
	__attribute__((sentinel));
int vips_convf( VipsImage *in, VipsImage **out, VipsImage *mask, ... )
	__attribute__((sentinel));
int vips_convi( VipsImage *in, VipsImage **out, VipsImage *mask, ... )
	__attribute__((sentinel));
int vips_conva( VipsImage *in, VipsImage **out, VipsImage *mask, ... )
	__attribute__((sentinel));
int vips_convsep( VipsImage *in, VipsImage **out, VipsImage *mask, ... )
	__attribute__((sentinel));
int vips_convasep( VipsImage *in, VipsImage **out, VipsImage *mask, ... )
	__attribute__((sentinel));

int vips_compass( VipsImage *in, VipsImage **out, VipsImage *mask, ... )
	__attribute__((sentinel));
int vips_gaussblur( VipsImage *in, VipsImage **out, double sigma, ... )
	__attribute__((sentinel));
int vips_sharpen( VipsImage *in, VipsImage **out, ... ) 
	__attribute__((sentinel));

int vips_spcor( VipsImage *in, VipsImage *ref, VipsImage **out, ... )
	__attribute__((sentinel));
int vips_fastcor( VipsImage *in, VipsImage *ref, VipsImage **out, ... )
	__attribute__((sentinel));

int vips_sobel( VipsImage *in, VipsImage **out, ... )
	__attribute__((sentinel));
int vips_canny( VipsImage *in, VipsImage **out, ... )
	__attribute__((sentinel));

#ifdef __cplusplus
}
#endif /*__cplusplus*/

#endif /*VIPS_CONVOLUTION_H*/
