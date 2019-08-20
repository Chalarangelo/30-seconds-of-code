/* histograms_lut.h
 *
 * 3/11/09
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

#ifndef VIPS_HISTOGRAM_H
#define VIPS_HISTOGRAM_H

#ifdef __cplusplus
extern "C" {
#endif /*__cplusplus*/

int vips_maplut( VipsImage *in, VipsImage **out, VipsImage *lut, ... )
	__attribute__((sentinel));
int vips_percent( VipsImage *in, double percent, int *threshold, ... )
	__attribute__((sentinel));
int vips_stdif( VipsImage *in, VipsImage **out, int width, int height, ... )
	__attribute__((sentinel));
int vips_hist_cum( VipsImage *in, VipsImage **out, ... )
	__attribute__((sentinel));
int vips_hist_norm( VipsImage *in, VipsImage **out, ... )
	__attribute__((sentinel));
int vips_hist_equal( VipsImage *in, VipsImage **out, ... )
	__attribute__((sentinel));
int vips_hist_plot( VipsImage *in, VipsImage **out, ... )
	__attribute__((sentinel));
int vips_hist_match( VipsImage *in, VipsImage *ref, VipsImage **out, ... )
	__attribute__((sentinel));
int vips_hist_local( VipsImage *in, VipsImage **out, 
	int width, int height, ... )
	__attribute__((sentinel));
int vips_hist_ismonotonic( VipsImage *in, gboolean *out, ... )
	__attribute__((sentinel));
int vips_hist_entropy( VipsImage *in, double *out, ... )
	__attribute__((sentinel));

#ifdef __cplusplus
}
#endif /*__cplusplus*/

#endif /*VIPS_HISTOGRAM_H*/
